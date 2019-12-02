import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Router, Route } from "react-router-dom";
import App from "./App";
import { StoreProvider } from "./redux/store";
import history from "./utils/history";

ReactDOM.render(
  <StoreProvider>
    <Router history={history}>
      <Route component={App} />
    </Router>
  </StoreProvider>,
  document.getElementById("root")
);
