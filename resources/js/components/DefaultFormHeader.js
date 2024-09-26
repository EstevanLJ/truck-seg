import React from "react";
import { TextField } from "@material-ui/core";
import moment from "moment";
import "moment/locale/pt-br";

export default function DefaultFormHeader({
    id, date
}) {
    return (
        <div className="mb-3 grid gap-4 grid-cols-2">
            <div>
                <TextField
                    type="text"
                    label="ID"
                    fullWidth
                    value={id}
                    onChange={(e) => void(0)}
                    disabled
                />
            </div>
            <div>
                <TextField
                    type="text"
                    label="Última Atualização"
                    fullWidth
                    value={
                        date
                            ? moment(date).format(
                                  "LLLL"
                              )
                            : ""
                    }
                    onChange={(e) => void(0)}
                    disabled
                />
            </div>
        </div>
    );
}
