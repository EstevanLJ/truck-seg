import React from "react";
import { useParams } from "react-router-dom";
import DealDashboard from "../components/DealDashboard/DealDashboard";

export default function DealDashboardPage() {
    let { id } = useParams();

    return <DealDashboard id={id} />;
}
