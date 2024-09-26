import React from "react";
import { Button } from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import DefaultInput, {
    DefaultCurrencyInput,
    DefaultMaskedInput,
} from "../../inputs/DefaultInput";

import { companyCorporate, personTypes, LOCALE } from "../../../constants";
import DefaultRadio from "../../inputs/DefaultRadio";

export default function ClientFields({
    object,
    onChangeValue,
    errors,
    onSearch,
}) {
    return (
        <div>
            <div className="grid grid-cols-2 gap-4">
                <DefaultRadio
                    label={LOCALE.type}
                    name="type"
                    value={parseInt(object.type)}
                    options={personTypes}
                    onChangeValue={onChangeValue}
                    errors={errors}
                />
                <div>
                    {object.type == 0 ? (
                        <DefaultMaskedInput
                            label="CPF"
                            mask="999.999.999-99"
                            required
                            name="document"
                            value={object.document}
                            onChangeValue={onChangeValue}
                            errors={errors}
                        />
                    ) : (
                        <div className="grid grid-cols-3 gap-4">
                            <div
                                className={
                                    onSearch ? "col-span-2" : "col-span-3"
                                }
                            >
                                <DefaultMaskedInput
                                    label="CNPJ"
                                    mask="99.999.999/9999-99"
                                    required
                                    name="document"
                                    value={object.document}
                                    onChangeValue={onChangeValue}
                                    errors={errors}
                                />
                            </div>
                            {onSearch && (
                                <div className="pt-3">
                                    <Button
                                        type="button"
                                        variant="contained"
                                        color="secondary"
                                        onClick={() =>
                                            onSearch(object.document)
                                        }
                                    >
                                        {LOCALE.search}
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className={object.type == 0 ? "col-span-2" : ""}>
                    <DefaultInput
                        label={
                            object.type == 0 ? LOCALE.full_name : LOCALE.company_name
                        }
                        name="name"
                        required
                        value={object.name}
                        onChangeValue={onChangeValue}
                        errors={errors}
                    />
                </div>
                {object.type == 1 && (
                    <div>
                        <DefaultInput
                            label={LOCALE.brand_name}
                            name="trading_name"
                            value={object.trading_name}
                            onChangeValue={onChangeValue}
                            errors={errors}
                        />
                    </div>
                )}
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <DefaultMaskedInput
                        label={LOCALE.phone}
                        mask="(99) 99999-9999"
                        name="phone"
                        value={object.phone}
                        onChangeValue={onChangeValue}
                        errors={errors}
                    />
                </div>
                <div>
                    <DefaultInput
                        label="E-mail"
                        name="email"
                        value={object.email}
                        onChangeValue={onChangeValue}
                        errors={errors}
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 items-end">
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="DD/MM/yyyy"
                    fullWidth
                    margin="normal"
                    id="date-picker-inline"
                    label={
                        object.type == 0
                            ? LOCALE.birthdate
                            : LOCALE.founding_date
                    }
                    value={object.creation_date}
                    onChange={(e) => onChangeValue("creation_date", e)}
                    KeyboardButtonProps={{
                        "aria-label": LOCALE.change_date,
                    }}
                />
                {object.type == 1 && (
                    <DefaultInput
                        label={LOCALE.contact_name}
                        name="contact_name"
                        value={object.contact_name}
                        onChangeValue={onChangeValue}
                        errors={errors}
                    />
                )}
            </div>

            {object.type == 1 && (
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <DefaultInput
                            label={LOCALE.activity_code}
                            name="main_activity_code"
                            value={object.main_activity_code}
                            onChangeValue={onChangeValue}
                            errors={errors}
                        />
                    </div>
                    <div className="col-span-2">
                        <DefaultInput
                            label={LOCALE.main_activity}
                            name="main_activity"
                            value={object.main_activity}
                            onChangeValue={onChangeValue}
                            errors={errors}
                        />
                    </div>
                </div>
            )}

            {object.type == 1 && (
                <>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <DefaultRadio
                                label={LOCALE.type}
                                name="corporate"
                                value={
                                    object.corporate === ""
                                        ? ""
                                        : object.corporate
                                }
                                options={companyCorporate}
                                onChangeValue={onChangeValue}
                                errors={errors}
                            />
                        </div>
                        <div>
                            <DefaultInput
                                label={LOCALE.ta_registry}
                                name="antt_register"
                                value={object.antt_register}
                                onChangeValue={onChangeValue}
                                errors={errors}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <DefaultCurrencyInput
                                label={LOCALE.social_capital}
                                name="share_capital"
                                value={object.share_capital}
                                onChangeValue={onChangeValue}
                                errors={errors}
                            />
                        </div>
                        <div>
                            <DefaultInput
                                label={LOCALE.juridic_nature}
                                name="juridic_nature"
                                value={object.juridic_nature}
                                onChangeValue={onChangeValue}
                                errors={errors}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
