import * as authTypes from '../../actions/types/auth.type';

export const initialState = {
  loggedIn: false,
  message: null,
  error: null,
  loginRedirectPath: '/',
  isAuthenticated: false,
  isAdmin: false,
  isLogging: false,
  user: JSON.parse(localStorage.user || '{}'),
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
      };
    case authTypes.LOGIN_SUCCESS:
      localStorage.user = JSON.stringify(payload.user);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
      };
    default:
      return state;
  }
};
export default Login;
