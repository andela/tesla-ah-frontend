/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import Switch from 'react-switch';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { optInApp, optOutApp, optedInApp } from '../../redux/actions/optInOptOut.actions';
import '../../assets/scss/pages/_optInOptOut.scss';

export class OptInOptOutApp extends Component {
  constructor(props) {
    super(props);
    this.state = { checked: false };
    props.onOptedInApp();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    this.setState({ checked });
    const { onOptInApp, onOptOutApp } = this.props;
    if (checked) {
      onOptInApp();
    } else {
      onOptOutApp();
    }
  }

  render() {
    const { checked } = this.props;
    return (
      <div className="form-check form-check-inline app-notifications">
        <div className="div-app">
          <span className="form-check-label app-span">In-App</span>
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
OptInOptOutApp.propTypes = {
  onOptInApp: PropTypes.func.isRequired,
  onOptOutApp: PropTypes.func.isRequired,
  onOptedInApp: PropTypes.func.isRequired,

};
export const mapStateToProps = state => ({
  checked: state.optInOptOutApp.checked,
});
export const mapDispatchToProps = dispatch => ({
  onOptInApp: () => {
    dispatch(optInApp());
  },
  onOptOutApp: () => {
    dispatch(optOutApp());
  },
  onOptedInApp: () => {
    dispatch(optedInApp());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(OptInOptOutApp);
