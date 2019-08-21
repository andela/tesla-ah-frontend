import { IS_LOADING, IS_LOADED } from './types/ui.type';

export const setLoading = () => ({
  type: IS_LOADING,
});
export const setLoaded = () => ({
  type: IS_LOADED,
});
