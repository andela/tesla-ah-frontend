/* eslint-disable prefer-destructuring */
/* eslint-disable no-console */
/* eslint-disable jsx-quotes */
/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/destructuring-assignment */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import QueryString from 'query-string';
import Spinner from '../widgets/Spinner';
import { login } from '../../redux/actions/users/login.actions';
import TextInput from '../common/TextInput';
import Social from './SocialLogin';
import Preloader from '../widgets/Preloader';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isPageLoading: false,
    };
  }

  componentWillMount = () => {
    this.setState(prevState => ({ ...prevState, isPageLoading: true }));
  };

  componentDidMount = () => {
    /* istanbul ignore next */
    setTimeout(() => this.setState(prevState => ({ ...prevState, isPageLoading: false })), 1000);
  };

  componentDidUpdate = () => {
    this.redirectOnSuccess();
  };

  onChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  redirectOnSuccess = () => {
    let redirect;
    const { isAuthenticated, location } = this.props;
    if (location.state) {
      /* istanbul ignore next */
      redirect = location.state.redirect;
    }
    const redirectUrl = QueryString.parse(location.search).redirect;
    console.log(redirectUrl);
    /* istanbul ignore next */
    return isAuthenticated ? this.props.history.push(redirectUrl || redirect || '/') : null;
  };


  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.login(email, password);
  };

  render() {
    const { isLogging } = this.props;
    const { isPageLoading, email, password } = this.state;
    if (isPageLoading) {
      return <Preloader />;
    }
    return (
      <section className="main-section-login">
        <div className="row row-login">
          <div className="col-md-10" id="col-login">
            <h4>Authors Haven</h4>
            <br />
            <form onSubmit={this.handleSubmit}>
              <div className="field">
                <div className="form-group">
                  <TextInput
                    type="text"
                    placeholder="Email or username"
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <TextInput
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={this.onChange}
                    required
                  />
                </div>

                <Link to="/resetPasswordRequest">Forgot Password?</Link>
                <br />
                <br />

                {isLogging ? (
                  <Spinner
                    style={{ textAlign: 'center', margin: 0, padding: 0 }}
                  />
                ) : (
                  <button type="submit" className="btn button is-grey-login">
                    Login
                  </button>
                )}
              </div>
            </form>
            {!isLogging ? (
              <Fragment>
                <br />
                <div className="btn-block text-center">
                  <p>Or</p>
                </div>
                <br />
                <Social />
                <br />
              </Fragment>
            ) : (
              ''
            )}
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = ({ login: { isAuthenticated, isLogging } }) => ({
  isAuthenticated,
  isLogging,
});

Login.propTypes = {
  location: PropTypes.instanceOf(Object),
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isLogging: PropTypes.bool.isRequired,
};
Login.defaultProps = {
  location: {
    search: '',
  },
};

export default connect(
  mapStateToProps,
  { login },
)(Login);
