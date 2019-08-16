import React, { Component } from 'react';
import queryString from 'query-string';


export class Home extends Component {
  componentDidMount() {
    const { token } = queryString.parse(window.location.search);
    localStorage.setItem('ACCESS_TOKEN', token);
  }

  render() {
    return (
      <div className="homecontainer">
        <h1>Welcome to the Authors Haven Home Page</h1>
        <h2>Welcome to the Authors Haven Home Page</h2>
      </div>
    );
  }
}
export default Home;
