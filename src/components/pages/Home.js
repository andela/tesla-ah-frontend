/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Pagination from 'react-pagination-library';
import Slider from '../layouts/Slider';
import Main from '../layouts/Maincontent';
import { getArticles } from '../../redux/actions/article.actions';
import { getItemDataFromDatabase } from '../../utils/getArticleItemData';
import Articleitem from '../items/Articleitem';
import Preloader from '../widgets/Preloader';

export class Home extends Component {
  state = {
    currentPage: 1,
  };

  componentWillMount() {
    this.props.getArticles(this.state.currentPage);
  }

  changeCurrentPage = (numPage) => {
    this.setState({ currentPage: numPage });
    this.props.getArticles(this.state.currentPage);
  };

  render() {
    let articleItems = [];
    let articleslist = {};
    if (this.props.article.articles) {
      articleslist = this.props.article;
      articleItems = this.props.article.articles.map(article => (
        <Link
          className="col-md-6"
          key={article.id}
          href=""
          to={`/articles/${article.slug}`}
        >
          <Articleitem
            key={article.id}
            article={getItemDataFromDatabase(article)}
          />
        </Link>
      ));
      return (
        <div>
          <div className="homecontainer" data-test="homeComponent">
            <Slider Articles={articleslist} />
            <Main Articles={articleItems} />
            <div className="text-center container pagination-container">
              <Pagination
                currentPage={this.state.currentPage}
                totalPages={Math.ceil(this.props.article.count / 10)}
                changeCurrentPage={this.changeCurrentPage}
                // theme="bottom-border"
              />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className="homecontainer" data-test="homeComponent">
          <Preloader />
        </div>
      </div>
    );
  }
}

Home.protoTypes = {
  getArticles: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  article: state.article.articles,
});
export default connect(
  mapStateToProps,
  { getArticles },
)(Home);
