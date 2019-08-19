import React from 'react';

const SearchContainer = ({ onSubmit, children }) => (
  <div className="container">
    <form onSubmit={onSubmit} className="filter__form">
      {children}
    </form>
  </div>
);

export default SearchContainer;
