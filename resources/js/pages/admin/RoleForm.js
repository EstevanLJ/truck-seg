import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    Button,
    CircularProgress,
    IconButton,
    FormControlLabel,
    Checkbox,
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import { defaultRole, LOCALE } from "../../constants";
import DefaultInput from "../../components/inputs/DefaultInput";
import { toast } from "react-toastify";
import DefaultFormHeader from "../../components/DefaultFormHeader";

export default function RoleForm(props) {
    const [object, setObject] = useState({ ...defaultRole });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [permissions, setPermissions] = useState([]);
    const [rolePermissions, setRolePermissions] = useState([]);

    useEffect(() => {
        setLoading(true);

        axios.get("/api/permissions").then((response) => {
            setPermissions(response.data.data);
        });

        if (props.id) {
            axios
                .get(`/api/roles/${props.id}`)
                .then((response) => {
                    let formData = {
                        ...defaultRole,
                        ...response.data.data,
                    };

                    setRolePermissions(response.data.permissions);
                    setObject(formData);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
            setObject({ ...defaultRole });
        }
    }, [props.id]);

    const onChangeValue = (field, value) => {
        let clone = Object.assign({}, object);
        clone[field] = value;
        setObject(clone);
    };

    const toggleRolePermission = (permission) => {
        const clone = [].concat(rolePermissions);
        let index = clone.indexOf(permission.id);
        if (index >= 0) {
            clone.splice(index, 1);
        } else {
            clone.push(permission.id);
        }
        setRolePermissions(clone);
    };

    const handleSave = () => {
        setLoading(true);

        let formData = { ...object };
        formData.permissions = rolePermissions;

        axios({
            url: `/api/roles${props.id ? `/${props.id}` : ""}`,
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
                    {props.id ? LOCALE.edit : LOCALE.add} Grupo
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
                        label="Nome de Exibição"
                        name="display_name"
                        value={object.display_name}
                        onChangeValue={onChangeValue}
                        errors={errors}
                    />
                </div>
                <div>
                    <DefaultInput
                        label="Nome"
                        name="name"
                        value={object.name}
                        onChangeValue={onChangeValue}
                        errors={errors}
                    />
                </div>
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

            <p className="my-3 font-bold">Permissões</p>

            <div className="max-h-96 overflow-y-auto">
                {permissions.map((permission) => (
                    <div key={`role_permissions_${permission.id}`}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={false}
                                    onChange={(e) =>
                                        toggleRolePermission(permission)
                                    }
                                    value={permission.id}
                                    checked={
                                        rolePermissions.indexOf(
                                            permission.id
                                        ) >= 0
                                    }
                                    name="permissions"
                                />
                            }
                            label={permission.display_name}
                        />
                    </div>
                ))}
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
