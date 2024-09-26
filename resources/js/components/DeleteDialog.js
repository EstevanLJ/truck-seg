import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@material-ui/core";
import { DangerTextButton } from "./DangerButton";
import { LOCALE } from "../constants";

export default function DeleteDialog({
    show,
    onClose,
    onConfirm,
    title = LOCALE.warning,
    message = LOCALE.confirm_delete,
    cancelLabel = LOCALE.cancel,
    confirmLabel = LOCALE.delete,
}) {
    return (
        <Dialog open={show} onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>{cancelLabel}</Button>
                <DangerTextButton onClick={onConfirm}>
                    {confirmLabel}
                </DangerTextButton>
            </DialogActions>
        </Dialog>
    );
}
