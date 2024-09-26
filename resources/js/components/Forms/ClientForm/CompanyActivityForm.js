import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    Button,
    CircularProgress,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@material-ui/core";

import { defaultCompanyActivity, LOCALE } from "../../../constants";
import DefaultInput from "../../inputs/DefaultInput";

export default function CompanyActivityForm(props) {
    const [object, setObject] = useState({ ...defaultCompanyActivity });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (props.id) {
            axios
                .get(`/api/company-activities/${props.id}`)
                .then((response) => {
                    let formData = {
                        ...defaultCompanyActivity,
                        ...response.data.data,
                        has_whatsapp: response.data.data.has_whatsapp ? "1" : "0",
                    };

                    setObject(formData);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
            setObject({ ...defaultCompanyActivity, person_id: props.personId });
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
            url: `/api/company-activities${props.id ? `/${props.id}` : ""}`,
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
                {object.id ? LOCALE.edit : LOCALE.add} Atividade (CNAE)
            </DialogTitle>
            <DialogContent>
                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2 md:col-span-1">
                        <DefaultInput
                            label="Código"
                            name="code"
                            value={object.code}
                            onChangeValue={onChangeValue}
                            errors={errors}
                            required
                        />
                    </div>
                    <div className="col-span-2 md:col-span-2">
                        <DefaultInput
                            label="Descrição"
                            name="description"
                            value={object.description}
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
