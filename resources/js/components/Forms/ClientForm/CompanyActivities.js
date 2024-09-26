import React, { useState } from "react";
import axios from "axios";
import { Button, Dialog, IconButton } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import { toast } from "react-toastify";

import DefaultTable from "../../DefaultTable";
import DeleteDialog from "../../DeleteDialog";
import CompanyEmployeeForm from "./CompanyEmployeeForm";
import CompanyActivityForm from "./CompanyActivityForm";

export default function CompanyActivities({ activities, reload, person }) {
    const [editingObject, setEditingObject] = useState(null);
    const [deletingObject, setDeletingObject] = useState(null);

    const onEdit = (activity) => {
        setEditingObject(activity);
    };

    const onDelete = (activity) => {
        setDeletingObject(activity);
    };

    const handleDeleteDialogClose = () => {
        setDeletingObject(null);
    };

    const handleDeleteDialogConfirm = () => {
        axios
            .delete(`/api/company-activities/${deletingObject.id}`)
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
        { id: "code", label: "Código" },
        { id: "description", label: "Descrição" },
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
                        onClick={() => onEdit(row)}
                    >
                        <Edit fontSize="small" />
                    </IconButton>
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
                <DefaultTable rows={activities} columns={columns} />
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
                    Add
                </Button>
            </div>

            <Dialog
                open={!!editingObject}
                onClose={() => setEditingObject(null)}
                maxWidth={"md"}
                fullWidth
            >
                <CompanyActivityForm
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
