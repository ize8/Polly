import React from "react";
import { Paper } from "@material-ui/core";

export const TextOnly = ({ domNode }) => {
  return (
    <Paper
      style={{
        fontSize: "1.3rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%"
      }}
      variant="outlined"
      square
    >
      {domNode}
    </Paper>
  );
};
