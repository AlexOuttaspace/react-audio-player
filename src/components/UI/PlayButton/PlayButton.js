import React from 'react';

import classes from './PlayButton.css';

const playButton = props => {
  const buttonClasses = [
    classes.PlayButton,
    props.paused ? classes.Paused : null
  ];

  return (
    <button onClick={props.clicked} className={buttonClasses.join(' ')}>
      <div className={classes.left}></div>
      <div className={classes.right}></div>
      <div className={classes.triangle1}></div>
      <div className={classes.triangle2}></div>
    </button>
  )
}
 
export default playButton;