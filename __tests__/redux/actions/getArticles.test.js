import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import Home from '../../../src/components/pages/Home';
import { findByTestAtrr, testStore } from '../../../src/redux/store/index';
import {
  getArticles,
  getArticle,
  createArticle,
  uploadImage,
  updateArticle,
  deleteArticle,
  getMyArticles,
} from '../../../src/redux/actions/article.actions';
import { getUserProfile } from '../../../src/redux/actions/author/authoruser.action';
import { article } from '../../../__mocks__/data';

const middleware = [thunk];
const mockStore = configureStore(middleware);
const store = mockStore({});

describe('Get articles action', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
    store.clearActions();
  });
  test('should get articles', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          data: { foundArticles: [], count: 1 },
        },
      });
    });
    return store.dispatch(getArticles(1)).then(() => {
      expect(store.getActions().length).toEqual(1);
    });
  });
});
describe('Get article action', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
    store.clearActions();
  });
  test('should get article', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          articles: {},
        },
      });
    });
    return store.dispatch(getArticle('ddffd')).then(() => {
      expect(store.getActions().length).toEqual(1);
    });
  });
});
describe('Create article action', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
    store.clearActions();
  });
  test('should create an article', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: { article: {} },
      });
    });

    return store.dispatch(createArticle({
      title: 's',
      description: 's',
      body: 's',
      tagList: 's',
    })).then(() => {
      expect(store.getActions().length).toEqual(1);
    });
  });
});
describe('Update article action', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
    store.clearActions();
  });
  test('Should Update article', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { message: 'dfedf' },
      });
    });

    return store.dispatch(updateArticle({
      title: 's',
      escription: 's',
      body: 's',
      tagList: 'sdd,sdsd',
    }, 'deded')).then(() => {
      expect(store.getActions().length).toEqual(1);
    });
  });
});
describe('Delete article action', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
    store.clearActions();
  });
  test('Should Delete article', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { message: 'dfedf' },
      });
    });

    return store.dispatch(deleteArticle('deded')).then(() => {
      expect(store.getActions().length).toEqual(1);
    });
  });
});
describe('Get My articles action', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
    store.clearActions();
  });
  it('Should get My article ', () => {
    moxios.stubRequest('/articles/dcdcd', {
      status: 200,
      response: { data: {} },
    });
    store.dispatch(getMyArticles(1)).then(() => {
      expect(store.getActions().length).toEqual(1);
    });
  });
});
describe('Upload image action', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
    store.clearActions();
  });
  test('should upload image', async () => {
    const img = new File(['(^_^)'], 'smile.png', { type: 'image/png' });
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          messahe: 'dedfcvfe',
        },
      });
    });
    return store.dispatch(uploadImage(img)).then(() => {
      expect(store.getActions().length).toEqual(1);
    });
  });
});
describe('Get profile action', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
    store.clearActions();
  });
  test('should get user profile', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { profile: {} },
      });
    });
    return store.dispatch(getUserProfile('ericrukundo')).then(() => {
      expect(store.getActions().length).toEqual(1);
    });
  });
});
const setup = (initialState = {}) => {
  const store2 = testStore(initialState);
  const wrapper = shallow(<Home store={store2} />)
    .childAt(0)
    .dive();
  return wrapper;
};
describe('Should not throw error', () => {
  let wrapper;
  beforeEach(() => {
    const initialState = {
      articles: article,
    };
    wrapper = setup(initialState);
  });

  it('Should render without errors', () => {
    const component = findByTestAtrr(wrapper, 'homeComponent');
    expect(component.length).toBe(1);
  });
});
