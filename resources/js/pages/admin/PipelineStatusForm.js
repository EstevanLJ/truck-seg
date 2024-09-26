import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    TextField,
    Button,
    CircularProgress,
    IconButton,
    FormControlLabel,
    Checkbox,
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import { defaultPipelineStatus, LOCALE } from "../../constants";
import { toast } from "react-toastify";
import DefaultInput from "../../components/inputs/DefaultInput";
import DefaultFormHeader from "../../components/DefaultFormHeader";

export default function PipelineStatusForm(props) {
    const [object, setObject] = useState({ ...defaultPipelineStatus });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        if (props.id) {
            axios
                .get(`/api/pipeline-statuses/${props.id}`)
                .then((response) => {
                    let formData = {
                        ...defaultPipelineStatus,
                        ...response.data.data,
                    };

                    setObject(formData);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
            setObject({ ...defaultPipelineStatus });
        }
    }, [props.id]);

    const onChangeValue = (field, value) => {
        let clone = Object.assign({}, object);
        clone[field] = value;
        setObject(clone);
    };

    const handleSave = () => {
        setLoading(true);

        let formData = { ...object, pipeline_id: props.pipelineId };

        axios({
            url: `/api/pipeline-statuses${props.id ? `/${props.id}` : ""}`,
            method: props.id ? "PUT" : "POST",
            data: formData,
        })
            .then((response) => {
                toast.success(`Registro ${props.id ? "atualizado" : "criado"}`);
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
                    {props.id ? LOCALE.edit : LOCALE.add} Pipeline Status
                </p>
                <IconButton onClick={props.onClose}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </div>

            <hr className="mb-3" />

            {props.id && (
                <DefaultFormHeader id={object.id} date={object.updated_at} />
            )}

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <DefaultInput
                        label="Nome"
                        name="name"
                        value={object.name}
                        onChangeValue={onChangeValue}
                        errors={errors}
                    />
                </div>
                <div>
                    <DefaultInput
                        label="Ordem"
                        name="order"
                        value={object.order}
                        onChangeValue={onChangeValue}
                        errors={errors}
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <DefaultInput
                        label="Dias para notificar"
                        name="days_to_notify"
                        value={object.days_to_notify}
                        onChangeValue={onChangeValue}
                        errors={errors}
                    />
                </div>
                <div>
                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange={(e) =>
                                    onChangeValue("can_win", !object.can_win)
                                }
                                checked={!!object.can_win}
                                name="can_win"
                            />
                        }
                        label={"Pode ganhar?"}
                    />
                </div>
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
