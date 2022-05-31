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
const REVIEWLOADING = "reviewLoading";

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
const reviewLoading = createAction(REVIEWLOADING, (isLoading) => ({
  isLoading,
}));
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
        dispatch(addComment(response.data));
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
    dispatch(reviewLoading(true));
    try {
      const response = await apis.axiosInstance.get(
        `/detail/reviews/${postId}/1`
      );
      let paging = {
        start: 2,
        lastPage: response.data.islastPage,
      };
      if (response.status === 200) {
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
    dispatch(reviewLoading(true));
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
        dispatch(editComment(response.data));
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
        dispatch(deleteComment(reviewId));
      }
    } catch (err) {
      Sentry.captureException(err);
      console.log("에러발생", err);
    }
  };
};

const initialComment = {
  totalElements: 0,
  paging: { start: null, islastPage: true },
  reviewLoading: false,
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
        draft.reviewLoading = false;
      }),
    [GET_NEXT_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.reviewList.push(...action.payload.reviewList);
        draft.paging = action.payload.paging;
        draft.reviewLoading = false;
      }),
    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        const data = {
          createdAt: Date.now(),
          modifiedAt: Date.now(),
          nickName: action.payload.reviewList.user.nickName,
          profileImgUrl: action.payload.reviewList.user.profileImgUrl,
          reviewContents: action.payload.reviewList.reviewContents,
          reviewImgUrl: action.payload.reviewList.reviewImgUrl,
          reviewId: action.payload.reviewList.reveiwId,
        };
        draft.reviewList.unshift(data);
        draft.totalElements += 1;
        draft.paging.lastPage = true;
      }),
    [EDIT_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.reviewList.map((list) => {
          if (list.reviewId === action.payload.reviewContents.reveiwId) {
            list.modifiedAt = action.payload.reviewContents.modifiedAt;
            list.reviewContents = action.payload.reviewContents.reviewContents;
            list.reviewImgUrl = action.payload.reviewContents.reviewImgUrl;
          }
        });
      }),
    [DELETE_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        const newReview = draft.reviewList.filter(
          (item) => item.reviewId !== action.payload.reviewId
        );
        draft.reviewList = newReview;
        draft.totalElements -= 1;
      }),
    [ONE_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.reviewList = action.payload.reviewList;
      }),
    [TOTAL_ELEMENTS]: (state, action) =>
      produce(state, (draft) => {
        draft.totalElements = action.payload.totalElements;
        draft.reviewLoading = false;
      }),
    [REVIEWLOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.reviewLoading = action.payload.isLoading;
      }),
  },
  initialComment
);
