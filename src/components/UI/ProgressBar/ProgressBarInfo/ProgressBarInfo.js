import React from 'react';

import classes from './ProgressBarInfo.css';

const progressBarInfo = props => {
  return (

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
          {props.formatedProgress}
        </span>

      </div>
  )
}
 
export default progressBarInfo;