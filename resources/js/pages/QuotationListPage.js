import React, { useEffect, useState } from "react";
import {
    Button,
    CircularProgress,
    Drawer,
    IconButton,
} from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { Edit } from "@material-ui/icons";
import axios from "axios";
import { Close as CloseIcon } from "@material-ui/icons";

import { DATAGRID_LOCALE, quotationStatusesList } from "../constants";
import QuotationForm from "../components/Forms/QuotationForm/QuotationForm";
import {
    DefaultAutocomplete,
    DefaultSelect,
    DefaultSelectSearch,
} from "../components/inputs/DefaultSelect";

export default function QuotationListPage() {
    const [rows, setRows] = React.useState([]);
    const [loading, setLoading] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingObject, setEditingObject] = useState(null);
    const [filters, setFilters] = useState({
        status: "-1",
        type: 1,
        assigned_to: "",
        client_id: "",
    });
    const [users, setUsers] = useState([]);
    const [clients, setClients] = useState([]);

    useEffect(() => {
        axios.get("/api/users").then((response) => {
            setUsers(
                response.data.data.map((item) => ({
                    value: `${item.id}`,
                    label: item.name,
                }))
            );
        });
        axios.get("/api/people").then((response) => {
            setClients(
                response.data.data.map((item) => ({
                    value: `${item.id}`,
                    label: item.name,
                }))
            );
        });
    }, []);

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

        let params = {
            status: filters.status,
        };

        if (filters.client_id) {
            params.client_id = filters.client_id.value;
        }

        if (filters.assigned_to) {
            params.assigned_to = filters.assigned_to.value;
        }

        axios
            .get(`/api/quotations`, {
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
        { field: "id", headerName: "ID", width: 90 },
        { field: "name", headerName: "Nome", flex: 1 },
        { field: "status_description", headerName: "Status", flex: 1 },
        {
            field: "client.name",
            headerName: "Cliente",
            flex: 1,
            valueGetter: (params) => params.row.client.name,
        },
        {
            field: "type.name",
            headerName: "Tipo",
            hide: true,
            flex: 1,
            valueGetter: (params) => params.row.type.name,
        },
        {
            field: "assigned_to.name",
            headerName: "Atendente",
            flex: 1,
            valueGetter: (params) =>
                params.row.assigned_to ? params.row.assigned_to.name : "",
        },
        {
            field: "due_to",
            headerName: "Data Limite",
            flex: 1,
            valueGetter: (params) => params.row.due_to_formatted,
            sortComparator: (v1, v2, cellParams1, cellParams2) => {
                let value1 = cellParams1.api.getRow(cellParams1.id).due_to;
                let value2 = cellParams2.api.getRow(cellParams2.id).due_to;
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
            <div className="mb-3 grid grid-cols-5 gap-4">
                <DefaultSelect
                    label="Status da Cotação"
                    name="status"
                    value={filters.status}
                    onChangeValue={onChangeValue}
                    options={quotationStatusesList}
                />
                <DefaultAutocomplete
                    label="Cliente"
                    name="client_id"
                    value={filters.client_id}
                    onChangeValue={onChangeValue}
                    options={clients}
                />
                <DefaultAutocomplete
                    label="Atendente"
                    name="assigned_to"
                    value={filters.assigned_to}
                    onChangeValue={onChangeValue}
                    options={users}
                />
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
                            Cotação
                        </p>
                        <IconButton onClick={() => setShowEditModal(false)}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </div>
                    <QuotationForm
                        id={editingObject ? editingObject.id : null}
                        onSuccess={handleFormSuccess}
                    />
                </div>
            </Drawer>
        </div>
    );
}
