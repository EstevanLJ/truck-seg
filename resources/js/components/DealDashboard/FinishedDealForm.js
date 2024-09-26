import {
    Button,
    DialogActions,
    DialogTitle,
    DialogContent,
    CircularProgress,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import DefaultInput, { DefaultCurrencyInput } from "../inputs/DefaultInput";
import { DefaultSelect } from "../inputs/DefaultSelect";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { dealFinishedStatus, defaultDeal } from "../../constants";
import DefaultRadio from "../inputs/DefaultRadio";

export default function FinishedDealForm({ status, deal, onClose }) {
    const [object, setObject] = useState({ ...defaultDeal });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [lostReasons, setLostReasons] = useState([]);
    const [insuranceCompanies, setInsuranceCompanies] = useState([]);

    useEffect(() => {
        axios.get("/api/deal-lost-reasons").then((response) => {
            setLostReasons(
                response.data.data.map((item) => ({
                    value: `${item.id}`,
                    label: item.name,
                }))
            );
        });

        axios.get("/api/insurance-companies").then((response) => {
            setInsuranceCompanies(
                response.data.data.map((item) => ({
                    value: `${item.id}`,
                    label: item.name,
                }))
            );
        });
    }, []);

    useEffect(() => {
        let newObject = {
            finished_status: deal.finished_status,
            finished_date: deal.finished_date,
            finished_value: deal.finished_value,
            insurance_company_id: deal.insurance_company_id,
            deal_lost_reason_id: deal.deal_lost_reason_id,
            finished_observation: deal.finished_observation,
        };

        if (status === 3) {
            newObject.finished_status = 0;
        } else {
            newObject.finished_status = status;
        }

        setObject(newObject);
    }, [status]);

    const onChangeValue = (field, value) => {
        let clone = Object.assign({}, object);
        clone[field] = value;
        setObject(clone);
    };

    const handleSave = () => {
        setLoading(true);

        let formData = {
            finished_status: object.finished_status,
            finished_date: object.finished_date,
            finished_value: object.finished_value,
            insurance_company_id: object.insurance_company_id,
            deal_lost_reason_id: object.deal_lost_reason_id,
            finished_observation: object.finished_observation,
        };

        axios({
            url: `/api/deals/${deal.id}/change-finished-status`,
            method: "PUT",
            data: formData,
        })
            .then((response) => {
                toast.success("Status alterado!");
                onClose(true);
            })
            .catch((error) => {
                if (error.response) {
                    if (error.response.data.status === "error") {
                        toast.warning(error.response.data.message);
                        onClose(true);
                    }
                    if (error.response.data.errors) {
                        setErrors(error.response.data.errors);
                    }
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    if (loading) {
        return (
            <>
                <DialogTitle>Finalizar negociação</DialogTitle>
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
            <DialogTitle>Finalizar negociação</DialogTitle>
            <DialogContent>
                <DefaultRadio
                    label="Status"
                    name="finished_status"
                    value={parseInt(object.finished_status)}
                    options={dealFinishedStatus}
                    onChangeValue={onChangeValue}
                    errors={errors}
                />

                {object.finished_status == 1 && (
                    <div className="grid grid-cols-2 gap-4">
                        <DefaultCurrencyInput
                            label="Valor"
                            name="finished_value"
                            value={object.finished_value}
                            onChangeValue={onChangeValue}
                            errors={errors}
                        />
                        <DefaultSelect
                            label="Seguradora"
                            name="insurance_company_id"
                            value={object.insurance_company_id}
                            onChangeValue={onChangeValue}
                            errors={errors}
                            options={insuranceCompanies}
                        />
                    </div>
                )}

                {object.finished_status == 2 && (
                    <DefaultSelect
                        label="Motivo"
                        name="deal_lost_reason_id"
                        value={object.deal_lost_reason_id}
                        onChangeValue={onChangeValue}
                        errors={errors}
                        options={lostReasons}
                    />
                )}

                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="DD/MM/yyyy"
                    fullWidth
                    margin="normal"
                    id="date-picker-inline"
                    label="Data"
                    value={object.finished_date}
                    onChange={(e) => onChangeValue("finished_date", e)}
                    KeyboardButtonProps={{
                        "aria-label": "alterar data",
                    }}
                />
                <DefaultInput
                    label="Observações"
                    name="finished_observation"
                    value={object.finished_observation}
                    onChangeValue={onChangeValue}
                    errors={errors}
                    multiline
                    rows={5}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onClose(false)}>Cancelar</Button>
                <Button onClick={handleSave} color="secondary">
                    Confirmar
                </Button>
            </DialogActions>
        </>
    );
}
