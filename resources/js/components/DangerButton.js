import { Button, withStyles } from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";

export const DangerButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText('#DC2626'),
        backgroundColor: '#DC2626',
        "&:hover": {
            backgroundColor: '#EF4444',
        },
    },
}))(Button);

export const DangerTextButton = withStyles((theme) => ({
    root: {
        color: deepOrange[500],
    },
}))(Button);

