import React, { useState, useEffect } from "react";
import { DragList } from "./components/DragList";
import { WidgetSelector } from "./components/WidgetSelector";
import { WidgetEditor } from "./components/WidgetEditor";
import { WidgetListProvider } from "./Context/WidgetListProvider";

export const Editor = () => {
  const [selectedWigetToAdd, setSelectedWidgetToAdd] = useState();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto auto auto",
        gridColumnGap: "10px",
        justifyContent: "center",
        alignItems: "start",
        alignContent: "start"
      }}
    >
      <WidgetSelector
        selected={selectedWigetToAdd}
        setSelected={setSelectedWidgetToAdd}
      />
      <WidgetListProvider>
        <DragList widgetToAdd={selectedWigetToAdd} />
        <WidgetEditor />
      </WidgetListProvider>
    </div>
  );
};
