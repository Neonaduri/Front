import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import apis from "../../shared/request";

// Actions Types
const GET_COMMENT = "GET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";
const EDIT_COMMENT = "EDIT_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";
const ONE_COMMENT = "ONE_COMMENT";
const TOTAL_ELEMENTS = "TOTAL_ELEMENTS";

// Action Creators
export const getComment = createAction(GET_COMMENT, (reviewList) => ({
  reviewList,
}));
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
//미들웨어

//리뷰등록
export const addCommentDB = (postId, formdata, config) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await apis.axiosInstance.post(
        `/api/detail/reviews/${postId} `,
        formdata,
        config
      );

      if (response.status === 201) {
        window.location.reload();
        dispatch(addComment(response.data));
        window.alert("후기가 등록되었습니다!");
      }
    } catch (err) {
      console.log("에러발생", err);
    }
  };
};

//리뷰조회
export const getCommentDB = (postId, pageno) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await apis.axiosInstance.get(
        `/api/detail/reviews/${postId}/1`
      );

      if (response.status === 200) {
        dispatch(getComment(response.data.reviewList));
        dispatch(totalElements(response.data.totalElements));
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
        `/api/detail/reviews/edit/${reviewId}`
      );

      if (response.status === 201) {
        dispatch(getOneComment(response.data));
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
        `/api/detail/reviews/${reviewId}`
      );
      if (response.status === 200) {
        dispatch(deleteComment(reviewId));
        window.alert("삭제가 완료되었어요!");
      }
    } catch (err) {
      console.log("에러발생", err);
    }
  };
};

const initialComment = {
  totalElements: 0,
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
      }),
    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.reviewList.unshift(action.payload.reviewList);
      }),
    [EDIT_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.reviewList = draft.reviewList.filter(
          (item) => item.reviewId === action.payload.reviewId
        );
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
  },
  initialComment
);
