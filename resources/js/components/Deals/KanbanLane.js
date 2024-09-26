import React, { useMemo } from "react";
import KanbanDeal from "./KanbanDeal";
import { useDrop } from "react-dnd";
import { toast } from "react-toastify";
import axios from "axios";
import { LOCALE } from "../../constants";


export default function KanbanLane({ status, reload, onDealClick }) {
    const totalDeals = useMemo(() => {
        if (!status.deals) {
            return "";
        }

        let value = status.deals.length;

        if (value == 0) {
            return LOCALE.no_deals;
        } else if (value == 1) {
            return LOCALE.one_deal;
        } else {
            return value + " " + LOCALE.deals;
        }
    }, [status]);

    const totalValue = useMemo(() => {
        if (!status.deals) {
            return "";
        }

        if (status.deals.length > 0) {
            let value = status.deals.reduce(
                (carry, deal) => carry + deal.value,
                0
            );
            return value.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
                minimumFractionDigits: 2,
            });
        } else {
            return "";
        }
    }, [status]);

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "DEAL",
        drop: (item, monitor) => {
            axios
                .put(`/api/deals/${item.id}/change-status`, {
                    new_status_id: status.id,
                })
                .then((response) => {
                    toast.success(LOCALE.status_changed);
                    reload();
                })
                .catch((error) => {
                    if (error.response && error.response.data.message) {
                        toast.warning(error.response.data.message);
                    } else {
                        toast.warning(LOCALE.could_not_change_status);
                    }
                });
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
        canDrop: (item) => {
            return item.pipeline_status_id != status.id;
        },
    }));

    if (!status.deals) {
        return null;
    }

    return (
        <div
            className="flex flex-col border bg-white"
            key={`pipeline_status_${status.id}`}
            style={{ height: "calc(100vh - 150px)" }}
        >
            <div className="flex items-center mb-2">
                <div
                    key={status.id}
                    className="p-2 flex-1 bg-gray-100 border-b"
                >
                    <p className="mb-1 font-bold">{status.name}</p>
                    <div className="flex justify-center items-center">
                        {status.deals.length > 0 ? (
                            <>
                                <p className="mb-1 text-sm flex-1">
                                    {totalDeals}
                                </p>
                                {/* <p className="mb-1 text-sm flex-1">
                                    {totalValue}
                                </p> */}
                            </>
                        ) : (
                            <p className="mb-1 text-sm flex-1">
                                {LOCALE.no_deals}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div
                className={`flex-1 p-2 overflow-y-auto ${
                    isOver ? "bg-gray-200" : "bg-white"
                }`}
                ref={drop}
            >
                {status.deals.map((deal) => (
                    <KanbanDeal
                        key={`deal_${deal.id}`}
                        deal={deal}
                        onDealClick={onDealClick}
                    />
                ))}
            </div>
        </div>
    );
}
