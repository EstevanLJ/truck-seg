import React from "react";
import { Checkbox, FormControlLabel } from "@material-ui/core";

export function DefaultCheckbox({
    label,
    name,
    value,
    onChangeValue,
    options,
    ...props
}) {
    return (
        <FormControlLabel
            control={
                <Checkbox
                    {...props}
                    checked={value ? !!value : false}
                    onChange={(e) => onChangeValue(name, e.target.value)}
                    name={name}
                />
            }
            label={label}
        />
    );
}
