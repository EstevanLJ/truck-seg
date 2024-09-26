import React, { useEffect, useState } from "react";
import {
    Button,
    CircularProgress,
    IconButton,
} from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import DefaultTable from "../../components/DefaultTable";
import axios from "axios";
import { toast } from "react-toastify";
import DeleteDialog from "../../components/DeleteDialog";
import { useHistory } from "react-router-dom";
import { LOCALE } from "../../constants";

export default function PipelineList() {
    const [rows, setRows] = React.useState([]);
    const [loading, setLoading] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const history = useHistory();

    const handleDeleteDialogClose = () => setShowDeleteDialog(false);

    const handleDeleteDialogConfirm = () => {
        setLoading(true);
        axios
            .delete(`/api/pipelines/${showDeleteDialog}`)
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
    }, []);

    const reload = () => {
        setLoading(true);
        axios
            .get("/api/pipelines")
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
                        onClick={() => history.push(`/pipelines/${row.id}`)}
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
                    onClick={() => history.push('/pipelines/create')}
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

            <DeleteDialog
                show={!!showDeleteDialog}
                onClose={handleDeleteDialogClose}
                onConfirm={handleDeleteDialogConfirm}
            />
        </div>
    );
}
