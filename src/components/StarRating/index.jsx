import React from "react";
import { Paper } from "@material-ui/core";
import { Rating } from "@material-ui/lab";

export const StarRating = ({ text, max, value, updateProps }) => {
  return (
    <Paper
      style={{
        padding: "5px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
      variant="outlined"
      square
    >
      {text && <p style={{ fontSize: "1.3rem" }}>{text}</p>}
      <Rating
        name="rating"
        value={value}
        max={max}
        onChange={(event, newValue) => {
          updateProps({ value: newValue });
        }}
      />
      <span style={{ fontWeight: "bold" }}>{`${value || "0"}/${max}`}</span>
    </Paper>
  );
};
