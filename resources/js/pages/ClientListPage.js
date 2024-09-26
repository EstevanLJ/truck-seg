import React, { useEffect, useState } from "react";
import {
    Button,
    CircularProgress,
    Drawer,
    IconButton,
} from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { Delete, Edit } from "@material-ui/icons";
import axios from "axios";
import { Close as CloseIcon } from "@material-ui/icons";
import { toast } from "react-toastify";

import DefaultTable from "../components/DefaultTable";
import DeleteDialog from "../components/DeleteDialog";
import ClientForm from "../components/Forms/ClientForm/ClientForm";
import CreateClientForm from "../components/Forms/ClientForm/CreateClientForm";
import { DATAGRID_LOCALE, LOCALE } from "../constants";

export default function ClientListPage() {
    const [rows, setRows] = React.useState([]);
    const [loading, setLoading] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingObject, setEditingObject] = useState(null);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const handleDeleteDialogClose = () => setShowDeleteDialog(false);

    const handleDeleteDialogConfirm = () => {
        setLoading(true);
        axios
            .delete(`/api/people/${showDeleteDialog}`)
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

    const handleFormSuccess = () => {
        setEditingObject(null);
        setShowCreateModal(false);
        setShowEditModal(false);
        reload();
    };

    useEffect(() => {
        reload();
    }, []);

    const reload = () => {
        setLoading(true);
        axios
            .get("/api/people")
            .then((response) => {
                setRows(response.data.data);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        { field: "formated_document", headerName: "Documento", flex: 1 },
        { field: "name", headerName: "Nome", flex: 1 },
        { field: "type_description", headerName: "Tipo", flex: 1 },
        { field: "email", headerName: "E-mail", flex: 1 },
        { field: "phone", headerName: "Telefone", flex: 1 },
        {
            field: "actions",
            headerName: "Ações",
            width: 150,
            align: "center",
            renderCell: (params) => (
                <>
                    <IconButton
                        size="small"
                        className="mr-2"
                        onClick={() => {
                            setShowEditModal(true);
                            setEditingObject(params);
                        }}
                    >
                        <Edit fontSize="small" />
                    </IconButton>
                    <IconButton
                        size="small"
                        onClick={() => setShowDeleteDialog(params.id)}
                    >
                        <Delete fontSize="small" />
                    </IconButton>
                </>
            ),
        },
    ];

    const renderTable = () => {
        if (loading) return null;

        return (
            <div style={{ height: "calc(100vh - 150px)", width: "100%" }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    hideFooterSelectedRowCount
                    autoPageSize
                    localeText={DATAGRID_LOCALE}
                />
            </div>
        );
    };

    return (
        <div className="p-3">
            <div className="mb-3">
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => setShowCreateModal(true)}
                >
                    {LOCALE.add}
                </Button>
            </div>

            {loading && (
                <div className="flex justify-center my-5">
                    <CircularProgress color="secondary" />
                </div>
            )}

            {renderTable()}

            <Drawer
                anchor="right"
                open={showEditModal}
                onClose={() => setShowEditModal(false)}
            >
                <div className="w-screen sm:w-3/4-screen 2xl:w-1/2-screen">
                    <div className="px-4 py-2 flex justify-between items-center">
                        <p className="font-bold">
                            {editingObject && editingObject.id
                                ? "Editar"
                                : "Adicionar"}{" "}
                            Cliente
                        </p>
                        <IconButton onClick={() => setShowEditModal(false)}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </div>
                    <ClientForm
                        id={editingObject ? editingObject.id : null}
                        onSuccess={handleFormSuccess}
                    />
                </div>
            </Drawer>

            <Drawer
                anchor="right"
                open={showCreateModal}
                onClose={() => setShowCreateModal(false)}
            >
                <div className="w-screen sm:w-3/4-screen 2xl:w-1/2-screen">
                    <div className="px-4 py-2 flex justify-between items-center">
                        <p className="font-bold">Adicionar Cliente</p>
                        <IconButton onClick={() => setShowCreateModal(false)}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </div>
                    <CreateClientForm
                        onSuccess={handleFormSuccess}
                        onClose={() => setShowCreateModal(false)}
                    />
                </div>
            </Drawer>

            <DeleteDialog
                show={!!showDeleteDialog}
                onClose={handleDeleteDialogClose}
                onConfirm={handleDeleteDialogConfirm}
            />
        </div>
    );
}
