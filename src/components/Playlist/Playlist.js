import React from 'react';

import PlaylistItem from './PlaylistItem/PlaylistItem';

import classes from './Playlist.css';

const playlist = props => {
  return (
    <ul className={classes.Playlist}>
      {props.tracks.map((t, i) => (
          <PlaylistItem 
            key={t.source + t.name} 
            {...t}
            isCurrentTrack={i === props.currentlyPlaying}
            clicked={
              i === props.currentlyPlaying
              ? props.togglePause
              : () => props.onSelectTrack(i)
            }
          />
      ))}
    </ul>
  )
}
 
export default playlist;