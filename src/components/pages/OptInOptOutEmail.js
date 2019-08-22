/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import Switch from 'react-switch';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { optInEmail, optOutEmail, optedInEmail } from '../../redux/actions/optInOptOut.actions';
import '../../assets/scss/pages/_optInOptOut.scss';

export class OptInOptOutEmail extends Component {
  constructor(props) {
    super(props);
    this.state = { checked: false };
    props.onOptedInEmail();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    this.setState({ checked });
    const { onOptInEmail, onOptOutEmail } = this.props;
    if (checked) {
      onOptInEmail();
    } else {
      onOptOutEmail();
    }
  }

  render() {
    const { checked } = this.props;
    return (
      <div className="form-check form-check-inline email-notifications">
        <div className="div-email">
          <span className="form-check-label email-span">Email</span>
        </div>
        <Switch
          className="form-check-input react-switch"
          onChange={this.handleChange}
          checked={checked}
          onColor="#00aeff"
        />
      </div>
    );
  }
}
export const mapStateToProps = state => ({
  checked: state.optInOptOutEmail.checked,

});
OptInOptOutEmail.propTypes = {
  onOptInEmail: PropTypes.func.isRequired,
  onOptOutEmail: PropTypes.func.isRequired,
  onOptedInEmail: PropTypes.func.isRequired,

};
export const mapDispatchToProps = dispatch => ({
  onOptInEmail: () => {
    dispatch(optInEmail());
  },
  onOptOutEmail: () => {
    dispatch(optOutEmail());
  },
  onOptedInEmail: () => {
    dispatch(optedInEmail());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(OptInOptOutEmail);
