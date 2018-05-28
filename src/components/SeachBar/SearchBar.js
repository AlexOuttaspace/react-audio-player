import React from 'react';

import classes from './SearchBar.css';

const searchBar = props => {
  return (
    <form
      onSubmit={e => e.preventDefault()}
      className={classes.SearchBar}>
      <input
        autoComplete='off'
        type="text"
        name='search'
        onChange={props.onInput}
        value={props.query} 
        placeholder='Type here to search for song...'/>
    </form>
  )
}
 
export default searchBar;