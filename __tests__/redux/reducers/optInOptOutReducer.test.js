import optInOptOutAppReducer from '../../../src/redux/reducers/optInOptOutApp.reducer';
import optInOptOutEmailReducer from '../../../src/redux/reducers/optInOptOutEmail.reducer';
import {
  OPTED_IN_EMAIL, OPTED_OUT_EMAIL, OPTED_IN_APP, OPTED_OUT_APP,
  ALREADY_OPTED_IN_EMAIL, ALREADY_OPTED_IN_APP,
} from '../../../src/redux/actions/types/optInOptOut.type';

const initialState = {
  checked: false,
};

describe('Opt in Opt out reducer tests...', () => {
  it('Should return initial State', () => {
    const state = optInOptOutAppReducer(initialState, {});
    expect(state).toEqual(initialState);
  });
  it('Set checked to TRUE for OPTED_IN_APP', () => {
    const expectedState = {
      ...initialState,
      checked: true,
    };

    const state = optInOptOutAppReducer(initialState, { type: OPTED_IN_APP });
    expect(state).toEqual(expectedState);
  });
  it('Set checked to TRUE for ALREADY_OPTED_IN_APP ', () => {
    const expectedState = {
      ...initialState,
      checked: true,
    };

    const state = optInOptOutAppReducer(initialState, { type: ALREADY_OPTED_IN_APP });
    expect(state).toEqual(expectedState);
  });
  it('Set checked to TRUE for ALREADY_OPTED_IN_EMAIL', () => {
    const expectedState = {
      ...initialState,
      checked: true,
    };

    const state = optInOptOutEmailReducer(initialState, { type: ALREADY_OPTED_IN_EMAIL });
    expect(state).toEqual(expectedState);
  });
  it('Set checked to TRUE for OPTED_IN_EMAIL', () => {
    const expectedState = {
      ...initialState,
      checked: true,
    };

    const state = optInOptOutEmailReducer(initialState, { type: OPTED_IN_EMAIL });
    expect(state).toEqual(expectedState);
  });
  it('Set checked to FALSE for OPTED_OUT_APP', () => {
    const expectedState = {
      ...initialState,
      checked: false,
    };

    const state = optInOptOutAppReducer(initialState, { type: OPTED_OUT_APP });
    expect(state).toEqual(expectedState);
  });
  it('Set checked to FALSE for OPTED_OUT_EMAIL', () => {
    const expectedState = {
      ...initialState,
      checked: false,
    };

    const state = optInOptOutEmailReducer(initialState, { type: OPTED_OUT_EMAIL });
    expect(state).toEqual(expectedState);
  });
});
