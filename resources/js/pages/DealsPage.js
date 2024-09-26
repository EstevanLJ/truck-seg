import axios from "axios";
import {
    Button,
    Drawer,
    IconButton,
    ButtonGroup,
    CircularProgress,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Close } from "@material-ui/icons";

import { LOCALE } from "../constants";

import DealForm from "./DealForm";
import DealDashboard from "../components/DealDashboard/DealDashboard";
import Kanban from "../components/Deals/Kanban";
import DealList from "../components/Deals/DealList";
import DeleteDialog from "../components/DeleteDialog";

export default function DealsPage() {
    const [mode, setMode] = React.useState("kanban");
    const [showDealForm, setShowDealForm] = useState(false);
    const [showDealDrawer, setShowDealDrawer] = useState(null);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [loading, setLoading] = useState(true);
    const [objects, setObjects] = useState([]);

    useEffect(() => {
        setLoading(true);
        reload();
    }, [mode]);

    const reload = () => {

        if (mode === "list") {
            axios
                .get("/api/deals?all=1")
                .then((response) => {
                    setObjects(response.data.data);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            axios
                .all([axios.get("/api/pipelines/1"), axios.get("/api/deals")])
                .then(
                    axios.spread((pipelinesResponse, dealsResponse) => {
                        let temp = [].concat(
                            pipelinesResponse.data.data.statuses
                        );
                        let deals = dealsResponse.data.data;

                        for (let i = 0; i < temp.length; i++) {
                            temp[i].deals = deals.filter(
                                (deal) => deal.pipeline_status_id == temp[i].id
                            );
                        }

                        setObjects(temp);
                        setLoading(false);
                    })
                );
        }
    };

    const handleDeleteDialogClose = () => setShowDeleteDialog(false);

    const handleDeleteDialogConfirm = () => {
        setLoading(true);
        axios
            .delete(`/api/deals/${showDeleteDialog}`)
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
        toast.success("Negociação criada!");
        setShowDealForm(false);
        reload();
    };

    return (
        <div className="p-3">
            <div className="mb-3 flex items-center">
                <ButtonGroup variant="contained" color="primary">
                    <Button
                        color={`${mode === "kanban" ? "secondary" : "default"}`}
                        onClick={() => setMode("kanban")}
                    >
                        <span className="far fa-columns mr-1"></span>
                        <span>{LOCALE.board}</span>
                    </Button>
                    <Button
                        color={`${mode === "list" ? "secondary" : "default"}`}
                        onClick={() => setMode("list")}
                    >
                        <span className="far fa-list mr-1"></span>
                        <span>{LOCALE.list}</span>
                    </Button>
                </ButtonGroup>

                <div className="ml-3">
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => setShowDealForm(true)}
                    >
                        {LOCALE.add}
                    </Button>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center my-5">
                    {LOCALE.loading}
                </div>
            ) : (
                <div>
                    {mode === "kanban" && (
                        <Kanban
                            cols={objects.length}
                            objects={objects}
                            setShowDealDrawer={setShowDealDrawer}
                            reload={reload}
                        />
                    )}
                    {mode === "list" && (
                        <DealList
                            objects={objects}
                            setShowDealDrawer={setShowDealDrawer}
                            setShowDeleteDialog={setShowDeleteDialog}
                        />
                    )}
                </div>
            )}


            <Drawer
                anchor="right"
                open={!!showDealDrawer}
                onClose={() => setShowDealDrawer(false)}
            >
                <div className="w-screen md:w-3/4-screen">
                    <div className="px-4 py-2 flex justify-between items-center">
                        <p className="font-bold">{LOCALE.deal}</p>
                        <IconButton onClick={() => setShowDealDrawer(false)}>
                            <Close fontSize="small" />
                        </IconButton>
                    </div>
                    {showDealDrawer && <DealDashboard id={showDealDrawer} />}
                </div>
            </Drawer>

            <Drawer
                anchor="right"
                open={showDealForm}
                onClose={() => setShowDealForm(false)}
            >
                <div className="w-screen md:w-3/4-screen">
                    <div className="px-4 py-2 flex justify-between items-center">
                        <p className="font-bold">{LOCALE.add} {LOCALE.deal}</p>
                        <IconButton onClick={() => setShowDealForm(false)}>
                            <Close fontSize="small" />
                        </IconButton>
                    </div>
                    <DealForm
                        onClose={() => setShowDealForm(false)}
                        onSuccess={handleFormSuccess}
                    />
                </div>
            </Drawer>

            <DeleteDialog
                show={!!showDeleteDialog}
                onClose={handleDeleteDialogClose}
                onConfirm={handleDeleteDialogConfirm}
            />
        </div>
    );
}
