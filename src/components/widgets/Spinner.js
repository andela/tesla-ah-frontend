/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import React from 'react';

const Spinner = ({ caption }) => (
  <div className="spinner">
    <img src="https://loading.io/spinners/comets/index.comet-spinner.svg" alt="Spinner" />
    <p>{caption}</p>
  </div>
);

export default Spinner;
