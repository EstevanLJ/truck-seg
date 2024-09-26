import axios from "axios";
import React, { useState } from "react";
import { Button, CircularProgress } from "@material-ui/core";
import { toast } from "react-toastify";

import { defaultPerson } from "../../../constants";
import ClientFields from "./ClientFields";
import WarningDialog from "../../WarningDialog";

const defaultObject = defaultPerson;

export default function CreateClientForm(props) {
    const [object, setObject] = useState({ ...defaultObject });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showWarningDialog, setShowWarningDialog] = useState(false);

    const handleWarningDialogClose = () => {
        setShowWarningDialog(false);
        props.onClose();
    }

    const onChangeValue = (field, value) => {
        let clone = Object.assign({}, object);
        clone[field] = value;
        setObject(clone);
    };

    const handleSearch = (document) => {
        let cleaned = document
            .replaceAll(".", "")
            .replaceAll("/", "")
            .replaceAll("-", "");

        axios
            .get(`/api/people/search-document?document=${cleaned}`)
            .then((response) => {
                if (response.data.data.id) {
                    setShowWarningDialog(true);
                    return;
                }

                setObject({
                    ...response.data.data,
                    corporate: response.data.data.corporate === true ? '1' : '0'
                });
            })
            .catch((error) => {
                toast.warning("CNPJ não encontrado");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleSave = () => {
        setLoading(true);

        let formData = { ...object };

        axios({
            url: `/api/people${props.id ? `/${props.id}` : ""}`,
            method: props.id ? "PUT" : "POST",
            data: formData,
        })
            .then((response) => {
                toast.success("Registro criado");

                if (props.onSuccess) {
                    props.onSuccess();
                }
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
            <div>
                <div className="flex justify-center my-5">
                    <CircularProgress color="secondary" />
                </div>
            </div>
        );
    }

    return (
        <div className="p-5">
            <ClientFields
                object={object}
                onChangeValue={onChangeValue}
                errors={errors}
                onSearch={handleSearch}
            />

            <div className="mt-3">
                <Button
                    type="button"
                    variant="contained"
                    color="secondary"
                    onClick={handleSave}
                >
                    Salvar
                </Button>
            </div>

            <WarningDialog
                show={showWarningDialog}
                onClose={handleWarningDialogClose}
                message={"Já existe um cliente com esse CNPJ!"}
            />
        </div>
    );
}
