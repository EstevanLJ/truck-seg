import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Button,
    CircularProgress,
    Dialog,
    IconButton,
} from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { Delete, Edit } from "@material-ui/icons";
import { toast } from "react-toastify";

import { DATAGRID_LOCALE } from "../constants";
import { DefaultAutocomplete } from "./inputs/DefaultSelect";
import ActivityForm from "./DealDashboard/ActivityForm";
import DeleteDialog from "./DeleteDialog";

export default function ActivitiesList() {
    const [rows, setRows] = React.useState([]);
    const [loading, setLoading] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingObject, setEditingObject] = useState(null);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [filters, setFilters] = useState({
        type: 1,
    });
    const [types, setTypes] = useState([]);

    useEffect(() => {
        axios.get("/api/activity-types").then((response) => {
            setTypes(
                response.data.data.map((item) => ({
                    value: `${item.id}`,
                    label: item.name,
                }))
            );
        });
    }, []);

    const handleDeleteDialogClose = () => setShowDeleteDialog(false);

    const handleDeleteDialogConfirm = () => {
        setLoading(true);
        axios
            .delete(`/api/activities/${showDeleteDialog}`)
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

    const onChangeValue = (field, value) => {
        let clone = Object.assign({}, filters);
        clone[field] = value;
        setFilters(clone);
    };

    const handleFormSuccess = () => {
        setEditingObject(null);
        setShowEditModal(false);
        reload();
    };

    useEffect(() => {
        reload();
    }, [filters]);

    const reload = () => {
        setLoading(true);

        let params = {};

        if (filters.activity_type_id) {
            params.activity_type_id = filters.activity_type_id.value;
        }

        axios
            .get(`/api/activities`, {
                params,
            })
            .then((response) => {
                setRows(response.data.data);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const columns = [
        {
            field: "type.name",
            headerName: "Tipo",
            width: 140,
            renderCell: (params) => (
                <div className="MuiDataGrid-cell MuiDataGrid-cell--textLeft">
                    <span className={params.row.type.icon}></span>{" "}
                    <span>{params.row.type.name}</span>
                </div>
            ),
        },
        { field: "title", headerName: "Título", flex: 1 },
        {
            field: "date",
            headerName: "Data",
            width: 200,
            valueGetter: (params) => params.row.date_formatted + (params.row.time_from ? ' ' + params.row.time_from : ''),
            sortComparator: (v1, v2, cellParams1, cellParams2) => {
                let value1 = cellParams1.api.getRow(cellParams1.id).date;
                let value2 = cellParams2.api.getRow(cellParams2.id).date;
                return value1.localeCompare(value2);
            },
        },
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
            <div style={{ height: "calc(100vh - 200px)", width: "100%" }}>
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
        <div>
            <div className="mb-3 grid grid-cols-5 gap-4 items-center">
                <div className="">
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => setEditingObject({ id: null })}
                    >
                        Add
                    </Button>
                </div>
                <DefaultAutocomplete
                    label="Tipo da Atividade"
                    name="activity_type_id"
                    value={filters.activity_type_id}
                    onChangeValue={onChangeValue}
                    options={types}
                />
            </div>

            {loading && (
                <div className="flex justify-center my-5">
                    <CircularProgress color="secondary" />
                </div>
            )}

            {renderTable()}

            <Dialog
                open={!!editingObject}
                onClose={() => setEditingObject(null)}
                maxWidth={"md"}
                fullWidth
            >
                <ActivityForm
                    id={editingObject ? editingObject.id : null}
                    onClose={() => setEditingObject(null)}
                    onSuccess={handleFormSuccess}
                />
            </Dialog>

            <DeleteDialog
                show={!!showDeleteDialog}
                onClose={handleDeleteDialogClose}
                onConfirm={handleDeleteDialogConfirm}
            />
        </div>
    );
}
