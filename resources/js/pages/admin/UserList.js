import React, { useEffect, useState } from "react";
import {
    Button,
    CircularProgress,
    Drawer,
    IconButton,
} from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import DefaultTable from "../../components/DefaultTable";
import axios from "axios";
import UserForm from "./UserForm";
import { toast } from "react-toastify";
import DeleteDialog from "../../components/DeleteDialog";
import { LOCALE } from "../../constants";

export default function UserList() {
    const [rows, setRows] = React.useState([]);
    const [loading, setLoading] = useState(false);
    const [editingObject, setEditingObject] = useState(null);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const handleDeleteDialogClose = () => setShowDeleteDialog(false);

    const handleDeleteDialogConfirm = () => {
        setLoading(true);
        axios
            .delete(`/api/users/${showDeleteDialog}`)
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
        reload();
    };

    useEffect(() => {
        reload();
    }, []);

    const reload = () => {
        setLoading(true);
        axios
            .get("/api/users")
            .then((response) => {
                setRows(response.data.data);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const columns = [
        { id: "id", label: "ID", maxWidth: 70 },
        { id: "name", label: "Nome" },
        { id: "email", label: "E-mail" },
        { id: "roles_name", label: "Grupos" },
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

    const renderTable = () => {
        if (loading) return null;

        return <DefaultTable rows={rows} columns={columns} />;
    };

    return (
        <div>
            <div className="p-3">
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => setEditingObject({ id: null })}
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
                open={!!editingObject}
                onClose={() => setEditingObject(null)}
            >
                <UserForm
                    id={editingObject ? editingObject.id : null}
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
