import resetPasswordReducer from '../../../src/redux/reducers/resetPassword.reducer';
import applyPasswordReducer from '../../../src/redux/reducers/applyPassword.reducer';
import { POST_RESET, PATCH_RESET } from '../../../src/redux/actions/types/resetPassword.type';

describe('Test Password Reset Reducer', () => {
  test('POST_RESET reducer', () => {
    const initialState = {
      message: '',
      status: '',
    };
    expect(resetPasswordReducer(initialState, {
      type: POST_RESET,
      payload: {
        data: { message: 'message' },
        status: 'status',
      },
    })).toEqual({
      message: 'message',
      status: 'status',
    });
  });

  test('PATCH_RESET reducer', () => {
    const initialState = {
      message: '',
      status: '',
    };
    expect(applyPasswordReducer(initialState, {
      type: PATCH_RESET,
      payload: {
        data: { message: 'message' },
        status: 'status',
      },
    })).toEqual({
      message: 'message',
      status: 'status',
    });
  });
});
