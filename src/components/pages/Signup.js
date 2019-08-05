/* eslint-disable react/no-unused-state */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import happyFaces from '../../assets/img/signup.png';
import Spinner from '../widgets/Spinner';
import Alert from '../common/Alert';
import { createAccount } from '../../redux/actions/auth.actions';
import validate from '../../utils/validations';


export class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      gender: 'M',
      bio: '',
      birthDate: '',
    };
  }

  componentDidMount() {
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = validate(this.state, 'signup');
    if (Object.values(formErrors).length) {
      Object.values(formErrors).forEach((err) => {
        toast.error(err);
      });
    } else {
      const {
        state: {
          firstName,
          lastName,
          email,
          username,
          password,
          confirmPassword,
          bio,
          birthDate,
        },
      } = this;
      // eslint-disable-next-line react/destructuring-assignment
      this.props.createAccount({
        firstName,
        lastName,
        email,
        username,
        password,
        confirmPassword,
        bio,
        dateOfBirth: birthDate,
      });
    }
  }

  render() {
    const {
      firstName, lastName, email, username, password, confirmPassword, bio, birthDate,
    } = this.state;
    const { ui: { loading }, auth: { signupSuccess } } = this.props;
    return (
      <section className="container">
        <main className="row mt-5 mb-5 signup__section">
          <div className="col-md-6 pt-5 pb-5">
            <h4 className="mb-5">Join Authors Haven</h4>
            {signupSuccess ? (
              <Alert type="success">
                <p>
Thank you for creating an account with Authors Haven,
                you will receive an email shortly!

                </p>
              </Alert>
            ) : (
              <form onSubmit={this.handleSubmit}>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        className="form-control"
                        placeholder="First Name"
                        value={firstName}
                        onChange={e => this.setState({ firstName: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        className="form-control"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={e => this.setState({ lastName: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className="form-control"
                    value={email}
                    onChange={e => this.setState({ email: e.target.value })}
                    required
                  />
                </div>
                <div className="form-froup">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    name="username"
                    value={username}
                    onChange={e => this.setState({ username: e.target.value })}
                    required
                  />
                </div>
                <div className="row form-group mt-3">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={e => this.setState({ password: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm"
                        name="confirm"
                        value={confirmPassword}
                        onChange={e => this.setState({ confirmPassword: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="birthdate">Birth date</label>
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Birth Date"
                    value={birthDate}
                    name="birthDate"
                    onChange={e => this.setState({ birthDate: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group"><label htmlFor="gender">Gender</label></div>
                <div className="row form-radios">
                  <div className="form-check col-sm-6 form-group">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="gender"
                      value="M"
                      onChange={e => this.setState({ gender: e.target.value })}
                      checked
                    />
                    <label className="form-check-label">Male</label>
                  </div>
                  <div className="form-check col-sm-6">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="gender"
                      value="F"
                      onChange={e => this.setState({ gender: e.target.value })}
                    />
                    <label className="form-check-label">Female</label>
                  </div>
                </div>
                <div className="form-group">
                  <textarea
                    placeholder="Bio"
                    value={bio}
                    className="form-control"
                    onChange={e => this.setState({ bio: e.target.value })}
                  />
                </div>
                <div className="form-check mb-4">
                  {/* eslint-disable-nextline  */}
                  <Link to="/terms">Read terms and conditions first...</Link>
                  <br />
                  <input type="checkbox" className="form-check-input" required />
                  <label htmlFor="Checkbox" className="form-check-label">I agree with the terms and conditions...</label>
                </div>
                <button type="submit" className="btn button is-grey">Register</button>
                {loading ? (
                  <Spinner caption="Registering..." />
                ) : null}
                <div className="mt-3">
                  <p>
                      Already have an account?
                    {' '}
                    {/* eslint-disable-nextline  */}
                    <Link to="/auth/login">Login</Link>
                  </p>
                </div>
              </form>
            )}

          </div>
          <div className="col-md-6">
            <img src={happyFaces} alt="AH People" className="signup__people" />
          </div>
        </main>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
  auth: state.auth,
});

Signup.propTypes = {
  createAccount: PropTypes.func.isRequired,
  ui: PropTypes.instanceOf(Object).isRequired,
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default connect(mapStateToProps, { createAccount })(Signup);
