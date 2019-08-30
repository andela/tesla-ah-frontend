/* profileActions.test.js eslint-disable no-undef */
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import { API_URL } from '../../../src/utils/constants';

import {
  UPDATE_PROFILE_START,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_SUCCESS,
  GET_CURRENT_USER_START,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_FAIL,
  SET_PROFILE_UPDATABLE,
  FOLLOW_USER_START,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_FAIL,
  SET_FOLLOWERS_UPDATABLE,
  GET_FOLLOWERS,
  GET_FOLLOWERS_FAIL,
  GET_FOLLOWING,
  GET_FOLLOWING_FAIL,
} from '../../../src/redux/actions/types/profile.type';
import {
  initProfile,
  updateProfile,
  getCurrentUser,
  setUpdatable,
  followUser,
  setFollowersUpdatable,
  getFollowers,
  getFollowing,
} from '../../../src/redux/actions/profile.actions';
import { users, profile, jsonUser } from '../../mockData';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Profile Init Actions', () => {
  beforeEach(() => {
    moxios.install(axios);
  });
  afterEach(() => {
    moxios.uninstall(axios);
  });

  test('should have GET_PROFILE, GET_ARTICLE', () => {
    moxios.stubRequest(`${API_URL}/profiles/${users[0].username}`, {
      status: 200,
      response: { profile: users[0] },
    });
    moxios.stubRequest(`${API_URL}/articles?author=${users[0].username}`, {
      status: 200,
      response: { articles: [] },
    });

    const store = mockStore({});

    store.dispatch(initProfile(users[0].username));
  });

  test('should fail with GET_PROFILE_FAIL if one of the requests fail', () => {
    moxios.stubRequest(`${API_URL}/profiles/${users[0].username}`, {
      status: 401,
      response: { error: new Error('Request failed with status code 401') },
    });

    const store = mockStore({});

    store.dispatch(initProfile(users[0].username));
  });

  test('should fail with GET_ARTICLE_FAIL if one of the requests fail', () => {
    moxios.stubRequest(`${API_URL}/articles?author=${users[0].username}`, {
      status: 401,
      response: { error: new Error('Request failed with status code 401') },
    });

    const store = mockStore({});

    store.dispatch(initProfile(users[0].username));
  });
});

