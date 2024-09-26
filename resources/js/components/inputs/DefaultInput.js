import React from "react";
import { TextField } from "@material-ui/core";
import InputMask from "react-input-mask";

export default function DefaultInput({
    label,
    name,
    type,
    value,
    onChangeValue,
    errors,
    ...props
}) {
    return (
        <div className="mb-3">
            <TextField
                {...props}
                className="focus:ring-transparent outline-none"
                type={type ? type : "text"}
                label={label}
                fullWidth
                value={value ? value : ""}
                name={name}
                onChange={(e) => onChangeValue(name, e.target.value)}
                error={errors ? !!errors[name] : null}
                helperText={
                    errors ? errors[name] && errors[name].join(" ") : null
                }
            />
        </div>
    );
}

export function DefaultMaskedInput({
    label,
    name,
    type,
    value,
    onChangeValue,
    errors,
    mask,
    raw,
    margin = true,
    ...props
}) {
    const renderInputField = () => {
        if (raw) {
            return (
                <input
                    {...props}
                    className="focus:ring-transparent outline-none"
                    type={type ? type : "text"}
                    name={name}
                />
            );
        } else {
            return (
                <TextField
                    {...props}
                    className="focus:ring-transparent outline-none"
                    type={type ? type : "text"}
                    label={label}
                    fullWidth
                    name={name}
                    error={errors ? !!errors[name] : null}
                    helperText={
                        errors ? errors[name] && errors[name].join(" ") : null
                    }
                />
            );
        }
    };

    return (
        <div className={`${margin ? "mb-3" : ""}`}>
            <InputMask
                className="focus:ring-transparent outline-none"
                mask={mask}
                value={value ? value : ""}
                onChange={(e) => onChangeValue(name, e.target.value)}
            >
                {renderInputField()}
            </InputMask>
        </div>
    );
}

const VALID_FIRST = /^[1-9]{1}$/;
const VALID_NEXT = /^[0-9]{1}$/;
const DELETE_KEY_CODE = 8;

export function DefaultCurrencyInput({
    label,
    name,
    type,
    value,
    onChangeValue,
    errors,
    mask,
    raw,
    ...props
}) {
    const inputRef = React.useRef();

    let inputValue =
        value === null
            ? ""
            : value.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
              });

    const handleKeyUp = (e) => {
        const { key, keyCode } = e;
        let val = value === null ? "" : value;

        if (
            (val === 0 && !VALID_FIRST.test(key)) ||
            (val !== 0 && !VALID_NEXT.test(key) && keyCode !== DELETE_KEY_CODE)
        ) {
            return;
        }

        const valueString = val.toString();
        let nextValue;
        if (keyCode !== DELETE_KEY_CODE) {
            const nextValueString = val === 0 ? key : `${valueString}${key}`;
            nextValue = Number.parseInt(nextValueString, 10);
        } else {
            const nextValueString = valueString.slice(0, -1);
            nextValue =
                nextValueString === ""
                    ? 0
                    : Number.parseInt(nextValueString, 10);
        }
        if (nextValue > Number.MAX_SAFE_INTEGER) {
            return;
        }

        onChangeValue(name, nextValue);
    };

    if (raw) {
        return (
            <input
                {...props}
                type="text"
                label={label}
                value={inputValue}
                ref={inputRef}
                name={name}
                onKeyUp={handleKeyUp}
                onChange={(e) => {
                    return;
                }}
            />
        );
    }

    return (
        <div className="mb-3">
            <TextField
                {...props}
                className="focus:ring-transparent outline-none"
                type="text"
                label={label}
                fullWidth
                value={inputValue}
                ref={inputRef}
                name={name}
                onKeyUp={handleKeyUp}
                onChange={(e) => {
                    return;
                }}
                error={errors ? !!errors[name] : null}
                helperText={
                    errors ? errors[name] && errors[name].join(" ") : null
                }
            />
        </div>
    );
}
