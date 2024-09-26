import { IconButton } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import { LOCALE } from "../../constants";

export default function Activity({ activity, reload, onEdit, onDelete }) {
    const handleDone = (activity, done) => {
        axios
            .patch(`/api/activities/${activity.id}/change-status`, {
                done: done,
            })
            .then((response) => {
                toast.success(LOCALE.activity ` ${done ? LOCALE.done : LOCALE.reopen}!`);
                reload();
            })
            .catch((error) => {
                toast.warning("Não foi possível atualizar a atividade");
            });
    };

    return (
        <div className="flex items-center border-b py-3">
            <div className="bg-gray-300 text-white rounded-full h-8 w-8 justify-center items-center flex" title={activity.type.name}>
                <span
                    className={activity.type.icon}
                ></span>
            </div>

            <div className="flex-1 px-3">
                <div className="flex items-center mb-1 flex-wrap">
                    <p
                        className={`text-lg mr-4 ${
                            activity.done_at ? "line-through" : "font-bold"
                        }`}
                    >
                        {activity.title}
                    </p>
                    <p className="text-gray-500 text-sm mr-4">
                        <span className="far fa-user"></span>{" "}
                        {activity.assigned_to.name}
                    </p>
                    <p className="text-gray-500 text-sm mr-4">
                        <span className="far fa-calendar"></span>{" "}
                        {activity.date_formatted}
                    </p>
                    {activity.time_from && (
                        <p className="text-gray-500 text-sm mr-4">
                            <span className="far fa-clock"></span>{" "}
                            <span>{activity.time_from_formatted}</span>
                            {activity.time_to && (
                                <span>{" - "}{activity.time_to_formatted}</span>
                            )}
                        </p>
                    )}
                    {activity.done_at && (
                        <p className="text-gray-500 text-sm">
                            <span className="far fa-check"></span>{" "}
                            {activity.done_at_formatted}
                        </p>
                    )}
                </div>
                <p className="text-gray-500 text-sm">{activity.description}</p>
            </div>

            <div>
                {activity.done_at ? (
                    <IconButton
                        title={LOCALE.reopen}
                        onClick={() => handleDone(activity, 0)}
                        className="mr-3"
                        size="small"
                    >
                        <span className="far fa-undo"></span>
                    </IconButton>
                ) : (
                    <IconButton
                        title={LOCALE.finish}
                        onClick={() => handleDone(activity, 1)}
                        className="mr-3"
                        size="small"
                    >
                        <span className="far fa-check"></span>
                    </IconButton>
                )}
                <IconButton
                    title={LOCALE.edit}
                    onClick={() => onEdit(activity)}
                    className="mr-3"
                    size="small"
                >
                    <span className="far fa-edit"></span>
                </IconButton>
                <IconButton
                    title={LOCALE.remove}
                    onClick={() => onDelete(activity)}
                    className=""
                    size="small"
                >
                    <span className="far fa-trash"></span>
                </IconButton>
            </div>
        </div>
    );
}
