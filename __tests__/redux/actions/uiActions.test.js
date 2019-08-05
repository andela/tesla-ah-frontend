/* eslint-disable no-undef */
import { setLoaded, setLoading } from '../../../src/redux/actions/ui.actions';
import { IS_LOADED, IS_LOADING } from '../../../src/redux/actions/types/ui.type';

describe('LOADERS tests...', () => {
  it('LOADING Should pass', () => {
    const expectedAction = {
      type: IS_LOADING,
    };
    expect(setLoading()).toEqual(expectedAction);
  });
  it('LOADED should pass', () => {
    const expectedAction = {
      type: IS_LOADED,
    };
    expect(setLoaded()).toEqual(expectedAction);
  });
});
