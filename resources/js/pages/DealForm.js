import axios from "axios";
import React, { useEffect, useState } from "react";
import { CircularProgress, IconButton } from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";

import HorizontalLinearStepper from "../components/HorizontalLinearStepper";
import DealClientForm from "../components/Forms/DealForm/DealClientForm";
import FilesForm from "../components/Forms/DealForm/FilesForm";
import DealInfoForm from "../components/Forms/DealForm/DealInfoForm";
import { defaultDeal, LOCALE } from "../constants";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const defaultObject = defaultDeal;

export default function DealForm(props) {
    const [object, setObject] = useState({ ...defaultObject });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    useEffect(() => {
        setLoading(true);

        if (props.id) {
            axios
                .get(`/api/deals/${props.id}`)
                .then((response) => {
                    let formData = {
                        ...defaultObject,
                        ...response.data.data,
                    };

                    formData.roles = response.data.data.roles.map((role) => ({
                        value: role.id,
                        label: role.display_name,
                    }));

                    setObject(formData);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
            setObject({ ...defaultObject });
        }
    }, [props.id]);

    const handleSuccess = () => {
        if (props.onSuccess) {
            props.onSuccess();
        } else {
            history.push("/kanban");
        }
    };

    const onChangeValue = (field, value) => {
        let clone = Object.assign({}, object);

        let splitted = field.split(".");
        if (splitted.length == 1) {
            clone[field] = value;
        } else {
            clone[splitted[0]][splitted[1]] = value;
        }

        setObject(clone);
    };

    const handleSave = () => {
        setLoading(true);

        let formData = { ...object };
        formData.insurance_type = parseInt(formData.insurance_type);

        axios({
            url: `/api/deals${props.id ? `/${props.id}` : ""}`,
            method: props.id ? "PUT" : "POST",
            data: formData,
        })
            .then((response) => {
                toast.success("Negociação adicionada!");
                if (object.files.length > 0) {
                    handleFilesSave(response.data.data.id);
                } else {
                    setLoading(false);
                    handleSuccess();
                }
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                if (error.response) {
                    if (error.response.data.errors) {
                        setErrors(error.response.data.errors);
                    }
                }
            });
    };

    const handleFilesSave = (dealId) => {
        let files = object.files;
        let resquests = [];

        for (let file of files) {
            let formData = new FormData();
            formData.set("deal_id", dealId);
            formData.set("file", file);

            resquests.push(
                axios({
                    url: `/api/deal-documents`,
                    method: "POST",
                    data: formData,
                })
            );
        }

        toast.info(LOCALE.sending_files);

        axios
            .all(resquests)
            .then((response) => {
                toast.success(LOCALE.files_sent);
                setLoading(false);
                handleSuccess();
            })
            .catch((error) => {
                toast.error(LOCALE.failed_to_send_files);
                console.log(error);
                setLoading(false);
                handleSuccess();
            });
    };

    function getSteps() {
        return [
            {
                label: LOCALE.client,
            },
            {
                label: LOCALE.info,
            },
            {
                label: LOCALE.attachments,
                handleNext: handleSave,
            },
        ];
    }

    function getStepContent(step) {
        switch (step) {
            case 0:
                return (
                    <DealClientForm
                        object={object}
                        onChangeValue={onChangeValue}
                        errors={errors}
                        setObject={setObject}
                    />
                );
            case 1:
                return (
                    <DealInfoForm
                        object={object}
                        onChangeValue={onChangeValue}
                        errors={errors}
                    />
                );
            case 2:
                return (
                    <FilesForm
                        object={object}
                        onChangeValue={onChangeValue}
                        errors={errors}
                    />
                );
            default:
                return null;
        }
    }

    if (loading) {
        return (
            <div>
                <div className="flex justify-center my-5">
                    <CircularProgress color="secondary" />
                </div>
            </div>
        );
    }

    return (
        <div className="p-5">
            <HorizontalLinearStepper
                getSteps={getSteps}
                getStepContent={getStepContent}
            />
        </div>
    );
}
