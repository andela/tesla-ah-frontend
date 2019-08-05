/* eslint-disable no-undef */
import { articles } from '../mockData';
import { getArticleItemData } from '../../src/utils/getArticleItemData';

describe('Test article parsing', () => {
  it('should return article, body and image for valid aritcle data', () => {
    const expectedArticleData = getArticleItemData(articles[1]);

    expect(getArticleItemData(articles[1])).toEqual(expectedArticleData);
  });
});
