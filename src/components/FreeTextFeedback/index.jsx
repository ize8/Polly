import React from "react";
import { Paper, TextField } from "@material-ui/core";
import { WidgetListContext } from "../../Context/WidgetListProvider";

export const FreeTextFeedback = ({ text, value, rows = 3, id }) => {
  const { updateWidget } = React.useContext(WidgetListContext);
  const onChange = (event) => {
    updateWidget(id)({ value: event.target.value });
  };
  return (
    <Paper
      style={{
        padding: "5px",
        fontSize: "1.3rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
      variant="outlined"
      square
    >
      {text && <p>{text}</p>}
      <TextField
        style={{ width: "100%" }}
        multiline
        rows={rows}
        variant="outlined"
        value={value}
        onChange={onChange}
      />
    </Paper>
  );
};
