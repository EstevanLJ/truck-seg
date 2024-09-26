import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import KanbanLane from "./KanbanLane";

export default function Kanban({
    setShowDealDrawer,
    cols,
    objects,
    reload
}) {
    return (
        <div style={{ height: "calc(100vh - 140px)" }}>
            <DndProvider backend={HTML5Backend}>
                <div className={`grid grid-cols-${cols} gap-2 my-3`}>
                    {objects.map((status, index) => (
                        <KanbanLane
                            key={`pipeline_status_${index}`}
                            status={status}
                            reload={reload}
                            onDealClick={(id) => setShowDealDrawer(id)}
                        ></KanbanLane>
                    ))}
                </div>
            </DndProvider>
        </div>
    );
}
