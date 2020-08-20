import React, { useState } from "react";
import { StarRating } from "../components/StarRating";
import { TextOnly } from "../components/TextOnly";
import { FreeTextFeedback } from "../components/FreeTextFeedback";
import { nanoid } from "nanoid";

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
    props: {
      domNode: (
        <p style={{ paddingLeft: "10px", paddingRight: "10px" }}>
          Csirkek az udvaron udvarolnak....
        </p>
      )
    }
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

export const WidgetListContext = React.createContext();

export const WidgetListProvider = (props) => {
  const [selectedId, setSelectedId] = useState(null);
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

  const updateWidget = (id) => (newProps) => {
    const newList = items.map((e) => {
      if (e.id === id) return { ...e, props: { ...e.props, ...newProps } };
      return e;
    });
    setItems(newList);
  };

  const removeWidget = (id) => {
    console.log("Remove widget id:", id);
    setItems(items.filter((e) => e.id !== id));
  };

  const selectWidget = (id) => {
    console.log("Selected widget id:", id);
    setSelectedId(id);
  };

  const insertWidget = (id) => {
    console.log("Insert widget id:", id);
    const index = items.findIndex((e) => e.id === id);
    const newWidget = {
      id: nanoid(5),
      type: "TextOnly",
      props: {
        domNode: <p>You just added me!</p>
      }
    };
    setItems([
      ...items.slice(0, index + 1),
      newWidget,
      ...items.slice(index + 1)
    ]);
  };
  return (
    <WidgetListContext.Provider
      value={{
        widgetList: items,
        setWidgetList: setItems,
        getWidgetDom,
        selectedId,
        setSelectedId,
        removeWidget,
        insertWidget,
        updateWidget,
        selectWidget
      }}
    >
      {props.children}
    </WidgetListContext.Provider>
  );
};
