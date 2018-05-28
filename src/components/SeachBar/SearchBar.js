import React from 'react';

import classes from './SearchBar.css';

const searchBar = props => {
  return (
    <form className={classes.SearchBar}>
      <input type="text" value={props.value} placeholder='Type here to search for song...'/>
    </form>
  )
}
 
export default searchBar;