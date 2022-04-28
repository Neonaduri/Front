import "./App.css";
import { ConnectedRouter } from "connected-react-router";
import { Route } from "react-router";
import { history } from "./redux/store";
import MainPage from "./pages/MainPage";
import Planning from "./pages/Planning";

function App({ memo_repo }) {
  return (
    <>
      <ConnectedRouter history={history}>
        <Route path="/" exact component={MainPage} />
        <Route path="/planning/:postId" component={Planning} />
      </ConnectedRouter>
    </>
  );
}

export default App;
