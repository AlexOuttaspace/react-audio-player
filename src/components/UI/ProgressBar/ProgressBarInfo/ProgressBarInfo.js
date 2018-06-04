import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import classes from './ProgressBarInfo.css';

const progressBarInfo = props => {
  let info = null;

  if (props.artist) {
    info = (
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
  } else {
    info =  <div>&nbsp;</div>
  }


  return (
    <Fragment>
      {info}
    </Fragment>
  )
}

progressBarInfo.propTypes = {
  artist: PropTypes.string,
  name: PropTypes.string,
  formatedProgress: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])
}
 
export default progressBarInfo;