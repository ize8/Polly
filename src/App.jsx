import React from "react";
import { DragList } from "./components/DragList";
import { WidgetListProvider } from "./Context/WidgetListProvider";

export const App = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        paddingLeft: "50px"
      }}
    >
      <WidgetListProvider>
        <DragList />
      </WidgetListProvider>
    </div>
  );
};
