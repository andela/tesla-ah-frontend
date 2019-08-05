/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';

const FormContainer = ({ onSubmit, children }) => (
  <form onSubmit={onSubmit}>{children}</form>
);

FormContainer.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default FormContainer;
