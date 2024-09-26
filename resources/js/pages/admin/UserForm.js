import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    TextField,
    Button,
    CircularProgress,
    IconButton,
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import moment from "moment";
import "moment/locale/pt-br";
import Select from "react-select";
import { defaultUser, LOCALE } from "../../constants";

export default function UserForm(props) {
    const [object, setObject] = useState({ ...defaultUser });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        setLoading(true);

        axios.get("/api/roles").then((response) => {
            setRoles(
                response.data.data.map((role) => ({
                    value: role.id,
                    label: role.display_name,
                }))
            );
        });

        if (props.id) {
            axios
                .get(`/api/users/${props.id}`)
                .then((response) => {
                    let formData = {
                        ...defaultUser,
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
            setObject({ ...defaultUser });
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

        formData.roles = formData.roles.map((role) => role.value);

        axios({
            url: `/api/users${props.id ? `/${props.id}` : ""}`,
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
                    {props.id ? LOCALE.edit : LOCALE.add} Usuário
                </p>
                <IconButton onClick={props.onClose}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </div>

            <hr className="mb-3" />

            {props.id && (
                <div className="mb-3 grid gap-4 grid-cols-2">
                    <div>
                        <TextField
                            type="text"
                            label="ID"
                            fullWidth
                            value={object.id}
                            onChange={(e) =>
                                onChangeValue("id", e.target.value)
                            }
                            disabled
                        />
                    </div>
                    <div>
                        <TextField
                            type="text"
                            label="Último Acesso"
                            fullWidth
                            value={
                                object.last_session
                                    ? moment(
                                          object.last_session.created_at
                                      ).format("LLLL")
                                    : ""
                            }
                            onChange={(e) =>
                                onChangeValue("id", e.target.value)
                            }
                            disabled
                        />
                    </div>
                </div>
            )}

            <div className="mb-3">
                <TextField
                    type="text"
                    label="Nome"
                    fullWidth
                    value={object.name}
                    onChange={(e) => onChangeValue("name", e.target.value)}
                    error={!!errors.name}
                    helperText={errors.name && errors.name.join(" ")}
                />
            </div>

            <div className="mb-3">
                <TextField
                    type="email"
                    label="E-mail"
                    fullWidth
                    value={object.email}
                    onChange={(e) => onChangeValue("email", e.target.value)}
                    error={!!errors.email}
                    helperText={errors.email && errors.email.join(" ")}
                />
            </div>

            <div className="mb-3">
                <TextField
                    type="password"
                    label="Senha"
                    fullWidth
                    value={object.password}
                    onChange={(e) => onChangeValue("password", e.target.value)}
                    error={!!errors.password}
                    helperText={errors.password && errors.password.join(" ")}
                />
            </div>

            <div className="mb-3">
                <TextField
                    type="password"
                    label="Confirmação da senha"
                    fullWidth
                    value={object.password_confirmation}
                    onChange={(e) =>
                        onChangeValue("password_confirmation", e.target.value)
                    }
                    error={!!errors.password_confirmation}
                    helperText={
                        errors.password_confirmation &&
                        errors.password_confirmation.join(" ")
                    }
                />
            </div>

            <div>
                <div className="mb-3">
                    <label className="block mb-2">Grupos</label>
                    <Select
                        placeholder={"Grupos"}
                        value={object.roles}
                        onChange={(e) => onChangeValue("roles", e)}
                        options={roles}
                        isMulti
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
