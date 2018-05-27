import React from 'react';

import PlaylistItem from './PlaylistItem/PlaylistItem';

import classes from './Playlist.css';

const playlist = props => {
  return (
    <ul className={classes.Playlist}>
      {props.tracks.map((t, i) => (
          <PlaylistItem key={t.source} {...t} />
      ))}
    </ul>
  )
}
 
export default playlist;