/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable object-curly-spacing */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeNull } from 'tesla-error-handler';
import Articleitem from '../items/Articleitem';
import { listBookmarkedArticle, deleteBookmarkedArticle} from '../../redux/actions/bookmark.action';
import { getItemDataFromDatabase } from '../../utils/getArticleItemData';
import Preloader from '../widgets/Preloader';

export class Bookmarks extends Component {
  state = {
    pageHeight: window.innerHeight,
  };

  componentWillMount() {
    const { listBookmarkedArticle: getArticle, bookmarkedArticles } = this.props;
    getArticle();
  }

  hasBookmarked = ({ list }) => Array.isArray(list) && list.length;

  render() {
    const { pageHeight } = this.state;
    const { loading } = this.state;
    const { bookmarkedArticles, deleteBookmarkedArticle: deleteBookmark } = this.props;
    const hasBookmarks = this.hasBookmarked(bookmarkedArticles);
    if (bookmarkedArticles.loading) {
      return <Preloader />;
    }
    const originalBookmarks = removeNull(bookmarkedArticles.list);

    return (
      <div className="Bookmarks" style={{ minHeight: pageHeight - 200 }}>
        {hasBookmarks ? (
          <div className="container bookmark_container">
            <h4 className="ml-3 mt-5 bookmark-title">Bookmarks</h4>
            <hr className="ml-3" />
            {originalBookmarks.map(article => (
              <div className="bookmark-item-cont">
                <a
                  className="col-md-6"
                  key={article.id}
                  href={`/articles/${article.slug}`}
                >
                  <Articleitem show key={article.id} article={getItemDataFromDatabase(article)} />
                </a>
                <button
                  onClick={e => deleteBookmark(article.slug)}
                  type="submit"
                  className="btn btn-primary remove-btn remove-bookmark-btn"
                >
                  Remove
                </button>
                <hr className="ml-4" />
              </div>
            ))}
          </div>
        ) : (
          <div className="container bookmark_container">
            <h4 className="ml-3 mt-5">Bookmarks</h4>
            <hr className="ml-3" />
            <div className="container no-bookmarks">
              <p>You have no bookmarks! </p>
            </div>
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
  {listBookmarkedArticle, deleteBookmarkedArticle },
)(Bookmarks);
