import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import apis from "../../shared/request";
import * as Sentry from "@sentry/react";

//action
const EMAILCHECK = "emailCheck";
const SIGNUP = "signup";
const LOGIN = "login";
const ISLOGIN = "isLogin";
const GETLIKEDPOST = "getLikedPost";
const GETLIKEDNEXTPOST = "getLikedNextPost";
const GETMYREVIEW = "getMyReview";
const CLICKWISHINMYSCRAP = "clickWishInMyscrap";
const DELETE_COMMENT_MYPAGE = "DELETE_COMMENT_MYPAGE";
const LOADING = "loading";
const LOGOUT = "logout";
const DELETE_ACCOUNT = "deleteAccount";
const CHANGE_PASSWORD = "changePassword";

//init
const init = {
  list: [],
  emailCheck: null,
  isLogin: false,
  iLikedPost: null,
  myReview: null,
  paging: {},
  isLoading: false,
};

//action creators
const emailCheck = createAction(EMAILCHECK, (result) => ({ result }));
const signUp = createAction(SIGNUP, (result) => ({ result }));
const isLogin = createAction(ISLOGIN, (user) => ({ user }));
const login = createAction(LOGIN, (result) => ({ result }));
const changePassword = createAction(
  CHANGE_PASSWORD,
  (password, newPassword) => ({ password, newPassword })
);
const getLikedPost = createAction(GETLIKEDPOST, (posts) => ({ posts }));
const getLikedNextPost = createAction(GETLIKEDNEXTPOST, (posts) => ({ posts }));
const getMyReview = createAction(GETMYREVIEW, (reviews) => ({ reviews }));
const clickWishInMyscrap = createAction(CLICKWISHINMYSCRAP, (result) => ({
  result,
}));
const deleteCommentMypage = createAction(DELETE_COMMENT_MYPAGE, (reviewId) => ({
  reviewId,
}));
const loading = createAction(LOADING, (result) => ({ result }));
const logOut = createAction(LOGOUT, (result) => ({ result }));

//middlewares
const emailCheckDB = (username) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await apis.axiosInstance.post("/idcheck", {
        userName: username,
      });
      // const response = RESP.IDCHECKPOST;
      if (response.status === 201) {
        dispatch(emailCheck(true));
      }
    } catch (err) {
      console.log(err.response);
      Sentry.captureException(err);
      if (err.response.status === 400) {
        dispatch(emailCheck(false));
      }
    }
  };
};
const signUpDB = (username, nickName, password, passwordCheck) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await apis.axiosInstance.post("/user/signup", {
        userName: username,
        nickName,
        password,
        passwordCheck,
      });
      // const response = RESP.SIGNUPPOST;
      if (response.status === 201) {
        window.alert("???????????? ??????! ????????? ????????????:)");
        window.location.replace("/login");
      }
    } catch (err) {
      Sentry.captureException(err);
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
      if (response.status === 200) {
        const token = response.headers.authorization;
        localStorage.setItem("token", token);
        dispatch(login(true));
      }
      if (localStorage.getItem("token")) {
        window.location.replace("/");
      }
    } catch (err) {
      Sentry.captureException(err);
      window.alert(err.response.data.exception);
    }
  };
};
const isLoginDB = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await apis.axiosInstance.get("/islogin", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

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
      }
    } catch (err) {
      console.log("??????", err.response);
      localStorage.removeItem("token");
      dispatch(logOut());
      window.location.replace("/login");
      Sentry.captureException(err);
    }
  };
};
const kakaoLoginDB = (code) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await apis.axiosInstance.get(
        `/user/kakao/callback?code=${code}`
      );
      if (response.status === 200) {
        const token = response.headers.authorization;
        localStorage.setItem("token", token);
      }
      if (localStorage.getItem("token")) {
        window.location.replace("/");
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  };
};

const googleLoginDB = (code) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await apis.axiosInstance.get(
        `user/google/callback?code=${code}`
      );

      if (response.status === 200) {
        const token = response.headers.authorization;
        localStorage.setItem("token", token);
      }
      if (localStorage.getItem("token")) {
        window.location.replace("/");
      }
    } catch (err) {
      Sentry.captureException(err);
      console.log(err.response);
    }
  };
};

