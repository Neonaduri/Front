import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./redux/store";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./redux/store";
// -- serviceWorker --
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
// import ReactPWAInstallProvider from "react-pwa-install";

ReactDOM.render(
  // <ReactPWAInstallProvider enableLogging>
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  // </ReactPWAInstallProvider>,
  document.getElementById("root")
);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/public/service-worker.js")
      .then((registration) => {
        console.log("SW registered", registration);
        registration.pushManager.subscribe({ userVisibleOnly: true });
        Notification.requestPermission().then((p) => {
          console.log(p);
        });
      })
      .catch((e) => {
        console.log("SW registration failed: ", e);
      });
  });
}

serviceWorkerRegistration.register(); //웹 페이지를 열었을 때 설치 버튼이 생성되게 만들어준다.
