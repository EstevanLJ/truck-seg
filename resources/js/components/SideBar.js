import axios from "axios";
import { observer } from "mobx-react";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AppStore } from "../stores/AppStore";
import Menu from "./Menu";

function SideBar() {
    const history = useHistory();
    const appStore = useContext(AppStore);

    const goTo = (url) => {
        history.push(url);
    };

    const logout = (url) => {
        axios.post('/logout').then((response) => {
            location.href = '/';
        })
    };

    return (
        <div className="SideBar shadow-sm">
            <div className="SideBar__Header" onClick={() => goTo("/")}>
                CRM
            </div>

            <Menu menus={appStore.menus} />

            <div className="SideBar__Footer h-32 w-full">
                <div className="SideBar__Item"
                    onClick={logout}
                    title={'Sair'}>
                    <span className={'far fa-sign-out'}></span>
                </div>
            </div>
        </div>
    );
}

export default observer(SideBar);
