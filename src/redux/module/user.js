import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axiosInstance from "../../shared/request";
import { RESP } from "../../shared/response";

//action
const EMAILCHECK = "emailCheck";
const SIGNUP = "signup";
const ISLOGIN = "isLogin";

//init
const init = {
  list: [],
  emailCheck: null,
  isLogin: false,
};

//action creators
const emailCheck = createAction(EMAILCHECK, (result) => ({ result }));
const signUp = createAction(SIGNUP, (result) => ({ result }));
const isLogin = createAction(ISLOGIN, (user) => ({ user }));

//middlewares
const emailCheckDB = (username) => {
  return async function (dispatch, getState, { history }) {
    // const response = await axiosInstance.post("/api/idcheck", {
    //   username,
    // });
    const response = RESP.IDCHECKPOST;
    if (response.status === 200) {
      dispatch(emailCheck(true));
    } else {
      dispatch(emailCheck(false));
    }
  };
};
const signUpDB = (username, nickName, password, passwordCheck) => {
  return async function (dispatch, getState, { history }) {
    // const response = await axiosInstance.post("/user/signup", {
    //   username,
    //   nickName,
    //   password,
    //   passwordCheck,
    // });
    const response = RESP.SIGNUPPOST;
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
    // const response = await axiosInstance.post("/user/login", {
    //   username,
    //   password,
    // });
    const response = RESP.LOGINPOST;
    if (response.status === 200) {
      const token = response.token;
      localStorage.setItem(token, token);
      dispatch(isLoginDB());
      history.replace("/");
    }
  };
};
const isLoginDB = () => {
  return async function (dispatch, getState, { history }) {
    // const response = await axiosInstance.get("/api/islogin");
    const response = RESP.ISLOGINGET;
    if (response.status === 200) {
      dispatch(isLogin(response));
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
  },
  init
);

const userAction = {
  emailCheckDB,
  signUpDB,
  logInDB,
  isLoginDB,
};

export { userAction };
