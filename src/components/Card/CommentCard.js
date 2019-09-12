/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-return-assign */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Picker } from 'emoji-mart';
import { sortArrayDesd as sortComments } from 'tesla-error-handler';
import Avatar from '../menu/Avata';
import 'emoji-mart/css/emoji-mart.css';
import {
  makecomment,
  editcomment,
  getComments,
  replyOnComment,
  deleteComment,
  getCommentLikes,
  getCommentDislikes,
  getCommentEditHistory,
} from '../../redux/actions/article.actions';
import Commentsitem from '../items/Commentitem';

class Comments extends Component {
  state = {
    redirect: false,
    slug: '',
    comments: [],
    commentvalue: '',
    isNewComment: false,
  };

  componentWillMount() {
    const { slug, getComments: gc } = this.props;
    this.setState({ slug: this.props.slug });
    gc(slug).then((resp) => {
      this.setState({ commentvalue: '', isNewComment: true, comments: [] });
      this.setState({ commentvalue: '', isNewComment: true, comments: resp.data[0] ? resp.data[0].Comments : [] });
    });
  }

  handleComment = (slug, comment) => {
    this.props.makecomment(slug, comment).then((res) => {
      if (res.status === 401 || res.status === 500) {
        this.setState({ redirect: true });
      } else {
        this.props.getComments(slug).then((resp) => {
          this.setState({ commentvalue: '', isNewComment: true, comments: [] });
          this.setState({ commentvalue: '', isNewComment: true, comments: resp.data[0] ? resp.data[0].Comments : [] });
        });
      }
    });
  };

  handleEditComment = (slug, commentId, comment) => {
    this.props.editcomment(commentId, comment).then((res) => {
      if (res.status === 401 || res.status === 500) {
        this.setState({ redirect: true });
      } else {
        this.props.getComments(slug).then((resp) => {
          this.setState({ commentvalue: '', isNewComment: true, comments: [] });
          this.setState({ commentvalue: '', isNewComment: true, comments: resp.data[0] ? resp.data[0].Comments : [] });
        });
      }
    });
  };

  handleCommentTextChange = (e) => {
    this.setState({ commentvalue: e.target.value });
  };

  handleReplyComment = (commentId, slug, comment) => {
    this.props.replyOnComment(slug, commentId, comment).then((res) => {
      if (res.status === 401 || res.status === 500) {
        this.setState({ redirect: true });
      } else {
        this.props.getComments(slug).then((resp) => {
          this.setState({ commentvalue: '', isNewComment: true, comments: [] });
          this.setState({ commentvalue: '', isNewComment: true, comments: resp.data[0] ? resp.data[0].Comments : [] });
        });
      }
    });
  };

  handleDeleteComment = (commentId, slug) => {
    this.props.deleteComment(commentId).then((res) => {
      if (res.status === 401 || res.status === 500) {
        this.setState({ redirect: true });
      } else {
        toast('Comment deleted successful');
        this.props.getComments(slug).then((resp) => {
          this.setState({ commentvalue: '', isNewComment: true, comments: [] });
          this.setState({ commentvalue: '', isNewComment: true, comments: resp.data[0] ? resp.data[0].Comments : [] });
        });
      }
    });
  };

  render() {
    const {
      user: { avatar, username, id },
      defaultavata,
      pathname,
      likeDislike,
    } = this.props;
    const { comments } = this.state;
    // console.log(comments);
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: '/auth/login',
            state: { redirect: pathname },
          }}
        />
      );
    }
    // console.log(this.state.slug);
    return (
      <div className="comment-card-container">
        <div className="comment-card-count">
          <div className="mt-3 ml-4">
            <p>{`${comments.length > 0 ? comments.length : 0} Comments`}</p>
          </div>
          <div className="mt-3">
            <label>{likeDislike}</label>
          </div>
        </div>
        <div className="comment-card-add-cm">
          <Avatar src={avatar || defaultavata} size={50} className="mb-2" />
          <input
            type="textarea"
            placeholder="Add public comment"
            onChange={this.handleCommentTextChange}
            value={this.state.commentvalue}
          />
          <label className="emoji-open">
            <i
              className="far fa-smile"
              onClick={() => this.setState({ showEmoji: !this.state.showEmoji })
              }
            />
            {this.state.showEmoji && (
              <div className="emoji">
                <Picker
                  showSkinTones
                  title="Author's Haven"
                  emojiSize={25}
                  onSelect={emoji => this.setState({
                    commentvalue: `${this.state.commentvalue}  ${emoji.native}`,
                  })
                  }
                />
              </div>
            )}
          </label>
          <button
            type="button"
            className="comment-btn"
            onClick={() => this.handleComment(this.state.slug, this.state.commentvalue)
            }
          >
            Comment
          </button>
        </div>
        <hr />
        <div className="mt-4">
          {comments.length > 0 ? (
            comments.map(comment => (
              <Commentsitem
                comment={comment}
                defaultavata={defaultavata}
                slug={this.state.slug}
                replyToComment={this.handleReplyComment}
                deleteComment={this.handleDeleteComment}
                editComment={this.handleEditComment}
                id={comment.id}
                MyUsername={username}
                pathname={pathname}
                userId={id}
                isNewComment={this.state.isNewComment}
              />
            ))
          ) : (
            <div />
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  currentComment: state.article.currentComment,
  comments:
    state.article.comments.length <= 0
      ? state.article.comments
      : sortComments(state.article.comments[0].Comments),
  currentReplyedComment: state.article.currentReplyComment,
  currentLikedComment: state.article.currentLikedComment,
  currentDisLikedComment: state.article.currentDisLikedComment,
});

export default connect(
  mapStateToProps,
  {
    makecomment,
    editcomment,
    getComments,
    replyOnComment,
    deleteComment,
    getCommentLikes,
    getCommentDislikes,
    getCommentEditHistory,
  },
)(Comments);
