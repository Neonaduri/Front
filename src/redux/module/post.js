import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import axios from "axios";

// action
const GET_BEST_POST = "GET_BEST_POST";
const GET_LOCATION_POST = "GET_LOCATION_POST";

// initialState
const initialState = {
  list: [
    {
      postId: 1,
      postImg: "",
      postTitle: "게시글 제목",
      location: "부산",
      isLike: true,
      likeCnt: 5,
      commentCnt: 3,
    },
  ],
};

// actionCreators
const getBestPost = createAction(
  GET_BEST_POST,
  (postTitle, likeCnt, commentCnt, postImg) => ({
    postTitle,
    likeCnt,
    commentCnt,
    postImg,
  })
);

const getLocationPost = createAction(
  GET_LOCATION_POST,
  (postTitle, likeCnt, commentCnt, postImg) => ({
    postTitle,
    likeCnt,
    commentCnt,
    postImg,
  })
);

// middleWares

//인기 여행플랜
const getBestPostDB = () => {
  return async function (dispatch, getState, { history }) {
    dispatch(getBestPost());
    try {
      await axios.get(`urlHere/api/planning/best`, {});
    } catch (err) {
      console.log("에러발생", err);
      window.alert("해당 상품은 없는 상품입니다.");
    }
  };
};

//지역별 여행플랜
const getLocationPostDB = (location) => {
  return async function (dispatch, getState, { history }) {
    try {
      await axios.get(`urlHere/api/planning/location/${location}`);
    } catch (err) {
      console.log("에러발생", err);
      window.alert("해당 상품은 없는 상품입니다.");
    }
  };
};

// reducer
export default handleActions(
  {
    [GET_BEST_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.postImg = action.payload.postImg;
        draft.postTitle = action.payload.postTitle;
        draft.likeCnt = action.payload.likeCnt;
        draft.commentCnt = action.payload.commentCnt;
      }),
    [GET_LOCATION_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.postImg = action.payload.postImg;
        draft.postTitle = action.payload.postTitle;
        draft.likeCnt = action.payload.likeCnt;
        draft.commentCnt = action.payload.commentCnt;
      }),
  },
  initialState
);

const actionCreators = {
  getBestPostDB,
  getLocationPostDB,
};

export { actionCreators };
