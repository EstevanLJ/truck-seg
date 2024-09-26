import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    Button,
    CircularProgress,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@material-ui/core";

import { defaultPersonAddress, yesOrNoOptions, LOCALE } from "../../../constants";
import DefaultInput, { DefaultMaskedInput } from "../../inputs/DefaultInput";
import DefaultRadio from "../../inputs/DefaultRadio";

export default function PersonAddressForm(props) {
    const [object, setObject] = useState({ ...defaultPersonAddress });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (props.id) {
            axios
                .get(`/api/person-addresses/${props.id}`)
                .then((response) => {
                    let formData = {
                        ...defaultPersonAddress,
                        ...response.data.data,
                        main: response.data.data.main ? '1' : '0'
                    };

                    setObject(formData);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
            setObject({ ...defaultPersonAddress, person_id: props.personId });
        }
    }, [props.id]);

    const onChangeValue = (field, value) => {
        let clone = Object.assign({}, object);
        clone[field] = value;
        setObject(clone);
    };

    const handleSave = () => {
        setLoading(true);

        let formData = {
            ...object,
            zip_code: object.zip_code.replace('-', ''),
            state: object.state.replace('_', ''),
            main: object.main == '1'
        };

        axios({
            url: `/api/person-addresses${props.id ? `/${props.id}` : ""}`,
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
                {object.id ? LOCALE.edit : LOCALE.add} {LOCALE.address}
            </DialogTitle>
            <DialogContent>
                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                        <DefaultInput
                            label={LOCALE.description}
                            name="description"
                            value={object.description}
                            onChangeValue={onChangeValue}
                            errors={errors}
                            required
                        />
                    </div>
                    <div>
                        <DefaultRadio
                            label={LOCALE.main_address}
                            name="main"
                            value={object.main}
                            onChangeValue={onChangeValue}
                            errors={errors}
                            options={yesOrNoOptions}
                            required
                        />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <DefaultMaskedInput
                            label={LOCALE.zip_code}
                            mask="99999-999"
                            name="zip_code"
                            value={object.zip_code}
                            onChangeValue={onChangeValue}
                            errors={errors}
                            required
                        />
                    </div>
                    <div className="col-span-2">
                        <DefaultInput
                            label={LOCALE.address}
                            name="address"
                            value={object.address}
                            onChangeValue={onChangeValue}
                            errors={errors}
                            required
                        />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <DefaultInput
                            label={LOCALE.district}
                            name="district"
                            value={object.district}
                            onChangeValue={onChangeValue}
                            errors={errors}
                            required
                        />
                    </div>
                    <div>
                        <DefaultInput
                            label={LOCALE.number}
                            name="number"
                            value={object.number}
                            onChangeValue={onChangeValue}
                            errors={errors}
                            required
                        />
                    </div>
                    <div>
                        <DefaultInput
                            label={LOCALE.complement}
                            name="complement"
                            value={object.complement}
                            onChangeValue={onChangeValue}
                            errors={errors}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                        <DefaultInput
                            label={LOCALE.city}
                            name="city"
                            value={object.city}
                            onChangeValue={onChangeValue}
                            errors={errors}
                            required
                        />
                    </div>
                    <div>
                        <DefaultMaskedInput
                            mask="aa"
                            label={LOCALE.state}
                            name="state"
                            value={object.state}
                            onChangeValue={(name, value) =>
                                onChangeValue(name, value.toUpperCase())
                            }
                            errors={errors}
                            required
                        />
                    </div>
                </div>
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
