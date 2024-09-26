import React, { createContext } from "react";
import { useLocalStore } from "mobx-react";

export const TransportationFormStore = createContext();

function TransportationFormStoreProvider(props) {
    const store = useLocalStore(() => ({
        goodsTypes: undefined,
    }));

    return (
        <TransportationFormStore.Provider value={store}>{props.children}</TransportationFormStore.Provider>
    );
}

export default TransportationFormStoreProvider;
