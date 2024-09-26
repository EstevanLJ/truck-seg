import axios from "axios";
import React, { useEffect, useState } from "react";
import { AppBar, Button, CircularProgress, Tab, Tabs } from "@material-ui/core";

import { defaultQuotation } from "../../../constants";
import TabPanel from "../../TabPanel";
import { toast } from "react-toastify";
import QuotationDocuments from "./QuotationDocuments";
import QuotationFields from "./QuotationFields";
import { getDateFromDateString } from "../../../utils";

const defaultObject = defaultQuotation;

export default function QuotationForm(props) {
    const [object, setObject] = useState({ ...defaultObject });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const [tab, setTab] = React.useState("geral");
    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };

    const reload = () => {
        if (props.id) {
            axios
                .get(`/api/quotations/${props.id}`)
                .then((response) => {
                    let formData = {
                        ...defaultObject,
                        ...response.data.data,
                    };

                    if (formData.due_to) {
                        formData.due_to = getDateFromDateString(formData.due_to);
                    }

                    formData.assigned_to = formData.assigned_to
                        ? {
                              value: formData.assigned_to.id,
                              label: formData.assigned_to.name,
                          }
                        : "";

                    formData.client_id = {
                        value: formData.client.id,
                        label: formData.client.name,
                    };

                    setObject(formData);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
            setObject({ ...defaultObject });
        }
    };

    useEffect(() => {
        reload();
    }, [props.id]);

    const onChangeValue = (field, value) => {
        let clone = Object.assign({}, object);
        clone[field] = value;
        setObject(clone);
    };

    const handleSave = () => {
        setLoading(true);

        let formData = { ...object };

        formData.due_to = formData.due_to.format("YYYY-MM-DD");
        formData.client_id = formData.client_id.value;
        formData.assigned_to = formData.assigned_to ? formData.assigned_to.value : null;

        axios({
            url: `/api/quotations${props.id ? `/${props.id}` : ""}`,
            method: props.id ? "PUT" : "POST",
            data: formData,
        })
            .then((response) => {
                toast.success("Registro Atualizado");

                if (props.onSuccess) {
                    props.onSuccess();
                }
            })
            .catch((error) => {
                if (error.response) {
                    if (error.response.data.errors) {
                        setErrors(error.response.data.errors);
                    }
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    if (loading) {
        return (
            <div>
                <div className="flex justify-center my-5">
                    <CircularProgress color="secondary" />
                </div>
            </div>
        );
    }

    return (
        <div>
            <AppBar position="static" color="transparent">
                <Tabs
                    value={tab}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    <Tab value={"geral"} label="Geral" />
                    <Tab value={"documentos"} label="Documentos" />
                </Tabs>
            </AppBar>
            <TabPanel value={tab} index={"geral"}>
                <QuotationFields
                    object={object}
                    onChangeValue={onChangeValue}
                    errors={errors}
                />

                <div className="mt-3">
                    <Button
                        type="button"
                        variant="contained"
                        color="secondary"
                        onClick={handleSave}
                    >
                        Salvar
                    </Button>
                </div>
            </TabPanel>
            <TabPanel value={tab} index={"documentos"}>
                <QuotationDocuments
                    documents={object.documents}
                    reload={reload}
                    quotation={object}
                />
            </TabPanel>

            <hr className="mb-3" />
        </div>
    );
}
