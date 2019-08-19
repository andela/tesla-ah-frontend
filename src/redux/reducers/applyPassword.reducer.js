import { PATCH_RESET } from '../actions/types/resetPassword.type';

const initialState = {
  message: '',
  status: '',
};

const applyPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case PATCH_RESET:
      return {
        ...state,
        message: action.payload.data.message,
        status: action.payload.status,
      };
    default:
      return state;
  }
};
export default applyPasswordReducer;
