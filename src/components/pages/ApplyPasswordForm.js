import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Alert from '../common/Alert';
import TextInput from '../common/TextInput';
import Spinner from '../widgets/Spinner';
import '../../assets/scss/pages/_resetPasswordEmail.scss';
import resetPasswordFormPicture from '../../assets/images/security.png';
import applyPassword from '../../redux/actions/applyPassword.actions';

export class ApplyPasswordForm extends Component {
  state = {
    newpassword: '',
    confirmPassword: '',
    errorMessage: '',
    passwordError: '',
  }

  handleInputChange = (e) => {
    this.extractToken();
    const { name, value } = e.target;
    let { errorMessage } = this.state;
    const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    switch (name) {
      case 'newpassword':
        errorMessage = validPassword.test(value)
          ? ''
          : 'Password is required and must be at least 8 letters containing'
          + ' at least a number a Lowercase letter and an Uppercase letter';
        break;
      default:
        break;
    }
    this.setState({
      [name]: value,
      errorMessage,
    });
  }

  extractToken = () => {
    const { match } = this.props;
    return match.params.token;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { onApplyPassword } = this.props;
    const { newpassword, confirmPassword } = this.state;
    if (newpassword !== confirmPassword) {
      this.setState({
        passwordError: 'Password and Confirm Password should match!',
      });
    } else {
      this.setState({
        passwordError: '',
      });
      const token = this.extractToken();
      onApplyPassword(newpassword, token);
    }
  }

  render() {
    const {
      newpassword, confirmPassword, errorMessage, passwordError,
    } = this.state;
    // eslint-disable-next-line react/prop-types
    const { displayMsg, status, ui: { loading } } = this.props;
    let inputPassword = (
      <form onSubmit={this.handleSubmit}>
        <div className="field">
          <TextInput
            type="password"
            name="newpassword"
            placeholder="Password"
            onChange={this.handleInputChange}
            value={newpassword}
          />
          <p>{errorMessage}</p>
          <TextInput
            type="password"
            name="confirmPassword"
            placeholder="Confirmation"
            onChange={this.handleInputChange}
            value={confirmPassword}
          />
          <p>{passwordError}</p>
          <TextInput type="submit" value="Reset Password" />
          {loading ? (
            <Spinner caption="Resetting..." />
          ) : null}
          <p>
            {displayMsg}
          </p>
        </div>
      </form>
    );
    const afterPasswordReset = (
      <div>
        <Alert type="success">
          <p>
Your Password has been successfully changed!
          </p>
        </Alert>
        <p className="link">
          <br />
          <Link to="/auth/login">Click here to Login</Link>
        </p>
      </div>
    );

    let resetFormH5 = (
      <h5>
        Please enter your new password below to reset!
        <br />
        <br />
      </h5>
    );
    const passwordUpdatedForm = null;
    if (status === 201) {
      resetFormH5 = passwordUpdatedForm;
      inputPassword = afterPasswordReset;
    }

    return (
      <div>
        <section className="main-section">
          <main className="row mt-5 mb-5">
            <div className="rowForm">
              <div className="row">
                <div className="col-md-6" id="col-resetPassword">
                  <br />
                  <h4>Reset Your Password</h4>
                  <br />
                  {resetFormH5}
                  <br />
                  {inputPassword}
                </div>
                <div className="col-md-6" id="passwordImage">
                  <img
                    src={resetPasswordFormPicture}
                    alt="Reset password"
                  />
                </div>
              </div>
            </div>
          </main>
        </section>
      </div>
    );
  }
}
ApplyPasswordForm.propTypes = {
  onApplyPassword: PropTypes.func.isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
  ui: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = state => ({
  displayMsg: state.applyPassword.message,
  status: state.applyPassword.status,
  ui: state.ui,
});

export const mapDispatchToProps = dispatch => ({
  onApplyPassword: (newpassword, token) => {
    dispatch(applyPassword(newpassword, token));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(ApplyPasswordForm);
