import "./App.css";
import { ConnectedRouter } from "connected-react-router";
import { Route } from "react-router";
import { history } from "../src/redux/store";
import MainPage from "./pages/MainPage";
import Map from "./components/shareMap/Map";

function App() {
  return (
    <>
      <ConnectedRouter history={history}>
        <Route path="/" exact component={Map} />
      </ConnectedRouter>
    </>
  );
}

export default App;
