import React from 'react';

import PlayButton from '../UI/PlayButton/PlayButton';
import NextButton from '../UI/NextButton/NextButton';
import ProgressBar from '../UI/ProgressBar/ProgressBar';


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
        <ProgressBar />
      </div>
    </section>
  );
}
 
export default controls;