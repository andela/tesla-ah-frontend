/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import Pagination from 'react-pagination-library';
import { sortArrayDesd as sortArticles } from 'tesla-error-handler';
import {
  getMyArticles,
  deleteArticle,
} from '../../redux/actions/article.actions';
import { setLoading, setLoaded } from '../../redux/actions/ui.actions';
// import Preloader from '../widgets/Preloader';
import Image from '../items/Imageitem';
import { getItemDataFromDatabase } from '../../utils/getArticleItemData';
import Preloader from '../widgets/Preloader';

export class MyArticles extends Component {
  state = {
    currentPage: 1,
  };

  componentDidMount() {
    this.props.getMyArticles(this.state.currentPage);
  }

  changeCurrentPage = (numPage) => {
    this.setState({ currentPage: numPage });
    this.props.getMyArticles(this.state.currentPage);
  };

  render() {
    const foundArticles = this.props.articles.data;
    if (foundArticles !== undefined && foundArticles) {
      const articles = foundArticles.foundArticles;
      return (
        <div className="container mt-5 mb-5 center my-articles-container">
          <br />
          <div className="row ml-2">
            <div className="col-lg-12">
              <div
                htmlFor="story_title"
                className="h3 font-weight-bold text-dark"
              >
                { foundArticles.count !== 0 ? 'My Stories' : (
                  <div className="row">
                    <div className="col-lg-3" />
                    <div className="col-lg-6 text-center text-third">
                      <h2>You don&apos;t have any article so far!</h2>
                    </div>
                    <div className="col-lg-3" />
                  </div>
                )}
              </div>
            </div>
          </div>
          {sortArticles(articles).map((article) => {
            const {
              image,
              body,
              article: {
                title, createdAt, readtime,
              },
            } = getItemDataFromDatabase(article);
            return (
              <a
                href={`/articles/${article.slug}`}
                style={{ textDecoration: 'none' }}
                key={article.slug}
              >
                <div className="row mt-5 mb-3 ml-3 " key={article.slug}>
                  <div className="col-lg-7" style={{ cursor: 'pointer' }}>
                    <div className="row">
                      <p
                        htmlFor="story_title"
                        className="h5 text-dark font-weight-bold"
                      >
                        {title}
                      </p>
                    </div>
                    <div className="row">
                      <p
                        htmlFor="story_description"
                        className="text-secondary font-weight-light"
                      >
                        {body}
                      </p>
                    </div>
                    <div className="row">
                      <div className="col-lg-0">
                        <p
                          htmlFor="story_date"
                          className="h6 text-secondary font-weight-bold"
                        >
                          {moment(createdAt).format('DD MMMM YYYY')}
                        </p>
                      </div>
                      <div className="col-lg-6">
                        <p
                          htmlFor="story_readtime"
                          className="h6 text-secondary font-weight-normal story_readtime"
                        >
                          {readtime}
                        </p>
                      </div>
                      <div className="col-lg-8" />
                    </div>
                  </div>
                  <Image title={title} image={image} />
                </div>
              </a>
            );
          })}
          <div className="text-center container pagination-container">
            <Pagination
              currentPage={this.state.currentPage}
              totalPages={Math.ceil(foundArticles.count / 5)}
              changeCurrentPage={this.changeCurrentPage}
            />
          </div>
        </div>
      );
    }
    return (
      <div>
        <Preloader />
      </div>
    );
  }
}
export const mapStateToProps = state => ({
  articles: state.article.myarticles,
  ui: state.ui,
  login: state.login,
});
export default connect(
  mapStateToProps,
  {
    getMyArticles,
    setLoaded,
    setLoading,
    deleteArticle,
  },
)(MyArticles);
