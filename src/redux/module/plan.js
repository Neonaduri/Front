import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { RESP } from "../../shared/response";
import { getDatabase, push, ref, set } from "firebase/database";
import apis from "../../shared/request";

//action
const CREATEROOM = "createRoom";
const GETROOM = "getRoom";
const COMPLETEPLAN = "completePlan";
const GETMYPLAN = "getMyPlan";
const GETMYPLANNEXT = "getMyPlanNextPage";
const GETDETAILPLAN = "getDetailPlan";
const LOADING = "loading";

//init
const init = {
  list: [],
  myPlanList: [],
  detailPlan: [],
  paging: { start: null, lastPage: false },
  isLoading: false,
};

//action creators
const createRoom = createAction(CREATEROOM, (room) => ({ room }));
const getRoom = createAction(GETROOM, (room) => ({ room }));
const getMyPlanPage1 = createAction(GETMYPLAN, (myplan, paging) => ({
  myplan,
  paging,
}));
const getMyPlanNextPage = createAction(GETMYPLANNEXT, (myplan, paging) => ({
  myplan,
  paging,
}));
const getDetailPlan = createAction(GETDETAILPLAN, (detailPlan) => ({
  detailPlan,
}));
const loading = createAction(LOADING, (isLoading) => ({ isLoading }));

//middlewares
const createRoomDB = (title, location, theme, startDate, endDate, dateCnt) => {
  return async function (dispatch, getState, { history }) {
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
    // const response = RESP.MAKEPLANPOST;
    console.log(response);
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
      // set(ref(db, `${response.postId}`), {
      //   postId: response.postId,
      //   startDate: response.startDate,
      //   endDate: response.endDate,
      //   dateCnt: response.dateCnt,
      //   title: response.postTitle,
      //   location: response.location,
      //   theme: response.theme,
      //   islike: false,
      // });
      dispatch(createRoom(response.data));
      // dispatch(createRoom(response));
      history.push(`/planning/${response.data.postId}`);
      // history.push(`/planning/${response.postId}`);
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
      // dispatch(createRoom(response));
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
    console.log(response);
    if (response.status === 200) {
      alert("성공");
      history.replace("/uploadcomplete");
    }
  };
};

const getMyPlanPage1DB = () => {
  return async function (dispatch, getState, { history }) {
    dispatch(loading(true));
    const response = await apis.axiosInstance.get("/api/user/getplan/1");
    // const response = RESP.GETPLANGET;
    let paging = {
      start: 2,
      lastPage: response.data.islastPage,
    };
    if (response.status === 200) {
      dispatch(getMyPlanPage1(response.data.myplanList, paging));
    }
  };
};

const getMyPlanNextPageDB = (page) => {
  return async function (dispatch, getState, { history }) {
    dispatch(loading(true));
    const response = await apis.axiosInstance.get(`/api/user/getplan/${page}`);
    let paging = {
      start: page + 1,
      lastPage: response.data.islastPage,
    };
    if (response.status === 200) {
      dispatch(getMyPlanNextPage(response.data.myplanList, paging));
    }
  };
};

const deleteMyPlanDB = (postId) => {
  return async function (dispatch, getState, { history }) {
    console.log(postId);
    const response = await apis.axiosInstance.delete(
      `/api/user/delplan/${postId}`
    );
    // const response = RESP.DELPLANDELETE;
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
    const response = await apis.axiosInstance.get(`/api/detail/${postId}`);
    // const response = RESP.DETAILPOSTIDGET;
    console.log(response);
    if (response) {
      dispatch(getDetailPlan(response.data));
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
        draft.paging = action.payload.paging;
        draft.isLoading = false;
      }),
    [GETMYPLANNEXT]: (state, action) =>
      produce(state, (draft) => {
        draft.myPlanList.push(...action.payload.myplan);
        draft.paging = action.payload.paging;
        draft.isLoading = false;
      }),
    [GETDETAILPLAN]: (state, action) =>
      produce(state, (draft) => {
        draft.detailPlan = action.payload.detailPlan;
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.isLoading = action.payload.isLoading;
      }),
  },
  init
);

const planAction = {
  createRoomDB,
  getRoomDB,
  completePlanDB,
  getMyPlanPage1DB,
  getMyPlanNextPageDB,
  deleteMyPlanDB,
  exitBrowserOnPlanDB,
  getDetailPlanDB,
};

export { planAction };
