import "./App.css";
import { ConnectedRouter } from "connected-react-router";
import { Route, Router } from "react-router";
import { history } from "./redux/store";
import MainPage from "./pages/MainPage";
import Planning from "./pages/Planning";
import Calendar from "./pages/Calendar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Emailcheck from "./pages/Emailcheck";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { userAction } from "./redux/module/user";
import KakaoRedirect from "./pages/KakaoRedirect";
import GoogleRedirect from "./pages/GoogleRedirect";
import UploadComplete from "./pages/UploadComplete";
import Myplan from "./pages/Myplan";
import Mypage from "./pages/Mypage";
import styled, { ThemeProvider } from "styled-components";
import MobileFrame from "./components/common/MobileFrame";
import Search from "./pages/Search";
import BeforePlan from "./pages/BeforePlan";
import Splash from "./shared/Splash";
import Detail from "./pages/Detail";
import ReviewDetail from "./components/review/ReviewDetail";
import ScrollTop from "./components/common/ScrollTop";
import theme from "./assets/styles/theme";
import MyEdit from "./pages/MyEdit";
import Myscrap from "./pages/Myscrap";
import MyReview from "./pages/MyReview";
import SearchByLoca from "./components/search/SearchByLoca";

function App(props) {
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
      <ThemeProvider theme={theme}>
        <Wrap>
          <MobileFrame className="MobileFramePage">
            <Route path="/" exact component={MainPage} />
            <Route path="/planning/:postId" exact component={Planning} />
            <Route path="/planning/:postId/join" exact component={BeforePlan} />
            <Route path="/planning" exact component={Calendar} />
            <Route path="/login" exact component={Login} />
            <Route path="/emailcheck" exact component={Emailcheck} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/search" exact component={Search} />
            {/* <Route path="/search/location" exact component={SearchByLoca} /> */}
            <Route path="/user/kakao/callback" component={KakaoRedirect} />
            <Route path="/user/google/callback" component={GoogleRedirect} />
            <Route path="/uploadcomplete" component={UploadComplete} />
            <Route path="/myplan" component={Myplan} />
            <Route path="/mypage" component={Mypage} exact />
            <Route path="/mypage/edit" component={MyEdit} exact />
            <Route path="/mypage/scrap" component={Myscrap} exact />
            <Route path="/mypage/review" component={MyReview} exact />
            <Route path="/detail/:id" exact component={Detail} />
            <Route
              path="/detail/:productId/write"
              exact
              component={ReviewDetail}
            />
          </MobileFrame>
        </Wrap>
      </ThemeProvider>
    </>
  );
}

export default App;

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  .MobileFramePage {
    z-index: 999;
  }
`;
