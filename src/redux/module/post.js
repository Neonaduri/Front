import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import axios from "axios";
import apis from "../../shared/request";

// action
const GET_BEST_POST = "GET_BEST_POST";
const GET_LOCATION_POST = "GET_LOCATION_POST";
const GET_SEARCH_POST = "GET_SEARCH_POST";

// initialState
const initialState = {
  bestList: [],
  locationList: [],
  searchList: [],
  paging: { start: null, next: null, islastPage: false },
  is_loading: false,
};

// actionCreators
const getBestPost = createAction(GET_BEST_POST, (bestList) => ({
  bestList,
}));

const getLocationPost = createAction(GET_LOCATION_POST, (locationList) => ({
  locationList,
}));

export const getSearchPost = createAction(GET_SEARCH_POST, (searchList) => ({
  searchList,
}));

// middleWares

//인기 여행플랜[메인]
export const getBestPostDB = () => {
  return async function (dispatch, getState, { history }) {
    const token = localStorage.getItem("token");

    try {
      const response = await apis.axiosInstance.get(`/api/planning/best`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      if (response.status === 200) {
        console.log(response);
        dispatch(getBestPost(response.data));
      }
    } catch (err) {
      console.log("에러!!", err);
    }
  };
};

//지역별 여행플랜[메인]
//서울 기본값, 버튼 누를때마다 location 넘겨주기

export const getLocationPostDB = (location, pageno) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await apis.axiosInstance.get(
        `/api/planning/location/${location}/1`
      );
      if (response.status === 200) {
        console.log(response);
        dispatch(getLocationPost(response.data));
      }
    } catch (err) {
      console.log("에러발생", err);
    }
  };
};

//검색 키워드 데이터요청[검색]
export const getKeywordPostDB = (keyword, pageno) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await apis.axiosInstance.get(
        `/api/search/${keyword}/${pageno}`
      );

      let paging = {
        start: 2,
        next: 3,
        lastPage: response.data.last,
      };

      if (response.status === 200) {
        const page = response.data.islastPage;
        console.log(page);
        dispatch(getSearchPost(response.data, paging));
        // if (page) return null;
      }
    } catch (err) {
      console.log("에러발생", err);
    }
  };
};

//테마별 조회 [메인]
export const getThemePostDB = (keyword) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await apis.axiosInstance.get(
        `/api/planning/theme/${keyword}/1`
      );

      if (response.status === 200) {
        console.log(response);
        dispatch(getLocationPost(response.data));
      }
    } catch (err) {
      console.log("에러발생", err);
    }
  };
};

// reducer
export default handleActions(
  {
    [GET_BEST_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.bestList = action.payload.bestList;
      }),
    [GET_LOCATION_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.locationList = action.payload.locationList;
      }),
    [GET_SEARCH_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.searchList.push(...action.payload.searchList.resultList);
      }),
  },
  initialState
);

const actionCreators = {
  getBestPostDB,
  getLocationPostDB,
};

export { actionCreators };
