import React from 'react';

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
    ></button>
  )
}
 
export default nextButton;