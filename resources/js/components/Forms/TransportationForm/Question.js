import React from "react";

export default function Question({ number, title, children }) {
    return (
        <div className="my-6 py-2 border-b">
            <div className="font-bold mb-2">
                <span>{number + ') '}</span>
                <span>{title}</span>
            </div>
            {children}
        </div>
    );
}
