import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@material-ui/core";
import React from "react";
import { LOCALE } from "../../../constants";

export default function GoodTypesList({ form, setForm }) {
    const onChangeValue = (index, field, value) => {
        let clone = Object.assign({}, form);
        clone.goods_types[index][field] = value;
        setForm(clone);
    };

    return (
        <TableContainer className="max-h-96">
            <Table stickyHeader size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Mercadoria</TableCell>
                        <TableCell>Embalagens</TableCell>
                        <TableCell>%</TableCell>
                        <TableCell>Limite Máximo</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {form.goods_types &&
                        form.goods_types.map((goodType, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    {goodType.goods_type_name}
                                </TableCell>
                                <TableCell>
                                    <input
                                        type="text"
                                        className="focus:ring-transparent outline-none border-0 border-b p-1 w-36"
                                        value={goodType.packages}
                                        onChange={(e) =>
                                            onChangeValue(
                                                index,
                                                "packages",
                                                e.target.value
                                            )
                                        }
                                    ></input>
                                </TableCell>
                                <TableCell>
                                    <input
                                        type="text"
                                        className="ring-transparent outline-none border-0 border-b p-1 w-24"
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
                                <TableCell>
                                    <input
                                        type="text"
                                        className="ring-transparent outline-none border-0 border-b p-1 w-36"
                                        value={goodType.maximum_limit}
                                        onChange={(e) =>
                                            onChangeValue(
                                                index,
                                                "maximum_limit",
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
