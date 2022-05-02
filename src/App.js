import "./App.css";
import { ConnectedRouter } from "connected-react-router";
import { Route } from "react-router";
import { history } from "./redux/store";
import MainPage from "./pages/MainPage";
import Planning from "./pages/Planning";
import MyCalendar from "./components/planning/MyClaendar";
import Grid from "./components/elements/Grid";

function App() {
  return (
    <>
      <Grid flex>
        <ConnectedRouter history={history}>
          <Route path="/" exact component={MainPage} />
          <Route path="/calendar" exact component={MyCalendar} />
          <Route path="/planning/:postId" component={Planning} />
        </ConnectedRouter>
      </Grid>
    </>
  );
}

export default App;
