import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    Button,
    CircularProgress,
    IconButton,
    Drawer,
} from "@material-ui/core";
import { defaultPipeline, LOCALE } from "../../constants";
import DefaultInput from "../../components/inputs/DefaultInput";
import { toast } from "react-toastify";
import { useHistory, useParams } from "react-router-dom";
import DefaultTable from "../../components/DefaultTable";
import { Delete, Edit } from "@material-ui/icons";
import PipelineStatusForm from "./PipelineStatusForm";
import DefaultFormHeader from "../../components/DefaultFormHeader";
import DeleteDialog from "../../components/DeleteDialog";

export default function PipelineForm() {
    const [object, setObject] = useState({ ...defaultPipeline });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [editingObject, setEditingObject] = useState(null);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const history = useHistory();
    let { id } = useParams();

    const handleDeleteDialogClose = () => setShowDeleteDialog(false);

    const handleDeleteDialogConfirm = () => {
        setLoading(true);
        axios
            .delete(`/api/pipeline-statuses/${showDeleteDialog}`)
            .then((response) => {
                toast.success(`Registro removido`);
                reload();
            })
            .catch(() => {
                toast.warning(`Falha ao remover registro!`);
            })
            .finally(() => {
                setShowDeleteDialog(false);
                setLoading(false);
            });
    };

    useEffect(() => {
        reload();
    }, [id]);

    const reload = () => {
        setLoading(true);

        if (id) {
            axios
                .get(`/api/pipelines/${id}`)
                .then((response) => {
                    let formData = {
                        ...defaultPipeline,
                        ...response.data.data,
                    };

                    setObject(formData);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
            setObject({ ...defaultPipeline });
        }
    };

    const handleFormSuccess = () => {
        setEditingObject(null);
        reload();
    };

    const onBack = () => {
        history.push("/pipelines");
    };

    const onChangeValue = (field, value) => {
        let clone = Object.assign({}, object);
        clone[field] = value;
        setObject(clone);
    };

    const handleSave = () => {
        setLoading(true);

        let formData = { ...object };

        axios({
            url: `/api/pipelines${id ? `/${id}` : ""}`,
            method: id ? "PUT" : "POST",
            data: formData,
        })
            .then((response) => {
                toast.success(`Registro ${id ? "atualizado" : "criado"}`);

                if (id) {
                    history.push("/pipelines");
                } else {
                    history.push(`/pipelines/${response.data.data.id}`);
                }

                setLoading(false);
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

    const columns = [
        { id: "id", label: "ID", maxWidth: 70 },
        { id: "name", label: "Nome" },
        { id: "order", label: "Ordem" },
        { id: "days_to_notify", label: "Dias para notificar" },
        {
            id: "can_win",
            label: "Pode Ganhar?",
            format: (value) => (value ? "Sim" : "Não"),
        },
        {
            id: "actions",
            label: "Ações",
            maxWidth: 150,
            align: "center",
            format: (value, row) => (
                <>
                    <IconButton
                        size="small"
                        className="mr-2"
                        onClick={() => setEditingObject(row)}
                    >
                        <Edit fontSize="small" />
                    </IconButton>
                    <IconButton
                        size="small"
                        onClick={() => setShowDeleteDialog(row.id)}
                    >
                        <Delete fontSize="small" />
                    </IconButton>
                </>
            ),
        },
    ];

    if (loading) {
        return (
            <div className="p-3">
                <div className="flex justify-center my-5">
                    <CircularProgress color="secondary" />
                </div>
            </div>
        );
    }

    return (
        <div className="p-3">
            {id && (
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
                        label="Descrição"
                        name="description"
                        value={object.description}
                        onChangeValue={onChangeValue}
                        errors={errors}
                    />
                </div>
            </div>

            {id && object.statuses && (
                <>
                    <div className="flex justify-between items-center">
                        <p className="font-bold my-3">Status</p>
                        <Button
                            type="button"
                            variant="contained"
                            color="secondary"
                            onClick={() => setEditingObject({ id: null })}
                        >
                            {LOCALE.add}
                        </Button>
                    </div>
                    <DefaultTable rows={object.statuses} columns={columns} />
                </>
            )}

            <div className="my-3" />

            <div className="flex justify-between items-center">
                <Button
                    type="button"
                    variant="contained"
                    color="secondary"
                    onClick={handleSave}
                >
                    Salvar
                </Button>
                <Button type="button" variant="contained" onClick={onBack}>
                    Voltar
                </Button>
            </div>

            <Drawer
                anchor="right"
                open={!!editingObject}
                onClose={() => setEditingObject(null)}
            >
                <PipelineStatusForm
                    id={editingObject ? editingObject.id : null}
                    pipelineId={id}
                    onClose={() => setEditingObject(null)}
                    onSuccess={handleFormSuccess}
                />
            </Drawer>

            <DeleteDialog
                show={!!showDeleteDialog}
                onClose={handleDeleteDialogClose}
                onConfirm={handleDeleteDialogConfirm}
            />
        </div>
    );
}
