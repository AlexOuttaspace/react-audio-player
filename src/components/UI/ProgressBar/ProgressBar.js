import React, {Fragment} from 'react';

import ProgressBarInfo from './ProgressBarInfo/ProgressBarInfo';

import {formatDuration} from '../../../utility/utility'

import classes from './ProgressBar.css';

const progressBar = props => {
  //const formatedDuration = formatDuration(props.duration/1000);
  const formatedProgress = formatDuration(props.progress/1000);
  const progress = props.progress/props.duration * 100;

  const progressBarFillStyle = {
    width: progress + '%'
  }
  
  return (
    <Fragment>
      <ProgressBarInfo 
        artist={props.artist}
        name={props.name}
        formatedProgress={formatedProgress}
      />

      <div 
        className={classes.ProgressBar}
        onClick={e => 
          props.clicked(
            props.position,
            props.elementDimensions
          )
        }
      >
        <div 
          style={progressBarFillStyle}
          className={classes.Progress}
        ></div>
      </div>
    </Fragment>
  )
}
 
export default progressBar;