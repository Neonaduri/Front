import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import apis from "../../shared/request";

// Actions Types
const GET_COMMENT = "GET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";
const EDIT_COMMENT = "EDIT_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";
const ONE_COMMENT = "ONE_COMMENT";

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
        console.log(response.data);
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
        console.log("후기조회 성공!");
        console.log(response.data.reviewList);
        dispatch(getComment(response.data.reviewList));
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
        console.log("리뷰조회 성공!");
        console.log(response.data);
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
      console.log("후기삭제 성공!");
      if (response.status === 200) {
        console.log("후기삭제 성공!");
        dispatch(deleteComment(reviewId));
        window.alert("삭제가 완료되었어요!");
      }
    } catch (err) {
      console.log("에러발생", err);
    }
  };
};

const initialComment = {
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
        draft.reviewList.push(action.payload.reviewList);
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
  },
  initialComment
);
