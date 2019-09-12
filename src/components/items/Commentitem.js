/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { format } from 'timeago.js';
import { connect } from 'react-redux';
import { sortArryAsd as sortComments } from 'tesla-error-handler';
import { toast } from 'react-toastify';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import Avatar from '../menu/Avata';
import {
  likeComment,
  dislikeComment,
  getCommentLikes,
  getCommentDislikes,
  getCommentEditHistory,
} from '../../redux/actions/article.actions';

export class Commentitem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      replyvalue: '',
      readyToReply: false,
      viewRepliesCommentId: undefined,
      readyToReplyCommentId: undefined,
      hideReplies: false,
      showReplies: true,
      canDeleteComment: false,
      isMouseOver: false,
      readyToUpdateComment: false,
      readyToUpdatedCommentId: undefined,
      likes: 0,
      dislikes: 0,
      editHistory: [],
      showEditHistory: false,
      LikedComment: undefined,
      DisLikedComment: undefined,
      showEmoji: false,
    };
    this.focusInput = React.createRef();
  }

  componentDidMount() {
    this.handleResetState();
  }

  componentDidUpdate() {
    if (this.focusInput.current) {
      this.focusInput.current.focus();
    }
  }

  handleResetState = () => {
    const {
      getCommentDislikes: gcdl,
      getCommentLikes: gcl,
      getCommentEditHistory: gch,
      id,
      userId,
    } = this.props;
    gcdl(id).then((res) => {
      this.setState({ dislikes: res.dislikes, DisLikedComment: this.DisLikedThisComment(res.Liked, userId) });
    });
    gcl(id).then((res) => {
      this.setState({ likes: res.likes, LikedComment: this.LikedThisComment(res.Liked, userId) });
    });
    gch(id).then((res) => {
      if (res.status === 200) {
        this.setState({ editHistory: res.data.data.findHistory });
      }
    });
  }

  viewReplies = (commentId) => {
    this.setState({ viewReplies: true, viewRepliesCommentId: commentId });
  };

  handleCommentTextChange = (e) => {
    this.setState({ replyvalue: e.target.value });
  };

  LikedThisComment = (array, id) => array.find(item => item.userId === id && item.likes > item.dislikes);

  DisLikedThisComment = (array, id) => array.find(item => item.userId === id && item.dislikes > item.likes);

  handleReadyToReply = (commentId) => {
    this.setState({
      readyToReply: true,
      viewReplies: true,
      readyToReplyCommentId: commentId,
      showReplies: false,
      hideReplies: true,
      showEmoji: false,
    });
  };

  handleReadyToUpdateComment = (currentComment, commentId) => {
    this.setState({
      replyvalue: currentComment,
      readyToUpdateComment: true,
      readyToUpdatedCommentId: commentId,
      showEmoji: false,
    });
  };

  hideReplies = () => {
    this.setState({
      readyToReply: false,
      viewReplies: false,
      readyToReplyCommentId: undefined,
      showReplies: true,
      hideReplies: false,
      showEmoji: false,
    });
  };

  handleCanDeleteComment = (usrname, myusrname) => {
    if (usrname === myusrname) {
      this.setState({ isMouseOver: true, canDeleteComment: true });
    } else {
      this.setState({ canDeleteComment: false });
    }
  };

  handleLikeComment = (commentId) => {
    this.props.likeComment(commentId).then((res) => {
      if (res.status === 401 || res.status === 500) {
        this.setState({ redirect: true });
      } else if (res.status === 400) {
        toast(res.data.message);
      } else {
        const { id } = this.props;
        this.props.getCommentDislikes(id).then((resp) => {
          this.setState({ dislikes: resp.dislikes, DisLikedComment: this.DisLikedThisComment(resp.Liked, this.props.userId) });
        });
        this.props.getCommentLikes(id).then((resp) => {
          this.setState({ likes: resp.likes, LikedComment: this.LikedThisComment(resp.Liked, this.props.userId) });
        });
      }
    });
  };

  handleDislikeComment = (commentId) => {
    this.props.dislikeComment(commentId).then((res) => {
      if (res.status === 401 || res.status === 500) {
        this.setState({ redirect: true });
      } else if (res.status === 400) {
        toast(res.data.message);
      } else {
        const { id } = this.props;
        this.props.getCommentDislikes(id).then((resp) => {
          this.setState({ dislikes: resp.dislikes, DisLikedComment: this.DisLikedThisComment(resp.Liked, this.props.userId) });
        });
        this.props.getCommentLikes(id).then((resp) => {
          this.setState({ likes: resp.likes, LikedComment: this.LikedThisComment(resp.Liked, this.props.userId) });
        });
      }
    });
  };

  render() {
    const {
      comment,
      defaultAvata,
      replyToComment,
      slug,
      MyUsername,
      deleteComment,
      editComment,
      pathname,
    } = this.props;
    const {
      updatedAt,
      Comments: replies,
      comment: msg,
      id,
      commentAuthor: {
        avatar, firstName, lastName, username,
      },
    } = comment;
    const { replyvalue } = this.state;
    const CommentDetails = props => (this.state.redirect ? (
      <Redirect
        to={{
          pathname: '/auth/login',
          state: { redirect: pathname },
        }}
      />
    ) : (
      <div
        key={Number(props.updatedAt)}
        className="row comment-item ml-1"
        onMouseEnter={() => this.handleCanDeleteComment(
          !this.props.isReply ? username : props.username,
          MyUsername,
        )
          }
        onMouseLeave={() => {
          if (!props.isReply) {
            this.setState({
              readyToReply: false,
              viewReplies: false,
              readyToReplyCommentId: undefined,
              showReplies: true,
              hideReplies: false,
              isMouseOver: false,
              readyToUpdateComment: false,
              readyToUpdatedCommentId: undefined,
              showEditHistory: false,
              replyvalue: '',
              showEmoji: false,
            });
          }
        }}
      >
        <div className="">
          <a href={`/profile/${props.isReply ? props.username : username}`}>
            <Avatar
              src={props.avatar || defaultAvata}
              size={40}
              className="mb-2"
            />
          </a>
        </div>
        <div className="ml-3">
          <div className="comment-profile-section">
            <b>{`${props.firstName}  ${props.lastName}`}</b>
              &nbsp;&nbsp;
            <label>{format(new Date(props.updatedAt))}</label>
            {this.state.isMouseOver && this.state.canDeleteComment && (
            <span className="commentMenu">
                  &nbsp;&nbsp;
              {!props.isReply && (
              <i
                className="far fa-edit"
                onClick={() => this.handleReadyToUpdateComment(
                  props.msg,
                  props.isReply ? props.id : id,
                )
                      }
              />
              )}
                  &nbsp;&nbsp;
              <i
                className="far fa-trash-alt"
                onClick={() => deleteComment(props.isReply ? props.id : id, slug)
                    }
              />
                  &nbsp;&nbsp;
              {!props.isReply && this.state.editHistory.length > 0 && (
              <label
                className="edited-btn deleteted-comment"
                onClick={() => this.setState({ showEditHistory: !this.state.showEditHistory })}
              >
                Edited
              </label>
              )}
            </span>
            )}
          </div>
          <div>
            <p
              className={
                  props.msg === 'This comment has been deleted!'
                  && 'deleteted-comment'
                }
            >
              {props.msg}
            </p>
          </div>
          {
            !props.isReply && this.state.showEditHistory && (
              <div className="comment-edit-history">
                <label
                  onClick={() => this.setState({ showEditHistory: false })}
                >
                  <label className="hide-comment-edit-his">Hide comment edit history</label>
                  &nbsp;&nbsp;
                  <i className="fas fa-caret-up" />
                </label>
                {
                  sortComments(this.state.editHistory).map(history => (
                    <div>
                      <img src="https://firebasestorage.googleapis.com/v0/b/authorshaven-cebfb.appspot.com/o/images%2Ficons8-up-left-32.png?alt=media&token=c70871c1-36b9-4bee-b98f-c5951e00f3b6" alt="" />
                      &nbsp;&nbsp;
                      <label>{history.editedComment}</label>
                    </div>
                  ))
                }
              </div>
            )
          }
          {!props.isReply
              && (this.state.readyToUpdateComment
                && this.state.readyToUpdatedCommentId === id) && (
                <div className="reply">
                  <input
                    ref={this.focusInput}
                    value={this.state.replyvalue}
                    type="text"
                    placeholder="type reply"
                    onChange={this.handleCommentTextChange}
                  />
                  <label className="emoji-open mr-1">
                    <i
                      className="far fa-smile"
                      onClick={() => this.setState({ showEmoji: !this.state.showEmoji })}
                    />
                    {
                      this.state.showEmoji
                      && (
                      <div className="emoji">
                        <Picker
                          showSkinTones
                          title="Author's Haven"
                          emojiSize={25}
                          onSelect={emoji => this.setState({ replyvalue: `${this.state.replyvalue}  ${emoji.native}` })}
                        />
                      </div>
                      )
                    }
                  </label>
                  <button
                    id="reply-button"
                    type="submit"
                    className="comment-btn"
                    onClick={() => {
                      editComment(slug, id, replyvalue);
                      this.setState({ replyvalue: '' });
                    }}
                  >
                    Update
                  </button>
                </div>
          )}
          {!props.isReply && this.state.hideReplies && props.repliesSize > 0 && (
          <div>
            <label id="hide-replies" onClick={() => this.hideReplies()}>
                  Hide Replies
              <i className="fas fa-caret-up" />
            </label>
          </div>
          )}
          {!props.isReply && this.state.showReplies && props.repliesSize > 0 && (
          <div>
            <label
              id="handle-reply"
              onClick={() => this.handleReadyToReply(id)}
            >
              {`View ${props.repliesSize} Replies`}
              <i className="fas fa-caret-down" />
            </label>
          </div>
          )}
          <div>
            {this.state.viewReplies
                && this.state.viewRepliesCommentId === props.id
                && props.replies}
          </div>
          {!props.isReply
              && (this.state.readyToReply
                && this.state.readyToReplyCommentId === id) && (
                <div className="reply">
                  <input
                    ref={this.focusInput}
                    value={this.state.replyvalue}
                    type="text"
                    placeholder="type reply"
                    onChange={this.handleCommentTextChange}
                  />
                  <label className="emoji-open mr-1">
                    <i
                      className="far fa-smile"
                      onClick={() => this.setState({ showEmoji: !this.state.showEmoji })}
                    />
                    {
                      this.state.showEmoji
                      && (
                      <div className="emoji">
                        <Picker
                          showSkinTones
                          title="Author's Haven"
                          emojiSize={25}
                          onSelect={emoji => this.setState({ replyvalue: `${this.state.replyvalue}  ${emoji.native}` })}
                        />
                      </div>
                      )
                    }
                  </label>
                  <button
                    id="reply-button"
                    type="submit"
                    className="comment-btn"
                    onClick={() => {
                      replyToComment(id, slug, replyvalue);
                      this.setState({ replyvalue: '' });
                    }}
                  >
                    Reply
                  </button>
                </div>
          )}
          {!props.isReply && !this.state.readyToReply && (
          <div>
            <i
              id="like-button"
              className={`${this.state.LikedComment ? 'fas' : 'far'} fa-thumbs-up`}
              onClick={() => this.handleLikeComment(id)}
            />
                &nbsp;
            <label>{this.state.likes}</label>
                &nbsp;&nbsp; &nbsp;&nbsp;
            <i
              id="dislike-button"
              className={`${this.state.DisLikedComment ? 'fas' : 'far'} fa-thumbs-down`}
              onClick={() => this.handleDislikeComment(id, slug)}
            />
                &nbsp;
            <label>{this.state.dislikes}</label>
                &nbsp;&nbsp; &nbsp;&nbsp;
            {!props.isReply && (
            <button
              id="handle-ready-to-reply"
              onClick={() => this.handleReadyToReply(id)}
              className="btn btn-light"
              type="button"
            >
                    Reply
            </button>
            )}
          </div>
          )}
        </div>
      </div>
    ));

    return (
      <div key={id}>
        <CommentDetails
          firstName={firstName}
          lastName={lastName}
          updatedAt={updatedAt}
          msg={msg}
          avatar={avatar}
          repliesSize={replies.length}
          replies={sortComments(replies).map((reply) => {
            const { commentAuthor, comment: rmsg, updatedAt: upt } = reply;
            return (
              <CommentDetails
                firstName={commentAuthor.firstName}
                lastName={commentAuthor.lastName}
                updatedAt={upt}
                msg={rmsg}
                avatar={commentAuthor.avatar}
                username={commentAuthor.username}
                id={reply.id}
                replies={replies}
                isReply
              />
            );
          })}
        />
      </div>
    );
  }
}

export default connect(
  null,
  {
    likeComment,
    dislikeComment,
    getCommentLikes,
    getCommentDislikes,
    getCommentEditHistory,
  },
)(Commentitem);
