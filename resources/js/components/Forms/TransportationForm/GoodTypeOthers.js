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
import { LOCALE } from "../../../constants";

export default function GoodTypeOthers({ form, setForm }) {
    const onChangeValue = (index, field, value) => {
        let clone = Object.assign({}, form);
        clone.goods_type_others[index][field] = value;
        setForm(clone);
    };

    const handleRemoveItem = (index) => {
        let clone = Object.assign({}, form);
        clone.goods_type_others.splice(index, 1);
        setForm(clone);
    };

    const handleAddItem = (index) => {
        let clone = Object.assign({}, form);
        clone.goods_type_others.push({
            goods_type: "",
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
                            <TableCell style={{ width: "60%" }}>
                                Mercadoria
                            </TableCell>
                            <TableCell>%</TableCell>
                            <TableCell style={{ width: "20%" }} align="center">
                                Ações
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {form.goods_type_others &&
                            form.goods_type_others.map((goodType, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <input
                                            type="text"
                                            className="focus:ring-transparent outline-none border-0 border-b p-1 w-full"
                                            value={goodType.goods_type}
                                            onChange={(e) =>
                                                onChangeValue(
                                                    index,
                                                    "goods_type",
                                                    e.target.value
                                                )
                                            }
                                        ></input>
                                    </TableCell>
                                    <TableCell>
                                        <input
                                            type="text"
                                            className="ring-transparent outline-none border-0 border-b p-1 w-full"
                                            value={goodType.percent}
                                            onChange={(e) =>
                                                onChangeValue(
                                                    index,
                                                    "percent",
                                                    e.target.value
                                                )
                                            }
                                        ></input>
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

            <div className="flex justify-end mt-2">
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
