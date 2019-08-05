/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-script-url */
/* eslint-disable react/prop-types */
/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment } from 'react';
import Pages from 'lodash';

const Paginate = ({
  totalArticles, pageSize, onPageChange,
}) => {
  const pagesCount = Math.ceil(totalArticles / pageSize);
  if (pagesCount === 0) return null;
  const pages = Pages.range(1, pagesCount + 1);
  return (
    <Fragment>
      <ul className="pagination">
        {pages.map(number => (
          <li key={number} className="page-item">
            <a onClick={() => onPageChange(number)} className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export default Paginate;
