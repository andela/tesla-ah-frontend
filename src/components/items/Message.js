import React, { Fragment } from 'react';
import { format } from 'timeago.js';
import Avatar from '../common/ChatAvatar';

const Message = ({
  isYours, data, avatar, time,
}) => (isYours ? (
  <Fragment>
    <div className="chat__info is-yours">
      <div className="chat__message chat__mine">
        <div className="chat__message--data">
          <p>{data}</p>
          <i>{format(time, 'en_US')}</i>
        </div>
        <Avatar source={avatar} alt="Authors Haven user" />
      </div>
    </div>
  </Fragment>
) : (
  <Fragment>
    <div className="chat__info">
      <div className="chat__message">
        <Avatar source={avatar} alt="Authors Haven user" />
        <div className="chat__message--data">
          <p>{data}</p>
          <i>{format(time, 'en_US')}</i>
        </div>
      </div>
    </div>
  </Fragment>
));

export default Message;
