import React from 'react';
import PropTypes from 'prop-types';
import { capitalize } from 'lodash';
import '../../assets/scss/components/FollowCard.scss';
import profilePlaceholder from '../../assets/images/profile.svg';

const FollowCard = (props) => {
  const {
    avatar,
    firstName,
    lastName,
    username,
    bio,
    isFollowedBack,
    followType,
    onUnfollowUser,
    onFollowUser,
    isCurrentUser,
  } = props;

  let actionButton = null;

  if (isCurrentUser && followType === 'Followers' && !isFollowedBack) {
    actionButton = (
      <button
        id="followBtnCard"
        type="button"
        className="btn-custom"
        onClick={onFollowUser}
      >
        Follow
      </button>
    );
  } else if (isCurrentUser && followType === 'Followers' && isFollowedBack) {
    actionButton = (
      <button
        id="unfollowBtnCard"
        type="button"
        className="btn-custom unfollow"
        onClick={onUnfollowUser}
      >
        Unfollow
      </button>
    );
  } else if (isCurrentUser && followType === 'Following') {
    actionButton = (
      <button
        type="button"
        id="unfollowBtnCard"
        className="btn-custom unfollow"
        onClick={onUnfollowUser}
      >
        Unfollow
      </button>
    );
  } else {
    actionButton = null;
  }

  let avatarImg;
  if (avatar) {
    avatarImg = <img className="d-avatar" src={avatar} alt="avatar" />;
  } else {
    avatarImg = <img className="d-avatar" src={profilePlaceholder} alt="avatar" />;
  }

  return (
    <React.Fragment>
      <div className="follow-card--container d-flex">
        {avatarImg}
        <div className="follow-card-content flex-grow-1">
          <div className="d-flex justify-content-between align-items-center">
            <div className="follow-card-info d-flex flex-column align-items-start">
              <span className="fullname">
                {`${capitalize(firstName)} ${capitalize(lastName)}`}
              </span>
              <a href={`/profile/${username}`}>
                <span className="username">{`@${username}`}</span>
              </a>
            </div>
            {actionButton}
          </div>
          <div className="bio">{bio}</div>
        </div>
      </div>
    </React.Fragment>
  );
};

const stringPropType = PropTypes.string;

FollowCard.defaultProps = {
  avatar: '',
  firstName: '',
  lastName: '',
  username: '',
  bio: '',
  isFollowedBack: false,
};

FollowCard.propTypes = {
  avatar: stringPropType,
  firstName: stringPropType,
  lastName: stringPropType,
  username: stringPropType,
  bio: stringPropType,
  isFollowedBack: PropTypes.bool,
  isCurrentUser: PropTypes.bool.isRequired,
  followType: stringPropType.isRequired,
  onUnfollowUser: PropTypes.func.isRequired,
  onFollowUser: PropTypes.func.isRequired,
};

export default FollowCard;
