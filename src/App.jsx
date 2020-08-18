import React, { useState, useEffect } from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { DragList } from "./components/DragList";
import { StarRating } from "./components/StarRating";
import { TextOnly } from "./components/TextOnly";
import { FreeTextFeedback } from "./components/FreeTextFeedback";
import { nanoid } from "nanoid";

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

const template = [
  {
    type: "TextOnly",
    props: {
      domNode: (
        <span
          style={{
            height: "150px",
            width: "100%",
            border: "10px dotted red",
            backgroundColor: "salmon",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontFamily: "Courier New"
          }}
        >
          Drag me!
        </span>
      )
    }
  },
  {
    type: "StarRating",
    props: {
      text: "Rate this widget, would you?!",
      max: 10,
      value: 0
    }
  },
  {
    type: "TextOnly",
    props: { domNode: <p>Csirkek az udvaron udvarolnak....</p> }
  },
  {
    type: "FreeTextFeedback",
    props: {
      text: "Just some free text feedback:",
      value: "",
      rows: 2
    }
  }
];

export const App = () => {
  const getWidgetDom = (type, props) => {
    switch (type) {
      case "TextOnly":
        return <TextOnly {...props} />;
      case "StarRating":
        return <StarRating {...props} />;
      case "FreeTextFeedback":
        return <FreeTextFeedback {...props} />;
      default:
        return <></>;
    }
  };

  const [items, setItems] = useState(
    template.map((e) => {
      const id = nanoid(5);
      return {
        id: id,
        type: e.type,
        props: e.props
      };
    })
  );

  useEffect(() => {
    if (!items) return;
  }, [items]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          paddingLeft: "50px"
        }}
      >
        <DragList
          widgetList={items}
          setWidgetList={setItems}
          getWidgetDom={getWidgetDom}
        />
      </div>
    </MuiThemeProvider>
  );
};
