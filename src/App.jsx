import React from "react";
import { DragList } from "./components/DragList";

export const App = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        paddingLeft: "50px"
      }}
    >
      <DragList />
    </div>
  );
};
