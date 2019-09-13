/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import crying from '../../assets/img/crying-cartoon.png';

const ArticleNotFound = ({ slug }) => (
  <div className="container notfound__container">
    <div className="notfound__container--content">
      <div className="row">
        <div className="col-sm-6">
          <img src={crying} alt="" className="notfound__container--image" />
        </div>
        <div className="col-sm-6 notfound__container--description">
          <h2>Awww... Don't cry.</h2>
          <p>
The article with this slug:
            {' '}
            <i>{slug}</i>
            {' '}
does not exist.
          </p>
          <a href="/" className="btn button is-grey">Go back to homepage</a>
        </div>
      </div>
    </div>
  </div>
);

export default ArticleNotFound;
