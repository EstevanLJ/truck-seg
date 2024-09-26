import React, { useContext, useMemo } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { observer } from "mobx-react";
import { AppStore } from "../stores/AppStore";

function Menu({ menus }) {
    const history = useHistory();
    const location = useLocation();
    const appStore = useContext(AppStore);

    const handleMenuClick = (menu) => {
        if (menu.submenu && menu.submenu.length > 0) {
            appStore.selectedMenu = menu;
        } else {
            appStore.selectedMenu = null;
            history.push(menu.url);
        }
    };

    const selectedMenu = useMemo(() => {
        if (!appStore.menus) {
            return null;
        }

        let menu = appStore.findMenu(appStore.menus, location.pathname);

        if (!menu) {
            return null;
        }

        return menu.menu.url;
    }, [appStore.menus, location.pathname]);

    return (
        <div className="SideBar__Items">
            {menus.map((menu, index) => (
                <div
                    key={`menu_${index}`}
                    className={`SideBar__Item ${
                        selectedMenu === menu.url ? "SideBar__Item--active" : ""
                    }`}
                    onClick={() => handleMenuClick(menu)}
                    title={menu.text}
                >
                    {menu.icon ? (
                        <span className={menu.icon}></span>
                    ) : (
                        <span>{menu.text}</span>
                    )}
                </div>
            ))}
        </div>
    );
}

export default observer(Menu);
