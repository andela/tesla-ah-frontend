/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import happyFaces from '../../assets/img/signup.png';
import Spinner from '../widgets/Spinner';
import Alert from '../common/Alert';
import { createAccount } from '../../redux/actions/auth.actions';
import validate from '../../utils/validations';
import Form from '../common/FormContainer';
import TextInput from '../common/TextInput';

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
      redirect: false,
    };
  }

  componentWillMount() {
    if (this.props.auth.loggedIn) {
      toast.success('Welcome back to Authors Haven');
      this.setState({
        redirect: true,
      });
    }
  }

  onChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

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
          gender,
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
        gender,
        dateOfBirth: birthDate,
      });
    }
  };

  render() {
    const {
      ui: { loading },
      auth: { signupSuccess },
    } = this.props;
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <section className="container">
        <main className="row mt-5 mb-5 signup__section">
          <div className="col-md-6 pt-5 pb-5">
            <h4 className="mb-5">Join Authors Haven</h4>
            {signupSuccess ? (
              <Alert type="success">
                <p>
                  Thank you for creating an account with Authors Haven, you will
                  receive an email shortly!
                </p>
              </Alert>
            ) : (
              <Form onSubmit={this.handleSubmit}>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <TextInput
                        value={this.state.firstName}
                        name="firstName"
                        type="text"
                        placeholder="First Name"
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <TextInput
                        value={this.state.lastName}
                        placeholder="Last Name"
                        onChange={this.onChange}
                        type="text"
                        name="lastName"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <TextInput
                    value={this.state.email}
                    placeholder="Email Address"
                    onChange={this.onChange}
                    name="email"
                    type="email"
                  />
                </div>
                <div className="form-froup">
                  <TextInput
                    value={this.state.username}
                    placeholder="Username"
                    onChange={this.onChange}
                    name="username"
                    type="username"
                  />
                </div>
                <div className="row form-group mt-3">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <TextInput
                        value={this.state.password}
                        type="password"
                        placeholder="Password"
                        onChange={this.onChange}
                        name="password"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <TextInput
                        type="password"
                        placeholder="Confirm"
                        name="confirmPassword"
                        value={this.state.confirmPassword}
                        onChange={this.onChange}
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
                    value={this.state.birthDate}
                    name="birthDate"
                    onChange={this.onChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="gender">Gender</label>
                  <select name="gender" value={this.state.gender} onChange={e => this.setState({ gender: e.target.value })} className="form-control">
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </select>
                </div>
                <div className="form-group">
                  <textarea
                    placeholder="Bio"
                    value={this.state.bio}
                    className="form-control"
                    onChange={e => this.setState({ bio: e.target.value })}
                  />
                </div>
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    required
                  />
                  <label htmlFor="Checkbox" className="form-check-label">
                    I agree with the
                    {' '}
                    {/* eslint-disable-nextline  */}
                    <Link to="/terms">Terms and conditions</Link>

                  </label>
                </div>
                <button type="submit" className="btn button is-grey">
                  Register
                </button>
                {loading ? <Spinner caption="Registering..." /> : null}
                <div className="mt-3">
                  <p>
                    Already have an account? &nbsp;
                    {/* eslint-disable-nextline  */}
                    <Link to="/auth/login">Login</Link>
                  </p>
                </div>
              </Form>
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

export const mapStateToProps = state => ({
  ui: state.ui,
  auth: state.auth,
});

Signup.propTypes = {
  createAccount: PropTypes.func.isRequired,
  ui: PropTypes.instanceOf(Object).isRequired,
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default connect(
  mapStateToProps,
  { createAccount },
)(Signup);
