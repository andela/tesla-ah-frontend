import React from 'react';
import { Link } from 'react-router-dom';
import { trim } from 'lodash';

import '../../assets/scss/components/Article.scss';

const Article = (props) => {
  const {
    coverImage,
    title,
    description,
    lastUpdated,
    readTime,
    likes,
    dislikes,
    slug,
  } = props;
  return (
    <React.Fragment>
      <Link to={`/articles/${slug}`} className="article-card d-flex">
        <div className="flex-grow-1 d-flex flex-column">
          {coverImage ? (
            <img
              className="article-card-img img-fluid"
              src={trim(coverImage, "'")}
              alt="avatar"
            />
          ) : null}
          <p className="article-title align-self-start">{title}</p>
          <p className="article-description align-self-start">{description}</p>
          <div className="article-actions d-flex flex-column flex-sm-row justify-content-between">
            <span>{new Date(lastUpdated).toDateString()}</span>
            <span>
              {readTime}
              {' '}
              read
            </span>
            <span>
              <i className="fas fa-thumbs-up" />
              {' '}
              {likes}
            </span>
            <span>
              <i className="fas fa-thumbs-down" />
              {' '}
              {dislikes}
            </span>
          </div>
        </div>
      </Link>
    </React.Fragment>
  );
};

export default Article;
