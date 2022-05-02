import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

//action
const UPDATEFIXEDPLACE = "updateFixedPlace";
// const UPDATEMEMO = "memo";

//init
const init = {
  list: [],
};

//action creators
const updateFixedPlace = createAction(UPDATEFIXEDPLACE, (places) => ({
  places,
}));

// export const updateMemo = createAction(UPDATEMEMO, (memo) => ({
//   memo,
// }));

//middlewares

//reducer
export default handleActions(
  {
    [UPDATEFIXEDPLACE]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.places;
      }),

    // [UPDATEMEMO]: (state, action) =>
    //   produce(state, (draft) => {
    //     draft.memo = action.payload.memo;
    //     console.log(state);
    //   }),
  },
  init
);

const planAction = {
  updateFixedPlace,
  // updateMemo,
};

export { planAction };
