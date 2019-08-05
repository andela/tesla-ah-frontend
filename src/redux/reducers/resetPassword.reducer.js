import { POST_RESET } from '../actions/types/resetPassword.type';

const initialState = {
  message: '',
  status: '',
};

const resetPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_RESET:
      return {
        ...state,
        message: action.payload.data.message,
        status: action.payload.status,

      };
    default:
      return state;
  }
};
export default resetPasswordReducer;
