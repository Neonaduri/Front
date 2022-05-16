import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./redux/store";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import { Provider } from "react-redux";

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
    <App />
  </Provider>,
  document.getElementById("root")
);
