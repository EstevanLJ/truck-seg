import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    Button,
    CircularProgress,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@material-ui/core";
import { useDropzone } from "react-dropzone";

import { LOCALE } from "../../../constants";

import DefaultInput from "../../inputs/DefaultInput";

const defaultObject = {
    name: "",
    description: "",
};

export default function DealDocumentForm(props) {
    const [object, setObject] = useState({ ...defaultObject });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        multiple: false,
    });

    const files = acceptedFiles.map((file) => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    useEffect(() => {
        if (props.id) {
            axios
                .get(`/api/deal-documents/${props.id}`)
                .then((response) => {
                    let formData = {
                        id: response.data.data.id,
                        name: response.data.data.document.name,
                        observation: response.data.data.document.observation,
                    };

                    setObject(formData);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
            setObject({ ...defaultObject, deal_id: props.dealId });
        }
    }, [props.id]);

    const onChangeValue = (field, value) => {
        let clone = Object.assign({}, object);
        clone[field] = value;
        setObject(clone);
    };

    const handleSave = () => {
        setLoading(true);

        let formData = new FormData();
        formData.set("deal_id", props.dealId);
        formData.set("name", object.name);

        if (object.observation) {
            formData.set("observation", object.observation);
        }

        if (acceptedFiles.length > 0) {
            formData.set("file", acceptedFiles[0]);
        }

        axios({
            url: `/api/deal-documents${props.id ? `/${props.id}` : ""}`,
            method: props.id ? "PATCH" : "POST",
            data: formData,
        })
            .then((response) => {
                props.onSuccess();
            })
            .catch((error) => {
                if (error.response) {
                    if (error.response.data.errors) {
                        setErrors(error.response.data.errors);
                    }
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    if (loading) {
        return (
            <>
                <DialogTitle>{LOCALE.loading}</DialogTitle>
                <DialogContent>
                    <div className="flex justify-center my-5">
                        <CircularProgress color="secondary" />
                    </div>
                </DialogContent>
            </>
        );
    }

    return (
        <>
            <DialogTitle>
                {object.id ? LOCALE.edit : LOCALE.add} {LOCALE.document}
            </DialogTitle>
            <DialogContent>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <DefaultInput
                            label={LOCALE.name}
                            name="name"
                            value={object.name}
                            onChangeValue={onChangeValue}
                            errors={errors}
                            required
                        />
                    </div>
                    <div>
                        <DefaultInput
                            label={LOCALE.observation}
                            name="observation"
                            value={object.observation}
                            onChangeValue={onChangeValue}
                            errors={errors}
                        />
                    </div>
                </div>
                <div>
                    <section className="container">
                        <div {...getRootProps({ className: "dropzone" })}>
                            <input {...getInputProps()} />
                            <p>
                                {LOCALE.drag_or_select}
                            </p>
                        </div>
                        <div className="mt-4">
                            {errors && errors["file"] && (
                                <div className="text-sm text-red-500">
                                    {errors["file"].join(" ")}
                                </div>
                            )}
                            {acceptedFiles.length > 0 && (
                                <>
                                    <h4 className="font-weight-bold mb-3">
                                        Arquivo:
                                    </h4>
                                    <div>{files}</div>
                                </>
                            )}
                        </div>
                    </section>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>{LOCALE.cancel}</Button>
                <Button onClick={handleSave} color="secondary">
                    {LOCALE.save}
                </Button>
            </DialogActions>
        </>
    );
}
