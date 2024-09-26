import React from "react";
import { useParams } from "react-router-dom";
import ClientForm from "../components/Forms/ClientForm/ClientForm";

export default function ClientFormPage() {
    const { id } = useParams();

    return <ClientForm id={id} />;
}
