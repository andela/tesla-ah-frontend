import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from '../common/SearchContainer';
import searchArticles from '../../redux/actions/article/search.action';

export class SearchForm extends Component {
  static propTypes = {
    searchArticles: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      queryText: '',
      keyword: 'keywords',
    };
  }

  onType = ({ target }) => {
    this.setState({
      queryText: target.value,
    });
    const { queryText, keyword } = this.state;
    if (queryText.length >= 3) {
      const { searchArticles: searchThem } = this.props;
      searchThem(queryText, keyword);
    }
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
      toast.warn('Please choose a filter');
    } else {
      const { searchArticles: searchThem } = this.props;
      searchThem(queryText, keyword);
    }
  }

  render() {
    const { keyword, queryText } = this.state;
    return (
      <Form onSubmit={this.onSearch}>
        <div className="filter__form--field">
          <select
            value={keyword}
            onChange={this.onChoose}
            required
          >
            <option value="keywords">Search by keywords</option>
            <option value="title">Search by title</option>
            <option value="author">Search by author</option>
            <option value="tag">Search by tag</option>
          </select>
        </div>
        <div className="filter__form--field">
          <input
            type="search"
            name="search"
            value={queryText}
            onChange={this.onType}
            placeholder="Search by keywords, title, author, or tags"
            required
          />
        </div>
        <button type="submit" className="btn">
          <i className="fas fa-search" />
        </button>
      </Form>
    );
  }
}

export const mapStateToProps = state => ({
  search: state.search,
});

export default connect(mapStateToProps, { searchArticles })(SearchForm);
