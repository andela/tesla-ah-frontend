import React from 'react';
import Spinner from './Spinner';

export default () => (
  <div id="preloader" className="preloader">
    <Spinner caption="Loading ..." />
  </div>
);
