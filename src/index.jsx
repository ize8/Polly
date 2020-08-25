import React from "react";
import { render } from "react-dom";
import { Editor } from "./Editor";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import "./style.css";

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

render(
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Editor />
  </MuiThemeProvider>,
  document.getElementById("root")
);
