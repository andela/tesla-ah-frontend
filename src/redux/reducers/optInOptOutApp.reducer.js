import {
  OPTED_IN_APP, OPTED_OUT_APP,
  ALREADY_OPTED_IN_APP,
} from '../actions/types/optInOptOut.type';

const initialState = {
  checked: false,
};
const optInOptOutAppReducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case ALREADY_OPTED_IN_APP:
      return {
        ...state,
        checked: true,
      };
    case OPTED_IN_APP:
      return {
        ...state,
        checked: true,
      };
    case OPTED_OUT_APP:
      return {
        ...state,
        checked: false,
      };
    default:
      return state;
  }
};
export default optInOptOutAppReducer;