// ???????????? ??????
export const changePwdDB = (password, newPassword) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await apis.axiosInstance.put(`/updatePassword`, {
        password,
        newPassword,
      });

      if (response.status === 201) {
        alert("???????????? ????????? ?????????????????????!");
        localStorage.removeItem("token");
        window.location.replace("/login");
      }
    } catch (err) {
      Sentry.captureException(err);
      alert(err.response.data.errorMessage);
    }
  };
};

const getMyLikePostDB = (pageno) => {
  return async function (dispatch, getState, { history }) {
    dispatch(loading(true));
    let page;
    if (pageno === undefined) {
      page = 1;
    } else {
      page = pageno;
    }
    try {
      const response = await apis.axiosInstance.get(`/user/plans/like/${page}`);
      // const response = RESP.MYPAGELIKEGET;
      let paging = {
        start: page + 1,
        lastPage: response.data.islastPage,
      };
      if (response.status === 200) {
        if (page === 1) {
          dispatch(getLikedPost({ postList: response.data.postList, paging }));
        } else {
          dispatch(
            getLikedNextPost({ postList: response.data.postList, paging })
          );
        }
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  };
};
const getMyReviewDB = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await apis.axiosInstance.get("/user/review");
      // const response = RESP.MYREVIEWGET;
      if (response) {
        dispatch(getMyReview(response.data));
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  };
};

const editProfileDB = (formdata, config) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await apis.axiosInstance.put(
        "/user/mypage",
        formdata,
        config
      );
      if (response.status === 201) {
        alert("???????????? ?????????????????????.");
        window.location.replace("/mypage");
      }
    } catch (err) {
      Sentry.captureException(err);
      console.log(err.response);
    }
  };
};

export const deleteAccountDB = (token) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await apis.axiosInstance.delete("/withdrawal");
      if (response.status === 201) {
        alert("????????? ?????????????????????.");
        window.location.replace("/login");
      }
    } catch (err) {
      Sentry.captureException(err);
      console.log(err.response);
    }
  };
};

// ?????????-????????????????????? ?????? ?????? ????????? ????????? ????????? ??????(????????? ?????????)
const clickWishMyScrapDB = (postId) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await apis.axiosInstance.post(`/plans/like/${postId}`);
      if (response.status === 201) {
        dispatch(
          clickWishInMyscrap({ postId: postId, bool: response.data.like })
        );
      }
    } catch (err) {
      Sentry.captureException(err);
      console.log(err);
    }
  };
};

//??? ?????????????????? ????????????
export const deleteCommentInMypageDB = (reviewId) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await apis.axiosInstance.delete(
        `/detail/reviews/${reviewId}`
      );

      if (response.status === 200) {
        dispatch(deleteCommentMypage(reviewId));
      }
    } catch (err) {
      Sentry.captureException(err);
      console.log("????????????", err);
    }
  };
};

const logOutDB = () => {
  return async function (dispatch, getState, { history }) {
    localStorage.removeItem("token");
    dispatch(logOut());
    window.location.replace("/login");
  };
};

//reducer
export default handleActions(
  {
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.isLoading = action.payload.result;
      }),
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
        draft.iLikedPost = action.payload.posts.postList;
        draft.paging = action.payload.posts.paging;
        draft.isLoading = false;
      }),
    [GETLIKEDNEXTPOST]: (state, action) =>
      produce(state, (draft) => {
        draft.iLikedPost.push(...action.payload.posts.postList);
        draft.paging = action.payload.posts.paging;
        draft.isLoading = false;
      }),
    [GETMYREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.myReview = action.payload.reviews;
      }),
    [CLICKWISHINMYSCRAP]: (state, action) =>
      produce(state, (draft) => {
        if (action.payload.result.bool === false) {
          draft.iLikedPost.map((post) => {
            if (post.postId === parseInt(action.payload.result.postId)) {
              post.islike = false;
            }
          });
        } else {
          draft.iLikedPost.map((post) => {
            if (post.postId === parseInt(action.payload.result.postId)) {
              post.islike = true;
            }
          });
        }
      }),
    [DELETE_COMMENT_MYPAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.myReview = draft.myReview.filter((review) => {
          return review.reviewId !== parseInt(action.payload.reviewId);
        });
      }),
    [LOGIN]: (state, action) =>
      produce(state, (draft) => {
        draft.isLogin = true;
      }),
    [LOGOUT]: (state, action) =>
      produce(state, (draft) => {
        draft.isLogin = false;
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
  clickWishMyScrapDB,
  logOutDB,
};

export { userAction };
