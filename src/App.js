import "./App.css";
import { ConnectedRouter } from "connected-react-router";
import { Route } from "react-router";
import { history } from "./redux/store";
import MainPage from "./pages/MainPage";
import Planning from "./pages/Planning";
import Calendar from "./pages/Calendar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Emailcheck from "./pages/Emailcheck";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { userAction } from "./redux/module/user";
import KakaoRedirect from "./pages/KakaoRedirect";

function App() {
  const dispatch = useDispatch();
  const is_session = localStorage.getItem("token") ? true : false;
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (is_session) {
      dispatch(userAction.isLoginDB());
    }
  }, []);
  return (
    <>
      <ConnectedRouter history={history}>
        <Route path="/" exact component={MainPage} />
        <Route path="/planning/:postId" exact component={Planning} />
        <Route path="/planning" exact component={Calendar} />
        <Route path="/login" exact component={Login} />
        <Route path="/emailcheck" exact component={Emailcheck} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/user/kakao/callback" component={KakaoRedirect} />
      </ConnectedRouter>
    </>
  );
}

export default App;
