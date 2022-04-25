import "./App.css";
import { ConnectedRouter } from "connected-react-router";
import { Route } from "react-router";
import { history } from "../src/redux/store";
import MainPage from "./pages/MainPage";
import Planning from "./pages/Planning";

function App() {
  return (
    <>
      <ConnectedRouter history={history}>
        <Route path="/" exact component={MainPage} />
        <Route path="/planning" component={Planning} />
      </ConnectedRouter>
    </>
  );
}

export default App;
