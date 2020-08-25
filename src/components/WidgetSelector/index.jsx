import React from "react";

import { WidgetsAvailable } from "../../Context/WidgetsAvailable";
import { getWidgetDom } from "../../Context/WidgetListProvider";
import { Paper } from "@material-ui/core";
import { nanoid } from "nanoid";

export const WidgetSelector = ({ selected, setSelected }) => {
  const onSelect = (type) => {
    if (selected?.type === type) {
      setSelected(null);
      return;
    }
    const widgetTemplate = WidgetsAvailable.find((e) => e.type === type);
    const widget = {
      props: { ...widgetTemplate.defaultProps },
      type: type
    };
    setSelected(widget);
  };
  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "auto",
        gridRowGap: "5px",
        paddingTop: "5px",
        paddingLeft: "5px"
      }}
    >
      <h2>Select a widget to add</h2>
      {WidgetsAvailable.map((e) => (
        <Paper
          key={e.type}
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "5px",
            border:
              selected?.type === e.type ? "1px solid gold" : "0px solid gold"
          }}
          onClick={() => onSelect(e.type)}
        >
          <span style={{ fontWeight: "bold", color: "gold" }}>{e.name}</span>
          <i style={{ fontSize: "0.7rem" }}>{e.description}</i>
        </Paper>
      ))}
    </div>
  );
};
