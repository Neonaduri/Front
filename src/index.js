import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./redux/store";
import * as Sentry from "@sentry/react";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { BrowserTracing } from "@sentry/tracing";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./redux/store";

//센트리 설정
Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_REACT_DSN,
  integrations: [new BrowserTracing()],

  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,

  document.getElementById("root")
);

// -- serviceWorker --
serviceWorkerRegistration.register(); //웹 페이지를 열었을 때 설치 버튼이 생성되게 만들어준다.
