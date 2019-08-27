/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import searchArticles from '../../redux/actions/article/search.action';

export class Search extends Component {
  static propTypes = {
    searchArticles: PropTypes.func.isRequired,
  }

  constructor() {
    super();
    this.state = {
      keyword: 'None',
      queryText: '',
    };
  }

  onType = ({ target }) => {
    this.setState({
      queryText: target.value,
    });
  }

  onChoose = ({ target }) => {
    this.setState({
      keyword: target.value,
    });
  }

  onSearch = (e) => {
    e.preventDefault();
    const { keyword, queryText } = this.state;
    if (keyword === 'None') {
      toast.warn('Please filter...');
    } else {
      const { searchArticles: searchThem } = this.props;
      searchThem(queryText, keyword);
    }
  }

  render() {
    const { keyword, queryText } = this.state;

    return (
      <Fragment>
        <div className="search container">
          <form className="search__container" onSubmit={this.onSearch}>
            <div className="row">
              <input
                type="search"
                className="search__input form-control col-sm-5"
                value={queryText}
                onChange={this.onType}
                placeholder="Type here to search..."
                required
                name="search"
              />
              <div className="col-sm-4 offset-md-3 row">
                <select
                  value={keyword}
                  onChange={this.onChoose}
                  className="form-control col-sm-6"
                  required
                >
                  <option value="None" disabled>Filter by...</option>
                  <option value="title">Title</option>
                  <option value="author">Author</option>
                  <option value="keywords">Keyword</option>
                  <option value="tag">Tag</option>
                </select>
                <button type="submit" className="search__button btn">
                  <i className="fas fa-search" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}

export const mapStateToProps = state => ({
  article: state.article,
  search: state.search,
});


export default connect(mapStateToProps, { searchArticles })(withRouter(Search));
