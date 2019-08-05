/* eslint-disable */
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

import '../../assets/scss/pages/Profile.scss';

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

  componentDidUpdate() {
    const { profile } = this.props;
    const { mainContent } = this.state;
    if (profile.completed && profile.articles && !mainContent) {
      this.showArticles.current.click();
    }
  }

  handleTabChange = (tab) => {
    const { profile } = this.props;
    let content;
    let final;
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
      default:
        content = profile.articles.map(article => (
          <Article
            key={article.slug}
            coverImage={article.gallery[0]}
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
    }
  };

  render() {
    const { profile, match } = this.props;
    const { mainContent } = this.state;
    const dateJoined = profile.user
      ? `Joined ${new Date(profile.user.createdAt).toDateString()}`
      : 'Loading...';
    const email = profile.user ? profile.user.email : 'Loading...';
    let bio;
    if (profile.user) {
      bio = profile.user.bio ? profile.user.bio : 'No bio';
    } else {
      bio = 'Loading...';
    }
    let isCurrentUser;
    if (profile.currentUser) {
      isCurrentUser = match.params.username === profile.currentUser.username;
    }

    const heroImage = {
      backgroundImage: `url(${
        profile.user ? profile.user.cover : 'Loading...'
      })`,
    };

    return (
      <React.Fragment>
        <div className="hero" style={heroImage} />
        <div className="info-bar">
          <div className="container h-100">
            <div className="row align-items-center h-100">
              <div className="col">
                {profile.user ? (
                  <img
                    className="d-avatar"
                    src={profile.user.avatar}
                    alt="Avatar"
                  />
                ) : (
                  <i className="fas fa-user-circle fa-3x" />
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
                  {profile.user
                    ? `${capitalize(profile.user.firstName)} 
                    ${capitalize(profile.user.lastName)}`
                    : 'Loading...'}
                </span>
                <span className="username">
                  {profile.user ? `@${profile.user.username}` : 'Loading...'}
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
        {isCurrentUser ? (
          <Fab
            articles={() => this.handleTabChange('articles')}
            followers={() => this.handleTabChange('followers')}
            following={() => this.handleTabChange('following')}
          />
        ) : null}
        {profile.currentUser ? (
          <ProfileEditForm
            userId={profile.currentUser.id}
            updating={profile.isDonUpdating}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
