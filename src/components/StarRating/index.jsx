import React, { useEffect } from "react";
import { Paper } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { WidgetListContext } from "../../Context/WidgetListProvider";

export const StarRating = ({ text, max, value, id }) => {
  const { updateWidget } = React.useContext(WidgetListContext);

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
        name={id}
        value={value}
        max={max}
        onChange={(event, value) => updateWidget(id)({ value })}
      />
      <span style={{ fontWeight: "bold" }}>{`${value || "0"}/${max}`}</span>
    </Paper>
  );
};
