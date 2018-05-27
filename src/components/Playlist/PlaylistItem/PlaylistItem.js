import React from 'react';

import {formatDuration} from '../../../utility/utility';

import classes from './PlaylistItem.css';

// TODO remove redundant classes from divs

const playlistItem = props => {
  const duration = formatDuration(props.duration);

  return (
    <li className={classes.PlaylistItem}>
      <div className={classes.Credentials}>
        <div className={classes.Name}>{props.name}</div>
        <div className={classes.Artist}>{props.artist}</div> 
      </div>

      <div className={classes.Duration}>
        {duration}
      </div>
    </li>
  );
}
 
export default playlistItem;