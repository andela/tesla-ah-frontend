/* eslint-disable react/prop-types */
import React from 'react';

const Spinner = ({ caption, style }) => (
  <div className="spinner" style={style}>
    <img
      src="https://loading.io/spinners/comets/index.comet-spinner.svg"
      alt="Spinner"
    />
    <p>{caption}</p>
  </div>
);

export default Spinner;
