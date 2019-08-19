/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

export default class Maincontent extends Component {
  render() {
    const { Articles } = this.props;
    return (
      <div>
        <section className="container">
          <h4 className="ml-4 mt-5">Dont miss </h4>
          <div className="line line__sm" />
          <div className="row">{Articles}</div>
        </section>
      </div>
    );
  }
}
