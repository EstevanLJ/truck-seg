import React, { useState } from "react";
import axios from "axios";
import { Button, Dialog, IconButton } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import { toast } from "react-toastify";

import DefaultTable from "../../DefaultTable";
import DeleteDialog from "../../DeleteDialog";
import PersonAddressForm from "./PersonAddressForm";

export default function PersonAddresses({ addresses, reload, person }) {
    const [editingObject, setEditingObject] = useState(null);
    const [deletingObject, setDeletingObject] = useState(null);

    const onEdit = (address) => {
        setEditingObject(address);
    };

    const onDelete = (address) => {
        setDeletingObject(address);
    };

    const handleDeleteDialogClose = () => {
        setDeletingObject(null);
    };

    const handleDeleteDialogConfirm = () => {
        axios
            .delete(`/api/person-addresses/${deletingObject.id}`)
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
        { id: "description", label: "Descrição" },
        { id: "district", label: "Bairro" },
        { id: "address", label: "Endereço" },
        { id: "city", label: "Cidade" },
        { id: "state", label: "UF" },
        {
            id: "main",
            label: "Principal?",
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
                <DefaultTable rows={addresses} columns={columns} />
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
                <PersonAddressForm
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
