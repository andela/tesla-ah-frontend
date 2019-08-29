import jwt from 'jwt-decode';

export default () => {
  try {
    const { token } = sessionStorage;
    const user = jwt(token);
    return {
      user,
      isAuthenticated: true,
      loggedIn: true,
    };
  } catch (error) {
    return {
      user: {},
      isAuthenticated: false,
      loggedIn: false,
    };
  }
};
