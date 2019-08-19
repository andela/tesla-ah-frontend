import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { verifyAccount } from '../../redux/actions/auth.actions';
import Spinner from '../widgets/Spinner';
import Alert from '../common/Alert';

export class VerifyAccount extends Component {
  constructor() {
    super();
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      verified: false,
      redirect: false,
    };
    this.verified = false;
  }

  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    // eslint-disable-next-line react/destructuring-assignment
    this.props.verifyAccount(params.token);
  }

  componentWillReceiveProps(nextProps) {
    const { auth: { verified } } = nextProps;
    if (verified) {
      this.setState({
        redirect: true,
      });
    }
  }

  componentDidUpdate(prevProps) {
    const {
      auth: { verified },
    } = this.props;
    if (prevProps.auth.verifed === false && verified === true) {
      this.verified = true;
    }
  }

  render() {
    const { ui: { loading }, auth: { verified, verifailed } } = this.props;
    const { state } = this;
    if (state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <section className="container verify__container">
        {loading ? (<Spinner caption="Verifying your account..." />) : null}
        {verified ? (
          <Alert type="success">
            You are now verified! Click
            {/* eslint-disable-nextline  */}
            <Link to="/articles/new">here</Link>
            {' '}
            to publish new article
          </Alert>
        ) : null}
        {verifailed ? (
          <Alert type="danger">
            You made an invalid request, make sure you are using the link
            provided in your email to verify your account.
            <p>
              {/* eslint-disable-nextline  */}
              <Link to="/auth/signup">Register again</Link>
              {' '}
              if you think you made a mistake in your previous registration.
            </p>
          </Alert>
        ) : null}
      </section>
    );
  }
}

VerifyAccount.propTypes = {
  verifyAccount: PropTypes.func.isRequired,
  auth: PropTypes.instanceOf(Object).isRequired,
  ui: PropTypes.instanceOf(Object).isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = state => ({
  ui: state.ui,
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { verifyAccount },
)(VerifyAccount);
