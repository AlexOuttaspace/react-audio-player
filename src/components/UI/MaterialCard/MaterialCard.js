import React from 'react';

import classes from './MaterialCard.css';

const materialCard = props => {
  return (
    <div className={classes.MaterialCard}>
      {props.children}
    </div>
  )
}
 
export default materialCard;