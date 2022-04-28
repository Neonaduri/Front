import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

//action
const UPDATEFIXEDPLACE = "updateFixedPlace";

//init
const init = {
  list: [],
};

//action creators
const updateFixedPlace = createAction(UPDATEFIXEDPLACE, (places) => ({
  places,
}));

//middlewares

//reducer
export default handleActions(
  {
    [UPDATEFIXEDPLACE]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.places;
      }),
  },
  init
);

const planAction = {
  updateFixedPlace,
};

export { planAction };
