import React from "react";
import DefaultInput, { DefaultCurrencyInput } from "../../inputs/DefaultInput";

/*
fractioned_composition
closed_composition
*/

export default function Shipments({ form, setForm }) {
    const onChangeValue = (field, value) => {
        let clone = Object.assign({}, form);
        clone[field] = value;
        setForm(clone);
    };

    return (
        <div>
            <div className="grid grid-cols-2 gap-4">
                <DefaultCurrencyInput
                    label="Valor médio por veículo/viagem"
                    name="average_trip_value"
                    value={form.average_trip_value}
                    onChangeValue={onChangeValue}
                />
                <DefaultCurrencyInput
                    label="Valor máximo por veículo/viagem"
                    name="maximum_trip_value"
                    value={form.maximum_trip_value}
                    onChangeValue={onChangeValue}
                />
            </div>

            <div className="grid grid-cols-3 gap-4">
                <DefaultInput
                    label="Nº médio de embarques/mês"
                    name="average_trips_month"
                    value={form.average_trips_month}
                    onChangeValue={onChangeValue}
                />
                <DefaultCurrencyInput
                    label="Limite pretendido RCTR-C"
                    name="intended_limit_rctr_c"
                    value={form.intended_limit_rctr_c}
                    onChangeValue={onChangeValue}
                />
                <DefaultCurrencyInput
                    label="Limite pretendido RCF-DC"
                    name="intended_limit_rcf_dc"
                    value={form.intended_limit_rcf_dc}
                    onChangeValue={onChangeValue}
                />
            </div>

            <div className="grid grid-cols-3 gap-4 items-center">
                <p>Composição da mercadoria no veículo transportador:</p>
                <DefaultInput
                    label="Carga fracionada"
                    name="fractioned_composition"
                    value={form.fractioned_composition}
                    onChangeValue={onChangeValue}
                />
                <DefaultInput
                    label="Carga fechada - mercadorias"
                    name="closed_composition"
                    value={form.closed_composition}
                    onChangeValue={onChangeValue}
                />
            </div>
        </div>
    );
}
