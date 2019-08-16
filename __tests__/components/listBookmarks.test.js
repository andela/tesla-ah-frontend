/* eslint-disable no-unused-vars */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import BookmarksComponent, { Bookmarks } from '../../src/components/pages/Bookmark';
import { article } from '../../__mocks__/data';
import store from '../../src/redux/store';

let bookmark;
const props = {
  listBookmarkedArticle: jest.fn(),
  deleteBookmarkedArticle: jest.fn(),
  bookmarkedArticles: {
    list: [...article],
  },
};
describe('<Bookmarks />', () => {
  test('Should display bookmarked articles', () => {
    bookmark = shallow(<Bookmarks {...props} />);
    const deleteButtons = bookmark.find('.remove-bookmark-btn');
    deleteButtons.map(deleteButton => deleteButton.simulate('click', {}));
    expect(bookmark).toHaveLength(1);
  });

  test('Should display bookmarked articles', () => {
    bookmark = mount(<Provider store={store}><BookmarksComponent {...props} /></Provider>);
    expect(bookmark).toHaveLength(1);
  });
});
