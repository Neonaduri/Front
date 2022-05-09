import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import axios from "axios";
import apis from "../../shared/request";

// action
const GET_BEST_POST = "GET_BEST_POST";
const GET_LOCATION_POST = "GET_LOCATION_POST";

// initialState
const initialState = {
  bestList: [
    {
      postId: 1,
      postImgUrl:
        "https://mblogthumb-phinf.pstatic.net/MjAyMDAyMjlfMTY5/MDAxNTgyOTYzOTUyMzQ0.PbK6CMMKTOPLho9Ibr__DyC5sZq_deM697zsyejJsVMg.2xwHAE4G8ojR_mODq-DmMDmc0k0fDBMjR-E-M-i8VUMg.JPEG.haedud128/IMG_2905.JPG?type=w800",
      postTitle: "남친이랑 1박2일 제주여행",
      location: "부산",
      islike: true,
      likeCnt: 5,
      reviewCnt: 3,
      theme: "액티비티",
    },

    {
      postId: 2,
      postImgUrl:
        "https://mblogthumb-phinf.pstatic.net/MjAyMDAyMjlfMTY5/MDAxNTgyOTYzOTUyMzQ0.PbK6CMMKTOPLho9Ibr__DyC5sZq_deM697zsyejJsVMg.2xwHAE4G8ojR_mODq-DmMDmc0k0fDBMjR-E-M-i8VUMg.JPEG.haedud128/IMG_2905.JPG?type=w800",
      postTitle: "남친이랑 1박2일 제주여행",
      location: "부산",
      islike: true,
      likeCnt: 5,
      reviewCnt: 3,
      theme: "액티비티",
    },
  ],
  locationList: [
    {
      postId: 1,
      postImgUrl:
        "https://mblogthumb-phinf.pstatic.net/MjAyMDAyMjlfMTY5/MDAxNTgyOTYzOTUyMzQ0.PbK6CMMKTOPLho9Ibr__DyC5sZq_deM697zsyejJsVMg.2xwHAE4G8ojR_mODq-DmMDmc0k0fDBMjR-E-M-i8VUMg.JPEG.haedud128/IMG_2905.JPG?type=w800",
      postTitle: "남친이랑 1박2일 제주여행",
      location: "부산",
      islike: true,
      likeCnt: 5,
      reviewCnt: 3,
      theme: "액티비티",
    },
    {
      postId: 2,
      postImgUrl:
        "https://mblogthumb-phinf.pstatic.net/MjAyMDAyMjlfMTY5/MDAxNTgyOTYzOTUyMzQ0.PbK6CMMKTOPLho9Ibr__DyC5sZq_deM697zsyejJsVMg.2xwHAE4G8ojR_mODq-DmMDmc0k0fDBMjR-E-M-i8VUMg.JPEG.haedud128/IMG_2905.JPG?type=w800",
      postTitle: "남친이랑 1박2일 제주여행",
      location: "부산",
      islike: true,
      likeCnt: 5,
      reviewCnt: 3,
      theme: "액티비티",
    },
  ],
};

// actionCreators
const getBestPost = createAction(GET_BEST_POST, (bestList) => ({
  bestList,
}));

const getLocationPost = createAction(GET_LOCATION_POST, (locationList) => ({
  locationList,
}));

// middleWares

//인기 여행플랜[메인]
export const getBestPostDB = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await apis.axiosInstance.get(`/api/planning/best`);
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
export const getKeywordPostDB = (location) => {
  return async function (dispatch, getState, { history }) {
    try {
      // await axios.get(`urlHere/api/planning/location/${location}/1`);
      await axios.get(`http://localhost:4000/locationList?q=${location}`);
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
        draft.bestList.push(action.payload.bestList);
      }),
    [GET_LOCATION_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.locationList.push(action.payload.locationList);
      }),
  },
  initialState
);

const actionCreators = {
  getBestPostDB,
  getLocationPostDB,
};

export { actionCreators };
