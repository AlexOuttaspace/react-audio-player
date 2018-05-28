import React from 'react';
import ReactCursorPosition from 'react-cursor-position';

import PlayButton from '../UI/PlayButton/PlayButton';
import NextButton from '../UI/NextButton/NextButton';
import ProgressBar from '../UI/ProgressBar/ProgressBar';
import VolumeBar from '../UI/VolumeBar/VolumeBar';


import classes from './Controls.css';

const controls = props => {
  return (
    <section className={classes.Controls}>
      <section className={classes.Buttons}>
        <div className={classes.Prev}>
          <NextButton back clicked={() => props.onSwitchTrack('prev')}/>
        </div>
        <div className={classes.Play}>
          <PlayButton clicked={props.toggle} paused={props.paused}/>
        </div>
        <div className={classes.Next}>
          <NextButton clicked={() => props.onSwitchTrack('next')}/>
        </div>
      </section>

      <ReactCursorPosition className={classes.Progress}>
        <ProgressBar 
          artist={props.track.artist}
          name={props.track.name}
          duration={props.duration}
          progress={props.position}
          clicked={props.onSeek}
        />
      </ReactCursorPosition>

      <ReactCursorPosition className={classes.Volume}>
        <VolumeBar 
          volume={props.volume}
          clicked={props.onVolumeChanged}
        />
      </ReactCursorPosition>
    </section>
  );
}
 
export default controls;