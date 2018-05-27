import React, {Fragment} from 'react';

import {formatDuration} from '../../../utility/utility'

import classes from './ProgressBar.css';

const progressBar = props => {

  //const formatedDuration = formatDuration(props.duration/1000);
  const formatedPosition = formatDuration(props.position/1000);

  const progress = props.position/props.duration * 100;

  const progressBarFillStyle = {
    width: progress + '%'
  }
  return (
    
    <Fragment>
      <div className={classes.Info}>

        <span>
          <span className={classes.Artist}>
            {props.artist}
          </span> 
          &nbsp;&#8212;&nbsp;
          <span  className={classes.Song}>
            {props.name}
          </span>
        </span>

        <span>
          {formatedPosition}
        </span>

      </div>
      <div className={classes.ProgressBar}>
        <div 
          style={progressBarFillStyle}
          className={classes.Progress}>

        </div>
      </div>
    </Fragment>
  )
}
 
export default progressBar;