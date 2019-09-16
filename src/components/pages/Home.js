/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import QueryString from 'query-string';
import Pagination from 'react-pagination-library';
import { toast } from 'react-toastify';
import { sortArrayDesd as sortArticles } from 'tesla-error-handler';
import Slider from '../layouts/Slider';
import Main from '../layouts/Maincontent';
import { getArticles } from '../../redux/actions/article.actions';
import { getItemDataFromDatabase } from '../../utils/getArticleItemData';
import Articleitem from '../items/Articleitem';
import Preloader from '../widgets/Preloader';

export class Home extends Component {
  state = {
    currentPage: 1,
    isLoading: true,
  };

  componentWillMount() {
    this.props.getArticles(this.state.currentPage);
  }

  componentDidMount() {
    window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
    const token = sessionStorage.getItem('token');
    if (!token && this.props.location.search) {
      const search = QueryString.parse(this.props.location.search);
      sessionStorage.setItem('token', search.token);
      window.location.reload(true);
    }
  }

  componentWillReceiveProps(newProps) {
    /* istanbul ignore next */
    if (newProps.article.articles) {
      this.setState({ isLoading: false });
    }
    /* istanbul ignore next */
    if (newProps.auth.verified) {
      toast.success('Welcome back, you are now Verified!');
    }
  }

  changeCurrentPage = (numPage) => {
    this.props.getArticles(numPage);
    this.setState({ currentPage: numPage, isLoading: true });
  };

  render() {
    let articleItems = [];
    let articleslist = {};
    if (!this.state.isLoading) {
      articleslist = this.props.article;
      articleItems = sortArticles(this.props.article.articles).map(article => (
        <a
          className="col-md-6"
          key={article.id}
          href={`/articles/${article.slug}`}
        >
          <Articleitem
            key={article.id}
            article={getItemDataFromDatabase(article)}
          />
        </a>
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
  location: PropTypes.instanceOf(Object),
};
Home.defaultProps = {
  location: {
    state: '',
  },
};

const mapStateToProps = state => ({
  article: state.article.articles,
  auth: state.auth,
  search: state.search,
});
export default connect(
  mapStateToProps,
  { getArticles },
)(Home);
