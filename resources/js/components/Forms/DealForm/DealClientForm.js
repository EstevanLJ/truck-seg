import axios from "axios";
import React from "react";
import ClientFields from "../ClientForm/ClientFields";

export default function DealClientForm({ object, onChangeValue, errors, setObject }) {
    const handleChangeValue = (field, value) => {
        onChangeValue("client." + field, value);
    };

    const handleSearch = (document) => {
        let cleaned = document
            .replaceAll(".", "")
            .replaceAll("/", "")
            .replaceAll("-", "");

        axios
            .get(`/api/people/search-document?document=${cleaned}`)
            .then((response) => {
                let client = {
                    ...response.data.data,
                    corporate:
                        response.data.data.corporate === true ? "1" : "0",
                };

                let clone = {...object};
                clone.client = client;
                setObject(clone);
            })
            .catch((error) => {
                toast.warning("CNPJ não encontrado");
            });
    };

    return (
        <ClientFields
            object={object.client}
            onChangeValue={handleChangeValue}
            errors={errors}
            onSearch={handleSearch}
        />
    );
}
