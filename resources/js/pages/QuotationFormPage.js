import React, { useEffect, useState } from "react";
import QuotationForm from "../components/Forms/QuotationForm/QuotationForm";
import { useParams } from "react-router-dom";

export default function QuotationFormPage() {
    const { id } = useParams();

    const handleFormSuccess = () => {};

    return (
        <div>
            <QuotationForm
                id={id}
                onSuccess={handleFormSuccess}
            />
        </div>
    );
}
