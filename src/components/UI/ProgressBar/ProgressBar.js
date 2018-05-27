import React, {Fragment} from 'react';

import classes from './ProgressBar.css';

const progressBar = props => {
  
  return (
    <Fragment>
      <div className={classes.Info}>

        <span>
          <span className={classes.Artist}>
            Artist
          </span> 
          &nbsp;&#8212;&nbsp;
          <span  className={classes.Song}>
            Song
          </span>
        </span>

        <span>
          2:13
        </span>

      </div>
      <div className={classes.ProgressBar}>
        <div className={classes.Progress}>

        </div>
      </div>
    </Fragment>
  )
}
 
export default progressBar;