/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import moxios from 'moxios';
import axios from '../../src/utils/axios-ah';
import errorHandler from '../../src/components/hoc/errorHandler';
import { Profile } from '../../src/components/pages/Profile';

describe('Error Handler test', () => {
  beforeEach(() => {
    moxios.install(axios);
  });
  afterEach(() => {
    moxios.uninstall(axios);
  });

  it('should render error message if there is an error', () => {
    moxios.stubRequest('/profiles/_deschant', {
      status: 404,
      response: { error: new Error('Request failed with status code 401') },
    });
    moxios.stubRequest('/profiles/deschants', {
      status: 200,
      response: {},
    });
    moxios.stubRequest('/profiles/deschant', {
      status: 500,
    });

    const defaultProps = {
      setCurrentUser: jest.fn(),
      initProfile: jest.fn(),
      history: {},
      profile: {},
      match: {
        params: {
          username: 'deschants',
        },
      },
    };
    const WithErrorHandler = errorHandler(<Profile {...defaultProps} />, axios);
    const wrapper = shallow(<WithErrorHandler />);
    const error = {
      status: 404,
      message: 'Not found',
    };
    axios.get('/profiles/_deschant').then(() => {
      wrapper.setState({ error });
      expect(wrapper.find('.card').length).toBe(1);
    });
    axios.get('/profiles/deschants');
    axios.get('/profiles/deschant');
  });
});
