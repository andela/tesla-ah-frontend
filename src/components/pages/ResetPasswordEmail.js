import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Alert from '../common/Alert';
import TextInput from '../common/TextInput';
import Spinner from '../widgets/Spinner';
import resetPasswordPicture from '../../assets/images/reset-password.png';
import resetPassword from '../../redux/actions/resetPassword.actions';
import '../../assets/scss/pages/_resetPasswordEmail.scss';

export class ResetPasswordEmail extends Component {
  state = {
    email: '',
    errorMessage: '',
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    let { errorMessage } = this.state;
    const validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    switch (name) {
      case 'email':
        errorMessage = validEmail.test(value)
          ? ''
          : 'Email is required and should look like this : example@email.com!';
        break;
      default:
    }
    this.setState({
      [name]: value,
      errorMessage,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { onResetRequest } = this.props;
    const { email } = this.state;
    onResetRequest(email);
  }

  render() {
    const { email, errorMessage } = this.state;
    // eslint-disable-next-line react/prop-types
    const { displayMsg, status, ui: { loading } } = this.props;
    const emailSentH5 = (
      <Alert type="success">
        <p>
          An email with a link for a password reset will be sent shortly to:
          {' '}
          {email}
!
        </p>
      </Alert>
    );
    const emailSentForm = (
      null
    );

    let resetFormH5 = (
      <h5>
Please enter your email address here,
        <br />
We will send you a link to reset your password
      </h5>
    );
    let resetForm = (
      <div className="field">
        <TextInput
          type="email"
          placeholder="Email"
          name="email"
          onChange={this.handleInputChange}
          value={email}
        />
        <p>{errorMessage}</p>
        <br />
        <TextInput type="submit" value="Reset Password" />
        <br />
        {loading ? (
          <Spinner caption="Submitting..." />
        ) : null}
        <p>
          {displayMsg}
        </p>
      </div>
    );
    if (status === 201) {
      resetFormH5 = emailSentH5;
      resetForm = emailSentForm;
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
                  <br />
                  <form onSubmit={this.handleSubmit}>{resetForm}</form>
                </div>
                <div className="col-md-6" id="passwordImage">
                  <img src={resetPasswordPicture} alt="Reset password" />
                </div>
              </div>
            </div>
          </main>
        </section>
      </div>
    );
  }
}
ResetPasswordEmail.propTypes = {
  onResetRequest: PropTypes.func.isRequired,
  ui: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = state => ({
  displayMsg: state.resetPassword.message,
  status: state.resetPassword.status,
  ui: state.ui,
});

export const mapDispatchToProps = dispatch => ({
  onResetRequest: (email) => {
    dispatch(resetPassword(email));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordEmail);
