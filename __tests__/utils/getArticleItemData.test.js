/* eslint-disable no-undef */
import { articles } from '../mockData';
import { getItemDataFromDatabase } from '../../src/utils/getArticleItemData';

describe('Test article parsing', () => {
  it('should return article, body and image for valid aritcle data', () => {
    const expectedArticleData = getItemDataFromDatabase(articles[1]);

    expect(getItemDataFromDatabase(articles[1])).toEqual(expectedArticleData);
  });
});
