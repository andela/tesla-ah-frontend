/* eslint-disable object-curly-newline */
import { GET_RATING, CREATE_RATING, RATING_FAIL, UPDATE_RATING } from '../../../../src/redux/actions/types/rating.type';
import ratingReducer from '../../../../src/redux/reducers/ratingArticle/rating.reducer';

describe('Rating The Article - Reducers', () => {
  it('should return default state', () => {
    const initialState = { errors: {}, rating: 0, userRated: false };
    const newState = ratingReducer(initialState, {});
    expect(newState).toEqual(initialState);
  });
  it('should return an object if receive a type of  GET_RATING', () => {
    const data = {
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
    };
    const ratings = {
      rating: 0,
      userRated: false,
      errors: {},
      Ratings: {
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
    };
    const newState = ratingReducer(undefined, {
      type: GET_RATING,
      payload: data,
    });
    expect(newState).toEqual(ratings);
  });

  it('should return an object once you rated an article and received a type of CREATE_RATING', () => {
    const data = {
      data: {
        data: {
          id: 83,
          slug: 'how-to-make-money-in-this-century-xjzwh7nch',
          userId: 14,
          ratings: 3,
          updatedAt: '2019-08-30T09:23:08.553Z',
          createdAt: '2019-08-30T09:23:08.553Z',
        },
        message: 'created',
      },
    };
    const response = {
      rating:
       {
         data:
          {
            id: 83,
            slug: 'how-to-make-money-in-this-century-xjzwh7nch',
            userId: 14,
            ratings: 3,
            updatedAt: '2019-08-30T09:23:08.553Z',
            createdAt: '2019-08-30T09:23:08.553Z',
          },
         message: 'created',
       },
      userRated: true,
      errors: {},
    };
    const newState = ratingReducer(undefined, {
      type: CREATE_RATING,
      payload: data,
    });
    expect(newState).toEqual(response);
  });
  it('should return an object which contains the error if received a type of RATING_FAIL', () => {
    const error = {
      response: {
        status: 403,
        error: 'You are not allowed to rate an article more than once!',
      },
    };
    const errorResponse = {
      rating: 0,
      userRated: false,
      errors: {
        response: {
          status: 403,
          error: 'You are not allowed to rate an article more than once!',
        },
      },
    };
    const newState = ratingReducer(undefined, {
      type: RATING_FAIL,
      payload: error,
    });
    expect(newState).toEqual(errorResponse);
  });
  it('should return an object which contains the error if received a type of UPDATE_RATING', () => {
    const data = {
      rating: 3,
      userRated: true,
      errors: {},
    };

    const newState = ratingReducer(undefined, {
      type: UPDATE_RATING,
      payload: data,
    });
    expect(newState.userRated).toEqual(true);
  });
});
