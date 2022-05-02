import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axiosInstance from "../../shared/request";
import { RESP } from "../../shared/response";

//action
const CREATEROOM = "createRoom";
const GETROOM = "getRoom";

//init
const init = {
  list: [],
};

//action creators
const createRoom = createAction(CREATEROOM, (room) => ({ room }));
const getRoom = createAction(GETROOM, (room) => ({ room }));

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
    dispatch(createRoom(response));
    history.push(`/planning/${response.postId}`);
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

//reducer
export default handleActions(
  {
    [CREATEROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.room;
      }),
  },
  init
);

const planAction = {
  createRoomDB,
  getRoomDB,
};

export { planAction };
