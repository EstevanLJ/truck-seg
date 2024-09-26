import React, { useEffect, useState } from "react";
import { Slider, TextField, Typography } from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import DefaultInput, { DefaultCurrencyInput } from "../../inputs/DefaultInput";
import { insuranceTypes, yesOrNoOptions, LOCALE } from "../../../constants";
import axios from "axios";
import { DefaultSelect } from "../../inputs/DefaultSelect";
import DefaultRadio from "../../inputs/DefaultRadio";

export default function DealInfoForm({ object, onChangeValue, errors }) {
    const [insuranceCompanies, setInsuranceCompanies] = useState([]);

    useEffect(() => {
        axios.get("/api/insurance-companies").then((response) => {
            setInsuranceCompanies(
                response.data.data.map((item) => ({
                    value: `${item.id}`,
                    label: item.name,
                }))
            );
        });
    }, []);

    return (
        <div className="">
            <DefaultInput
                label={LOCALE.description}
                name="name"
                required
                value={object.name}
                onChangeValue={onChangeValue}
                errors={errors}
            />

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <DefaultSelect
                        label={LOCALE.type}
                        name="insurance_type"
                        value={object.insurance_type}
                        onChangeValue={onChangeValue}
                        errors={errors}
                        options={insuranceTypes}
                    />
                </div>
                <div>
                    <DefaultRadio
                        label={LOCALE.new_insurance}
                        name="new_insurance"
                        value={object.new_insurance}
                        options={yesOrNoOptions}
                        onChangeValue={onChangeValue}
                        errors={errors}
                    />
                </div>
            </div>

            {object.new_insurance === "0" && (
                <div className="grid grid-cols-2 gap-4">
                    <div className={object.type == 0 ? "col-span-2" : ""}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="DD/MM/yyyy"
                            fullWidth
                            margin="none"
                            label={LOCALE.deadline}
                            value={object.limit_date}
                            onChange={(e) => onChangeValue("limit_date", e)}
                            autoOk
                            KeyboardButtonProps={{
                                "aria-label": "alterar data",
                            }}
                        />
                    </div>
                    <div>
                        <DefaultSelect
                            label={LOCALE.insurance_company}
                            name="old_insurance_company_id"
                            value={object.old_insurance_company_id}
                            onChangeValue={onChangeValue}
                            errors={errors}
                            options={insuranceCompanies}
                        />
                    </div>
                </div>
            )}

            {/* <div className="mb-3">
                <DefaultCurrencyInput
                    label="Valor"
                    name="value"
                    value={object.value}
                    onChangeValue={onChangeValue}
                    errors={errors}
                />
            </div> */}

            <div className="mb-3">
                <Typography id="discrete-slider" gutterBottom>
                    {LOCALE.closing_probability}
                </Typography>
                <div className="mt-8">
                    <Slider
                        defaultValue={50}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="auto"
                        marks
                        step={10}
                        min={0}
                        max={100}
                        valueLabelDisplay="on"
                        value={object.probability}
                        onChange={(e, newValue) =>
                            onChangeValue("probability", newValue)
                        }
                    />
                </div>
            </div>

            <div className="mb-3">
                <TextField
                    type="text"
                    label={LOCALE.observation}
                    multiline
                    rows={5}
                    fullWidth
                    value={object.observation}
                    onChange={(e) =>
                        onChangeValue("observation", e.target.value)
                    }
                    error={!!errors.observation}
                    helperText={
                        errors.observation && errors.observation.join(" ")
                    }
                />
            </div>
        </div>
    );
}
