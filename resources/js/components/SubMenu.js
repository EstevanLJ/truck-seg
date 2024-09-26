import { observer } from "mobx-react";
import React, { useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { AppStore } from "../stores/AppStore";

function SubMenu() {
    const location = useLocation();
    const history = useHistory();
    const appStore = useContext(AppStore);

    const menu = appStore.selectedMenu ? appStore.selectedMenu : {};
    const submenus = appStore.selectedMenu ? appStore.selectedMenu.submenu : [];

    const goTo = (url) => {
        history.push(url);
    };

    const handleSubMenuClose = () => {
        appStore.selectedMenu = null;
    }

    return (
        <div className="SubMenu shadow-sm w-64 h-screen bg-gray-100 border-r p-4">
            <div className="flex justify-between items-center">
                <p className="text-center font-bold my-3">{menu.text}</p>
                <span onClick={handleSubMenuClose} className="fa fa-times cursor-pointer"></span>
            </div>
            <hr />
            <div className="">
                {submenus.map((menu, index) => (
                    <div
                        key={`submenu_${index}`}
                        className={`cursor-pointer my-2 ${
                            location.pathname == menu.url
                                ? "text-yellow-500 font-bold"
                                : ""
                        }`}
                        onClick={() => goTo(menu.url)}
                        title={menu.text}
                    >
                        {menu.icon && <span className={`w-6 ${menu.icon}`}></span>}
                        <span className="ml-2">{menu.text}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default observer(SubMenu);
