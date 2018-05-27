import React, {Fragment} from 'react';

import classes from './VolumeBar.css';

const volumeBar = props => {
  
  return (
    <Fragment>
      <div className={classes.ProgressBar}>
        <div className={classes.Progress}>

        </div>
      </div>
    </Fragment>
  )
}
 
export default volumeBar;