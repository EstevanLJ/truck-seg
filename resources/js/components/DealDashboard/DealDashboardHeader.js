import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    DialogContentText,
    IconButton,
} from "@material-ui/core";
import { Edit as EditIcon } from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { SuccessButton } from "../SuccessButton";
import { DangerButton } from "../DangerButton";
import FinishedDealForm from "./FinishedDealForm";
import DealInfoForm from "../Forms/DealForm/DealInfoForm";
import { defaultDeal, LOCALE } from "../../constants";

export default function DealDashboardHeader({ deal, statuses, reload }) {
    const [showStatusChangeDialog, setShowStatusChangeDialog] = useState(false);
    const [showFinishedDialog, setShowFinishedDialog] = useState(false);
    const [showEditDealDialog, setShowEditDealDialog] = useState(false);
    const [newStatus, setNewStatus] = useState(null);
    const [dealEditing, setDealEditing] = useState(defaultDeal);
    const [errors, setErrors] = useState([]);
    const cols = statuses.length;

    useEffect(() => {
        setDealEditing(deal);
    }, [deal]);

    const handleStatusClick = (status) => {
        if (deal.finished_status != 0) {
            return;
        }
        setShowStatusChangeDialog(true);
        setNewStatus(status);
    };

    const handleCloseStatusDialog = () => {
        setShowStatusChangeDialog(false);
    };

    const handleFinishedButtonClick = (status) => {
        setShowFinishedDialog(status);
    };

    const handleCloseFinishedDialog = (success = false) => {
        setShowFinishedDialog(false);
        if (success) {
            reload();
        }
    };

    const handleEditDeal = () => {
        setShowEditDealDialog(true);
    };

    const handleCloseEditDealDialog = () => {
        setShowEditDealDialog(false);
    };

    const handleConfirmStatusChange = () => {
        axios
            .put(`/api/deals/${deal.id}/change-status`, {
                new_status_id: newStatus.id,
            })
            .then((response) => {
                setShowStatusChangeDialog(false);
                toast.success(LOCALE.status_changed);
                reload();
            })
            .catch((error) => {
                setShowStatusChangeDialog(false);

                if (error.response && error.response.data.message) {
                    toast.warning(error.response.data.message);
                } else {
                    toast.warning("Não foi possível alterar o status");
                }
            });
    };

    const onChangeValue = (field, value) => {
        let clone = Object.assign({}, dealEditing);

        let splitted = field.split(".");
        if (splitted.length == 1) {
            clone[field] = value;
        } else {
            clone[splitted[0]][splitted[1]] = value;
        }

        setDealEditing(clone);
    };

    const handleSave = () => {
        let formData = { ...dealEditing };
        formData.insurance_type = parseInt(formData.insurance_type);

        axios({
            url: `/api/deals/${dealEditing.id}`,
            method: "PUT",
            data: formData,
        })
            .then((response) => {
                setShowEditDealDialog(false);
                toast.success(LOCALE.deal_updated);
                reload();
            })
            .catch((error) => {
                if (error.response) {
                    if (error.response.data.errors) {
                        setErrors(error.response.data.errors);
                    }
                }
            });
    };

    return (
        <div className="mb-3 p-3 bg-white">
            <div className="flex justify-between">
                <div>
                    <div className="flex items-start">
                        <p className="text-xl font-bold mb-2 mr-2">
                            {deal.name}
                        </p>
                        <IconButton
                            size="small"
                            className="mr-2"
                            onClick={handleEditDeal}
                        >
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </div>
                    <div className="flex justify-between items-center">
                        {deal.value && (
                            <p className="mr-3">R$ {deal.value_formatted}</p>
                        )}
                        {deal.client.contact_name && (
                            <p className="mr-3">
                                <span className="far fa-user"></span>{" "}
                                {deal.client.contact_name}
                            </p>
                        )}
                        <p className="mr-3">
                            <span className="far fa-building"></span>{" "}
                            {deal.client.name}
                        </p>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <p className="mr-4">
                        <span className="far fa-briefcase"></span>{" "}
                        {deal.owner.name}
                    </p>
                    {deal.finished_status === 0 ? (
                        <>
                            <SuccessButton
                                variant="contained"
                                onClick={() => handleFinishedButtonClick(1)}
                                style={{ marginRight: "1rem" }}
                            >
                                {LOCALE.won}
                            </SuccessButton>
                            <DangerButton
                                variant="contained"
                                onClick={() => handleFinishedButtonClick(2)}
                            >
                                {LOCALE.lost}
                            </DangerButton>
                        </>
                    ) : (
                        <>
                            <p
                                className={`${
                                    deal.finished_status === 1
                                        ? "text-green-600"
                                        : "text-red-500"
                                } underline font-bold mr-4`}
                            >
                                {LOCALE.deal}{" "}
                                {deal.finished_status === 1
                                    ? "vencida"
                                    : "perdida"}{" "}
                                em {deal.finished_date_formatted}
                            </p>

                            <Button
                                variant="contained"
                                onClick={() =>
                                    handleFinishedButtonClick(
                                        deal.finished_status
                                    )
                                }
                                className="mr-4"
                            >
                                Alterar
                            </Button>
                        </>
                    )}
                </div>
            </div>

            <div className={`grid grid-cols-${cols} my-3`}>
                {statuses.map((status, index) => (
                    <div
                        className="flex items-center"
                        key={`pipeline_status_${index}`}
                    >
                        <div
                            key={status.id}
                            className={`text-center py-2 border-r rounded cursor-pointer flex-1 ${
                                status.done
                                    ? "bg-green-700 text-white"
                                    : "bg-gray-300"
                            }`}
                            onClick={() => handleStatusClick(status)}
                        >
                            <p>
                                {status.name}
                                {status.diff != undefined
                                    ? " (" + status.diff + " dias)"
                                    : ""}
                            </p>
                        </div>
                        {index != statuses.length - 1 && (
                            <span className="far fa-chevron-right mx-2"></span>
                        )}
                    </div>
                ))}
            </div>

            <div className="flex justify-between">
                <div>
                    {deal.pipeline.name}{" "}
                    <span className="far fa-chevron-right"></span>{" "}
                    {deal.pipeline_status.name}
                </div>
                <div className="flex justify-between items-center">
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

            <Dialog
                open={!!showStatusChangeDialog}
                onClose={handleCloseStatusDialog}
            >
                <DialogTitle>{LOCALE.warning}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {LOCALE.confirm_status_change}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseStatusDialog}>{LOCALE.cancel}</Button>
                    <Button
                        color="secondary"
                        onClick={handleConfirmStatusChange}
                    >
                        {LOCALE.confirm}
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={!!showFinishedDialog}
                onClose={() => handleCloseFinishedDialog()}
                fullWidth
                maxWidth={"md"}
            >
                <FinishedDealForm
                    status={showFinishedDialog}
                    onClose={handleCloseFinishedDialog}
                    deal={deal}
                />
            </Dialog>

            <Dialog
                open={showEditDealDialog}
                onClose={handleCloseEditDealDialog}
                fullWidth
                maxWidth={"md"}
            >
                <DialogTitle>{LOCALE.edit} {LOCALE.deal}</DialogTitle>
                <DialogContent>
                    <DealInfoForm
                        object={dealEditing}
                        errors={errors}
                        onChangeValue={onChangeValue}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditDealDialog}>
                        {LOCALE.cancel}
                    </Button>
                    <Button color="secondary" onClick={handleSave}>
                        {LOCALE.confirm}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
