/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import Jwt from 'jwt-decode';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../../assets/img/logo_st.png';
import { initProfile } from '../../redux/actions/profile.actions';
import Profilemenu from '../menu/Profile';
import { getUnreadNotifications, readNotification } from '../../redux/actions/notifications.actions';

export class Header extends Component {
  static propTypes = {
    login: PropTypes.instanceOf(Object).isRequired,
  };

  componentWillMount() {
    const { onInitProfile, onNotifications } = this.props;
    if (localStorage.getItem('user')) {
      onInitProfile();
      onNotifications();
    }
  }

  componentDidUpdate() {
    const {
      onNotifications,
    } = this.props;
    const { socketIO } = this.props;
    if (socketIO) {
      try {
        onNotifications();
      } catch (error) {
        const err = error;
      }
    }
  }

  getUser = (token) => {
    let user;
    try {
      user = Jwt(token);
    } catch (error) {
      user = undefined;
    }
    return user;
  };

  readNotification = (id) => {
    const { onRead, onNotifications } = this.props;
    onRead(id);
    onNotifications();
  };

  render() {
    const {
      login: { user },
      auth: { loggedIn },
      notifications,
    } = this.props;
    const isAuthenticated = this.getUser(sessionStorage.getItem('token'));
    return (
      <header className="nav-to-shrink">
        <nav className="navbar navbar-expand-lg container">
          <Link to="/">
            <img
              className="navbar-brand logo"
              src={logo}
              alt="AH"
              style={{
                width: 50,
              }}
            />
          </Link>
          {/* eslint-disable-nextline  */}
          <Link to="/" className="navbar-brand blue">
            Authors Haven
          </Link>
          <button
            className="navbar-toggler menu_button"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon">
              <i className="fa fa-bars" />
            </span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <a href="/search" className="search__anchor--form">
              <ul className="navbar-nav mr-auto nav-left">
                <li className="nav-item nav-right">
                  <input
                    className="search-field form-control"
                    type="text"
                    placeholder="Search"
                    aria-label="Search"
                    disabled
                  />
                </li>
              </ul>
            </a>
            {!loggedIn && !isAuthenticated ? (
              <div />
            ) : (
              <div />
            )}
            {loggedIn || isAuthenticated ? (
              <ul className="nav-right navbar-nav">
                <div>
                  <li id="nav-item noti-container">
                    <a
                      className="nav-link dropdown-toggle waves-effect waves-light"
                      id="navbarDropdownMenuLink-5"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="true"
                    >
                      {(notifications.length > 0) ? <div id="noti-counter">{notifications.length >= 10 ? '9+' : notifications.length}</div> : null}
                      <i
                        id="noti-button"
                        className="nav-link is-active nav-shrink fa fa-bell"
                      />
                    </a>
                    {(notifications.length > 0)
                      ? (
                        <div
                          className="dropdown-menu dropdown-menu-lg-right dropdown-secondary"
                          aria-labelledby="navbarDropdownMenuLink-5"
                        >
                          <div className="dropdown-item waves-effect waves-light dropdown-item-custom">
                            {notifications.map(notification => (
                              <div
                                className="notification-item"
                                key={notification.id}
                                onClick={() => {
                                  this.readNotification(notification.id);
                                  return <div>{notification.message}</div>;
                                }}
                              >
                                <Link to={notification.url}>
                                  {notification.message}
                                </Link>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : null}
                  </li>
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <li id="nav-item noti-container message" className="chat__icon">
                  <Link to="/users">
                    <i
                      id="noti-button"
                      className="nav-link is-active nav-shrink far fa-comments"
                    />
                  </Link>
                </li>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <li id="nav-item noti-container message">
                  <Profilemenu
                    avata={user.avatar}
                    user={user}
                  />
                </li>
              </ul>
            ) : (
              <div>
                <ul className="nav-right navbar-nav">
                  <li className="nav-item">
                    <Link to="/auth/login" className="nav-link is-active">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/auth/signup" className="nav-link is-active">
                      Sign Up
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </nav>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  login: state.login,
  profile: state.profile,
  auth: state.auth,
  notifications: state.allNotifications.notifications,
  socketIO: state.allNotifications.socketIO,
});

const mapDispatchToProps = (dispatch) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    return {
      onInitProfile: () => dispatch(initProfile(user.username)),
      onNotifications: () => {
        dispatch(getUnreadNotifications());
      },
      onRead: (id) => {
        dispatch(readNotification(id));
      },
    };
  }

  return {
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
