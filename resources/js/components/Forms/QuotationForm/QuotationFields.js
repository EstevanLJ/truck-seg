import axios from "axios";
import React, { useEffect, useState } from "react";
import { KeyboardDatePicker } from "@material-ui/pickers";

import DefaultInput from "../../inputs/DefaultInput";
import {
    DefaultAutocomplete,
    DefaultSelect,
    DefaultSelectSearch,
} from "../../inputs/DefaultSelect";
import { quotationStatuses } from "../../../constants";
import { Link } from "react-router-dom";

export default function QuotationFields({ object, onChangeValue, errors }) {
    const [quotationTypes, setQuotationTypes] = useState([]);
    const [users, setUsers] = useState([]);
    const [clients, setClients] = useState([]);

    useEffect(() => {
        axios.get("/api/quotation-types").then((response) => {
            setQuotationTypes(
                response.data.data.map((item) => ({
                    value: `${item.id}`,
                    label: item.name,
                }))
            );
        });
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

    return (
        <div>
            <div className="grid grid-cols-2 gap-4 items-center">
                <div>
                    <DefaultAutocomplete
                        label="Cliente"
                        name="client_id"
                        value={object.client_id}
                        onChangeValue={onChangeValue}
                        errors={errors}
                        options={clients}
                    />
                </div>
                {object.quotation_deal && (
                    <div>
                        <Link className="text-sm text-gray-500" to={`/deals/${object.quotation_deal.deal_id}`}><span className="far fa-briefcase"></span> Acessar Negociação</Link>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4 items-end">
                <DefaultSelect
                    label="Tipo da Cotação"
                    name="quotation_type_id"
                    value={object.quotation_type_id}
                    onChangeValue={onChangeValue}
                    errors={errors}
                    options={quotationTypes}
                />
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="DD/MM/yyyy"
                    fullWidth
                    margin="normal"
                    id="date-picker-inline"
                    label="Data Limite"
                    value={object.due_to}
                    onChange={(e) => onChangeValue("due_to", e)}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <DefaultSelect
                    label="Status da Cotação"
                    name="status"
                    value={object.status}
                    onChangeValue={onChangeValue}
                    errors={errors}
                    options={quotationStatuses}
                />
                <DefaultAutocomplete
                    label="Atendente"
                    name="assigned_to"
                    value={object.assigned_to}
                    onChangeValue={onChangeValue}
                    errors={errors}
                    options={users}
                />
            </div>

            <DefaultInput
                label="Nome"
                name="name"
                required
                value={object.name}
                onChangeValue={onChangeValue}
                errors={errors}
            />

            <DefaultInput
                label="Observação"
                name="observation"
                multiline
                rows={5}
                value={object.observation}
                onChangeValue={onChangeValue}
                errors={errors}
            />
        </div>
    );
}
