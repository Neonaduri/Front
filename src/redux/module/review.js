import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import apis from "../../shared/request";
import * as Sentry from "@sentry/react";

// Actions Types
const GET_COMMENT = "GET_COMMENT";
const GET_NEXT_COMMENT = "GET_NEXT_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";
const EDIT_COMMENT = "EDIT_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";
const ONE_COMMENT = "ONE_COMMENT";
const TOTAL_ELEMENTS = "TOTAL_ELEMENTS";
const LOADING = "loading";

// Action Creators
export const getComment = createAction(GET_COMMENT, (reviewList, paging) => ({
  reviewList,
  paging,
}));
export const getNextComment = createAction(
  GET_NEXT_COMMENT,
  (reviewList, paging) => ({
    reviewList,
    paging,
  })
);
export const addComment = createAction(ADD_COMMENT, (reviewList) => ({
  reviewList,
}));
export const editComment = createAction(EDIT_COMMENT, (reviewContents) => ({
  reviewContents,
}));
export const deleteComment = createAction(DELETE_COMMENT, (reviewId) => ({
  reviewId,
}));
export const getOneComment = createAction(ONE_COMMENT, (reviewList) => ({
  reviewList,
}));
export const totalElements = createAction(TOTAL_ELEMENTS, (totalElements) => ({
  totalElements,
}));
const loading = createAction(LOADING, (isLoading) => ({ isLoading }));
//미들웨어

//리뷰등록
export const addCommentDB = (postId, formdata, config) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await apis.axiosInstance.post(
        `/detail/reviews/${postId} `,
        formdata,
        config
      );

      if (response.status === 201) {
        window.location.reload();
        dispatch(addComment(response.data));
        window.alert("후기가 등록되었습니다!");
      }
    } catch (err) {
      Sentry.captureException(err);
      console.log("에러발생", err);
    }
  };
};

//리뷰조회
export const getCommentDB = (postId, pageno) => {
  return async function (dispatch, getState, { history }) {
    dispatch(loading(true));
    try {
      const response = await apis.axiosInstance.get(
        `/detail/reviews/${postId}/1`
      );

      let paging = {
        start: 2,
        lastPage: response.data.islastPage,
      };

      if (response.status === 200) {
        console.log("조회", response);
        dispatch(getComment(response.data.reviewList, paging));
        dispatch(totalElements(response.data.totalElements));
      }
    } catch (err) {
      Sentry.captureException(err);
      console.log("에러발생", err);
    }
  };
};

export const getNextCommentDB = (postId, pageno) => {
  return async function (dispatch, getState, { history }) {
    dispatch(loading(true));
    try {
      const response = await apis.axiosInstance.get(
        `/detail/reviews/${postId}/${pageno}`
      );

      let paging = {
        start: pageno + 1,
        lastPage: response.data.islastPage,
      };

      if (response.status === 200) {
        dispatch(getNextComment(response.data.reviewList, paging));
      }
    } catch (err) {
      console.log("에러발생", err);
    }
  };
};

//리뷰수정 전 조회
export const getOneCommentDB = (reviewId) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await apis.axiosInstance.get(
        `/detail/reviews/edit/${reviewId}`
      );

      if (response.status === 201) {
        dispatch(getOneComment(response.data));
      }
    } catch (err) {
      Sentry.captureException(err);
      console.log("에러발생", err);
    }
  };
};

//리뷰수정
export const editCommentDB = (reviewId, formdata, config) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await apis.axiosInstance.put(
        `/detail/reviews/${reviewId}`,
        formdata,
        config
      );

      if (response.status === 201) {
        console.log(response);
        window.location.reload();
        dispatch(editComment(response.data));
        window.alert("수정이 완료되었어요!");
      }
    } catch (err) {
      console.log("에러발생", err);
    }
  };
};

//리뷰삭제
export const deleteCommentDB = (reviewId) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await apis.axiosInstance.delete(
        `/detail/reviews/${reviewId}`
      );
      if (response.status === 200) {
        window.location.reload();
        dispatch(deleteComment(reviewId));
        window.alert("삭제가 완료되었어요!");
      }
    } catch (err) {
      Sentry.captureException(err);
      console.log("에러발생", err);
    }
  };
};

const initialComment = {
  totalElements: 0,
  paging: { start: null, islastPage: false },
  isLoading: false,
  reviewList: [
    {
      reviewId: 1,
      nickName: "",
      reviewContents: "",
      reviewImgUrl: "",
      createdAt: "",
      modifiedAt: "",
    },
  ],
};

// Reducer
export default handleActions(
  {
    [GET_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.reviewList = action.payload.reviewList;
        draft.paging = action.payload.paging;
        draft.isLoading = false;
      }),
    [GET_NEXT_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.reviewList.push(...action.payload.reviewList);
        draft.paging = action.payload.paging;
        draft.isLoading = false;
      }),
    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.reviewList.unshift(action.payload.reviewList);
      }),
    [EDIT_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        const newReview = draft.reviewList.filter(
          (item) => item.reviewId !== action.payload.reviewId
        );
        draft.reviewList = newReview;
      }),
    [DELETE_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        const newReview = draft.reviewList.filter(
          (item) => item.reviewId !== action.payload.reviewId
        );
        draft.reviewList = newReview;
      }),
    [ONE_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.reviewList = action.payload.reviewList;
      }),
    [TOTAL_ELEMENTS]: (state, action) =>
      produce(state, (draft) => {
        draft.totalElements = action.payload.totalElements;
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.isLoading = action.payload.isLoading;
      }),
  },
  initialComment
);
