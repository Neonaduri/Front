import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { RESP } from "../../shared/response";
import apis from "../../shared/request";
import * as Sentry from "@sentry/react";

//action
const EMAILCHECK = "emailCheck";
const SIGNUP = "signup";
const ISLOGIN = "isLogin";
const GETLIKEDPOST = "getLikedPost";
const GETMYREVIEW = "getMyReview";
const CLICKWISHINMYSCRAP = "clickWishInMyscrap";
const DELETE_COMMENT_MYPAGE = "DELETE_COMMENT_MYPAGE";

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
const clickWishInMyscrap = createAction(CLICKWISHINMYSCRAP, (result) => ({
  result,
}));
const deleteCommentMypage = createAction(DELETE_COMMENT_MYPAGE, (reviewId) => ({
  reviewId,
}));

//middlewares
const emailCheckDB = (username) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await apis.axiosInstance.post("/idcheck", {
        userName: username,
      });
      // const response = RESP.IDCHECKPOST;
      console.log(response);
      if (response.status === 201) {
        dispatch(emailCheck(true));
      }
    } catch (err) {
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
        window.alert("회원가입 완료! 로그인 해주세요:)");
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
        // const token = response.token;
        localStorage.setItem("token", token);
      }
      if (localStorage.getItem("token")) {
        dispatch(isLoginDB());
        window.location.replace("/");
      }
    } catch (err) {
      Sentry.captureException(err);
      window.alert(err.response.data);
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
        dispatch(isLoginDB());
        history.replace("/");
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
        dispatch(isLoginDB());
        history.replace("/");
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  };
};

const getMyLikePostDB = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await apis.axiosInstance.get("/user/plans/like/1");
      // const response = RESP.MYPAGELIKEGET;
      if (response.status === 200) {
        dispatch(getLikedPost(response.data.postList));
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
        alert("프로필이 수정되었습니다.");
        window.location.replace("/");
      }
    } catch (err) {
      Sentry.captureException(err);
      console.log(err.response);
    }
  };
};

// 찜하기-마이페이지에서 내가 찜한 게시물 찜하기 클릭한 경우(찜하기 제거됨)
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

//내 댓글보기에서 리뷰삭제
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
      console.log("에러발생", err);
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
          console.log(review.reviewId, action.payload.reviewId);
          return review.reviewId !== parseInt(action.payload.reviewId);
        });
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
};

export { userAction };
