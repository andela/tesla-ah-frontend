/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import DisplayContent from 'Dante2';
import jwt from 'jwt-decode';
import Rater from 'react-rater';
import Moment from 'react-moment';
import { toast } from 'react-toastify';
import { Link, Redirect } from 'react-router-dom';
import {
  getArticle,
  deleteArticle,
  resetProps,
  getBoomarks,
  bookmark,
} from '../../redux/actions/article.actions';
import { getUserProfile } from '../../redux/actions/author/authoruser.action';
import { DEFAULT_AVATA } from '../../utils/constants';
import Preloader from '../widgets/Preloader';
import LikeAndDislike from '../common/LikeAndDislike';
import Share from '../common/Share';
import Comments from '../Card/CommentCard';


class ReadArticle extends Component {
  state = {
    Article: {},
    Author: {},
    user: {},
    slug: '',
    redirectToLogin: false,
    redirectToMyArticles: false,
    isProfileRequested: false,
    AllBoomarked: {},
    userId: {},
    isBookmarked: false,
    isPreviousBookmarked: false,
  };

  componentWillMount() {
    window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
    const { slug } = this.props.match.params;
    this.props.getBoomarks();
    this.props.getArticle(slug);
    this.setState({ slug });
  }

  componentWillReceiveProps(newProps) {
    if (newProps.Article) {
      this.setState({ Article: newProps.Article });
      if (!this.state.isProfileRequested) {
        this.props.getUserProfile(newProps.Article.article.author.username);
        this.setState({ isProfileRequested: true });
      }
    }
    if (newProps.Author) {
      this.setState({ Author: newProps.Author });
    }
    if (newProps.myBookmarks.length > 0) {
      const { slug } = this.props.match.params;
      if (
        this.isThisSlugBookmarked(slug, newProps.myBookmarks)
        && !this.state.isPreviousBookmarked
      ) {
        this.setState({ isBookmarked: true, isPreviousBookmarked: true });
      }
    }

    this.setState(prevState => ({
      ...prevState,
      user: { ...prevState.user, ...newProps.user },
    }));
  }

  handleClickBookmark = () => {
    const {
      match: {
        params: { slug },
      },
      bookmark: bookmarkArticle,
    } = this.props;
    const token = sessionStorage.getItem('token');
    try {
      jwt(token);
      bookmarkArticle(slug);
      this.props.getBoomarks(slug);
      this.setState({
        // eslint-disable-next-line react/no-access-state-in-setstate
        isBookmarked: !this.state.isBookmarked,
      });
    } catch (err) {
      this.setState({ redirectToLogin: true });
    }
  };

  handleDeleteArticle = (slug) => {
    this.props.deleteArticle(slug).then(() => {
      this.setState({ redirectToMyArticles: true });
      toast.success('Articles has been deleted successfully...');
    });
  }

  isThisSlugBookmarked = (slug, bookmarks = []) => {
    const data = bookmarks.find(item => item && item.slug === slug);
    if (data) {
      return true;
    }
    return false;
  };

