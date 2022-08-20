import { useState } from 'react';
import css from './SearchBar.module.css';
import PropTypes from 'prop-types';

export const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const inputChangeHandler = e => {
    setQuery(e.target.value.trim());
  };

  const submitHandler = e => {
    e.preventDefault();
    onSubmit(query);
    setQuery('');
  };

  return (
    <>
      <header className={css.SearchBar}>
        <form onSubmit={submitHandler} className={css.SearchForm}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={inputChangeHandler}
          />
        </form>
      </header>
    </>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func,
};
