import React, { Fragment } from 'react';
import Avatar from '../common/ChatAvatar';
import defaultAvatar from '../../assets/img/user.png';

const User = ({ data }) => (
  <Fragment>
    <div className="chat__user">
      <div className="chat__user--info">
        <Avatar
          source={data.avatar || defaultAvatar}
          alt={data.username}
        />
        <div className="chat__user--name">
          <p>{data.username}</p>
        </div>
      </div>
      <div className="chat__user--status">
        <i>{data.status}</i>
      </div>
    </div>
  </Fragment>
);

export default User;
