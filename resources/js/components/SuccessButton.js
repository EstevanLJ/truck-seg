import { Button, withStyles } from "@material-ui/core";
import { green } from "@material-ui/core/colors";

export const SuccessButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText('#047857'),
        backgroundColor: '#047857',
        "&:hover": {
            backgroundColor: '#059669',
        },
    },
}))(Button);

export const SuccessTextButton = withStyles((theme) => ({
    root: {
        color: green[500],
    },
}))(Button);
