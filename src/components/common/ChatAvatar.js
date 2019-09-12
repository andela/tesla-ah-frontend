import React from 'react';

const Avatar = ({ source, alt }) => (
  <img src={source} alt={alt} className="chat__avatar" />
);

export default Avatar;
