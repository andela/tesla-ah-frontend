/* eslint-disable no-lone-blocks */
/* eslint-disable react/prefer-stateless-function */
import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Article from '../Article/Article';
import Alert from '../common/Alert';
import Spinner from '../widgets/Spinner';
import Form from '../forms/SearchForm';

export class Results extends Component {
  static propTypes = {
    search: PropTypes.instanceOf(Object).isRequired,
  }

  constructor() {
    super();
    this.state = {
      articles: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      articles: nextProps.search.results,
    });
  }

  render() {
    const { articles } = this.state;
    const {
      search: {
        failed, message, pending, done,
      },
    } = this.props;
    return (
      <Fragment>
        <div className="search__results">
          <Form />
          {pending ? (
            <div className="row">
              <div className="col-sm-4" />
              <div className="col-sm-4">
                <Spinner caption="Searching..." />
              </div>
              <div className="col-sm-4" />
            </div>
          ) : null}
          {!articles.length && done ? (
            <div className="container">
              <Alert type="warning">
                <p>No articles for this author...</p>
              </Alert>
            </div>
          ) : null}
          {articles.map((article) => {
            { /* const goodArticle = getFreshArticle(article);
            console.log(goodArticle); */ }
            return (
              <Article key={article.slug} article={article} />
            );
          })}
          {failed ? (
            <div className="container">
              <Alert type="warning">
                <p>{message}</p>
              </Alert>
            </div>
          ) : null}
        </div>
      </Fragment>
    );
  }
}

export const mapStateToProps = state => ({
  search: state.search,
});

export default connect(mapStateToProps)(Results);
