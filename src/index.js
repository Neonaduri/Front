import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./redux/store";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import { Provider } from "react-redux";

Sentry.init({
  dsn: "https://068fb4fbacaa4a718a3fe1c545c510c2@o1248857.ingest.sentry.io/6409036",
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
