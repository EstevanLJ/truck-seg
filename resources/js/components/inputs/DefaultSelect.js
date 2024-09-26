import {
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    TextField,
} from "@material-ui/core";
import React from "react";
import Select from "react-select";
import { Select as SelectMUI } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

export function DefaultSelectSearch({
    label,
    name,
    value,
    onChangeValue,
    errors,
    options,
    ...props
}) {
    return (
        <div className="mt-3">
            {/* <label className="block text-sm">{label}</label> */}
            <Select
                {...props}
                placeholder={label}
                value={value ? value : ""}
                onChange={(e) => onChangeValue(name, e)}
                options={options}
            />
            {errors && errors[name] && (
                <span className="text-xs text-red-500">
                    {errors[name].join(" ")}
                </span>
            )}
        </div>
    );
}

export function DefaultSelect({
    label,
    name,
    value,
    onChangeValue,
    errors,
    options,
    ...props
}) {
    return (
        <div className="mb-3">
            <FormControl className="w-full">
                <InputLabel>{label}</InputLabel>
                <SelectMUI
                    {...props}
                    value={value ? value : ""}
                    onChange={(e) => onChangeValue(name, e.target.value)}
                    fullWidth
                >
                    {options.map((option) => (
                        <MenuItem value={option.value} key={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </SelectMUI>
                {errors && errors[name] && (
                    <FormHelperText error>
                        {errors[name].join(" ")}
                    </FormHelperText>
                )}
            </FormControl>
        </div>
    );
}

export function DefaultAutocomplete({
    label,
    name,
    value,
    onChangeValue,
    errors,
    options,
    ...props
}) {
    return (
        <div className="mb-3">
            <FormControl className="w-full">
                <Autocomplete
                    options={options}
                    getOptionLabel={(option) => option ? option.label : ''}
                    onChange={(e, v) => {
                        onChangeValue(name, v)
                    }}
                    value={value}
                    fullWidth
                    renderInput={(params) => (
                        <TextField {...params} label={label} />
                    )}
                />
                {errors && errors[name] && (
                    <FormHelperText error>
                        {errors[name].join(" ")}
                    </FormHelperText>
                )}
            </FormControl>
        </div>
    );
}
