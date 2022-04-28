import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";
import memo_repo from "./service/memo_repo";

const Memo_repo = new memo_repo();

ReactDOM.render(
  <Provider store={store}>
    <App memo_repo={Memo_repo} />
  </Provider>,
  document.getElementById("root")
);
