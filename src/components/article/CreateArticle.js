/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import Dante from 'Dante2';
import { Header } from '../layouts/Header';
/**
 * @description - a form which will handle the creation of an article
 */
class CreateArticle extends Component {
  state = {
    title: '',
    body: '',
    description: '',
  };

  handleOnChange = (editor) => {
    // eslint-disable-next-line
    console.log('editor content', editor.emitSerializedOutput());
  };

  render() {
    return (
      <div>
        <Header />
        <div className="bg-primary">
          <Dante onChange={this.handleOnChange} />
        </div>
      </div>
    );
  }
}

export default CreateArticle;
