import React from "react";
import { useHistory } from "react-router-dom";
import { useDrag } from "react-dnd";

export default function KanbanDeal({ deal, onDealClick }) {
    const history = useHistory();

    const goTo = (url) => {
        history.push(url);
    };

    const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
        type: "DEAL",
        item: deal,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <div
            className="border mb-2 p-2 cursor-move flex"
            key={`deal_${deal.id}`}
            ref={dragPreview}
            onClick={() => onDealClick(deal.id)}
        >
            <div className="flex-1" ref={drag}>
                <p
                    className="font-bold text-lg mb-2"
                    style={{ lineHeight: "1.15rem" }}
                >
                    {deal.name}
                </p>
                <div className="flex items-center flex-wrap">
                    <p className="text-sm text-gray-400 mr-2">
                        <span className="far fa-building"></span>{" "}
                        {deal.client.name}
                    </p>
                    {deal.client.contact_name && (
                        <p className="text-sm text-gray-400">
                            <span className="far fa-user"></span>{" "}
                            {deal.client.contact_name}
                        </p>
                    )}
                </div>
                {/* {deal.owner && (
                    <div className="flex items-center flex-wrap">
                        <p className="text-sm text-gray-400">
                            <span className="far fa-briefcase"></span>{" "}
                            {deal.owner.name}
                        </p>
                    </div>
                )} */}
                <div className="flex items-center flex-wrap">
                    {deal.value && (
                        <p className="text-sm text-gray-400 mr-3">
                            R$ {deal.value_formatted}
                        </p>
                    )}
                    {deal.limit_date && (
                        <p className="text-sm text-gray-400 mr-3">
                            <span className="far fa-flag-checkered"></span>{" "}
                            {deal.limit_date_formatted}
                        </p>
                    )}
                    <p className="text-sm text-gray-400">
                        <span className="far fa-balance-scale-right"></span>{" "}
                        {deal.probability}%
                    </p>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center pl-1">
                <div
                    onClick={() => goTo(`/deals/${deal.id}`)}
                    className="h-8 w-8 flex justify-center items-center cursor-pointer rounded-full bg-gray-400 text-white"
                >
                    <span className="far fa-chevron-right"></span>
                </div>
            </div>
        </div>
    );
}
