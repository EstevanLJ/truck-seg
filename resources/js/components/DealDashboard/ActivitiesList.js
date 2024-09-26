import React from "react";
import Activity from "./Activity";

export default function ActivitiesList({ activities, reload, onEdit, onDelete }) {
    return (
        <div>
            {activities.map((activity, index) => (
                <Activity
                    key={activity.id}
                    activity={activity}
                    reload={reload}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}
