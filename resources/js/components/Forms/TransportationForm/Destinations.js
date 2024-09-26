import {
    Button,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React from "react";
import { DefaultCheckbox } from "../../inputs/DefaultCheckbox";
import { LOCALE } from "../../../constants";


export default function Destinations({ form, setForm }) {
    const onChangeCheckbox = (field, value) => {
        let clone = Object.assign({}, form);
        clone[field] = !clone[field];
        setForm(clone);
    };

    const onChangeValue = (index, field, value) => {
        let clone = Object.assign({}, form);
        clone.destinations[index][field] = value;
        setForm(clone);
    };

    const handleRemoveItem = (index) => {
        let clone = Object.assign({}, form);
        clone.destinations.splice(index, 1);
        setForm(clone);
    };

    const handleAddItem = (index) => {
        let clone = Object.assign({}, form);
        clone.destinations.push({
            origin: "",
            destiny: "",
            percent: "",
        });
        setForm(clone);
    };

    return (
        <>
            <TableContainer>
                <Table stickyHeader size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ width: "30%" }}>
                                Origem
                            </TableCell>
                            <TableCell style={{ width: "30%" }}>
                                Destino
                            </TableCell>
                            <TableCell>%</TableCell>
                            <TableCell style={{ width: "20%" }} align="center">
                                Ações
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {form.destinations &&
                            form.destinations.map((destination, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <input
                                            type="text"
                                            className="focus:ring-transparent outline-none border-0 border-b p-1 w-full"
                                            value={destination.origin}
                                            onChange={(e) =>
                                                onChangeValue(
                                                    index,
                                                    "origin",
                                                    e.target.value
                                                )
                                            }
                                        ></input>
                                    </TableCell>
                                    <TableCell>
                                        <input
                                            type="text"
                                            className="focus:ring-transparent outline-none border-0 border-b p-1 w-full"
                                            value={destination.destiny}
                                            onChange={(e) =>
                                                onChangeValue(
                                                    index,
                                                    "destiny",
                                                    e.target.value
                                                )
                                            }
                                        ></input>
                                    </TableCell>
                                    <TableCell>
                                        <input
                                            type="text"
                                            className="ring-transparent outline-none border-0 border-b p-1 w-full"
                                            value={destination.percent}
                                            onChange={(e) =>
                                                onChangeValue(
                                                    index,
                                                    "percent",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            size="small"
                                            onClick={() =>
                                                handleRemoveItem(index)
                                            }
                                        >
                                            <Delete fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <div className="flex justify-between mt-2">
                <div>
                    <DefaultCheckbox
                        label="Percurso Urbano/Suburbano"
                        value={form.urban_route}
                        name="urban_route"
                        onChangeValue={onChangeCheckbox}
                    />
                    <DefaultCheckbox
                        label="Percurso Fluvial"
                        value={form.fluvial_route}
                        name="fluvial_route"
                        onChangeValue={onChangeCheckbox}
                    />
                </div>
                <Button
                    type="button"
                    variant="contained"
                    color="secondary"
                    onClick={handleAddItem}
                >
                    {LOCALE.add}
                </Button>
            </div>
        </>
    );
}
