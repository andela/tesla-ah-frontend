import { forEach } from 'async';
import { getArticleItemData } from './getArticleItemData';

const parseArticleArray = articles => new Promise((resolve) => {
  const processedArticles = [];
  forEach(
    articles,
    (articleItem, cb) => {
      const { article, image } = getArticleItemData(articleItem);
      processedArticles.push({
        slug: article.slug,
        title: article.title,
        description: article.description,
        readtime: article.readtime,
        likes: article.likes,
        dislikes: article.dislikes,
        updatedAt: article.updatedAt,
        image,
      });
      cb();
    },
    () => {
      resolve(processedArticles);
    },
  );
});

export default parseArticleArray;
