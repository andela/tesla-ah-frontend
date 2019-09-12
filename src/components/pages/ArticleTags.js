/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-state */
/* eslint-disable import/prefer-default-export */
import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import searchArticles from '../../redux/actions/article/search.action';
import Preloader from '../widgets/Preloader';
import ArticleItem from '../items/Articleitem';
import { getItemDataFromDatabase } from '../../utils/getArticleItemData';

export class Tags extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      tag: '',
    };
  }

  componentWillMount() {
    const { location, searchArticles: getArticleByTags } = this.props;
    const { tag } = queryString.parse(location.search);
    this.setState(prevState => ({
      ...prevState,
      tag: tag || prevState.tag,
    }));
    getArticleByTags(tag, 'tag');
    window.scrollTo(0, 0);
  }

  render() {
    const { articles, tag } = this.state;
    const { searchResults, pending, message } = this.props;

    if (pending) {
      return (<Preloader />);
    }

    return (
      <Fragment>
        <div className="search__results">
          <div className="container ">
            <h4 className="ml-1 mt-5 " style={{ textTransform: 'capitalize', marginLeft: '-12px' }}>
              {message || tag}
            </h4>
            {searchResults.map(article => (

              <Link to={`/articles/${article.slug}`} key={article.id}>
                <ArticleItem article={getItemDataFromDatabase(article)} />
              </Link>
            ))}
          </div>
        </div>
      </Fragment>

    );
  }
}
export const mapStateToProps = state => ({
  articleTags: state.articleTags,
  searchResults: state.search.results,
  pending: state.search.pending,
  message: state.search.message,
});

Tags.defaultProps = {
  location: {
    search: '',
  },
};

export default connect(
  mapStateToProps,
  { searchArticles },
)(Tags);
