import { Box } from "@material-ui/core";
import React from "react";

export default function AppTabs({ tab, setTab, tabs }) {
    const handleTabClick = (t) => {
        setTab(t.index);
    };
    return (
        <div className="flex justify-evenly items-center pb-3 mb-2 border-b">
            {tabs.map((t, i) => {
                if (t.show !== undefined && !t.show) {
                    return null;
                }

                const tabClass =
                    "rounded-full text-sm py-2 px-6 text-center cursor-pointer " +
                    (t.index === tab
                        ? "bg-gray-400 text-white "
                        : "border text-center");

                return (
                    <div
                        key={i}
                        className={tabClass}
                        onClick={() => handleTabClick(t)}
                    >
                        {t.label}
                    </div>
                );
            })}
        </div>
    );
}

export function AppTab(props) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} {...other}>
            {value === index && <Box p={3}>{children}</Box>}
        </div>
    );
}
