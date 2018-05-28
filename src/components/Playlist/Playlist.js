import React from 'react';

import PlaylistItem from './PlaylistItem/PlaylistItem';

import classes from './Playlist.css';

const playlist = props => {
  return (
    <ul className={classes.Playlist}>
      {props.tracks.map((t, i) => (
          <PlaylistItem 
            key={t.id} 
            {...t}
            isCurrentTrack={t.id === props.currentlyPlaying}
            clicked={
              t.id === props.currentlyPlaying
              ? props.togglePause
              : () => props.onSelectTrack(t.id)
            }
          />
      ))}
    </ul>
  )
}
 
export default playlist;