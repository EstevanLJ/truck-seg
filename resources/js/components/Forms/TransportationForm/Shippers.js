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

export default function Shippers({ form, setForm }) {
    const onChangeCheckbox = (index) => {
        let clone = Object.assign({}, form);
        clone.shippers[index]["has_ddr"] = !clone.shippers[index]["has_ddr"];
        setForm(clone);
    };

    const onChangeValue = (index, field, value) => {
        let clone = Object.assign({}, form);
        clone.shippers[index][field] = value;
        setForm(clone);
    };

    const handleRemoveItem = (index) => {
        let clone = Object.assign({}, form);
        clone.shippers.splice(index, 1);
        setForm(clone);
    };

    const handleAddItem = (index) => {
        let clone = Object.assign({}, form);
        clone.shippers.push({
            name: "",
            document: "",
            has_ddr: "",
        });
        setForm(clone);
    };

    return (
        <>
            <TableContainer>
                <Table stickyHeader size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome completo do embarcador</TableCell>
                            <TableCell style={{ width: "30%" }}>CNPJ</TableCell>
                            <TableCell style={{ width: "20%" }} align="center">
                                Possui seguro próprio (DDR)
                            </TableCell>
                            <TableCell style={{ width: "20%" }} align="center">
                                Ações
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {form.shippers.map((shipper, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <input
                                        type="text"
                                        className="focus:ring-transparent outline-none border-0 border-b p-1 w-full"
                                        value={shipper.name}
                                        onChange={(e) =>
                                            onChangeValue(
                                                index,
                                                "name",
                                                e.target.value
                                            )
                                        }
                                    ></input>
                                </TableCell>
                                <TableCell>
                                    <input
                                        type="text"
                                        className="focus:ring-transparent outline-none border-0 border-b p-1 w-full"
                                        value={shipper.document}
                                        onChange={(e) =>
                                            onChangeValue(
                                                index,
                                                "document",
                                                e.target.value
                                            )
                                        }
                                    ></input>
                                </TableCell>
                                <TableCell align="center">
                                    <DefaultCheckbox
                                        value={shipper.has_ddr}
                                        name="has_ddr"
                                        onChangeValue={(e) =>
                                            onChangeCheckbox(index)
                                        }
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        size="small"
                                        onClick={() => handleRemoveItem(index)}
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
                <div></div>
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
