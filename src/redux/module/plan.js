import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axiosInstance from "../../shared/request";
import { RESP } from "../../shared/response";
import { getDatabase, push, ref, set, onValue } from "firebase/database";

//action
const CREATEROOM = "createRoom";
const GETROOM = "getRoom";
const COMPLETEPLAN = "completePlan";
const GETMYPLAN = "getMyPlan";

//init
const init = {
  list: [],
};

//action creators
const createRoom = createAction(CREATEROOM, (room) => ({ room }));
const getRoom = createAction(GETROOM, (room) => ({ room }));
const getMyPlan = createAction(GETMYPLAN, (myplan) => ({ myplan }));

//middlewares
const createRoomDB = (title, location, theme, startDate, endDate, dateCnt) => {
  return async function (dispatch, getState, { history }) {
    // const response = await axiosInstance.post("/api/makeplan", {
    //   startDate,
    //   endDate,
    //   dateCnt,
    //   title,
    //   location,
    //   theme,
    // });
    const response = RESP.MAKEPLANPOST;
    if (response.status === 200) {
      const db = getDatabase();
      set(ref(db, `${response.postId}`), {
        postId: response.postId,
        startDate,
        endDate,
        dateCnt,
        title,
        location,
        theme,
        islike: false,
      });
      dispatch(createRoom(response));
      history.push(`/planning/${response.postId}`);
    }
  };
};

const getRoomDB = (postId) => {
  return async function (dispatch, getState, { history }) {
    // const response = await axiosInstance.get(`/api/makeplan/${postId}`);
    const response = RESP.MAKEPLANGET;
    if (response.status === 200) {
      dispatch(createRoom(response));
    }
  };
};
const completePlanDB = (data) => {
  return async function (dispatch, getState, { history }) {
    // const response = await axiosInstance.put("/api/saveplan", data);
    const response = RESP.SAVEPLANPUT;
    if (response.status === 200) {
      history.replace("/uploadcomplete");
    }
  };
};

const getMyPlanDB = () => {
  return async function (dispatch, getState, { history }) {
    // const response = await axiosInstance.get("/api/user/getplan");
    const response = RESP.GETPLANGET;
    if (response.status === 200) {
      dispatch(getMyPlan(response));
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
        draft.list = action.payload.myplan;
      }),
  },
  init
);

const planAction = {
  createRoomDB,
  getRoomDB,
  completePlanDB,
  getMyPlanDB,
};

export { planAction };
