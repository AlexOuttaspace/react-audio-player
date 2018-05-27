import React from 'react';

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
          <NextButton back/>
        </div>
        <div className={classes.Play}>
          <PlayButton clicked={props.toggle} paused={props.paused}/>
        </div>
        <div className={classes.Next}>
          <NextButton />
        </div>
      </section>

      <div className={classes.Progress}>
        <ProgressBar 
          artist={props.track.artist}
          name={props.track.name}
          duration={props.duration}
          position={props.position}
        />
      </div>
      <div className={classes.Volume}>
        <VolumeBar />
      </div>
    </section>
  );
}
 
export default controls;