/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-param-reassign */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slideritem from '../items/Slideritem';

class Slider extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      articleSlides: [],
    };
    this.getArticleSlides = this.getArticleSlides.bind(this);
  }

  getArticleSlides = (articles, limit) => {
    const out = [];
    for (let i = 0; i <= limit; i += 1) {
      if (i === 0) { articles[i].clc = 'active'; }
      out.push(articles[i]);
    }
    return out;
  }

  render() {
    const { Articles } = this.props;
    const { articles } = Articles;
    let Sliders = <div />;
    if (articles) {
      const articleSlides = articles.length >= 3 ? this.getArticleSlides(articles, 2)
        : this.getArticleSlides(articles, articles.length);
      Sliders = articleSlides.map(article => (
        <Slideritem
          key={article ? article.id : 0}
          article={article}
        />
      ));
    }
    return (
      <div>
        <section className="slideshow">
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-ride="carousel"
          >
            <ol className="carousel-indicators">
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="0"
                className="active"
              />
              <li data-target="#carouselExampleIndicators" data-slide-to="1" />
              <li data-target="#carouselExampleIndicators" data-slide-to="2" />
            </ol>
            <div className="carousel-inner">
              {Sliders}
            </div>
          </div>
        </section>
      </div>
    );
  }
}
Slider.propTypes = {
  Articles: PropTypes.object.isRequired,
};

export default Slider;
