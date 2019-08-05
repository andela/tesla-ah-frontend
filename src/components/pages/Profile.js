import React, { Component } from 'react';
import { connect } from 'react-redux';
import { capitalize } from 'lodash';

import Article from '../common/Article';
import Interests from '../widgets/Interests';
import FollowCard from '../common/FollowCard';
import {
  initProfile,
  getCurrentUser,
} from '../../redux/actions/profile.actions';
import Fab from '../widgets/Fab';
// eslint-disable-next-line import/no-named-as-default
import ProfileEditForm from '../forms/ProfileEditForm';

import profilePlaceholder from '../../assets/images/profile_placeholder.jpg';
import '../../assets/scss/pages/Profile.scss';
import Spinner from '../widgets/Spinner';
import axios from '../../utils/axios-ah';
import withErrorHandler from '../hoc/errorHandler';

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainContent: null,
    };
    props.setCurrentUser();
    props.initProfile(props.match.params.username);
    this.showArticles = React.createRef();
  }

  handleTabChange = (tab) => {
    const { profile } = this.props;
    let content;
    let final;
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
            noButton
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

  render() {
    const { profile, match } = this.props;
    const { mainContent } = this.state;
    let dateJoined;
    let email;
    let bio;
    let heroImage;

    if (profile.user) {
      const { email: userEmail } = profile.user;
      bio = profile.user.bio ? profile.user.bio : 'No bio';
      dateJoined = `Joined ${new Date(profile.user.createdAt).toDateString()}`;
      email = userEmail;
      heroImage = {
        backgroundImage: `url(${profile.user.cover})`,
      };
    } else {
      const style = {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      };
      return (
        <div style={style}>
          <Spinner />
        </div>
      );
    }

    let isCurrentUser;
    if (profile.currentUser) {
      isCurrentUser = match.params.username === profile.currentUser.username;
    }

    if (profile.hasArticles && !mainContent && this.showArticles) {
      if (this.showArticles.current) {
        this.showArticles.current.click();
      }
    }

    return (
      <React.Fragment>
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
            <div className="col order-1">
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
              </div>
              {!isCurrentUser ? (
                <button type="button" className="btn-custom">
                  Follow
                </button>
              ) : null}
            </div>
            <div className="col-12 col-lg-7 order-3 order-lg-2">
              {mainContent || 'Loading...'}
            </div>
            <div className="col interests order-2 order-lg-3">
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
      </React.Fragment>
    );
  }
}

export const mapStateToProps = ({ profile }) => ({ profile });

export const mapDispatchToProps = dispatch => ({
  initProfile: username => dispatch(initProfile(username)),
  setCurrentUser: () => dispatch(getCurrentUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Profile, axios));
