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

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_REACT_DSN,
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
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

serviceWorkerRegistration.register(); //웹 페이지를 열었을 때 설치 버튼이 생성되게 만들어준다.
