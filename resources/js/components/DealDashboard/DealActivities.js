import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Drawer,
} from "@material-ui/core";
import axios from "axios";
import React, { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { DangerTextButton } from "../DangerButton";
import DeleteDialog from "../DeleteDialog";
import ActivitiesList from "./ActivitiesList";
import ActivityForm from "./ActivityForm";
import { LOCALE } from "../../constants";

export default function DealActivities({ activities, reload, deal }) {
    const [editingObject, setEditingObject] = useState(null);
    const [deletingObject, setDeletingObject] = useState(null);

    const done = useMemo(() => {
        return activities.filter((activity) => activity.done_at);
    }, [activities]);

    const open = useMemo(() => {
        return activities.filter((activity) => !activity.done_at);
    }, [activities]);

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
            .delete(`/api/activities/${deletingObject.pivot.id}`)
            .then((response) => {
                toast.success(`Atividade removida`);
                setDeletingObject(null);
                reload();
            })
            .catch((error) => {
                toast.warning("Não foi possível remover a atividade");
            });
    };

    const handleFormSuccess = () => {
        toast.success(`Atividade registrada!`);
        setEditingObject(null);
        reload();
    };

    return (
        <div>
            <Button
                variant="contained"
                color="secondary"
                onClick={() => setEditingObject({ id: null })}
            >
                {LOCALE.add}
            </Button>

            {open.length == 0 && done.length == 0 && (
                <div className="flex justify-center items-center mb-5">
                    <div className="rounded-full text-sm py-1 px-6 bg-gray-400 text-white text-center">
                        {LOCALE.no_activities}
                    </div>
                </div>
            )}

            {open.length > 0 && (
                <>
                    <div className="flex justify-center items-center mb-5">
                        <div className="rounded-full text-sm py-1 px-6 bg-gray-400 text-white text-center">
                            {LOCALE.next_activities}
                        </div>
                    </div>
                    <ActivitiesList
                        activities={open}
                        reload={reload}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                </>
            )}

            {done.length > 0 && (
                <>
                    <div className="flex justify-center items-center my-5">
                        <div className="rounded-full text-sm py-1 px-6 bg-gray-400 text-white text-center">
                            {LOCALE.finished_activities}
                        </div>
                    </div>
                    <ActivitiesList
                        activities={done}
                        reload={reload}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                </>
            )}

            <Dialog
                open={!!editingObject}
                onClose={() => setEditingObject(null)}
                maxWidth={"md"}
                fullWidth
            >
                <ActivityForm
                    dealId={deal.id}
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
