/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';

const Slideritem = (props) => {
  const { article } = props;
  const activeSlide = `carousel-item ${article ? article.clc : ''}`;
  return (
    <div className={activeSlide}>
      <img src="https://firebasestorage.googleapis.com/v0/b/authorshaven-cebfb.appspot.com/o/images%2Fe-commerce-back.jpg?alt=media&token=44654853-e2bb-4dfd-9b47-fbdac5d952a0" alt="..." />
      <div className="container">
        <div className="carousel__text">
          <h3>{article ? article.title : ''}</h3>
          <p>{article ? article.description : ''}</p>
          <Link to={article ? `articles/${article.slug}` : '/'} href="" className="continue-btn">
            Continue Reading
            <i className="fas fa-arrow-right" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Slideritem;
