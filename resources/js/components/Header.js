import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { observer } from "mobx-react";
import { Search as SearchIcon } from "@material-ui/icons";
import { AppStore } from "../stores/AppStore";
import { LOCALE } from "../constants";

function Header() {
    const location = useLocation();
    const appStore = useContext(AppStore);
    const [pageHeader, setPageHeader] = useState(null);

    useEffect(() => {

        if (!appStore.menus) {
            setPageHeader(null);
            return;
        }

        let menu = appStore.findMenu(appStore.menus, location.pathname);

        if (!menu) {
            setPageHeader(null);
            return;
        }

        if (menu.submenu) {
            appStore.selectedMenu = menu.submenu;
        }

        setPageHeader(
            <span className="text-lg font-bold flex items-center">
                <span
                    className={`text-gray-400 mr-2 ${menu.menu.icon}`}
                />
                {menu.menu.text}
            </span>
        );
    }, [appStore.menus, location.pathname]);

    return (
        <div className="border-b shadow-sm flex justify-between items-center p-3">
            <div className="">{pageHeader}</div>

            <div className="bg-gray-200 w-2/3 lg:w-1/3 hidden md:flex rounded-full h-10 text-gray-600 items-center text-lg px-5">
                <SearchIcon icon="search" />
                <input
                    placeholder={LOCALE.search}
                    className="bg-transparent border-none w-full outline-none ml-3 placeholder-gray-400"
                />
            </div>

            <div className=""></div>
        </div>
    );
}

export default observer(Header);
