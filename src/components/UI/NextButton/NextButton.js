import React from 'react';
import PropTypes from 'prop-types';
import classes from './NextButton.css';

const nextButton = props => {
  const buttonClasses = [
    classes.NextButton,
    props.back ? classes.Back : null
  ]

  return (
    <button  
      onClick={props.clicked} 
      className={buttonClasses.join(' ')}
    >
      <div className={classes.left}></div>
      <div className={classes.right}></div>
      <div className={classes.triangle1}></div>
      <div className={classes.triangle2}></div>
    </button>
  )
}

nextButton.propTypes = {
  clicked: PropTypes.func
}
 
export default nextButton;