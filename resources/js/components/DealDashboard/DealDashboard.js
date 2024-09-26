import axios from "axios";
import React, { useEffect, useState } from "react";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";

import ClientFields from "../Forms/ClientForm/ClientFields";
import { defaultDeal, defaultPerson } from "../../constants";
import DealDashboardHeader from "./DealDashboardHeader";
import DealTimeLine from "./DealTimeLine";
import DealActivities from "./DealActivities";
import DealDocuments from "../Forms/DealForm/DealDocuments";
import AppTabs, { AppTab } from "../AppTabs/AppTabs";
import { LOCALE } from "../../constants";

export default function DealDashboard({ id }) {
    const [object, setObject] = useState({ ...defaultDeal });
    const [statuses, setStatuses] = useState([]);
    const [loading, setLoading] = useState(true);

    const [tab, setTab] = React.useState('historico');

    const reload = () => {
        axios
            .get(`/api/deals/${id}`)
            .then((response) => {
                let deal = response.data.data;
                deal.insurance_type = '' + deal.insurance_type;
                deal.new_insurance = deal.new_insurance ? '1' : '0';

                setObject(response.data.data);
                setStatuses(response.data.statuses);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        reload();
    }, [id]);

    if (loading) {
        return (
            <div className="p-4 w-screen sm:w-3/4-screen lg:w-1/2-screen">
                <div className="flex justify-center my-5">
                    <CircularProgress color="secondary" />
                </div>
            </div>
        );
    }

    const tabs = [
        {index: 'historico', label: LOCALE.history},
        {index: 'atividades', label: LOCALE.activities},
        {index: 'arquivos', label: LOCALE.files},
        {index: 'cotacao', label: LOCALE.quotations, show: !!object.quotation_deal},
    ];

    return (
        <div className="p-3" style={{ height: "100vh" }}>
            <DealDashboardHeader
                deal={object}
                statuses={statuses}
                reload={reload}
            />

            <div className="grid grid-cols-3 gap-4">
                <div className="p-3 pb-24 bg-white">
                    <p className="font-bold mb-2">{LOCALE.client}</p>
                    <ClientFields
                        onChangeValue={() => {}}
                        object={object.client ? object.client : defaultPerson}
                    />
                </div>
                <div
                    className="col-span-2 overflow-y-auto bg-white"
                    style={{ maxHeight: "calc(100vh - 300px)" }}
                >
                    <AppTabs tabs={tabs} tab={tab} setTab={setTab} />

                    <AppTab value={tab} index={'historico'}>
                        <DealTimeLine histories={object.histories} />
                    </AppTab>

                    <AppTab value={tab} index={'atividades'}>
                        <DealActivities
                            activities={object.activities}
                            reload={reload}
                            deal={object}
                        />
                    </AppTab>

                    <AppTab value={tab} index={'arquivos'}>
                        <DealDocuments
                            documents={object.documents}
                            reload={reload}
                            deal={object}
                        />
                    </AppTab>

                    {object.quotation_deal && (
                        <AppTab value={tab} index={'cotacao'}>
                            <div>
                                <Link
                                    className="text-sm text-gray-500"
                                    to={`/quotations/${object.quotation_deal.quotation_id}`}
                                >
                                    <span className="far fa-file-invoice-dollar"></span>{" "}
                                    Acessar Cotação
                                </Link>
                            </div>
                        </AppTab>
                    )}

                </div>
            </div>
        </div>
    );
}
