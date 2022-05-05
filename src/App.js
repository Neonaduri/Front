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
import GoogleRedirect from "./pages/GoogleRedirect";
import UploadComplete from "./pages/UploadComplete";
import Myplan from "./pages/Myplan";
import Mypage from "./pages/Mypage";
import Editprofile from "./pages/Editprofile";

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
        <Route path="/user/google/callback" component={GoogleRedirect} />
        <Route path="/uploadcomplete" component={UploadComplete} />
        <Route path="/myplan" component={Myplan} />
        <Route path="/mypage" component={Mypage} />
        <Route path="/editprofile" component={Editprofile} />
      </ConnectedRouter>
    </>
  );
}

export default App;
