/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import Commentsitem from '../items/Commentitem';

export default class commentItemcard extends Component {
  render() {
    const {
      comments,
      defaultavata,
      slug,
      handleReplyComment,
      handleDeleteComment,
      handleEditComment,
      username,
      pathname,
      id,
    } = this.props;
    return (
      <div>
        {comments.length > 0 ? (
          comments.map(comment => (
            <Commentsitem
              comment={comment}
              defaultavata={defaultavata}
              slug={slug}
              replyToComment={handleReplyComment}
              deleteComment={handleDeleteComment}
              editComment={handleEditComment}
              id={comment.id}
              MyUsername={username}
              pathname={pathname}
              userId={id}
            />
          ))
        ) : (
          <div />
        )}
      </div>
    );
  }
}
