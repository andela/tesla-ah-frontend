import * as authTypes from '../../actions/types/auth.type';
import checkUser from '../../../utils/checkUser';

const user = checkUser();

export const initialState = {
  message: null,
  error: null,
  loginRedirectPath: '/',
  isAdmin: false,
  isLogging: false,
  ...user,
};

const Login = (state = initialState, { type, payload }) => {
  switch (type) {
    case authTypes.LOGIN_PENDING:
      return {
        ...state,
        ...payload,
        isLogging: true,
      };
    case authTypes.LOGIN_ERROR:
      return {
        ...state,
        error: payload,
        isLogging: false,
      };
    case authTypes.LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        isLogging: false,
      };
    default:
      return state;
  }
};
export default Login;
