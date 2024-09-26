import React, { useEffect, useState } from "react";
import {
    Button,
    CircularProgress,
    Drawer,
    IconButton,
} from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import axios from "axios";
import { toast } from "react-toastify";

import DefaultTable from "../../components/DefaultTable";
import DeleteDialog from "../../components/DeleteDialog";
import QuotationTypeForm from "./QuotationTypeForm";
import { LOCALE } from "../../constants";

export default function QuotationTypeList() {
    const [rows, setRows] = React.useState([]);
    const [loading, setLoading] = useState(false);
    const [editingObject, setEditingObject] = useState(null);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const handleDeleteDialogClose = () => setShowDeleteDialog(false);

    const handleDeleteDialogConfirm = () => {
        setLoading(true);
        axios
            .delete(`/api/quotation-types/${showDeleteDialog}`)
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
            .get("/api/quotation-types?all=1")
            .then((response) => {
                setRows(response.data.data);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const columns = [
        { id: "icon", label: "Ícone", format: (value) => <span className={value}></span>},
        { id: "name", label: "Nome"},
        { id: "active", label: "Ativo?", format: (value) => value ? 'Sim' : 'Não'},
        {
            id: "actions",
            label: "Ações",
            minWidth: 150,
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
                <QuotationTypeForm
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
