/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../../assets/img/logo_st.png';

export class Header extends Component {
  static propTypes = {
    auth: PropTypes.instanceOf(Object).isRequired,
  };

  render() {
    const {
      auth: { loggedIn },
    } = this.props;
    return (
      <header className="nav-to-shrink">
        <nav className="navbar navbar-expand-lg container">
          <img
            className="navbar-brand logo"
            src={logo}
            alt="AH"
            style={{
              width: 50,
            }}
          />
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
            {!loggedIn ? (
              <ul className="navbar-nav mr-auto nav-left">
                <li className="nav-item active">
                  {/* eslint-disable-nextline  */}
                  <Link className="nav-link is-active" to="/">
                    Home
                    <span className="sr-only">(current)</span>
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  {/* eslint-disable-nextline  */}
                  <Link
                    className="nav-link dropdown-toggle nav-shrink"
                    to="/"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Categories
                  </Link>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    {/* eslint-disable-nextline  */}
                    <Link className="dropdown-item" to="/">
                      Technology
                    </Link>
                    {/* eslint-disable-nextline  */}
                    <Link className="dropdown-item" to="/">
                      Sport
                    </Link>
                    {/* eslint-disable-nextline  */}
                    <Link className="dropdown-item" to="/">
                      Design
                    </Link>
                    {/* eslint-disable-nextline  */}
                    <Link className="dropdown-item" to="/">
                      Politics
                    </Link>
                  </div>
                </li>
                <li className="nav-item">
                  {/* eslint-disable-nextline  */}
                  <Link className="nav-link nav-shrink" to="/">
                    About Us
                  </Link>
                </li>
                <li className="nav-item">
                  {/* eslint-disable-nextline  */}
                  <Link className="nav-link nav-shrink" to="/" tabIndex="-1">
                    Contacts
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav mr-auto nav-left">
                <li className="nav-item nav-right">
                  <input
                    className="search-field form-control"
                    type="text"
                    placeholder="Search"
                    aria-label="Search"
                  />
                </li>
              </ul>
            )}
            {loggedIn ? (
              <ul className="nav-right navbar-nav">
                <li id="nav-item noti-container">
                  <div id="noti-counter">5</div>
                  <i
                    id="noti-button"
                    className="nav-link is-active nav-shrink fa fa-bell"
                  />
                </li>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <li id="nav-item noti-container message">
                  <div id="noti-counter">2</div>
                  <i
                    id="noti-button"
                    className="nav-link is-active nav-shrink fa fa-envelope"
                  />
                </li>
                &nbsp;&nbsp;&nbsp;
                <li id="nav-item noti-container message">
                  <img
                    className="menu-profile-image"
                    src="https://scontent.fkgl1-1.fna.fbcdn.net/v/t1.0-9/16196015_10154888128487744_6901111466535510271_n.png?_nc_cat=103&_nc_oc=AQm1z5jCqvLA7cItJnm3RXa2_ApxETs_BsK1Y5lNksTqg0YsrGmwP91yr73V3BLnYOw&_nc_ht=scontent.fkgl1-1.fna&oh=e18554da0038703db68054626fa73da9&oe=5DE21BE9"
                    alt="AH"
                  />
                </li>
              </ul>
            ) : (
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
            )}
          </div>
        </nav>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Header);
