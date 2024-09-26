import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@material-ui/core";

export default function WarningDialog({
    show,
    onClose,
    title = "Atenção",
    message,
    confirmLabel = "Ok",
}) {
    return (
        <Dialog open={show} onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>{confirmLabel}</Button>
            </DialogActions>
        </Dialog>
    );
}
