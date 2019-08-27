/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
import React from 'react';
import { Link } from 'react-router-dom';
import { getItemDataFromDatabase } from '../../utils/getArticleItemData';

const Article = ({ article }) => {
  const { article: freshArticle, image } = getItemDataFromDatabase(article);
  const freshDate = new Date(freshArticle.createdAt);
  const day = freshDate.getDay();
  const month = freshDate.getMonth() + 1;
  const year = freshDate.getFullYear();
  const date = `Published on ${day}/${month}/${year}`;
  return (
    <Link to={`/articles/${freshArticle.slug}`} className="search__anchor">
      <div className="article container">
        <div className="row article__container">
          <div className="col-sm-8 article__content">
            <h3 className="article__title">
              {freshArticle.title}
            </h3>
            <p className="article__description">
              {freshArticle.description}
            </p>
            <div className="article__footer">
              <div className="article__footer--time">
                <span>{date}</span>
                <span>
                  {freshArticle.readtime}
                  {' '}
                  read
                </span>
              </div>
              <div className="article__footer--bookmark">
                <div className="article__footer--bookmark--item">
                  <i className="far fa-bookmark" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4 article__image">
            <img src={image} alt="AuthorsHaven" />
          </div>
        </div>
      </div>
    </Link>
  );
};
export default Article;
