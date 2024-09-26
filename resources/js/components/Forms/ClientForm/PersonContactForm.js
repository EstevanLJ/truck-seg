import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    Button,
    CircularProgress,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@material-ui/core";

import { defaultPersonContact, personContactTypes, LOCALE } from "../../../constants";
import DefaultInput from "../../inputs/DefaultInput";
import { DefaultSelect } from "../../inputs/DefaultSelect";

export default function PersonContactForm(props) {
    const [object, setObject] = useState({ ...defaultPersonContact });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (props.id) {
            axios
                .get(`/api/person-contacts/${props.id}`)
                .then((response) => {
                    let formData = {
                        ...defaultPersonContact,
                        ...response.data.data,
                    };

                    setObject(formData);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
            setObject({ ...defaultPersonContact, person_id: props.personId });
        }
    }, [props.id]);

    const onChangeValue = (field, value) => {
        let clone = Object.assign({}, object);
        clone[field] = value;
        setObject(clone);
    };

    const handleSave = () => {
        setLoading(true);

        let formData = {
            ...object,
        };

        axios({
            url: `/api/person-contacts${props.id ? `/${props.id}` : ""}`,
            method: props.id ? "PUT" : "POST",
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
                {object.id ? LOCALE.edit : LOCALE.add} contato
            </DialogTitle>
            <DialogContent>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <DefaultSelect
                            label="Tipo"
                            name="type"
                            value={object.type}
                            onChangeValue={onChangeValue}
                            errors={errors}
                            options={personContactTypes}
                        />
                    </div>
                    <div className="col-span-2">
                        <DefaultInput
                            label="Valor"
                            name="value"
                            value={object.value}
                            onChangeValue={onChangeValue}
                            errors={errors}
                            required
                        />
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>Cancelar</Button>
                <Button onClick={handleSave} color="secondary">
                    Salvar
                </Button>
            </DialogActions>
        </>
    );
}
