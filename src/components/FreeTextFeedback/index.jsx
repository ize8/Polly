import React from "react";
import { Paper, TextField } from "@material-ui/core";

export const FreeTextFeedback = ({ text, value, updateProps, rows = 3 }) => {
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
        onChange={(event) => {
          updateProps({ value: event.target.value });
        }}
      />
    </Paper>
  );
};
