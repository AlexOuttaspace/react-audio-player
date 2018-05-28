import React from 'react';

import PlaylistItem from './PlaylistItem/PlaylistItem';

import classes from './Playlist.css';

const playlist = props => {
  let playListContent = null;

  if (!!props.tracks.length) {
    playListContent = props.tracks.map((t, i) => (
      <PlaylistItem 
        key={t.id} 
        {...t}
        isCurrentTrack={t.id === props.id}
        clicked={
          t.id === props.id
          ? props.togglePause
          : () => {
            props.onSelectTrack(t.id);
            props.onPlay();
          }
        }
      />
    ))
  } else {
    playListContent = (
      <div className={classes.NoTracks}>Sorry. I couldn't find any tracks...</div>
    )
  }

  return (
    <ul className={classes.Playlist}>
      {playListContent}
    </ul>
  )
}
 
export default playlist;