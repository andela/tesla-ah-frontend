/* eslint-disable object-curly-newline */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { toast } from 'react-toastify';
import { API_URL } from '../../../../src/utils/constants';
import { getRating, createRating, updateRating } from '../../../../src/redux/actions/ratingArticle/rating.actions';
import { CREATE_RATING, GET_RATING, RATING_FAIL, UPDATE_RATING } from '../../../../src/redux/actions/types/rating.type';

const middleware = [thunk];
const mockStore = configureStore(middleware);

const store = mockStore({});
describe('GetRating Actions Tests', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  test('should get the rating...', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          status: 200,
          data: {
            report: {
              OneStar: 0,
              TwoStar: 0,
              ThreeStar: 0,
              FourStar: 0,
              FiveStar: 1,
              NumberOfUser: 1,
              TotalRatings: 5,
              Average: 5,
            },
            percentage: {
              OneStar: '0 %',
              TwoStar: '0 %',
              ThreeStar: '0 %',
              FourStar: '0 %',
              FiveStar: '100 %',
            },
          },
        },
      });
    });
    return store.dispatch(getRating('how-to-create-to-cdcdfc-fdcvfcvf-xjzwib7x3')).then(() => {
      expect(store.getActions()[0].type).toEqual('GET_RATING');
    });
  });
  test('should return an error once that article does not have any rating...', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: {
          error: {
            message: 'No rating found for this article',
          },
        },
      });
    });
    expect(toast.warn('You should rate a single article').length).toEqual(10);
    return store.dispatch(getRating('how-to-create-tocdcdfcfdcvfcvfxjzwib7')).then(() => {
      expect(store.getActions()[1].type).toEqual('RATING_FAIL');
    });
  });
});


describe('UPDATE HIS/HER RATINGS ON A SPECIFIC ARTICLE and GET THE RATINGS OF THAT CURRENT ARTICLE', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
    // store.clearActions();
  });
  test('should get the rating of current rated article once you done with updating the ratings...', async () => {
    moxios.stubRequest(`${API_URL}/ratings/articles/how-to-create-to-cdcdfc-fdcvfcvf-xjzwib7x3`, {
      status: 200,
      response: {
        NewRate: 1,
        message: 'updated',
      },
    });
    moxios.stubRequest(`${API_URL}/articles/how-to-create-to-cdcdfc-fdcvfcvf-xjzwib7x3/rating`, {
      status: 201,
      response: {},
    });
    moxios.stubRequest(`${API_URL}/articles/how-to-create-to-cdcdfc-fdcvfcvf-xjzwib7x3/rating`, {
      status: 403,
      response: {},
    });
    moxios.stubRequest(`${API_URL}/articles/how-to-create-to-cdcdfc-fdcvfcvf-xjzwib7x3/rating`, {
      status: 400,
      response: {},
    });
    expect(toast.success('Your ratings has been updated!').length).toEqual(10);
    const expectedActions = [
      { type: UPDATE_RATING },
      { type: GET_RATING },
      { type: RATING_FAIL },
    ];
    return store.dispatch(updateRating('how-to-create-to-cdcdfc-fdcvfcvf-xjzwib7x3', 3)).then(() => {
      expect(store.getActions()[0].type).toEqual(expectedActions[1].type);
      expect(store.getActions()[1].type).toEqual(expectedActions[2].type);
      expect(store.getActions()[2].type).toEqual(expectedActions[0].type);
    });
  });
});

describe('CREATE THE RATINGS FOR AN ARTICLE and GET THE RATINGS OF THE CURRENT ARTICLE', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  test('should get the rating of current rated article...', async () => {
    moxios.stubRequest(`${API_URL}/ratings/articles/how-to-create-to-cdcdfc-fdcvfcvf-xjzwib7x3`, {
      status: 200,
      response: {},
    });
    moxios.stubRequest(`${API_URL}/articles/how-to-create-to-cdcdfc-fdcvfcvf-xjzwib7x3/rating`, {
      status: 201,
      response: {},
    });
    moxios.stubRequest(`${API_URL}/articles/how-to-create-to-cdcdfc-fdcvfcvf-xjzwib7x3/rating`, {
      status: 403,
      response: {},
    });
    moxios.stubRequest(`${API_URL}/articles/how-to-create-to-cdcdfc-fdcvfcvf-xjzwib7x3/rating`, {
      status: 400,
      response: {},
    });
    expect(toast.success('Your ratings has been recorded!').length).toEqual(10);
    const expectedActions = [
      { type: CREATE_RATING },
      { type: GET_RATING },
      { type: RATING_FAIL },
    ];
    return store.dispatch(createRating('how-to-create-to-cdcdfc-fdcvfcvf-xjzwib7x3', 5)).then(() => {
      expect(store.getActions()[0].type).toEqual(expectedActions[1].type);
      expect(store.getActions()[1].type).toEqual(expectedActions[2].type);
      expect(store.getActions()[4].type).toEqual(expectedActions[0].type);
    });
  });
  test('should return an error once you provided the rating which is not a number...', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: {
          error: {
            message: 'rating should be a number!',
          },
        },
      });
    });
    const response = [
      { type: CREATE_RATING },
      { type: GET_RATING },
      { type: RATING_FAIL },
    ];
    return store.dispatch(createRating('how-to-create-tocdcdfcfdcvfcvfxjzwib7', 'NaN')).then(() => {
      expect(store.getActions()[1].type).toEqual('RATING_FAIL');
    });
  });
});
