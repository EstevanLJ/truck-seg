import axios from "axios";
import React, { useEffect, useState } from "react";
import { AppBar, Button, CircularProgress, Tab, Tabs } from "@material-ui/core";

import { COMPANY, defaultPerson } from "../../../constants";
import ClientFields from "./ClientFields";
import DefaultFormHeader from "../../../components/DefaultFormHeader";
import TabPanel from "../../TabPanel";
import PersonAddresses from "./PersonAddresses";
import { toast } from "react-toastify";
import PersonContacts from "./PersonContacts";
import CompanyEmployees from "./CompanyEmployees";
import PersonDocuments from "./PersonDocuments";
import CompanyActivities from "./CompanyActivities";

const defaultObject = defaultPerson;

export default function ClientForm(props) {
    const [object, setObject] = useState({ ...defaultObject });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [tab, setTab] = React.useState("geral");
    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };

    const reload = () => {
        if (props.id) {
            axios
                .get(`/api/people/${props.id}`)
                .then((response) => {
                    let formData = {
                        ...defaultObject,
                        ...response.data.data,
                        corporate: response.data.data.corporate ? '1' : '0'
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

        axios({
            url: `/api/people${props.id ? `/${props.id}` : ""}`,
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
                    <Tab value={"enderecos"} label="Endereços" />
                    <Tab value={"contatos"} label="Contatos" />
                    {object.type === COMPANY && (
                        <Tab value={"pessoas"} label="Pessoas" />
                    )}
                    {object.type === COMPANY && (
                        <Tab value={"atividades"} label="Atividades" />
                    )}
                    <Tab value={"documentos"} label="Documentos" />
                </Tabs>
            </AppBar>
            <TabPanel value={tab} index={"geral"}>
                {props.id && (
                    <DefaultFormHeader
                        id={object.id}
                        date={object.updated_at}
                    />
                )}
                <ClientFields
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
            <TabPanel value={tab} index={"enderecos"}>
                <PersonAddresses
                    addresses={object.addresses}
                    reload={reload}
                    person={object}
                />
            </TabPanel>
            <TabPanel value={tab} index={"contatos"}>
                <PersonContacts
                    contacts={object.contacts}
                    reload={reload}
                    person={object}
                />
            </TabPanel>
            {object.type === COMPANY && (
                <>
                    <TabPanel value={tab} index={"pessoas"}>
                        <CompanyEmployees
                            employees={object.employees}
                            reload={reload}
                            person={object}
                        />
                    </TabPanel>
                    <TabPanel value={tab} index={"atividades"}>
                        <CompanyActivities
                            activities={object.activities}
                            reload={reload}
                            person={object}
                        />
                    </TabPanel>
                </>
            )}
            <TabPanel value={tab} index={"documentos"}>
                <PersonDocuments
                    documents={object.documents}
                    reload={reload}
                    person={object}
                />
            </TabPanel>

            <hr className="mb-3" />
        </div>
    );
}
