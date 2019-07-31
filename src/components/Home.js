import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <h1>...and then there was React...</h1>
    <Link to="/login">Login here</Link>
  </div>
);

export default Home;
