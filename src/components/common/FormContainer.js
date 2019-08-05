/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';

const FormContainer = ({ onSubmit, children }) => (
  <form onSubmit={onSubmit}>
    {children}
  </form>
);

FormContainer.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default FormContainer;
