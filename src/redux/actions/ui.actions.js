/* eslint-disable no-undef */
import jwtDecode from 'jwt-decode';
import { IS_LOADING, IS_LOADED } from './types/ui.type';
import { LOGGED_IN } from './types/auth.type';

export const setLoading = () => ({
  type: IS_LOADING,
});
export const setLoaded = () => ({
  type: IS_LOADED,
});

export const setLoggedIn = () => (dispatch) => {
  const token = sessionStorage.getItem('token');
  if (token && jwtDecode(token)) {
    dispatch({
      type: LOGGED_IN,
    });
  }
};
