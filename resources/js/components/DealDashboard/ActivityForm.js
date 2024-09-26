import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    Button,
    CircularProgress,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@material-ui/core";
import { DatePicker, TimePicker } from "@material-ui/pickers";

import { defaultActivity, yesOrNoOptions, LOCALE } from "../../constants";
import DefaultInput from "../inputs/DefaultInput";
import { DefaultSelect } from "../inputs/DefaultSelect";
import DefaultRadio from "../inputs/DefaultRadio";
import { getDateFromDateString, getDateFromTimeString } from "../../utils";
import { Link } from "react-router-dom";

const defaultObject = defaultActivity;

export default function ActivityForm(props) {
    const [object, setObject] = useState({ ...defaultObject });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
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

    useEffect(() => {
        if (props.id) {
            axios
                .get(`/api/activities/${props.id}`)
                .then((response) => {
                    let formData = {
                        ...defaultObject,
                        ...response.data.data,
                    };

                    formData.date = getDateFromDateString(formData.date);

                    if (formData.time_from) {
                        formData.time_from = getDateFromTimeString(
                            formData.time_from
                        );
                    }

                    if (formData.time_to) {
                        formData.time_to = getDateFromTimeString(
                            formData.time_to
                        );
                    }

                    setObject(formData);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
            setObject({ ...defaultObject, deal_id: props.dealId });
        }
    }, [props.id]);

    const onChangeValue = (field, value) => {
        let clone = Object.assign({}, object);
        clone[field] = value;
        setObject(clone);
    };

    const handleSave = () => {
        setLoading(true);

        let formData = { ...object };

        formData.date = formData.date.format("YYYY-MM-DD");

        if (formData.time_from) {
            formData.time_from = formData.time_from.format("HH:mm:ss");
        }

        if (formData.time_to) {
            formData.time_to = formData.time_to.format("HH:mm:ss");
        }

        axios({
            url: `/api/activities${props.id ? `/${props.id}` : ""}`,
            method: props.id ? "PUT" : "POST",
            data: formData,
        })
            .then((response) => {
                props.onSuccess();
            })
            .catch((error) => {
                if (error.response) {
                    if (error.response.data.errors) {
                        setErrors(error.response.data.errors);
                    }
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const done = () => {
        if (object.done !== undefined) {
            return object.done;
        } else {
            return object.done_at ? "1" : "0";
        }
    };

    if (loading) {
        return (
            <>
                <DialogTitle>{LOCALE.loading}</DialogTitle>
                <DialogContent>
                    <div className="flex justify-center my-5">
                        <CircularProgress color="secondary" />
                    </div>
                </DialogContent>
            </>
        );
    }

    return (
        <>
            <DialogTitle>
                {object.id ? LOCALE.edit : LOCALE.add} {LOCALE.activity}
            </DialogTitle>
            <DialogContent>
                <div className="grid grid-cols-4 gap-4 items-center">
                    <div className="col-span-2">
                        <DefaultSelect
                            label={LOCALE.activity_type}
                            name="activity_type_id"
                            value={object.activity_type_id}
                            onChangeValue={onChangeValue}
                            errors={errors}
                            options={types}
                        />
                    </div>
                    <div
                        className={`${
                            object.deal_activity ? "col-span-1" : "col-span-2"
                        }`}
                    >
                        <DefaultRadio
                            label={LOCALE.done}
                            name="done"
                            value={done()}
                            options={yesOrNoOptions}
                            onChangeValue={onChangeValue}
                            help={
                                object.done_at
                                    ? LOCALE.finished_at + ' ' +
                                      object.done_at_formatted
                                    : null
                            }
                            errors={errors}
                        />
                    </div>
                    {object.deal_activity && (
                        <div>
                            <Link
                                className="text-sm text-gray-500"
                                to={`/deals/${object.deal_activity.deal_id}`}
                            >
                                <span className="far fa-briefcase"></span>{" "}
                                {LOCALE.go_to_deal}
                            </Link>
                        </div>
                    )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <DefaultInput
                        label={LOCALE.title}
                        required
                        name="title"
                        value={object.title}
                        onChangeValue={onChangeValue}
                        errors={errors}
                    />

                    <DefaultInput
                        label={LOCALE.location}
                        name="location"
                        value={object.location}
                        onChangeValue={onChangeValue}
                        errors={errors}
                    />
                </div>

                <div className="grid grid-cols-3 gap-4 mb-3">
                    <div>
                        <DatePicker
                            autoOk
                            ampm={false}
                            format="DD/MM/yyyy"
                            fullWidth
                            label={LOCALE.date}
                            value={object.date}
                            onChange={(e) => onChangeValue("date", e)}
                        />
                    </div>
                    <div>
                        <TimePicker
                            autoOk
                            ampm={false}
                            format="HH:mm"
                            fullWidth
                            label={LOCALE.start_time}
                            value={object.time_from}
                            onChange={(e) => onChangeValue("time_from", e)}
                            clearable
                            clearLabel="Limpar"
                            okLabel="Ok"
                            cancelLabel="Cancelar"
                        />
                    </div>
                    <div>
                        <TimePicker
                            autoOk
                            ampm={false}
                            format="HH:mm"
                            fullWidth
                            label={LOCALE.end_time}
                            value={object.time_to}
                            onChange={(e) => onChangeValue("time_to", e)}
                            clearable
                            cancelLabel="Cancelar"
                            clearLabel="Limpar"
                        />
                    </div>
                </div>

                <DefaultInput
                    label={LOCALE.description}
                    name="description"
                    multiline
                    rows={5}
                    value={object.description}
                    onChangeValue={onChangeValue}
                    errors={errors}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>{LOCALE.cancel}</Button>
                <Button onClick={handleSave} color="secondary">
                    {LOCALE.save}
                </Button>
            </DialogActions>
        </>
    );
}