describe('Profile Update Actions', () => {
  beforeEach(() => {
    moxios.install(axios);
  });
  afterEach(() => {
    moxios.uninstall(axios);
  });

  it('should update profile with UPDATE_PROFILE_START and UPDATE_PROFILE_SUCCESS', () => {
    moxios.stubRequest(`${API_URL}/user/${users[0].id}`, {
      status: 200,
      response: { user: users[0] },
    });

    const expectedActions = [
      { type: UPDATE_PROFILE_START },
      {
        type: UPDATE_PROFILE_SUCCESS,
        payload: {
          user: users[0],
        },
      },
    ];

    const store = mockStore({});

    store.dispatch(updateProfile(users[0].id, users[0].username)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should fail updating profile with UPDATE_PROFILE_START and UPDATE_PROFILE_FAIL', () => {
    moxios.stubRequest(`${API_URL}/user/${users[0].id}`, {
      status: 400,
      response: { error: new Error('') },
    });

    const expectedActions = [
      { type: UPDATE_PROFILE_START },
      { type: UPDATE_PROFILE_FAIL },
    ];

    const store = mockStore({});

    store.dispatch(updateProfile(users[0].id, users[0].username)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('Get current user Actions', () => {
  beforeEach(() => {
    moxios.install(axios);
  });
  afterEach(() => {
    moxios.uninstall(axios);
  });

  it('should get current user with GET_CURRENT_USER_START and GET_CURRENT_USER_SUCCESS', () => {
    moxios.stubRequest(`${API_URL}/user`, {
      status: 200,
      response: { user: users[0] },
    });

    const expectedActions = [
      { type: GET_CURRENT_USER_START },
      {
        type: GET_CURRENT_USER_SUCCESS,
        payload: { currentUser: users[0] },
      },
    ];

    const store = mockStore({});

    store.dispatch(getCurrentUser('token')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should fail to fetch current user with GET_CURRENT_USER_START and GET_CURRENT_USER_FAIL', () => {
    moxios.stubRequest(`${API_URL}/user`, {
      status: 400,
      response: { error: new Error('Request failed with status code 400') },
    });

    const expectedActions = [
      { type: GET_CURRENT_USER_START },
      {
        type: GET_CURRENT_USER_FAIL,
        payload: { error: new Error('Request failed with status code 400') },
      },
    ];

    const store = mockStore({});

    store.dispatch(getCurrentUser('token')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should set updatable state', () => {
    const expectedActions = [{ type: SET_PROFILE_UPDATABLE }];

    const store = mockStore({});
    store.dispatch(setUpdatable());
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('Follow and Unfollow Actions', () => {
  beforeEach(() => {
    moxios.install(axios);
  });
  afterEach(() => {
    moxios.uninstall(axios);
  });

  it('should have FOLLOW_USER_START and FOLLOW_USER_SUCCESS', async (done) => {
    localStorage.setItem('user', jsonUser);
    moxios.stubRequest(`${API_URL}/profiles/deschant/follow`, {
      status: 200,
      response: {},
    });
    moxios.stubRequest(`${API_URL}/profiles/deschant/followers`, {
      status: 200,
      response: { followers: profile.followers },
    });
    moxios.stubRequest(`${API_URL}/profiles/deschant/following`, {
      status: 200,
      response: { following: profile.following },
    });

    const expectedActions = [
      { type: FOLLOW_USER_START },
      {
        type: FOLLOW_USER_SUCCESS,
        payload: {
          followers: [...profile.followers],
          following: [...profile.following],
        },
      },
    ];
    const store = mockStore({});

    moxios.wait(async () => {
      await store.dispatch(followUser('token', 'deschant', true));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  }, 10000);

  it('should have FOLLOW_USER_START and FOLLOW_USER_FAIL', async (done) => {
    localStorage.setItem('user', jsonUser);
    moxios.stubRequest(`${API_URL}/profiles/deschant/follow`, {
      status: 401,
      response: {},
    });

    const expectedActions = [
      { type: FOLLOW_USER_START },
      {
        type: FOLLOW_USER_FAIL,
        payload: { error: new Error('Request failed with status code 401') },
      },
    ];
    const store = mockStore({});

    moxios.wait(async () => {
      await store.dispatch(followUser('token', 'deschant', true));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  }, 10000);

  it('should have UNFOLLOW_USER_START and UNFOLLOW_USER_SUCCESS', async (done) => {
    localStorage.setItem('user', jsonUser);
    moxios.stubRequest(`${API_URL}/profiles/_deschant/unfollow`, {
      status: 200,
      response: {},
    });
    moxios.stubRequest(`${API_URL}/profiles/_deschant/followers`, {
      status: 200,
      response: { followers: profile.followers },
    });
    moxios.stubRequest(`${API_URL}/profiles/_deschant/following`, {
      status: 200,
      response: { following: profile.following },
    });

    const expectedActions = [
      { type: FOLLOW_USER_START },
      {
        type: FOLLOW_USER_SUCCESS,
        payload: {
          followers: [...profile.followers],
          following: [...profile.following],
        },
      },
    ];
    const store = mockStore({});

    moxios.wait(async () => {
      await store.dispatch(followUser('token', '_deschant', false, true));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  }, 10000);

  it('should have SET_FOLLOWERS_UPDATABLE', () => {
    const expectedActions = [{ type: SET_FOLLOWERS_UPDATABLE }];
    const store = mockStore({});
    store.dispatch(setFollowersUpdatable());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should have GET_FOLLOWERS', async (done) => {
    localStorage.setItem('user', jsonUser);
    moxios.stubRequest(`${API_URL}/profiles/deschant/followers`, {
      status: 200,
      response: { followers: profile.followers },
    });

    const expectedActions = [
      {
        type: GET_FOLLOWERS,
        payload: { followers: [...profile.followers] },
      },
    ];
    const store = mockStore({});

    moxios.wait(async () => {
      await store.dispatch(getFollowers('deschant'));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  }, 10000);

  it('should have GET_FOLLOWERS_FAIL', async (done) => {
    localStorage.setItem('user', jsonUser);
    moxios.stubRequest(`${API_URL}/profiles/deschant/followers`, {
      status: 400,
      response: {},
    });

    const expectedActions = [
      { type: GET_FOLLOWERS_FAIL },
    ];
    const store = mockStore({});

    moxios.wait(async () => {
      await store.dispatch(getFollowers('deschant'));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  }, 10000);

  it('should have GET_FOLLOWING', async (done) => {
    localStorage.setItem('user', jsonUser);
    moxios.stubRequest(`${API_URL}/profiles/deschant/following`, {
      status: 200,
      response: { followers: profile.following },
    });

    const expectedActions = [
      {
        type: GET_FOLLOWING,
        payload: { followers: [...profile.following] },
      },
    ];
    const store = mockStore({});

    moxios.wait(async () => {
      await store.dispatch(getFollowing('deschant'));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  }, 10000);

  it('should have GET_FOLLOWING_FAIL', async (done) => {
    localStorage.setItem('user', jsonUser);
    moxios.stubRequest(`${API_URL}/profiles/deschant/following`, {
      status: 400,
      response: {},
    });

    const expectedActions = [
      { type: GET_FOLLOWING_FAIL, payload: { error: `${new Error('Request failed with status code 400')}` } },
    ];
    const store = mockStore({});

    moxios.wait(async () => {
      await store.dispatch(getFollowing('deschant'));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  }, 10000);
});
