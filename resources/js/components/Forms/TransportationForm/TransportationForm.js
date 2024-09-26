import { Button } from "@material-ui/core";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { TransportationFormStore } from "../../../stores/TransportationFormStore";
import Destinations from "./Destinations";
import FleetComposition from "./FleetComposition";
import GoodTypeOthers from "./GoodTypeOthers";
import GoodTypesList from "./GoodTypesList";
import Question from "./Question";
import Shipments from "./Shipments";
import Shippers from "./Shippers";
import ValuesHistory from "./ValuesHistory";

const defaultObject = {
    goods_types: [],
    goods_type_others: [
        {
            goods_type: "",
            percent: "",
        },
        {
            goods_type: "",
            percent: "",
        },
        {
            goods_type: "",
            percent: "",
        },
    ],
    destinations: [
        {
            origin: "",
            destiny: "",
            percent: "",
        },
        {
            origin: "",
            destiny: "",
            percent: "",
        },
        {
            origin: "",
            destiny: "",
            percent: "",
        },
    ],
    values_history: [
        {
            index: 1,
            month_year: "",
            value: "",
        },
        {
            index: 2,
            month_year: "",
            value: "",
        },
        {
            index: 3,
            month_year: "",
            value: "",
        },
        {
            index: 4,
            month_year: "",
            value: "",
        },
        {
            index: 5,
            month_year: "",
            value: "",
        },
        {
            index: 6,
            month_year: "",
            value: "",
        },
    ],
    fleet: [
        {
            enabled: false,
            vehicle_type: "PROPRIO",
            vehicle_type_name: "Próprio",
            quantity: "",
            characteristics: "",
        },
        {
            enabled: false,
            vehicle_type: "AGREGADO",
            vehicle_type_name: "Agregado",
            quantity: "",
            characteristics: "",
        },
        {
            enabled: false,
            vehicle_type: "AUTONOMO",
            vehicle_type_name: "Autônomo",
            quantity: "",
            characteristics: "",
        },
    ],
    shippers: [
        {
            name: "",
            document: "",
            has_ddr: false,
        },
        {
            name: "",
            document: "",
            has_ddr: false,
        },
        {
            name: "",
            document: "",
            has_ddr: false,
        },
    ],
    urban_route: false,
    fluvial_route: false,
    next_12_months_movment_forecast: "",
    average_trip_value: "",
    maximum_trip_value: "",
    average_trips_month: "",
    intended_limit_rctr_c: "",
    intended_limit_rcf_dc: "",
    fractioned_composition: "",
    closed_composition: "",
};

const questions = [
    {
        title: "Mercadorias Transportadas",
        component: GoodTypesList,
    },
    {
        title: "Especificar outros bens/mercadorias não relacionados no quadro anterior",
        component: GoodTypeOthers,
    },
    {
        title: "Principais percursos",
        component: Destinations,
    },
    {
        title: "Valores transportados nos últimos 6 meses",
        component: ValuesHistory,
    },
    {
        title: "Embarques",
        component: Shipments,
    },
    {
        title: "Composição da Frota",
        component: FleetComposition,
    },
    {
        title: "Principais embarcadores",
        component: Shippers,
    },
];

export default function TransportationForm(props) {
    const store = useContext(TransportationFormStore);
    const [form, setForm] = useState({ ...defaultObject });
    const [loading, setLoading] = useState(true);

    const onChangeValue = (field, value) => {
        let clone = Object.assign({}, form);
        clone[field] = value;
        setForm(clone);
    };

    const handleSave = () => {
        console.log(form);
        
        axios.post(`/api/transportation-form-responses`, form).then(res => {
            console.log(res.data);
        })
    }

    useEffect(() => {
        (async () => {
            if (!store.goodsTypes) {
                let goodsTypesRes = await axios.get("/api/goods-types");
                store.goodsTypes = goodsTypesRes.data.data;
            }

            let goodsTypes = [];
            for (let goodType of store.goodsTypes) {
                goodsTypes.push({
                    goods_type_id: goodType.id,
                    goods_type_name: goodType.name,
                    packages: "",
                    percent: "",
                    maximum_limit: "",
                });
            }
            onChangeValue("goods_types", goodsTypes);

            setLoading(false);
        })();
    }, []);

    if (loading) {
        return null;
    }

    return (
        <div>
            {questions.map((question, index) => {
                let JSXComponent = question.component;

                return (
                    <Question
                        number={index + 1}
                        title={question.title}
                        key={index}
                    >
                        <JSXComponent form={form} setForm={setForm} />
                    </Question>
                );
            })}

            <div className="mt-5">
                <Button
                    type="button"
                    variant="contained"
                    color="secondary"
                    onClick={handleSave}
                >
                    Salvar
                </Button>
            </div>
        </div>
    );
}
