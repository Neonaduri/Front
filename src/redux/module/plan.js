import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { getDatabase, ref, set } from "firebase/database";
import apis from "../../shared/request";
import * as Sentry from "@sentry/react";

//action
const CREATEROOM = "createRoom";
const GETROOM = "getRoom";
const COMPLETEPLAN = "completePlan";
const GETMYPLAN = "getMyPlan";
const GETMYPLANNEXT = "getMyPlanNextPage";
const GETDETAILPLAN = "getDetailPlan";
const DELETEMYPLAN = "deleteMyPlan";
const LOADING = "loading";
const CLICKWISHINDETAIL = "clickWishInDetail";

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
const deleteMyPlan = createAction(DELETEMYPLAN, (postId) => ({ postId }));
const clickWishInDetail = createAction(CLICKWISHINDETAIL, (result) => ({
  result,
}));

//middlewares
const createRoomDB = (title, location, theme, startDate, endDate, dateCnt) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await apis.axiosInstance.post(
        "/plans",
        {
          startDate,
          endDate,
          dateCnt,
          postTitle: title.value,
          location,
          theme,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (response.status === 201) {
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
    } catch (err) {
      Sentry.captureException(err);
    }
  };
};

const getRoomDB = (postId) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await apis.axiosInstance.get(`/plans/${postId}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      if (response.status === 200) {
        dispatch(createRoom(response.data));
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  };
};
const completePlanDB = (data) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await apis.axiosInstance.put("/plans/save", data, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      // const response = RESP.SAVEPLANPUT;
      if (response.status === 201) {
        history.replace("/uploadcomplete");
      }
    } catch (err) {
      Sentry.captureException(err);
      console.log(err.response);
    }
  };
};

const getMyPlanPage1DB = () => {
  return async function (dispatch, getState, { history }) {
    try {
      dispatch(loading(true));
      const response = await apis.axiosInstance.get("/user/plans/1");
      // const response = RESP.GETPLANGET;
      let paging = {
        start: 2,
        lastPage: response.data.islastPage,
      };
      if (response.status === 200) {
        dispatch(getMyPlanPage1(response.data.myplanList, paging));
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  };
};

const getMyPlanNextPageDB = (page) => {
  return async function (dispatch, getState, { history }) {
    try {
      dispatch(loading(true));
      const response = await apis.axiosInstance.get(`/user/plans/${page}`);
      let paging = {
        start: page + 1,
        lastPage: response.data.islastPage,
      };
      if (response.status === 200) {
        dispatch(getMyPlanNextPage(response.data.myplanList, paging));
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  };
};

const deleteMyPlanDB = (postId) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await apis.axiosInstance.delete(`/user/plans/${postId}`);
      // const response = RESP.DELPLANDELETE;
      if (response.status === 200) {
        dispatch(deleteMyPlan(postId));
      }
    } catch (err) {
      Sentry.captureException(err);
      console.log(err);
    }
  };
};

const exitBrowserOnPlanDB = (postId) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await apis.axiosInstance.delete(`/plans/${postId}`);
    } catch (err) {
      Sentry.captureException(err);
    }
  };
};

const getDetailPlanDB = (postId) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await apis.axiosInstance.get(`/plans/detail/${postId}`);
      // const response = RESP.DETAILPOSTIDGET;
      console.log(response);
      if (response.status === 200) {
        dispatch(getDetailPlan(response.data));
      }
    } catch (err) {
      Sentry.captureException(err);
      console.log(err);
    }
  };
};

// 찜하기-상세페이지에서 검색결과 찜한경우
const clickWishDetailPostDB = (postId) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await apis.axiosInstance.post(`/plans/like/${postId}`);
      if (response.status === 201) {
        dispatch(clickWishInDetail(response.data.like));
      }
    } catch (err) {
      Sentry.captureException(err);
      console.log(err);
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
    [DELETEMYPLAN]: (state, action) =>
      produce(state, (draft) => {
        const newMyPlanList = draft.myPlanList.filter((post) => {
          return post.postId !== parseInt(action.payload.postId);
        });
        draft.myPlanList = newMyPlanList;
      }),
    [CLICKWISHINDETAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.detailPlan.islike = action.payload.result;
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
  clickWishDetailPostDB,
};

export { planAction };
