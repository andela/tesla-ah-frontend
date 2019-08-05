/* eslint-disable no-unreachable */
/* eslint-disable no-else-return */
/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable no-plusplus */
/* eslint-disable react/sort-comp */
/* eslint-disable no-console */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import moment from 'moment';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getArticles } from '../../redux/actions/article.actions';
import { setLoading, setLoaded } from '../../redux/actions/ui.actions';
import Paginate from './Paginate';
import pagination from '../../utils/pagination';

export class AllArticles extends Component {
  state = {
    currentPage: 1,
    isClicked: false,
    openSlug: null,
  };

  componentDidMount() {
    this.props.getArticles();
  }

  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  handleToggle = (slug) => {
    const { isClicked } = this.state;
    this.setState({ isClicked: !isClicked, openSlug: slug });
  };

  render() {
    const {
      articles: { articles: { articles } },
    } = this.props;
    const { isClicked, currentPage, openSlug } = this.state;
    const pageSize = 5;
    const paginateArticles = pagination(articles, currentPage, pageSize);
    if (articles) {
      toast.success('Fetching Articles succeeded...');
      return (
        <div className="main-section container mt-5 mb-5">
          <br />
          <div className="row ml-2">
            <div className="col-lg-12">
              <label
                htmlFor="story_title"
                className="h3 font-weight-bold text-dark"
              >
                {' '}
                My Stories
              </label>
            </div>
          </div>
          {paginateArticles.map(article => (
            <div className="row mt-5 mb-3 ml-3 " key={article.id}>
              <div
                className="col-lg-8 border-bottom"
                style={{ cursor: 'pointer' }}
              >
                <Link
                  to={`/articles/${article.slug}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div className="row">
                    <label
                      htmlFor="story_title"
                      className="h5 text-dark font-weight-bold"
                    >
                      {article.title}
                    </label>
                  </div>
                  <div className="row">
                    <label
                      htmlFor="story_description"
                      className="text-secondary font-weight-light"
                    >
                      {`${article.description.substring(1, 350)}...`}
                    </label>
                  </div>
                  <div className="row">
                    <div className="col-lg-0">
                      <label
                        htmlFor="story_date"
                        className="h6 text-secondary font-weight-bold"
                      >
                        {moment(article.createdAt).format('DD MMMM YYYY')}
                      </label>
                    </div>
                    <div className="col-lg-6">
                      <label
                        htmlFor="story_readtime"
                        className="h6 text-secondary font-weight-normal"
                      >
                        {article.readtime}
                      </label>
                    </div>
                    <div className="col-lg-8" />
                  </div>
                </Link>
              </div>
              <div className="col-lg-2">
                <img
                    src={JSON.parse(article.body).article.body.blocks[2].data.url}
                    alt="Story1-Image"
                    className="rounded-0 w-100"
                />
              </div>
              <div className="col-lg-1">
                <i
                  className="fas fa-ellipsis-v text-secondary icon-hover"
                  style={{ fontSize: '20px' }}
                  onClick={this.handleToggle.bind(this, article.slug)}
                />
                {isClicked && openSlug === article.slug ? (
                  <div className="bookmarks_button">
                    <button
                      className="text-dark w-100 border-0"
                    >
                      Remove
                    </button>
                    <button
                      className="text-dark w-100 border-0"
                    >
                      Edit
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          ))}
          <Paginate
            totalArticles={articles.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      );
    } else {
      return (
        <div className=" container">
          <div className="row">
            <div className="col-lg-3" />
            <div className="col-lg-6 mt-5">
              <h3>
                {' '}
                { this.props.articles.articles.message }
                {' '}
              </h3>
            </div>
            <div className="col-lg-3" />
          </div>
        </div>
      );
    }
    return <h2> Loading... </h2>;
  }
}

const mapStateToProps = state => ({
  articles: state.article,
  ui: state.ui,
});

export default connect(
  mapStateToProps,
  { getArticles, setLoaded, setLoading },
)(AllArticles);
