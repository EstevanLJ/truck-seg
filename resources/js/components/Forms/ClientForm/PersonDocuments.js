import React, { useState } from "react";
import axios from "axios";
import { Button, Dialog, IconButton } from "@material-ui/core";
import { CloudDownload, Delete, Edit } from "@material-ui/icons";
import { toast } from "react-toastify";

import DefaultTable from "../../DefaultTable";
import DeleteDialog from "../../DeleteDialog";
import PersonDocumentForm from "./PersonDocumentForm";

export default function PersonDocuments({ documents, reload, person }) {
    const [editingObject, setEditingObject] = useState(null);
    const [deletingObject, setDeletingObject] = useState(null);

    const onDownload = (document) => {
        window.open(`/documents/${document.uuid}/download`, '_blank')
    };

    const onEdit = (document) => {
        setEditingObject(document);
    };

    const onDelete = (document) => {
        setDeletingObject(document);
    };

    const handleDeleteDialogClose = () => {
        setDeletingObject(null);
    };

    const handleDeleteDialogConfirm = () => {
        axios
            .delete(`/api/person-documents/${deletingObject.id}`)
            .then((response) => {
                toast.success(`Registro removido`);
                setDeletingObject(null);
                reload();
            })
            .catch((error) => {
                toast.warning("Não foi possível remover");
            });
    };

    const handleFormSuccess = () => {
        toast.success(`Registro salvo!`);
        setEditingObject(null);
        reload();
    };

    const columns = [
        { id: "name", label: "Nome" },
        { id: "observation", label: "Observação" },
        { id: "size", label: "Tamanho" },
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
                    >
                        <CloudDownload fontSize="small" onClick={() => onDownload(row)} />
                    </IconButton>
                    {/* <IconButton
                        size="small"
                        className="mr-2"
                        onClick={() => onEdit(row)}
                    >
                        <Edit fontSize="small" />
                    </IconButton> */}
                    <IconButton size="small" onClick={() => onDelete(row)}>
                        <Delete fontSize="small" />
                    </IconButton>
                </>
            ),
        },
    ];

    const renderTable = () => {
        return (
            <div className="mt-3">
                <DefaultTable rows={documents} columns={columns} />
            </div>
        );
    };

    return (
        <div>
            {renderTable()}

            <div className="mt-3">
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => setEditingObject({ id: null })}
                >
                    {LOCALE.loading}
                </Button>
            </div>

            <Dialog
                open={!!editingObject}
                onClose={() => setEditingObject(null)}
                maxWidth={"md"}
                fullWidth
            >
                <PersonDocumentForm
                    personId={person.id}
                    id={editingObject ? editingObject.id : null}
                    onClose={() => setEditingObject(null)}
                    onSuccess={handleFormSuccess}
                />
            </Dialog>

            <DeleteDialog
                show={!!deletingObject}
                onClose={handleDeleteDialogClose}
                onConfirm={handleDeleteDialogConfirm}
            />
        </div>
    );
}
