import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, CircularProgress, IconButton } from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import { defaultDealLoseReason, LOCALE } from "../../constants";
import DefaultInput from "../../components/inputs/DefaultInput";
import DefaultFormHeader from "../../components/DefaultFormHeader";
import { toast } from "react-toastify";

export default function DealLoseReasonForm(props) {
    const [object, setObject] = useState({ ...defaultDealLoseReason });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        if (props.id) {
            axios
                .get(`/api/deal-lost-reasons/${props.id}`)
                .then((response) => {
                    let formData = {
                        ...defaultDealLoseReason,
                        ...response.data.data,
                    };

                    setObject(formData);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
            setObject({ ...defaultDealLoseReason });
        }
    }, [props.id]);

    const onChangeValue = (field, value) => {
        let clone = Object.assign({}, object);
        clone[field] = value;
        setObject(clone);
    };

    const handleSave = () => {
        setLoading(true);

        let formData = { ...object };

        axios({
            url: `/api/deal-lost-reasons${props.id ? `/${props.id}` : ""}`,
            method: props.id ? "PUT" : "POST",
            data: formData,
        })
            .then((response) => {
                toast.success(`Registro ${props.id ? "atualizado" : "criado"}`);
                setLoading(false);
                props.onSuccess();
            })
            .catch((error) => {
                setLoading(false);
                if (error.response) {
                    if (error.response.data.errors) {
                        setErrors(error.response.data.errors);
                    }
                }
            });
    };

    if (loading) {
        return (
            <div className="p-4 w-screen sm:w-3/4-screen lg:w-1/2-screen">
                <div className="flex justify-center my-5">
                    <CircularProgress color="secondary" />
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 w-screen sm:w-3/4-screen lg:w-1/2-screen">
            <div className="flex justify-between items-center">
                <p className="font-bold">
                    {props.id ? LOCALE.edit : LOCALE.add} Motivo Perda
                </p>
                <IconButton onClick={props.onClose}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </div>

            <hr className="mb-3" />

            {props.id && (
                <DefaultFormHeader id={object.id} date={object.updated_at} />
            )}

            <div className="mb-3">
                <DefaultInput
                    label="Nome"
                    name="name"
                    value={object.name}
                    onChangeValue={onChangeValue}
                    errors={errors}
                />
            </div>

            <div className="mb-3">
                <DefaultInput
                    label="Descrição"
                    name="description"
                    value={object.description}
                    onChangeValue={onChangeValue}
                    errors={errors}
                />
            </div>

            <hr className="mb-3" />

            <div className="flex justify-between items-center">
                <Button
                    type="button"
                    variant="contained"
                    color="secondary"
                    onClick={handleSave}
                >
                    Salvar
                </Button>
                <Button
                    type="button"
                    variant="contained"
                    onClick={props.onClose}
                >
                    Cancelar
                </Button>
            </div>
        </div>
    );
}
