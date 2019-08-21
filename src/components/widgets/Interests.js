/* eslint-disable react/prop-types */
import React from 'react';

const Interests = (props) => {
  const { content } = props;
  return (
    <div className="col info-box">
      <div className="info-box-content d-flex flex-column">{content}</div>
    </div>
  );
};

export default Interests;
