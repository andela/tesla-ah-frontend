/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import Spinner from '../widgets/Spinner';
import { login } from '../../redux/actions/users/login.actions';
import TextInput from '../common/TextInput';
import Social from './SocialLogin';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  componentDidUpdate = () => {
    this.redirectOnSuccess();
  };

  onChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  redirectOnSuccess = () => {
    const { isAuthenticated, location } = this.props;
    const { redirect } = queryString.parse(location.search);
    return isAuthenticated ? this.props.history.push(redirect || '/') : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.login(email, password);
  };

  render() {
    const { email, password } = this.state;
    const {
      ui: { loading },
    } = this.props;
    return (
      <section className="main-section">
        <div className="row row-login">
          <div className="col-md-8" id="col-login">
            <h4>Login to Authors Haven</h4>
            <br />
            <br />
            <Social />
            <br />
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
                <br />
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

                <button type="submit" className="btn button is-grey-login">Login</button>
                {loading ? <Spinner caption="Login..." /> : null}
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = ({ ui, login: { isAuthenticated } }) => ({
  ui,
  isAuthenticated,
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
  ui: PropTypes.instanceOf(Object).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
};

export default connect(
  mapStateToProps,
  { login },
)(Login);
