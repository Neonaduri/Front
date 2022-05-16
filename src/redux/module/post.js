import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import axios from "axios";
import apis from "../../shared/request";
import * as Sentry from "@sentry/react";

// action
const GET_BEST_POST = "GET_BEST_POST";
const GET_LOCATION_POST = "GET_LOCATION_POST";
const GET_SEARCH_POST = "GET_SEARCH_POST";
const LAST_PAGE = "LAST_PAGE";
const TOTAL = "TOTAL";
const KEYWORD = "KEYWORD";
const CLICKWISHINMAIN = "clickWishInMain";
const CLICKWISHINSEARCH = "clickWishInsearch";

// initialState
const initialState = {
  bestList: [],
  locationList: [],
  searchList: [],
  islastPage: false,
  totalPage: 1,
  keyword: "",
  isLoading: false,
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

const islastPage = createAction(LAST_PAGE, (islastPage) => ({
  islastPage,
}));

const totalPage = createAction(TOTAL, (totalPage) => ({
  totalPage,
}));

const clickWishInMain = createAction(CLICKWISHINMAIN, (result) => ({ result }));
const clickWishInSearch = createAction(CLICKWISHINSEARCH, (result) => ({
  result,
}));

export const keywordDB = createAction(KEYWORD, (keyword) => ({
  keyword,
}));

// middleWares

//인기 여행플랜[메인]
export const getBestPostDB = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const token = localStorage.getItem("token");
      const response = await apis.axiosInstance.get(`/plans/best`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      if (response.status === 200) {
        dispatch(getBestPost(response.data));
      }
    } catch (err) {
      Sentry.captureException(err);
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
        `/plans/location/${location}/1`
      );
      if (response.status === 200) {
        dispatch(getLocationPost(response.data));
      }
    } catch (err) {
      Sentry.captureException(err);
      console.log("에러발생", err);
    }
  };
};

//검색 키워드 데이터요청[검색]
export const getKeywordPostDB = (keyword, pageno) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await apis.axiosInstance.get(
        `/plans/keyword/${keyword}/${pageno}`
      );
      console.log(response);
      if (response.status === 200) {
        dispatch(getSearchPost(response.data));
        dispatch(islastPage(response.data.islastPage));
        dispatch(totalPage(response.data.totalPage));
      }
    } catch (err) {
      Sentry.captureException(err);
      console.log("에러발생", err);
    }
  };
};

//테마별 조회 [메인]
export const getThemePostDB = (keyword) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await apis.axiosInstance.get(
        `/plans/theme/${keyword}/1`
      );

      if (response.status === 200) {
        dispatch(getSearchPost(response.data));
        history.push("/search");
      }
    } catch (err) {
      Sentry.captureException(err);
      console.log("에러발생", err);
    }
  };
};
// 찜하기-메인화면에서 인기게시물 찜한경우
export const clickWishPostDB = (postId) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await apis.axiosInstance.post(`/plans/like/${postId}`);
      if (response.status === 201) {
        dispatch(clickWishInMain({ postId: postId, bool: response.data.like }));
      }
    } catch (err) {
      Sentry.captureException(err);
      console.log(err);
    }
  };
};

// 찜하기-검색페이지에서 검색결과 찜한경우
export const clickWishSearchPostDB = (postId) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await apis.axiosInstance.post(`/plans/like/${postId}`);
      if (response.status === 201) {
        dispatch(
          clickWishInSearch({ postId: postId, bool: response.data.like })
        );
      }
    } catch (err) {
      Sentry.captureException(err);
      console.log(err);
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
        draft.isLoading = true;
      }),
    [GET_SEARCH_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.searchList = action.payload.searchList.resultList;
      }),
    [LAST_PAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.islastPage = action.payload.islastPage;
      }),
    [TOTAL]: (state, action) =>
      produce(state, (draft) => {
        draft.totalPage = action.payload.totalPage;
      }),
    [KEYWORD]: (state, action) =>
      produce(state, (draft) => {
        draft.keyword = action.payload.keyword;
      }),
    [CLICKWISHINMAIN]: (state, action) =>
      produce(state, (draft) => {
        if (action.payload.result.bool) {
          draft.bestList.map((post) => {
            if (post.postId === parseInt(action.payload.result.postId)) {
              post.likeCnt += 1;
              post.islike = true;
            }
          });
        } else {
          draft.bestList.map((post) => {
            if (post.postId === parseInt(action.payload.result.postId)) {
              post.likeCnt -= 1;
              post.islike = false;
            }
          });
        }
      }),
    [CLICKWISHINSEARCH]: (state, action) =>
      produce(state, (draft) => {
        if (action.payload.result.bool) {
          draft.searchList.map((post) => {
            if (post.postId === parseInt(action.payload.result.postId)) {
              post.likeCnt += 1;
              post.islike = true;
            }
          });
        } else {
          draft.searchList.map((post) => {
            if (post.postId === parseInt(action.payload.result.postId)) {
              post.likeCnt -= 1;
              post.islike = false;
            }
          });
        }
      }),
  },
  initialState
);

const actionCreators = {
  getBestPostDB,
  getLocationPostDB,
  islastPage,
};

export { actionCreators };
