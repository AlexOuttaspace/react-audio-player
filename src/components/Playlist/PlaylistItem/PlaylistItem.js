import React from 'react';

import {formatDuration} from '../../../utility/utility';

import classes from './PlaylistItem.css';

// TODO remove redundant classes from divs

const playlistItem = props => {
  const duration = formatDuration(props.duration);
  const itemClasses = [
    classes.PlaylistItem,
    props.isCurrentTrack ? classes.CurrentTrack : null
  ]

  return (
    <li 
      className={itemClasses.join(' ')}
      onClick={props.clicked}
    >
      <div className={classes.AlbumCover}>
        <img  src={props.artwork} alt="albom cover"/>

      </div>
      
      <section className={classes.Info}>
        <div>
          <div className={classes.Name}>{props.name}</div>
          <div className={classes.Artist}>{props.artist}</div> 
        </div>

        <div className={classes.Duration}>
          {duration}
        </div>
      </section>
      
    </li>
  );
}
 
export default playlistItem;