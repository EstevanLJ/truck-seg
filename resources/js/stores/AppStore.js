import React, { createContext } from "react";
import { useLocalStore } from "mobx-react";

export const AppStore = createContext();

function AppStoreProvider(props) {
    const store = useLocalStore(() => ({
        loading: false,

        user: undefined,
        setUser: (user) => {
            store.user = user;
        },
        userIsAdmin: () => {
            if (!store.user) {
                return;
            }

            return store.user.roles.find(
                (role) => role.name === "administrador"
            );
        },

        permissions: [],
        setPermissions: (permissions) => {
            store.permissions = permissions;
        },

        menus: [],
        setMenus: (menus) => {
            store.menus = menus;
        },
        selectedMenu: null,
        findMenu: (menus, path) => {
            for (let menu of menus) {
                if (menu.url === path) {
                    return {
                        menu: menu,
                        submenu: false,
                    };
                }

                if (menu.submenu && menu.submenu.length > 0) {
                    for (let submenu of menu.submenu) {
                        if (submenu.url === path) {
                            return {
                                menu: submenu,
                                submenu: menu,
                            };
                        }
                    }
                }
            }
        },
    }));

    return (
        <AppStore.Provider value={store}>{props.children}</AppStore.Provider>
    );
}

export default AppStoreProvider;
