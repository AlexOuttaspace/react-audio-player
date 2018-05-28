import React, {Fragment} from 'react';

import classes from './VolumeBar.css';

const volumeBar = props => {
  const volumeBarFillStyle = {
    width: props.volume + '%'
  }


  return (
    <Fragment>
      <div
        onClick={e => 
          props.clicked(
            props.position,
            props.elementDimensions
          )
        }
        className={classes.ProgressBar}
      >
        <div
          style={volumeBarFillStyle}
          className={classes.Progress}
        ></div>
      </div>
    </Fragment>
  )
}
 
export default volumeBar;