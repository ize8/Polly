export const WidgetsAvailable = [
  {
    type: "TextOnly",
    name: "Text Only",
    description: "Displays any free text.",
    props: {
      domNode: "any valid HTML DOM element",
      text: "Simple text to be displayed"
    },
    defaultProps: {
      domNode: null,
      text: "Any text ..."
    }
  },
  {
    type: "StarRating",
    name: "Star Rating",
    description: "Displays a custom scale of stars.",
    props: {
      text: "Widget text",
      max: "The number of stars",
      value: "The starting value of rating."
    },
    defaultProps: {
      text: "Rate me as you wish",
      max: 10,
      value: 0
    }
  },
  {
    type: "FreeTextFeedback",
    name: "Free Text Feedback",
    description: "Allows feedback as free text.",
    props: {
      text: "Widget text",
      value: "Default text in the feedback box.",
      rows: "number of rows allowed"
    },
    defaultProps: {
      text: "Give me some feedback:",
      value: "",
      rows: 3
    }
  }
];
