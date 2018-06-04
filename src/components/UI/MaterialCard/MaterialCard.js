import React from 'react';
import PropTypes from 'prop-types';
import classes from './MaterialCard.css';

const materialCard = props => {
  return (
    <div className={classes.MaterialCard}>
      {props.children}
    </div>
  )
}

materialCard.propTypes = {
  children: PropTypes.any.isRequired
}
 
export default materialCard;