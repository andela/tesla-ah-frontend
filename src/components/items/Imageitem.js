/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';

const Image = props => (props.image !== null ? (
  <div className="image col-lg-4">
    <img
      src={props.image}
      alt={props.title}
      className="rounded-1 w-100"
    />
  </div>
) : (<div />));
export default Image;
