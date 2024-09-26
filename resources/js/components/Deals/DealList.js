import React from "react";
import { IconButton } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import { DataGrid } from "@material-ui/data-grid";
import { DATAGRID_LOCALE, LOCALE } from "../../constants";

export default function DealList({
    objects,
    setShowDeleteDialog,
    setShowDealDrawer,
}) {
    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        {
            field: "client.name",
            headerName: LOCALE.client,
            flex: 2,
            valueGetter: (params) => params.row.client.name,
        },
        {
            field: "pipeline_status.name",
            headerName: LOCALE.status,
            width: 130,
            valueGetter: (params) => params.row.pipeline_status.name,
        },
        {
            field: "limit_date_formatted",
            headerName: LOCALE.deadline,
            width: 150,
            valueGetter: (params) => params.row.limit_date_formatted,
            sortComparator: (v1, v2, cellParams1, cellParams2) => {
                let value1 = cellParams1.api.getRow(cellParams1.id).limit_date;
                let value2 = cellParams2.api.getRow(cellParams2.id).limit_date;
                return value1.localeCompare(value2);
            },
        },
        {
            field: "owner.name",
            headerName: LOCALE.owner,
            flex: 1,
            valueGetter: (params) => params.row.owner.name,
        },
        {
            field: "finished_status_descripion",
            headerName: LOCALE.status,
            width: 130,
        },
        {
            field: "actions",
            headerName: LOCALE.actions,
            width: 120,
            align: "center",
            renderCell: (params) => (
                <>
                    <IconButton
                        size="small"
                        className="mr-2"
                        onClick={() => {
                            setShowDealDrawer(params.id);
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

    return (
        <div style={{ height: "calc(100vh - 150px)", width: "100%" }}>
            <DataGrid
                rows={objects}
                columns={columns}
                hideFooterSelectedRowCount
                autoPageSize
                localeText={DATAGRID_LOCALE}
            />
        </div>
    );
}
