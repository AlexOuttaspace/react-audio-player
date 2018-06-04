import React from 'react';
import PropTypes from 'prop-types';

import {formatDuration} from '../../../utility/utility';

import classes from './PlaylistItem.css';

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
          <div>{props.name}</div>
          <div className={classes.Artist}>{props.artist}</div> 
        </div>

        <div className={classes.Duration}>
          {duration}
        </div>
      </section>
    </li>
  );
}

playlistItem.propTypes = {
  artist: PropTypes.string.isRequired,
  artwork: PropTypes.string.isRequired,
  duration: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  name: PropTypes.string.isRequired,
  source: PropTypes.string,
  clicked: PropTypes.func.isRequired,
  isCurrentTrack: PropTypes.bool.isRequired
}
 
export default playlistItem;