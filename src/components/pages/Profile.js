/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { capitalize } from 'lodash';
import { withErrorHandler } from 'tesla-error-handler';
import axios from 'axios';
import PropTypes from 'prop-types';

import Article from '../common/ArticleCard';
import Interests from '../widgets/Interests';
import FollowCard from '../common/FollowCard';
import {
  initProfile,
  getCurrentUser,
  followUser,
  setFollowersUpdatable,
} from '../../redux/actions/profile.actions';
import Fab from '../widgets/Fab';
import ProfileEditForm from '../forms/ProfileEditForm';

import profilePlaceholder from '../../assets/images/profile.svg';
import Spinner from '../widgets/Spinner';
import OptInOptOutApp from './OptInOptOutApp';
import OptInOptOutEmail from './OptInOptOutEmail';

export class Profile extends Component {
  static getDerivedStateFromProps(props) {
    const { profile } = props;
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      return { isFollowing: 'NO_USER' };
    }
    let isFollowing = false;
    profile.followers.forEach((f) => {
      if (f.follower.username === user.username) {
        isFollowing = true;
      }
    });
    return { isFollowing };
  }

  constructor(props) {
    super(props);
    this.state = {
      mainContent: null,
      isFollowing: false,
      isLoggedIn: sessionStorage.getItem('token'),
    };
    props.setCurrentUser(sessionStorage.getItem('token'));
    props.onInitProfile(props.match.params.username);
    this.showArticles = React.createRef();
  }

  componentDidUpdate() {
    const { profile } = this.props;
    const { mainContent } = this.state;
    if (profile.hasArticles && !mainContent && this.showArticles) {
      if (this.showArticles.current) {
        this.showArticles.current.click();
      }
    }
  }

  handleTabChange = (tab) => {
    const {
      profile,
      onFollowUser,
      match,
    } = this.props;
    const { isLoggedIn } = this.state;
    let content;
    let final;
    let isCurrentUser;

    if (profile.currentUser) {
      isCurrentUser = match.params.username === profile.currentUser.username;
    }
    // eslint-disable-next-line default-case
    switch (tab) {
      case 'articles':
        content = profile.articles.map(article => (
          <Article
            key={article.slug}
            slug={article.slug}
            coverImage={article.image}
            title={article.title}
            description={article.description}
            lastUpdated={article.updatedAt}
            readTime={article.readtime}
            likes={article.likes}
            dislikes={article.dislikes}
          />
        ));
        final = (
          <React.Fragment>
            <div className="content-title d-flex justify-content-between align-items-center">
              <span>Posted Articles</span>
              <span>{profile.articlesCount}</span>
            </div>
            <React.Fragment>{content}</React.Fragment>
          </React.Fragment>
        );
        this.setState({ mainContent: final });
        break;
      case 'followers':
        content = profile.followers.map(f => (
          <FollowCard
            key={Math.random()}
            avatar={f.follower.avatar}
            firstName={f.follower.firstName}
            lastName={f.follower.lastName}
            username={f.follower.username}
            bio={f.follower.bio || 'No bio'}
            followType="Followers"
            count={profile.followersCount}
            isFollowedBack={f.isFollowedback}
            userId={profile.user.id}
            onFollowUser={() => onFollowUser(isLoggedIn, f.follower.username)}
            onUnfollowUser={() => onFollowUser(isLoggedIn, f.follower.username, null, true)}
            isCurrentUser={isCurrentUser}
          />
        ));
        final = (
          <React.Fragment>
            <div className="content-title d-flex justify-content-between align-items-center">
              <span>Followers</span>
              <span>{profile.followersCount}</span>
            </div>
            <React.Fragment>{content}</React.Fragment>
          </React.Fragment>
        );
        this.setState({ mainContent: final });
        break;
      case 'following':
        content = profile.following.map(f => (
          <FollowCard
            key={Math.random()}
            avatar={f.followedUser.avatar}
            firstName={f.followedUser.firstName}
            lastName={f.followedUser.lastName}
            username={f.followedUser.username}
            bio={f.followedUser.bio || 'No bio'}
            followType="Following"
            onUnfollowUser={() => onFollowUser(isLoggedIn, f.followedUser.username, null, true)}
            isCurrentUser={isCurrentUser}
          />
        ));
        final = (
          <React.Fragment>
            <div className="content-title d-flex justify-content-between align-items-center">
              <span>Following</span>
              <span>{profile.followingCount}</span>
            </div>
            <React.Fragment>{content}</React.Fragment>
          </React.Fragment>
        );
        this.setState({ mainContent: final });
        break;
    }
  };

  handleFollow = (unfollow) => {
    const { isLoggedIn } = this.state;
    const {
      onFollowUser,
      match,
      history,
    } = this.props;

    if (!isLoggedIn) {
      history.push(`/auth/login?redirect=${history.location.pathname}`);
    } else if (isLoggedIn && unfollow) onFollowUser(isLoggedIn, match.params.username, true, true);
    else onFollowUser(isLoggedIn, match.params.username, true);
  }

  render() {
    const {
      profile,
      match,
      onSetFollowersUpdatable,
    } = this.props;
    const { mainContent, isFollowing } = this.state;
    let dateJoined;
    let email;
    let bio;
    let heroImage;
    let followButton;

    if (!isFollowing) {
      followButton = (
        <button
          id="followUser"
          type="button"
          className="btn-custom"
          onClick={() => this.handleFollow()}
        >
          Follow
        </button>
      );
    } else if (isFollowing && isFollowing === 'NO_USER') {
      followButton = (
        <button
          id="followUser"
          type="button"
          className="btn-custom"
          onClick={() => this.handleFollow(true)}
        >
          Login to Follow
        </button>
      );
    } else {
      followButton = (
        <button
          id="followUser"
          type="button"
          className="btn-custom"
          onClick={() => this.handleFollow(true)}
        >
          Unfollow
        </button>
      );
    }

    if (profile.user) {
      const { email: userEmail } = profile.user;
      bio = profile.user.bio ? profile.user.bio : 'No bio';
      dateJoined = `Joined ${new Date(profile.user.createdAt).toDateString()}`;
      email = userEmail;
      heroImage = {
        backgroundImage: `url(${profile.user.cover})`,
      };

      let isCurrentUser;
      if (profile.currentUser) {
        isCurrentUser = match.params.username === profile.currentUser.username;
      }

      if (profile.isDoneUpdatingFollowers) {
        onSetFollowersUpdatable();
      }

      return (
        <div className="view-profile--container">
          <div className="hero" style={heroImage} />
          <div className="info-bar">
            <div className="container h-100">
              <div className="row align-items-center h-100">
                <div className="col">
                  {profile.user && profile.user.avatar ? (
                    <img
                      className="d-avatar"
                      src={profile.user.avatar}
                      alt="Avatar"
                    />
                  ) : (
                    <img className="d-avatar" src={profilePlaceholder} alt="Profile Placeholder" />
                  )}
                </div>
                <ul className="col-6 nav d-flex align-items-center justify-content-between h-100">
                  <li className="nav-item">
                    <button
                      ref={this.showArticles}
                      id="articleBtn"
                      className="nav-link"
                      onClick={() => this.handleTabChange('articles')}
                      type="button"
                    >
                      Articles
                      <span className="badge badge-light d-badge">
                        {profile.articlesCount}
                      </span>
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link act"
                      id="followerBtn"
                      onClick={() => this.handleTabChange('followers')}
                      type="button"
                    >
                      Followers
                      <span className="badge badge-light d-badge">
                        {profile.followersCount}
                      </span>
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link"
                      id="followingBtn"
                      onClick={() => this.handleTabChange('following')}
                      type="button"
                    >
                      Following
                      <span className="badge badge-light d-badge">
                        {profile.followingCount}
                      </span>
                    </button>
                  </li>
                </ul>
                <div className="col d-flex justify-content-end">
                  {isCurrentUser ? (
                    <button
                      type="button"
                      className="btn-custom"
                      data-toggle="modal"
                      data-target="#exampleModalCenter"
                    >
                      Edit Profile
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="container d-main-content">
            <div className="row flex-column flex-lg-row">
              <div className="col order-1 p-0">
                <div className="info-box info-box-content d-flex flex-column align-items-start">
                  <span className="fullname">
                    {`${capitalize(profile.user.firstName)} 
                      ${capitalize(profile.user.lastName)}`}
                  </span>
                  <span className="username">
                    {`@${profile.user.username}`}
                  </span>
                  <span className="location">
                    <i className="fas fa-envelope" />
                    {email}
                  </span>
                  <span className="joined">
                    <i className="fas fa-calendar-plus" />
                    {dateJoined}
                  </span>
                  {isCurrentUser ? (
                    <div>
                      <br />
                      <span className="notifications">
                    Notifications
                      </span>
                      <div>
                        <OptInOptOutApp />
                      </div>
                      <div>
                        <OptInOptOutEmail />
                      </div>

                    </div>
                  ) : null }
                </div>
                {!isCurrentUser ? followButton : null}
              </div>
              <div className="col-12 col-lg-6 order-3 order-lg-2 scrollable">
                {mainContent || 'Loading...'}
              </div>
              <div className="col interests order-2 order-lg-3 p-0">
                <div className="content-title d-flex justify-content-between align-items-center">
                  <span>Bio</span>
                </div>
                <Interests content={bio} />
              </div>
            </div>
          </div>
          <Fab
            id="profileFab"
            articles={() => this.handleTabChange('articles')}
            followers={() => this.handleTabChange('followers')}
            following={() => this.handleTabChange('following')}
            isCurrentUser={isCurrentUser}
          />
          {profile.currentUser ? (
            <ProfileEditForm
              updating={profile.isDonUpdating}
              user={profile.currentUser}
            />
          ) : null}
        </div>
      );
    }

    return (
      <div className="view-profile--container">
        <div className="view-profile--spinner">
          <Spinner />
        </div>
      </div>
    );
  }
}

export const mapStateToProps = ({ profile, login }) => ({ profile, login });

export const mapDispatchToProps = dispatch => ({
  onInitProfile: (username, id) => dispatch(initProfile(username, id)),
  setCurrentUser: token => dispatch(getCurrentUser(token)),
  onFollowUser: (token, username, usePath, unfollow) => {
    dispatch(followUser(token, username, usePath, unfollow));
  },
  onSetFollowersUpdatable: () => dispatch(setFollowersUpdatable()),
});

Profile.propTypes = {
  profile: PropTypes.instanceOf(Object).isRequired,
  onInitProfile: PropTypes.func.isRequired,
  setCurrentUser: PropTypes.func.isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
  onFollowUser: PropTypes.func.isRequired,
  onSetFollowersUpdatable: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Profile, axios));
