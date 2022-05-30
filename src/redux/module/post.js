import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import apis from "../../shared/request";
import * as Sentry from "@sentry/react";

// action
const LOADING = "loading";
const GET_BEST_POST = "GET_BEST_POST";
const GET_SEARCH_POST = "GET_SEARCH_POST";
const GET_SEARCH_NEXT_POST = "GET_SEARCH_NEXT_POST";
const LAST_PAGE = "LAST_PAGE";
const KEYWORD = "KEYWORD";
const CLICKWISHINMAIN = "clickWishInMain";
const CLICKWISHINSEARCH = "clickWishInsearch";

// initialState
const initialState = {
  bestList: [],
  searchList: [],
  paging: { start: null, isLastPage: false },
  keyword: "",
  isLoading: false,
  paging: {},
};

// actionCreators
const getBestPost = createAction(GET_BEST_POST, (bestList) => ({
  bestList,
}));
const loading = createAction(LOADING, (isLoading) => ({ isLoading }));

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

//인기 여행플랜[메인]
export const getBestPostDB = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const token = localStorage.getItem("token");
      const response = await apis.axiosInstance.get(`/best`, {
        headers: {
          Authorization: `${token}`,
        },
      });

      dispatch(getBestPost(response.data));
    } catch (err) {
      Sentry.captureException(err);
      console.log("에러!!", err);
    }
  };
};

export const getLocationPostDB = (location, pageno) => {
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
        `/plans/location/${location}/${page}`
      );
      let paging = {
        start: page + 1,
        lastpage: response.data.islastPage,
      };

      if (response.status === 200) {
        if (page === 1) {
          console.log("지역별 1페이지");
          dispatch(getSearchPost({ planList: response.data.planList, paging }));
        } else {
          dispatch(
            getSearchNextPost({ planList: response.data.planList, paging })
          );
          console.log("지역별 다음페이지");
        }
      }
    } catch (err) {
      Sentry.captureException(err);
      console.log("에러발생", err);
    }
  };
};

//검색 키워드 데이터요청[검색]
export const getKeywordPostDB = (keyword, sortby, pageno) => {
  return async function (dispatch, getState, { history }) {
    dispatch(loading(true));
    let page;
    if (pageno === undefined) {
      page = 1;
    } else {
      page = pageno;
    }
    if (keyword === "") {
      keyword = "서울";
    }
    console.log(keyword, sortby, page);
    try {
      const response = await apis.axiosInstance.get(
        `/plans/keyword/results?keyword=${keyword}&pageno=${page}&sortBy=${sortby}`
      );
      let paging = {
        start: page + 1,
        lastpage: response.data.islastPage,
      };
      console.log("keywordPost", response);
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
      let paging = {
        start: page + 1,
        lastpage: response.data.islastPage,
      };

      if (response.status === 200) {
        if (page === 1) {
          dispatch(getSearchPost({ planList: response.data.planList, paging }));
          console.log("테마별 1페이지");
        } else {
          dispatch(
            getSearchNextPost({ planList: response.data.planList, paging })
          );
          console.log("테마별 다음페이지");
        }
        history.push("/theme");
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
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.isLoading = action.payload.isLoading;
      }),
    [GET_BEST_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.bestList = action.payload.bestList;
        draft.isLoading = false;
      }),

    [GET_SEARCH_POST]: (state, action) =>
      produce(state, (draft) => {
        if (action.payload.searchList.planList.length === 0) {
          draft.searchList = [];
          draft.searchList = action.payload.searchList.planList;
          draft.paging = { start: 2, islastPage: true };
          draft.isLoading = false;
          return;
        } else {
          draft.searchList = [];
          draft.searchList = action.payload.searchList.planList;
          draft.paging = action.payload.searchList.paging;
          draft.isLoading = false;
        }
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
