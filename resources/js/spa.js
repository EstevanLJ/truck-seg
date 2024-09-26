import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import Router from "./router";
import AppStoreProvider from "./stores/AppStore";
import TransportationFormStoreProvider from "./stores/TransportationFormStore";

import "@fontsource/roboto";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

let rootDiv = document.getElementById("spa-root");

const theme = createTheme({
    palette: {
        primary: {
            main: "#212121",
            dark: "#000000",
            ligh: "#484848",
        },
        secondary: {
            main: "#fdd835",
            dark: "#c6a700",
            ligh: "#ffff68",
        },
    },
});

if (rootDiv) {
    ReactDOM.render(
        <BrowserRouter>
            <AppStoreProvider>
                <TransportationFormStoreProvider>
                    <ThemeProvider theme={theme}>
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            <Router />
                        </MuiPickersUtilsProvider>
                    </ThemeProvider>
                </TransportationFormStoreProvider>
            </AppStoreProvider>
        </BrowserRouter>,
        rootDiv
    );
}
