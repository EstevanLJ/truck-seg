import React, { useState } from "react";
import axios from "axios";
import { Button, Dialog, IconButton } from "@material-ui/core";
import { CloudDownload, Delete, Edit } from "@material-ui/icons";
import { toast } from "react-toastify";

import DefaultTable from "../../DefaultTable";
import DeleteDialog from "../../DeleteDialog";
import QuotationDocumentForm from "./QuotationDocumentForm";
import { LOCALE } from "../../../constants";

export default function QuotationDocuments({ documents, reload, quotation }) {
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
            .delete(`/api/quotation-documents/${deletingObject.id}`)
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
        { id: "name", label: LOCALE.name },
        { id: "observation", label: LOCALE.observation },
        { id: "size", label: LOCALE.size },
        {
            id: "actions",
            label: LOCALE.actions,
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
                    {LOCALE.add}
                </Button>
            </div>

            <Dialog
                open={!!editingObject}
                onClose={() => setEditingObject(null)}
                maxWidth={"md"}
                fullWidth
            >
                <QuotationDocumentForm
                    quotationId={quotation.id}
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
