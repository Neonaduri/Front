import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { act } from "react-dom/test-utils";

//action
const FIXEDPLACEXY = "fixedPlaceXY";

//init
const init = {
  list: [],
  fixedLatLng: [],
};

//action creators
const fixedPlaceXY = createAction(FIXEDPLACEXY, (latlng) => ({ latlng }));

//middlewares

//reducer
export default handleActions(
  {
    [FIXEDPLACEXY]: (state, action) =>
      produce(state, (draft) => {
        draft.fixedLatLng = action.payload.latlng;
      }),
  },
  init
);

const planAction = {
  fixedPlaceXY,
};

export { planAction };
