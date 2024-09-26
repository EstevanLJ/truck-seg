import React from "react";
import {
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Radio,
    RadioGroup,
} from "@material-ui/core";

export default function DefaultRadio({
    label,
    name,
    value,
    options,
    onChangeValue,
    errors,
    help,
    ...props
}) {
    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">{label}</FormLabel>
            <RadioGroup
                value={value}
                onChange={(e) => onChangeValue(name, e.target.value)}
                row
                {...props}
            >
                {options.map((option) => (
                    <FormControlLabel
                        key={`${option.value}`}
                        value={option.value}
                        control={<Radio />}
                        label={option.label}
                    />
                ))}
            </RadioGroup>

            {help && (
                <FormHelperText>{help}</FormHelperText>
            )}

            {errors && errors[name] && (
                <FormHelperText error>{errors[name].join(" ")}</FormHelperText>
            )}
        </FormControl>
    );
}
