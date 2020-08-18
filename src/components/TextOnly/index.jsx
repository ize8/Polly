import React from "react";
import { Paper } from "@material-ui/core";

export const TextOnly = ({ domNode }) => {
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
      {domNode}
    </Paper>
  );
};
