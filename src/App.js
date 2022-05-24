import "./App.css";
import { Route, Router } from "react-router";
import MainPage from "./pages/MainPage";
import Planning from "./pages/Planning";
import Calendar from "./pages/Calendar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Emailcheck from "./pages/Emailcheck";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { useDispatch } from "react-redux";
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
import Detail from "./pages/Detail";
import ReviewDetail from "./components/review/ReviewDetail";
import theme from "./assets/styles/theme";
import MyEdit from "./pages/MyEdit";
import Myscrap from "./pages/Myscrap";
import MyReview from "./pages/MyReview";
import PC from "./static/images/PC.png";
import step1 from "./static/images/step1.png";
import step2 from "./static/images/step2.png";
import step3 from "./static/images/step3.png";
import prize1 from "./static/images/prize1.png";
import prize2 from "./static/images/prize2.png";
import prize3 from "./static/images/prize3.png";
import termtext from "./static/images/termtext.png";
import favicon from "./static/images/icon/favicon.png";

function App(props) {
  const dispatch = useDispatch();
  const is_session = localStorage.getItem("token") ? true : false;

  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  useEffect(() => {
    if (is_session) {
      dispatch(userAction.isLoginDB());
    }
    setScreenSize();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <HelmetProvider>
        <Helmet>
          <title>너나들이 | 함께만든 우리만의 여행</title>
          <link rel="icon" href={favicon} />
        </Helmet>
      </HelmetProvider>

      <Fullscreen>
        <Textdiv>
          <img src={termtext} />
        </Textdiv>
        <Imgdiv1>
          <img src={step1} />
          <img src={step2} />
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSf0kLKK-rQzy0jgcxsIXGRzv659r0iTUlpjWCtYouuBaCzXaw/viewform"
            target="_black"
          >
            <img src={step3} />
          </a>
        </Imgdiv1>
        <Imgdiv2>
          <img src={prize1} />
          <img src={prize2} />
          <img src={prize3} />
        </Imgdiv2>
        <Wrap>
          <MobileFrame className="MobileFramePage">
            <Route path="/" exact component={MainPage} />
            <Route path="/planning/:postId" exact component={Planning} />
            <Route path="/planning" exact component={Calendar} />
            <Route path="/login" exact component={Login} />
            <Route path="/emailcheck" exact component={Emailcheck} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/search" exact component={Search} />
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
      </Fullscreen>
    </ThemeProvider>
  );
}

export default App;

const Textdiv = styled.div`
  position: absolute;
  top: 29.5%;
  left: 37%;
  img {
    width: 53%;
  }
`;

const Imgdiv1 = styled.div`
  position: absolute;
  top: 38%;
  left: 15%;
  img {
    width: 17%;
  }
`;
const Imgdiv2 = styled.div`
  position: absolute;
  top: 68%;
  left: 15%;
  img {
    width: 17%;
  }
`;

const Wrap = styled.div`
  width: 100%;
  height: auto;
  max-height: 100%;
`;

const Fullscreen = styled.div`
  background-image: url(${PC});
  background-position: contain;
  /* cover => containㅂㅏ꿈(머리잘리는거 방지...) */
  background-size: cover;
  background-repeat: no-repeat;
  margin: auto;
  /* margin-bottom: 30px; */
  display: flex;
  ::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 540px) {
    justify-content: center;
    overflow: hidden auto;
  }
  @media (max-width: 1579px) and (min-width: 541px) {
    justify-content: flex-end;
    overflow: hidden auto;
  }
  @media (min-width: 1580px) {
    overflow: hidden auto;
  }
`;
