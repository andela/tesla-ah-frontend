/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Articleitem from '../items/Articleitem';
import { listBookmarkedArticle } from '../../redux/actions/bookmark.action';
import { getItemDataFromDatabase } from '../../utils/getArticleItemData';
import Preloader from '../widgets/Preloader';

export class Bookmarks extends Component {
  state = {};

  componentDidMount() {
    const { listBookmarkedArticle: getArticle, bookmarkedArticles } = this.props;
    getArticle();
  }

  hasBookmarked = ({ list }) => Array.isArray(list) && list.length;

  render() {
    const { bookmarkedArticles } = this.props;
    const hasBookmarks = this.hasBookmarked(bookmarkedArticles);
    return (
      <div>
        {hasBookmarks && (
          <div className="container bookmark_container">
            <h4 className="ml-4 mt-5">Bookmarks</h4>
            {bookmarkedArticles.list.map(article => (
              <div className="bookmark-item-cont">
                <Link
                  className="col-md-6 bookmark-link"
                  key={article.id}
                  href=""
                  to={`/articles/${article.slug}`}
                >
                  <Articleitem show key={article.id} article={getItemDataFromDatabase(article)} />
                  <hr className="ml-4" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = ({ bookmarkedArticles }) => ({
  bookmarkedArticles,
});
export default connect(
  mapStateToProps,
  { listBookmarkedArticle },
)(Bookmarks);
