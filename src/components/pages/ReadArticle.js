/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable object-curly-newline */
/* eslint-disable react/no-unused-state */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import DisplayContent from 'Dante2';
import jwt from 'jwt-decode';
import Rater from 'react-rating';
import Moment from 'react-moment';
import { toast } from 'react-toastify';
import { Link, Redirect } from 'react-router-dom';
import { getArticle, deleteArticle, resetProps, getBoomarks, bookmark } from '../../redux/actions/article.actions';
import { getUserProfile } from '../../redux/actions/author/authoruser.action';
import { getRating, createRating, updateRating } from '../../redux/actions/ratingArticle/rating.actions';
import { DEFAULT_AVATA } from '../../utils/constants';
import Preloader from '../widgets/Preloader';
import LikeAndDislike from '../common/LikeAndDislike';
import Share from '../common/Share';
import Comments from '../Card/CommentCard';
import ArticleRatingOverall from './ArticleRatingOverall';
import ArticleNotFound from '../common/ArticleNotFound';

const theme = {
  color: '#ffd700',
  border: '1px solid #fff',
  fontSize: '10px',
};
let ratingValues;
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
    isHovered: false,
    isClicked: false,
    ratingValue: 0,
    isRated: false,
    onHover: false,
    notFound: false,
  };

  componentWillMount() {
    window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
    const { slug } = this.props.match.params;
    this.props.getBoomarks();
    this.props.getArticle(slug);
    this.setState({ slug });
    let user = {};
    if (sessionStorage.getItem('token')) {
      user = jwt(sessionStorage.getItem('token'));
    }
    this.setState({ user, slug });
    this.props.getRating(slug);
  }

  componentWillReceiveProps(newProps) {
    const { slug } = this.props.match.params;
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
    if (newProps.article.notfound) {
      this.setState({
        notFound: newProps.article.notfound,
      });
    }
  }

  onMouseEnterHandler =() => {
    this.setState({ onHover: !this.state.onHover });
  }

  onMouseOverHandler =() => {
    this.setState({ isHovered: !this.state.isHovered });
  }

  onMouseLeaveHandler = () => {
    this.setState({ onHover: false });
  }

  onMouseOutHandler = () => {
    this.setState({ isHovered: false });
  }

  onClickHandle =() => {
    this.setState({ isClicked: !this.state.isClicked });
  }

  onChangeHandle = (rate) => {
    this.setState({ ratingValue: rate });
  }

  onCreateRating = (e, slug) => {
    e.preventDefault();
    ratingValues = this.state.ratingValue;
    if (ratingValues === 0) {
      return toast.error('Select The Stars For Your Ratings!');
    }
    this.props.createRating(slug, ratingValues);
    this.setState({
      isRated: !this.state.isRated,
      isClicked: !this.state.isClicked,
      ratingValue: 0,
    });
    this.props.getRating(slug);
    return (<Redirect to={slug} />);
  }

  onUpdateRating = (e, slug) => {
    e.preventDefault();
    ratingValues = this.state.ratingValue;
    if (ratingValues === 0) {
      return toast.error('Select The Stars For Your Ratings!');
    }
    this.props.updateRating(slug, ratingValues);
    this.setState({
      isRated: !this.state.isRated,
      isClicked: !this.state.isClicked,
      ratingValue: 0,
    });
    this.props.getRating(slug);
    return (<Redirect to={slug} />);
  }

  onPercentageHandle = (str) => {
    const data = str.split('');
    const value = parseInt(`${data[0]}${data[1]}${data[2]}`, 10);
    return value;
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
    const { Article, Author, slug, user: { username, id: userId }, isRated } = this.state;
    const { login, rating } = this.props;
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

    if (isRated && rating.errors.data !== undefined && rating.errors.data.status === 403) {
      toast.warn('You are not allowed to rate your own article!');
    }
    if (Article && Author.profile) {
      const BookmarkButton = this.state.isBookmarked ? 'fas fa-bookmark' : 'far fa-bookmark';
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
                  <div className="ml-3 w-50">
                    <div>
                      <Link
                        to={`/profile/${this.state.Article.article.author.username}`}
                      >
                        <strong>{`${firstName}  ${lastName}`}</strong>
                      </Link>
                    </div>
                    <div>
                      <div className="h6 text-secondary font-weight-normal">
                        <Moment format="DD MMM YYYY">
                          {Article.article.createdAt}
                        </Moment>
                        &nbsp;&nbsp;&nbsp;
                        <span onMouseOver={this.onMouseOverHandler} onMouseOut={this.onMouseOutHandler}>
                          <i className="far fa-eye" />
                        </span>
                        &nbsp;
                        {this.state.Article.article.views}
                        {this.state.isHovered ? (
                          <label
                            htmlFor="Views"
                            style={{
                              padding: '5px',
                              zIndex: '500',
                              marginTop: '20px',
                              marginLeft: '-55px',
                              position: 'absolute',
                              backgroundColor: 'black',
                              color: 'white',
                            }}
                          >
                            {' '}
                            Views

                          </label>
                        ) : null}
                          &nbsp;&nbsp;&nbsp;&nbsp;
                        {Article.article.readtime}
                      </div>
                    </div>
                    <div onMouseOver={this.onMouseEnterHandler} onMouseOut={this.onMouseLeaveHandler}>
                      <Rater
                        initialRating={
                          rating.Ratings !== undefined ? rating.Ratings.report.Average : 0
                        }
                        style={theme}
                        emptySymbol="fa fa-star-o fa-2x"
                        fullSymbol="fa fa-star fa-2x"
                        readonly
                      />
                    </div>
                    { this.state.onHover ? (
                      <ArticleRatingOverall
                        rating={rating}
                        onPercentageHandle={this.onPercentageHandle}
                      />
                    ) : null }
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
                  {/* eslint-disable-next-line */}
                  {username !== this.state.Article.article.author.username
                    ? (
                      <div className="floating-buttons mt-3 star" onClick={this.onClickHandle}>
                        <i className="fas fa-star" />
                      </div>
                    ) : null
                  }
                  {this.state.isClicked ? login.isAuthenticated
                    && login.user.id > 0
                    ? (
                      <div
                        className="card p-2 mt-1"
                        style={{
                          width: '20rem', zIndex: '500', position: 'absolute',
                        }}
                      >
                        <div className="row">
                          <div className="col-lg-12">
                                Give Us Your Ratings On This Article
                          </div>
                          <div className="col-lg-6">
                            <Rater
                              initialRating={this.state.ratingValue}
                              style={theme}
                              emptySymbol="fa fa-star-o fa-2x"
                              fullSymbol="fa fa-star fa-2x"
                              onChange={this.onChangeHandle}
                            />
                          </div>
                          <div className="col-lg-6">
                            <button
                              className="btn green"
                              type="submit"
                              onClick={
                              rating.errors.data !== undefined && rating.errors.data.status === 400
                                ? e => this.onUpdateRating(e, Article.article.slug)
                                : e => this.onCreateRating(e, Article.article.slug)
                              }
                            >
                              {
                                rating.errors.data !== undefined
                                  && rating.errors.data.status === 400
                                  ? 'Update Rating' : rating.errors
                                    ? 'Submit Rating' : null
                              }
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="card p-2 mt-1"
                        style={{
                          width: '20rem', zIndex: '500', position: 'absolute',
                        }}
                      >
                        <div className="row">
                          <div className="col-lg-12">
                                  Give Us Your Ratings On This Article
                          </div>
                          <div className="col-lg-6">
                            <Link to="/auth/login">
                              <button className="btn green" type="submit" onClick={() => sessionStorage.setItem('previousLink', `/articles/${Article.article.slug}`)}>
                                Login First
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>

                    ) : null}
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
    if (this.state.notFound) {
      return <ArticleNotFound slug={this.props.match.params.slug} />;
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
  profile: state.profile,
  login: state.login,
  rating: state.rating,
  article: state.article,
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
    getRating,
    createRating,
    updateRating,
  },
)(ReadArticle);
