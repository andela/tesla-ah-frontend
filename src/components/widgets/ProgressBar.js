import React from 'react';
import { ProgressBar } from 'react-step-progress-bar';
import 'react-step-progress-bar/styles.css';

const progressBar = ({ onPercentageHandle }) => (
  <div>
    <ProgressBar
      percent={onPercentageHandle}
      filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
    />
  </div>
);

export default progressBar;
