/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import Image from './Imageitem';

class Articleitem extends Component {
  render() {
    const { article, show } = this.props;
    const { image, body } = article;
    const {
      slug, readtime, createdAt, title,
    } = article.article;
    const rb = show ? <button type="submit" className="btn btn-primary remove-btn">Remove</button> : <div />;
    return (
      <div className="itemcontainer">
        <div className="content-item row mt-3 mb-3 ml-4" key={slug}>
          <div className={`${image !== null ? 'col-lg-8' : 'col-lg-11'}`}>
            <div className="row">
              <p
                htmlFor="story_title"
                className="h6 text-dark font-weight-bold"
              >
                {title}
              </p>
            </div>
            <div className="row">
              <p
                htmlFor="story_description"
                className="article-body text-secondary font-weight-light"
              >
                {body}
              </p>
            </div>
            <div className="row">
              <div className="col-lg-0">
                <p
                  htmlFor="story_date"
                  className="h6 text-secondary font-weight-normal"
                >
                  <Moment format="D MMM YYYY">
                    {createdAt}
                  </Moment>
                </p>
              </div>
              <div className="col-lg-8">
                <p
                  htmlFor="story_readtime"
                  className="h6 text-secondary font-weight-normal"
                >
                  {readtime}
                </p>
              </div>
              <div className="col-lg-2">
                <p
                  htmlFor="story_readtime"
                  className="h6 text-secondary font-weight-normal"
                >
                  {rb}
                </p>
              </div>

              <div className="col-lg-8" />
            </div>
          </div>
          <Image title={title} image={image} />
        </div>
      </div>
    );
  }
}
Articleitem.protoTypes = {
  article: PropTypes.object.isRequired,
};
export default Articleitem;
