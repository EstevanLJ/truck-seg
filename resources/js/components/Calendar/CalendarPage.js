import { Button, Dialog } from "@material-ui/core";
import moment from "moment";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Calendar, { getRows } from "./Calendar";
import ActivityForm from "../DealDashboard/ActivityForm";

export default function CalendarPage() {
    const [editingObject, setEditingObject] = useState(null);
    const [rows, setRows] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [mode, setMode] = React.useState("month");
    const [currentDate, setCurrentDate] = React.useState(
        moment().format("YYYY-MM")
    );

    const handleSelect = (activity) => {
        setEditingObject(activity);
    };

    const handleFormSuccess = () => {
        toast.success("Atividade atualizada!");
        setEditingObject(null);
        load(mode, currentDate);
    };

    const load = (mode, currentDate) => {
        (async () => {
            setLoading(true);
            setRows(await getRows(mode, currentDate));
            setLoading(false);
        })();
    };

    return (
        <div>
            <Calendar
                onSelect={handleSelect}
                load={load}
                loading={loading}
                rows={rows}
                mode={mode}
                setMode={setMode}
                currentDate={currentDate}
                setCurrentDate={setCurrentDate}
            >
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => setEditingObject({ id: null })}
                >
                    Add
                </Button>
            </Calendar>

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
        </div>
    );
}
