/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import path from 'path';

export const getItemDataFromDatabase = (article) => {
  const content = JSON.parse(article.body);
  const { description } = article;
  const { blocks } = content.article.body;
  let image = null;
  for (let i = 1; i < blocks.length; i += 1) {
    if (blocks[i].type === 'image') {
      image = blocks[i].data.url;
      break;
    }
  }
  return { article, body: description, image };
};