  render() {
    const {
      Article,
      Author,
      slug,
      user: { username, id: userId },
    } = this.state;
    let contentBlocks = [];
    if (this.state.redirectToLogin) {
      return (
        <Redirect
          to={{
            pathname: '/auth/login',
            state: { redirect: this.props.location.pathname },
          }}
        />
      );
    }
    if (this.state.redirectToMyArticles) {
      return <Redirect to="/articles" />;
    }
    if (Article && Author.profile) {
      const BookmarkButton = this.state.isBookmarked
        ? 'fas fa-bookmark'
        : 'far fa-bookmark';
      const content = JSON.parse(Article.article.body);
      const { blocks } = content.article.body;
      contentBlocks = blocks.splice(1, blocks.length);
      const { avatar, firstName, lastName } = Author.profile;
      return (
        <div className="container view-article-content mt-5">
          <section className="editor-main-section">
            <main className="editor-main row mt-6 mb-5">
              <div className="col-lg-9 left-nav">
                <div className="title-content">
                  <p>
                    <strong>{blocks[0].text}</strong>
                  </p>
                </div>
                <div className="row profile-content ml-1">
                  <div className="">
                    <Link
                      to={`/profile/${this.state.Article.article.author.username}`}
                    >
                      <img className="" src={avatar || DEFAULT_AVATA} alt="" />
                    </Link>
                  </div>
                  <div className="ml-3">
                    <div>
                      <Link
                        to={`/profile/${this.state.Article.article.author.username}`}
                      >
                        <strong>{`${firstName}  ${lastName}`}</strong>
                      </Link>
                    </div>
                    <div>
                      <Moment format="D MMM YYYY">
                        {Article.article.createdAt}
                      </Moment>
                    </div>
                    <Rater total={5} rating={2} />
                  </div>
                </div>
                <div className="mt-3">
                  <DisplayContent
                    content={{ blocks: contentBlocks, entityMap: {} }}
                    read_only
                  />
                  {(Article.article.tagList || []).map(tag => (
                    <Fragment>
                      <Link to={`/tags?tag=${tag}`} className="btn button is-grey btn-xs tag-button" style={{ backgroundColor: '5px', marginBottom: '20px' }}>
                        {' '}
                        {tag}
                      </Link>
                      {' '}
                    </Fragment>
                  ))}
                  <Comments
                    defaultavata={DEFAULT_AVATA}
                    user={this.state.user}
                    slug={this.state.slug}
                    pathname={this.props.location.pathname}
                    likeDislike={(<LikeAndDislike slug={slug} userId={userId} pathname={this.props.location.pathname} />)}
                  />
                </div>
              </div>
              <div className="col-lg-1 rigth-nav text-center">
                <div className="social-buttons">
                  <Share article={Article.article} />
                  <div
                    onClick={this.handleClickBookmark}
                    className={`${
                      username === this.state.Article.article.author.username
                        ? 'hide-button'
                        : ''
                    } floating-buttons mt-3 bookmark`}
                  >
                    <i className={BookmarkButton} />
                  </div>
                  {
                    username === this.state.Article.article.author.username
                  }
                  <Link to={`/article/${this.state.slug}/edit`}>
                    <div
                      className={`${
                        username !== this.state.Article.article.author.username
                          ? 'hide-button'
                          : ''
                      } floating-buttons mt-3 edit`}
                    >
                      <i className="fas fa-edit" />
                    </div>
                  </Link>
                  <div
                    className={`${
                      username !== this.state.Article.article.author.username
                        ? 'hide-button'
                        : ''
                    } floating-buttons mt-3 delete`}
                    data-toggle="modal"
                    data-target="#myModal"
                  >
                    <i className="fas fa-trash-alt" />
                  </div>
                </div>
              </div>
            </main>
            <div id="myModal" className="modal fade" role="dialog">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header model-header-div">
                    <button
                      type="button"
                      className="close text-white"
                      data-dismiss="modal"
                    >
                      &times;
                    </button>
                  </div>
                  <div className="modal-body modal-body-div">
                    <p> Are you sure you want to delete this article ?</p>
                  </div>
                  <div className="modal-footer modal-footer-div">
                    <button
                      type="button"
                      className="btn btn-default text-white"
                      data-dismiss="modal"
                    >
                      No
                    </button>
                    <button
                      type="button"
                      className="btn btn-default text-white"
                      data-dismiss="modal"
                      onClick={() => this.handleDeleteArticle(this.state.slug)}
                    >
                      Yes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
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

const mapStateToProps = state => ({
  Article: state.article.article,
  Author: state.author.authorprofile,
  Delete: state.article.deletedArticle,
  myBookmarks: state.article.Boomarks,
  bookmark: state.article.bookmark,
  user: state.login.user,
});

export default connect(
  mapStateToProps,
  {
    getArticle,
    getUserProfile,
    deleteArticle,
    resetProps,
    getBoomarks,
    bookmark,
  },
)(ReadArticle);
