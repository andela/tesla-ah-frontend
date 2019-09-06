/* eslint-disable max-len */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */
/* eslint-disable react/sort-comp */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { ButtonGroup, Button } from 'shards-react';
import '../../../node_modules/tesla-error-handler/dist/card.scss';
import {
  getArticleLikes,
  getArticleDislikes,
  likeArticle,
  dislikeArticle,
  getArticle,
} from '../../redux/actions/article.actions';

class LikeAndDislike extends Component {
  state = {
    article: {},
    likeClicked: false,
    dislikeClicked: false,
    getArticleLikes: {},
    getArticleDislikes: {},
    redirect: false,
    likes: 0,
    dislikes: 0,
    isLiked: undefined,
    isDisliked: undefined,
  };

  articleLikes = (slug) => {
    const { getArticleLikes: gatl } = this.props;
    gatl(slug);
  };

  getArticleDislikes =(slug) => {
    const { getDislikeArticles } = this.props;
    getDislikeArticles(slug);
  }

  componentDidMount() {
    const {
      getArticleLikes: artl, getArticleDislikes: ard, slug, id, userId,
    } = this.props;
    artl(slug).then((res) => {
      this.setState({ likes: res.numberOfLikes, isLiked: this.isLikedArticle(res.likedUser, userId) });
    });
    ard(slug).then((res) => {
      this.setState({ dislikes: res.numberOfDislikes, isDisliked: this.isDislikedArticle(res.dislikedUser, userId) });
    });
  }

  isLikedArticle = (array, id) => array.find(item => item.userId === id && item.likes > item.dislikes);

  isDislikedArticle = (array, id) => array.find(item => item.userId === id && item.dislikes > item.likes);


  handleLikeArticle = (slug) => {
    this.props.likeArticle(slug).then((res) => {
      if (res.status === 500) {
        this.setState({ redirect: true });
      } else {
        const { slug: slg } = this.props;
        if (res.status === 403) {
          toast.warn('You have already liked this article!');
        } else {
          this.setState({ isLiked: true });
        }

        this.props.getArticleDislikes(slg).then((resp) => {
          this.setState({ dislikes: resp.numberOfDislikes, isDisliked: this.isDislikedArticle(resp.dislikedUser, this.props.userId) });
        });
        this.props.getArticleLikes(slg).then((resp) => {
          this.setState({ likes: resp.numberOfLikes, isLiked: this.isLikedArticle(resp.likedUser, this.props.userId) });
        });
      }
    });
  }

  handleDislikeArticle = (slug) => {
    this.props.dislikeArticle(slug).then((res) => {
      if (res.status === 500) {
        this.setState({ redirect: true });
      } else {
        if (res.status === 403) {
          toast.warn('You have already disliked this article!');
        } else {
          this.setState({ isDisliked: true });
        }
        this.props.getArticleDislikes(slug).then((resp) => {
          this.setState({ dislikes: resp.numberOfDislikes, isDisliked: this.isDislikedArticle(resp.dislikedUser, this.props.userId) });
        });
        this.props.getArticleLikes(slug).then((resp) => {
          this.setState({ likes: resp.numberOfLikes, isLiked: this.isLikedArticle(resp.likedUser, this.props.userId) });
        });
      }
    });
  }

  render() {
    const {
      likes,
      dislikes,
    } = this.state;
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: '/auth/login',
            state: { redirect: this.props.pathname },
          }}
        />
      );
    }
    return (
      <div>
        <ButtonGroup size="sm">
          <Button theme="white" onClick={() => this.handleLikeArticle(this.props.slug)}>
            <span className="like-article-btn">
              <i className={`${this.state.isLiked ? 'fas' : 'far'} fa-thumbs-up`} />
            </span>
            &nbsp;&nbsp;
            {likes}
          </Button>
          <Button theme="white" onClick={() => this.handleDislikeArticle(this.props.slug)}>
            <span className="dislike-article-btn">
              <i className={`${this.state.isDisliked ? 'fas' : 'far'} fa-thumbs-down`} />
            </span>
            &nbsp;&nbsp;
            {dislikes}
          </Button>
        </ButtonGroup>
      </div>
    );
  }
}

const mapStateToProps = ({ article, likeAndDislike }) => ({
  article,
  likeAndDislike,
});

export default connect(
  mapStateToProps,
  {
    likeArticle,
    getArticleDislikes,
    getArticleLikes,
    dislikeArticle,
    getArticle,
  },
)(LikeAndDislike);
