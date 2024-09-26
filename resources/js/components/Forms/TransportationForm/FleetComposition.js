import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@material-ui/core";
import React from "react";
import { DefaultCheckbox } from "../../inputs/DefaultCheckbox";
import { LOCALE } from "../../../constants";

export default function FleetComposition({ form, setForm }) {
    const onChangeValue = (index, field, value) => {
        let clone = Object.assign({}, form);
        clone.fleet[index][field] = value;
        setForm(clone);
    };

    const onChangeCheckbox = (index) => {
        let clone = Object.assign({}, form);
        clone.fleet[index].enabled = !clone.fleet[index].enabled;
        setForm(clone);
    };

    return (
        <TableContainer className="max-h-96">
            <Table stickyHeader size="small">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Tipo</TableCell>
                        <TableCell style={{ width: "20%" }}>Quantidade</TableCell>
                        <TableCell style={{ width: "60%" }}>
                            Características (Tipo e Idade)
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {form.fleet.map((fleet, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <DefaultCheckbox
                                    value={fleet.enabled}
                                    name="enable"
                                    onChangeValue={(e) =>
                                        onChangeCheckbox(index)
                                    }
                                />
                            </TableCell>
                            <TableCell>{fleet.vehicle_type_name}</TableCell>
                            <TableCell>
                                <input
                                    type="text"
                                    className="focus:ring-transparent outline-none border-0 border-b p-1 w-full"
                                    value={fleet.quantity}
                                    onChange={(e) =>
                                        onChangeValue(
                                            index,
                                            "quantity",
                                            e.target.value
                                        )
                                    }
                                ></input>
                            </TableCell>
                            <TableCell>
                                <input
                                    type="text"
                                    className="focus:ring-transparent outline-none border-0 border-b p-1 w-full"
                                    value={fleet.characteristics}
                                    onChange={(e) =>
                                        onChangeValue(
                                            index,
                                            "characteristics",
                                            e.target.value
                                        )
                                    }
                                ></input>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
