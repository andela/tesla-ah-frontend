import { OPTED_IN_EMAIL, OPTED_OUT_EMAIL, ALREADY_OPTED_IN_EMAIL } from '../actions/types/optInOptOut.type';

const initialState = {
  checked: false,
};
const optInOptOutEmailReducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case ALREADY_OPTED_IN_EMAIL:
      return {
        ...state,
        checked: true,
      };
    case OPTED_IN_EMAIL:
      return {
        ...state,
        checked: true,
      };
    case OPTED_OUT_EMAIL:
      return {
        ...state,
        checked: false,
      };
    default:
      return state;
  }
};
export default optInOptOutEmailReducer;
