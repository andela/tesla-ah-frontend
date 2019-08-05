/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOneArticle } from '../../redux/actions/article.actions';

class SingleArticle extends Component {
  componentDidMount() {
    // eslint-disable-next-line react/prop-types
    const { match: { params: { slug } } } = this.props;
    // eslint-disable-next-line
    this.props.getOneArticle(slug);
  }

  render() {
    // eslint-disable-next-line
    const { article: { title, readtime, body } } = this.props;
    return (
      <div>
        <div className="row">
          <div className="col-lg-2" />
          <div className="col-lg-8">
            <div className="row">
              <div className="col-lg-12">
                {title}
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                {body}
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                {readtime}
              </div>
            </div>
          </div>
          <div className="col-lg-2" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  article: state.article,
});

export default connect(mapStateToProps, { getOneArticle })(SingleArticle);
