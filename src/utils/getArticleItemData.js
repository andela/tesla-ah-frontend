/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */
import path from 'path';

export const getFromEditor = (article) => {
  // console.log(article);
  const { blocks } = article.article.body;
  let body = '';
  let image = `${path.join(__dirname, 'src/assets/img/default_article.png')}`;
  const title = blocks[0].text;
  for (let i = 1; i < blocks.length; i += 1) {
    if (blocks[i].type === 'image') {
      image = blocks[i].data.url;
      break;
    }
  }
  for (let i = 1; i < blocks.length; i += 1) {
    if (blocks[i].type === 'unstyled') {
      body = blocks[i].text;
      break;
    }
  }
  return { body, image, title };
};

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
