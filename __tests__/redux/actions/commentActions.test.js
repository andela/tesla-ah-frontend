import thunk from 'redux-thunk';
import moxios from 'moxios';
import configureStore from 'redux-mock-store';
import { comments } from '../../../__mocks__/data';
import {
  makecomment,
  replyOnComment,
  getComments,
  deleteComment,
  getCommentLikes,
  getCommentDislikes,
  likeComment,
  dislikeComment,
  getCommentEditHistory,
  editcomment,
} from '../../../src/redux/actions/article.actions';

const middleware = [thunk];
const mockStore = configureStore(middleware);
const store = mockStore({});
describe('Make comment test action', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
    store.clearActions();
  });
  test('should make a comment', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: {
          data: { Comments: comments.data[0].Comments[0] },
        },
      });
    });
    return store.dispatch(makecomment('ede', 5)).then(() => {
      expect(store.getActions().length).toEqual(1);
    });
  });
  test('should return error', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 401,
        response: {
          data: { error: {} },
        },
      });
    });
    return store.dispatch(makecomment('ede', 5)).then(() => {
      expect(store.getActions().length).toEqual(1);
    });
  });
});

describe('Reply on comment test action', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
    store.clearActions();
  });
  test('should make a reply on a comment', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: {
          data: { Comments: comments.data[0].Comments[0] },
        },
      });
    });
    return store.dispatch(replyOnComment('ede', 5, 'efded')).then(() => {
      expect(store.getActions().length).toEqual(1);
    });
  });
  test('should return error', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: {
          data: { error: {} },
        },
      });
    });
    return store.dispatch(replyOnComment('ede', 5, 'efded')).then(() => {
      expect(store.getActions().length).toEqual(1);
    });
  });
});

describe('Get comments test action', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
    store.clearActions();
  });
  test('Should get comment', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          data: { Comments: comments.data[0].Comments },
        },
      });
    });
    return store.dispatch(getComments()).then(() => {
      expect(store.getActions().length).toEqual(1);
    });
  });
});

describe('Delete comment test action', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
    store.clearActions();
  });
  test('should delete a comment', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: {
          data: { message: 'comment deleted sucessful' },
        },
      });
    });
    return store.dispatch(deleteComment(5)).then(() => {
      expect(store.getActions().length).toEqual(1);
    });
  });
  test('should return error', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: {
          data: { error: {} },
        },
      });
    });
    return store.dispatch(deleteComment(5)).then(() => {
      expect(store.getActions().length).toEqual(1);
    });
  });
});

describe('Get  comment likes action', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
    store.clearActions();
  });
  test('should get comment likes', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          data: { commentId: 23, likes: 34 },
        },
      });
    });
    return store.dispatch(getCommentLikes(5)).then(() => {
      expect(store.getActions().length).toEqual(1);
    });
  });
});

describe('Get  comment dislikes action', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
    store.clearActions();
  });
  test('should get comment dislikes', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          data: { commentId: 23, likes: 34 },
        },
      });
    });
    return store.dispatch(getCommentDislikes(5)).then(() => {
      expect(store.getActions().length).toEqual(1);
    });
  });
});

describe('Like  comment action', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
    store.clearActions();
  });
  test('should like comment', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: {
          data: { message: 'thanks to like this comment' },
        },
      });
    });
    return store.dispatch(likeComment(5)).then(() => {
      expect(store.getActions().length).toEqual(1);
    });
  });
  test('should return error', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: {
          data: { error: {} },
        },
      });
    });
    return store.dispatch(likeComment(5)).then(() => {
      expect(store.getActions().length).toEqual(1);
    });
  });
});

describe('Dislike a comment', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
    store.clearActions();
  });
  test('should dislike a comment', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          data: { message: 'thanks to like this comment' },
        },
      });
    });
    return store.dispatch(dislikeComment(5)).then(() => {
      expect(store.getActions().length).toEqual(1);
    });
  });
  test('should return error', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: {
          data: { error: {} },
        },
      });
    });
    return store.dispatch(dislikeComment(5)).then(() => {
      expect(store.getActions().length).toEqual(1);
    });
  });
});

describe('Edit a comment', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
    store.clearActions();
  });
  test('should edit a comment', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          data: { message: 'thanks to edit this comment' },
        },
      });
    });
    return store.dispatch(editcomment(5)).then(() => {
      expect(store.getActions().length).toEqual(1);
    });
  });
  test('should return error', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: {
          data: { error: {} },
        },
      });
    });
    return store.dispatch(editcomment(5)).then(() => {
      expect(store.getActions().length).toEqual(1);
    });
  });
});

describe('Edit a comment', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
    store.clearActions();
  });
  test('should edit a comment', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          data: { comments: {} },
        },
      });
    });
    return store.dispatch(getCommentEditHistory(5)).then(() => {
      expect(store.getActions().length).toEqual(1);
    });
  });
  test('should return error', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 401,
        response: {
          data: { comment: {} },
        },
      });
    });
    return store.dispatch(getCommentEditHistory(5)).then(() => {
      expect(store.getActions().length).toEqual(1);
    });
  });
});
