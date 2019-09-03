/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import Image from './Imageitem';

class Articleitem extends Component {
  state={
    onHover: false,
  }

  /* istanbul ignore next */
  onMouseLeaveHandler = () => this.setState({ onHover: false })

  /* istanbul ignore next */
  onMouseEnterHandler = () => this.setState({ onHover: !false })

  render() {
    const { article } = this.props;
    const { image, body } = article;
    const { slug, readtime, createdAt, title, views } = article.article;
    return (
      <div className="itemcontainer">
        <div className="content-item row mt-3 mb-3 ml-4" key={slug}>
          <div
            className={
            /* istanbul ignore next */
            image !== null ? 'col-lg-8' : 'col-lg-11'
            }
          >
            <div className="row">
              <p htmlFor="story_title" className="h6 text-dark font-weight-bold">
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
              <div className="created-date">
                <p htmlFor="story_date" className="h6 text-secondary font-weight-normal">
                  <Moment format="DD MMM YYYY">{createdAt}</Moment>
                </p>
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <div className="read-time">
                <p htmlFor="story_readtime" className="h6 text-secondary font-weight-normal">
                  {readtime}
                </p>
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <div className="views">
                <p htmlFor="views" className="h6 text-secondary font-weight-normal">
                  <span
                    onMouseOver={this.onMouseEnterHandler}
                    onMouseOut={this.onMouseLeaveHandler}
                  >
                    <i className="far fa-eye" />
                    &nbsp;
                    {views}
                    {
                      /* istanbul ignore next */
                    this.state.onHover ? (
                      <label
                        htmlFor="Views"
                        style={{
                          padding: '5px',
                          zIndex: '500',
                          marginTop: '20px',
                          marginLeft: '-50px',
                          position: 'absolute',
                          backgroundColor: 'black',
                          color: 'white',
                        }}
                      >
                        {' '}
                        Views
                      </label>
                    ) : null}
                  </span>

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
