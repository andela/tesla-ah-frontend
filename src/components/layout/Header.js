import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo_st.png';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
    };
  }

  render() {
    const { loggedIn } = this.state;
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
                  <Link className="nav-link is-active" to="/">
                    Home
                    <span className="sr-only">(current)</span>
                  </Link>
                </li>
                <li className="nav-item dropdown">
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
                    <Link className="dropdown-item" to="/">
                      Technology
                    </Link>
                    <Link className="dropdown-item" to="/">
                      Sport
                    </Link>
                    <Link className="dropdown-item" to="/">
                      Design
                    </Link>
                    <Link className="dropdown-item" to="/">
                      Politics
                    </Link>
                  </div>
                </li>
                <li className="nav-item">
                  <Link className="nav-link nav-shrink" to="/">
                    About Us
                  </Link>
                </li>
                <li className="nav-item">
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
                <li id="nav-item noti_Container">
                  <div id="noti_Counter">5</div>
                  <i
                    id="noti_Button"
                    className="nav-link is-active nav-shrink fa fa-bell"
                  />
                </li>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <li id="nav-item noti_Container message">
                  <div id="noti_Counter">2</div>
                  <i
                    id="noti_Button"
                    className="nav-link is-active nav-shrink fa fa-envelope"
                  />
                </li>
                &nbsp;&nbsp;&nbsp;
                <li id="nav-item noti_Container message">
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

export default Header;
