import React from 'react';
import { capitalize } from 'lodash';

import '../../assets/scss/components/FollowCard.scss';

const FollowCard = (props) => {
  const {
    avatar,
    firstName,
    lastName,
    username,
    noButton,
    bio,
  } = props;

  return (
    <React.Fragment>
      <div className="follow-card d-flex">
        <img className="d-avatar" src={avatar} alt="avatar" />
        <div className="follow-card-content flex-grow-1">
          <div className="d-flex justify-content-between align-items-center">
            <div className="follow-card-info d-flex flex-column align-items-start">
              <span className="fullname">
                {`${capitalize(firstName)} ${capitalize(lastName)}`}
              </span>
              <span className="username">{`@${username}`}</span>
            </div>
            {/* <button type="button" className="btn-custom following"> */}
            {!noButton ? (
              <button type="button" className="btn-custom">
                Follow
              </button>
            ) : null}
          </div>
          <div className="bio">{bio}</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FollowCard;
