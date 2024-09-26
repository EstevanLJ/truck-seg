import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    Button,
    CircularProgress,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@material-ui/core";

import { defaultCompanyEmployee, yesOrNoOptions, LOCALE } from "../../../constants";
import DefaultInput, { DefaultMaskedInput } from "../../inputs/DefaultInput";
import DefaultRadio from "../../inputs/DefaultRadio";

export default function CompanyEmployeeForm(props) {
    const [object, setObject] = useState({ ...defaultCompanyEmployee });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (props.id) {
            axios
                .get(`/api/company-employees/${props.id}`)
                .then((response) => {
                    let formData = {
                        ...defaultCompanyEmployee,
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
            setObject({ ...defaultCompanyEmployee, person_id: props.personId });
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
            url: `/api/company-employees${props.id ? `/${props.id}` : ""}`,
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
                {object.id ? LOCALE.edit : LOCALE.add} Pessoa
            </DialogTitle>
            <DialogContent>
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 md:col-span-1">
                        <DefaultInput
                            label="Nome"
                            name="name"
                            value={object.name}
                            onChangeValue={onChangeValue}
                            errors={errors}
                            required
                        />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <DefaultInput
                            label="Cargo"
                            name="role"
                            value={object.role}
                            onChangeValue={onChangeValue}
                            errors={errors}
                            required
                        />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-3 md:col-span-2">
                        <DefaultMaskedInput
                            label="Telefone/Celular"
                            mask="(99) 99999-9999"
                            name="phone"
                            value={object.phone}
                            onChangeValue={onChangeValue}
                            errors={errors}
                            required
                        />
                    </div>
                    <div className="col-span-3 md:col-span-1">
                        <DefaultRadio
                            label="Tem Whatsapp?"
                            name="has_whatsapp"
                            value={object.has_whatsapp}
                            onChangeValue={onChangeValue}
                            errors={errors}
                            options={yesOrNoOptions}
                            required
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 md:col-span-1">
                        <DefaultInput
                            label="E-mail"
                            name="email"
                            value={object.email}
                            onChangeValue={onChangeValue}
                            errors={errors}
                            required
                        />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <DefaultMaskedInput
                            label="Telefone Secundário"
                            mask="(99) 99999-9999"
                            name="secondary_phone"
                            value={object.secondary_phone}
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
