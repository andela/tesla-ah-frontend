import React from 'react';
import Proptypes from 'prop-types';

// eslint-disable-next-line react/prop-types
const Alert = ({ type, children }) => {
  const alertClass = `alert alert-${type}`;
  return <div className={alertClass}>{children}</div>;
};

Alert.propTypes = {
  type: Proptypes.string.isRequired,
};

export default Alert;
