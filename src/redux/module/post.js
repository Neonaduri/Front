import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import apis from "../../shared/request";
import * as Sentry from "@sentry/react";

// action
const LOADING = "loading";
const GET_BEST_POST = "GET_BEST_POST";
const GET_LOCATION_POST = "getLocationMain";
const GET_SEARCH_POST = "GET_SEARCH_POST";
const GET_SEARCH_NEXT_POST = "GET_SEARCH_NEXT_POST";
const LAST_PAGE = "LAST_PAGE";
const KEYWORD = "KEYWORD";
const CLICKWISHINMAIN = "clickWishInMain";
const CLICKWISHINSEARCH = "clickWishInsearch";

// initialState
const initialState = {
  bestList: [],
  locationList: [],
  searchList: [],
  paging: { start: null, isLastPage: false },
  keyword: "서울",
  isLoading: false,
  paging: {},
};

// actionCreators
const getBestPost = createAction(GET_BEST_POST, (bestList) => ({
  bestList,
}));
const loading = createAction(LOADING, (isLoading) => ({ isLoading }));

const getLocationPost = createAction(GET_LOCATION_POST, (locationList) => ({
  locationList,
}));

export const getSearchPost = createAction(GET_SEARCH_POST, (searchList) => ({
  searchList,
}));

const getSearchNextPost = createAction(GET_SEARCH_NEXT_POST, (searchList) => ({
  searchList,
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
      // if (response.status === 200) {
      console.log(response);
      dispatch(getBestPost(response.data));
      // }
    } catch (err) {
      Sentry.captureException(err);
      console.log("에러!!", err);
    }
  };
};

//지역별 여행플랜[메인]
//서울 기본값, 버튼 누를때마다 location 넘겨주기
export const getLocationPostDB = (location) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await apis.axiosInstance.get(
        `/plans/location/${location}/1`
      );
      if (response.status === 200) {
        dispatch(getLocationPost(response.data.planList));
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
    dispatch(loading(true));
    let page;
    if (pageno === undefined) {
      page = 1;
    } else {
      page = pageno;
    }
    try {
      const response = await apis.axiosInstance.get(
        `/plans/keyword/${keyword}/${page}`
      );
      let paging = {
        start: page + 1,
        lastpage: response.data.islastPage,
      };
      console.log("getKeyword", response);
      if (response.status === 200) {
        if (page === 1) {
          dispatch(getSearchPost({ planList: response.data.planList, paging }));
        } else {
          dispatch(
            getSearchNextPost({ planList: response.data.planList, paging })
          );
        }
      }
    } catch (err) {
      Sentry.captureException(err);
      console.log("에러발생", err);
    }
  };
};

//테마별 조회 [메인]
export const getThemePostDB = (theme, pageno) => {
  return async function (dispatch, getState, { history }) {
    dispatch(loading(true));
    let page;
    if (pageno === undefined) {
      page = 1;
    } else {
      page = pageno;
    }
    try {
      const response = await apis.axiosInstance.get(
        `/plans/theme/${theme}/${page}`
      );
      console.log("getTheme", response);
      let paging = {
        start: page + 1,
        lastpage: response.data.islastPage,
      };
      if (response.status === 200) {
        if (page === 1) {
          dispatch(getSearchPost({ planList: response.data.planList, paging }));
        } else {
          dispatch(
            getSearchNextPost({ planList: response.data.planList, paging })
          );
        }
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
      console.log(response);
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
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.isLoading = action.payload.isLoading;
      }),
    [GET_BEST_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.bestList = action.payload.bestList;
        draft.isLoading = false;
      }),
    [GET_LOCATION_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.locationList = action.payload.locationList;
        draft.isLoading = false;
      }),
    [GET_SEARCH_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.searchList = action.payload.searchList.planList;
        draft.paging = action.payload.searchList.paging;
        draft.isLoading = false;
      }),
    [GET_SEARCH_NEXT_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.searchList.push(...action.payload.searchList.planList);
        draft.paging = action.payload.searchList.paging;
        draft.isLoading = false;
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
};

export { actionCreators };
