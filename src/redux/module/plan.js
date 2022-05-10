import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axiosInstance from "../../shared/request";
import { RESP } from "../../shared/response";
import { getDatabase, push, ref, set, onValue } from "firebase/database";
import apis from "../../shared/request";

//action
const CREATEROOM = "createRoom";
const GETROOM = "getRoom";
const COMPLETEPLAN = "completePlan";
const GETMYPLAN = "getMyPlan";
const GETDETAILPLAN = "getDetailPlan";

//init
const init = {
  list: [],
  myPlanList: [],
  detailPlan: [],
};

//action creators
const createRoom = createAction(CREATEROOM, (room) => ({ room }));
const getRoom = createAction(GETROOM, (room) => ({ room }));
const getMyPlan = createAction(GETMYPLAN, (myplan) => ({ myplan }));
const getDetailPlan = createAction(GETDETAILPLAN, (detailPlan) => ({
  detailPlan,
}));

//middlewares
const createRoomDB = (title, location, theme, startDate, endDate, dateCnt) => {
  return async function (dispatch, getState, { history }) {
    console.log(title, location, theme, startDate, endDate, dateCnt);
    const response = await apis.axiosInstance.post(
      "/api/makeplan",
      {
        startDate,
        endDate,
        dateCnt,
        postTitle: title,
        location,
        theme,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    console.log(response);
    // const response = RESP.MAKEPLANPOST;
    if (response.status === 200) {
      const db = getDatabase();
      set(ref(db, `${response.data.postId}`), {
        postId: response.data.postId,
        startDate: response.data.startDate,
        endDate: response.data.endDate,
        dateCnt: response.data.dateCnt,
        title: response.data.postTitle,
        location: response.data.location,
        theme: response.data.theme,
        islike: false,
      });
      dispatch(createRoom(response.data));
      history.push(`/planning/${response.data.postId}`);
    }
  };
};

const getRoomDB = (postId) => {
  return async function (dispatch, getState, { history }) {
    const response = await apis.axiosInstance.get(`/api/makeplan/${postId}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    // const response = RESP.MAKEPLANGET;
    console.log(response);
    if (response.status === 200) {
      dispatch(createRoom(response.data));
    }
  };
};
const completePlanDB = (data) => {
  return async function (dispatch, getState, { history }) {
    console.log(data);
    const response = await apis.axiosInstance.put("/api/saveplan", data, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    // const response = RESP.SAVEPLANPUT;
    if (response.status === 200) {
      alert("성공");
      history.replace("/uploadcomplete");
    }
  };
};

const getMyPlanDB = () => {
  return async function (dispatch, getState, { history }) {
    // const response = await apis.axiosInstance.get("/api/user/getplan");
    const response = RESP.GETPLANGET;
    console.log(response);
    if (response) {
      dispatch(getMyPlan(response));
    }
  };
};
const deleteMyPlanDB = (postId) => {
  return async function (dispatch, getState, { history }) {
    console.log(postId);
    // const response = await apis.axiosInstance.delete(
    //   `/api/user/delplan/${postId}`
    // );
    const response = RESP.DELPLANDELETE;
    if (response.status === 200) {
      history.push("/myplan");
    }
  };
};

const exitBrowserOnPlanDB = (postId) => {
  return async function (dispatch, getState, { history }) {
    const response = await apis.axiosInstance.delete(`/api/makeplan/${postId}`);
    console.log(response);
  };
};

const getDetailPlanDB = (postId) => {
  return async function (dispatch, getState, { history }) {
    // const response = await apis.axiosInstance.get(`/api/detail/${postId}`);
    const response = RESP.DETAILPOSTIDGET;
    if (response) {
      dispatch(getDetailPlan(response));
    }
  };
};

//reducer
export default handleActions(
  {
    [CREATEROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.room;
      }),
    [GETMYPLAN]: (state, action) =>
      produce(state, (draft) => {
        draft.myPlanList = action.payload.myplan;
      }),
    [GETDETAILPLAN]: (state, action) =>
      produce(state, (draft) => {
        draft.detailPlan = action.payload.detailPlan;
      }),
  },
  init
);

const planAction = {
  createRoomDB,
  getRoomDB,
  completePlanDB,
  getMyPlanDB,
  deleteMyPlanDB,
  exitBrowserOnPlanDB,
  getDetailPlanDB,
};

export { planAction };
