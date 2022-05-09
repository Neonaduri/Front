import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axiosInstance from "../../shared/request";
import { RESP } from "../../shared/response";
import jwtDecode from "jwt-decode";
import apis from "../../shared/request";

//action
const EMAILCHECK = "emailCheck";
const SIGNUP = "signup";
const ISLOGIN = "isLogin";
const GETLIKEDPOST = "getLikedPost";
const GETMYREVIEW = "getMyReview";

//init
const init = {
  list: [],
  emailCheck: null,
  isLogin: false,
  iLikedPost: null,
  myReview: null,
};

//action creators
const emailCheck = createAction(EMAILCHECK, (result) => ({ result }));
const signUp = createAction(SIGNUP, (result) => ({ result }));
const isLogin = createAction(ISLOGIN, (user) => ({ user }));
const getLikedPost = createAction(GETLIKEDPOST, (posts) => ({ posts }));
const getMyReview = createAction(GETMYREVIEW, (reviews) => ({ reviews }));

//middlewares
const emailCheckDB = (username) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await apis.axiosInstance.post("/api/idcheck", {
        userName: username,
      });
      // const response = RESP.IDCHECKPOST;
      if (response.status === 200) {
        dispatch(emailCheck(true));
      }
    } catch (err) {
      if (err.response.data.status === "BAD_REQUEST") {
        dispatch(emailCheck(false));
      }
    }
  };
};
const signUpDB = (username, nickName, password, passwordCheck) => {
  return async function (dispatch, getState, { history }) {
    const response = await apis.axiosInstance.post("/user/signup", {
      userName: username,
      nickName,
      password,
      passwordCheck,
    });
    // const response = RESP.SIGNUPPOST;
    if (response.status === 200) {
      window.alert("회원가입 완료! 로그인 해주세요:)");
      history.replace("/login");
    } else {
      console.log(response);
    }
  };
};
const logInDB = (username, password) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await apis.axiosInstance.post("/user/login", {
        userName: username,
        password,
      });
      // const response = RESP.LOGINPOST;
      console.log(response);
      if (response.status === 200) {
        const token = response.headers.authorization;
        localStorage.setItem("token", token);
      }
      if (localStorage.getItem("token")) {
        dispatch(isLoginDB());
        history.replace("/");
      }
    } catch (err) {
      console.log(err);
      window.alert(err.response.data.exception);
    }
  };
};
const isLoginDB = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await apis.axiosInstance.get("/api/islogin", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      // const response = RESP.ISLOGINGET;
      if (response.status === 200) {
        const targetUserName = response.data.userName;
        const targetProfileImg = response.data.profileImgUrl;
        let data;
        if (targetUserName.indexOf('"') !== -1) {
          const fixedUserName = targetUserName.substring(
            1,
            targetUserName.length - 1
          );
          const fixedProfileImg = targetProfileImg.substring(
            1,
            targetProfileImg.length - 1
          );
          data = {
            nickName: response.data.nickName,
            profileImg: fixedProfileImg,
            totalLike: response.data.totalLike,
            userName: fixedUserName,
          };
        } else {
          data = {
            nickName: response.data.nickName,
            profileImg: response.data.profileImgUrl,
            totalLike: response.data.totalLike,
            userName: response.data.userName,
          };
        }
        dispatch(isLogin(data));
        // 목데이터 교체할때 이거도 교체할 것!!
        // dispatch(isLogin(response));
      }
    } catch (err) {
      // console.log(err.response);
    }
  };
};
const kakaoLoginDB = (code) => {
  return async function (dispatch, getState, { history }) {
    const response = await apis.axiosInstance.get(
      `/user/kakao/callback?code=${code}`
    );
    console.log(response);
    if (response.status === 200) {
      const token = response.headers.authorization;
      localStorage.setItem("token", token);
    }
    if (localStorage.getItem("token")) {
      dispatch(isLoginDB());
      history.replace("/");
    }
  };
};
const googleLoginDB = (code) => {
  return async function (dispatch, getState, { history }) {
    console.log(code);
    const response = await apis.axiosInstance.get(
      `user/google/callback?code=${code}`
    );
    console.log(response);
    if (response.status === 200) {
      const token = response.headers.authorization;
      localStorage.setItem("token", token);
    }
    if (localStorage.getItem("token")) {
      dispatch(isLoginDB());
      history.replace("/");
    }
  };
};

const getMyLikePostDB = () => {
  return async function (dispatch, getState, { history }) {
    // const response = await apis.axiosInstance.get("/api/user/mypage/like");
    const response = RESP.MYPAGELIKEGET;
    if (response.status === 200) {
      dispatch(getLikedPost(response));
    }
  };
};
const getMyReviewDB = () => {
  return async function (dispatch, getState, { history }) {
    // const response = await apis.axiosInstance.get("/api/user/mypage/review");
    const response = RESP.MYREVIEWGET;
    if (response) {
      dispatch(getMyReview(response));
    }
  };
};

const editProfileDB = (formdata, config) => {
  return async function (dispatch, getState, { history }) {
    const response = await apis.axiosInstance.put(
      "/api/user/mypage",
      formdata,
      config
    );
    if (response.status === 200) {
      alert("프로필이 수정되었습니다.");
      history.replace("/mypage");
    }
  };
};

//reducer
export default handleActions(
  {
    [EMAILCHECK]: (state, action) =>
      produce(state, (draft) => {
        draft.emailCheck = action.payload.result;
      }),
    [ISLOGIN]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.user;
        draft.isLogin = true;
      }),
    [GETLIKEDPOST]: (state, action) =>
      produce(state, (draft) => {
        draft.iLikedPost = action.payload.posts;
      }),
    [GETMYREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.myReview = action.payload.reviews;
      }),
  },
  init
);

const userAction = {
  emailCheckDB,
  signUpDB,
  logInDB,
  isLoginDB,
  kakaoLoginDB,
  isLogin,
  googleLoginDB,
  emailCheck,
  getMyLikePostDB,
  getMyReviewDB,
  editProfileDB,
};

export { userAction };
