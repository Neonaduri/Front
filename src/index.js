import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./redux/store";
import { io } from "socket.io-client";
import { Provider } from "react-redux";

const socket = io.connect("http://localhost:3000"); //소켓연결
(() => {
  socket.emit("init", { name: "yeonjae" });

  socket.on("welcome", (msg) => {
    console.log(msg);
  });
})();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
