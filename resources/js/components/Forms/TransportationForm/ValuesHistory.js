import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@material-ui/core";
import DefaultInput, {
    DefaultCurrencyInput,
    DefaultMaskedInput,
} from "../../inputs/DefaultInput";

const ValuesTable = ({ valuesHistory, onChangeValue }) => {
    return (
        <>
            <TableContainer>
                <Table stickyHeader size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Mês/Ano</TableCell>
                            <TableCell>Valor (R$)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {valuesHistory.map((valueHistory, index) => (
                            <TableRow key={index}>
                                <TableCell>{valueHistory.index}</TableCell>
                                <TableCell>
                                    <DefaultMaskedInput
                                        type="text"
                                        className="focus:ring-transparent outline-none border-0 border-b p-1 w-full"
                                        value={valueHistory.month_year}
                                        mask="99/9999"
                                        margin={false}
                                        onChangeValue={(name, value) =>
                                            onChangeValue(
                                                valueHistory.index,
                                                "month_year",
                                                value
                                            )
                                        }
                                    />
                                </TableCell>
                                <TableCell>
                                    <DefaultCurrencyInput
                                        raw
                                        className="focus:ring-transparent outline-none border-0 border-b p-1 w-full"
                                        value={valueHistory.value}
                                        onChangeValue={(name, value) =>
                                            onChangeValue(
                                                valueHistory.index,
                                                "value",
                                                value
                                            )
                                        }
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default function ValuesHistory({ form, setForm }) {
    const onChange = (field, value) => {
        let clone = Object.assign({}, form);
        clone[field] = value;
        setForm(clone);
    };

    const onChangeValue = (index, field, value) => {
        let clone = Object.assign({}, form);

        clone.values_history = clone.values_history.map((v) => {
            if (v.index === index) {
                v[field] = value;
                return v;
            } else {
                return v;
            }
        });
        setForm(clone);
    };

    return (
        <>
            <div className="grid grid-cols-2 gap-4">
                <ValuesTable
                    valuesHistory={form.values_history.filter(
                        (v) => v.index % 2 !== 0
                    )}
                    onChangeValue={onChangeValue}
                    startFrom={1}
                />
                <ValuesTable
                    valuesHistory={form.values_history.filter(
                        (v) => v.index % 2 === 0
                    )}
                    onChangeValue={onChangeValue}
                    startFrom={3}
                />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-2">
                <DefaultInput
                    label="Previsão de movimento para próximos 12 meses"
                    value={form.next_12_months_movment_forecast}
                    name="next_12_months_movment_forecast"
                    onChangeValue={onChange}
                />
            </div>
        </>
    );
}
