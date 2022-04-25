import "./App.css";
import { ConnectedRouter } from "connected-react-router";
import { Route } from "react-router";
import { history } from "../src/redux/store";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <>
      <ConnectedRouter history={history}>
        <Route path="/" exact component={MainPage} />
      </ConnectedRouter>
    </>
  );
}

export default App;
