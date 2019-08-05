/* eslint-disable no-undef */
import { articles } from '../mockData';
import parseArticleArray from '../../src/utils/parseArticleArray';

describe('Test article array parsing', () => {
  it('should parse an array of articles', async () => {
    expect(await parseArticleArray([articles[1]])).toEqual([articles[2]]);
  });
});
