import { Button, ButtonGroup } from "@material-ui/core";
import React, { useState } from "react";
import ActivitiesList from "../components/ActivitiesList";
import CalendarPage from "../components/Calendar/CalendarPage";

export default function ActivitiesPage() {
    const [mode, setMode] = React.useState("calendar");

    return (
        <div className="p-3">
            <div className="mb-3">
                <ButtonGroup variant="contained" color="primary">
                    <Button
                        color={`${
                            mode === "calendar" ? "secondary" : "default"
                        }`}
                        onClick={() => setMode("calendar")}
                    >
                        <span className="far fa-calendar"></span>
                    </Button>
                    <Button
                        color={`${mode === "list" ? "secondary" : "default"}`}
                        onClick={() => setMode("list")}
                    >
                        <span className="far fa-list"></span>
                    </Button>
                </ButtonGroup>
            </div>

            <div>
                {mode === "calendar" && <CalendarPage />}
                {mode === "list" && <ActivitiesList />}
            </div>
        </div>
    );
}
