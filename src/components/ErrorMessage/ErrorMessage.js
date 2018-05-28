import React, {Fragment} from 'react';

import classes from './ErrorMessage.css';

const errorMessage = props => {
  const messageClasses = [
    classes.ErrorMessage,
    props.show ? classes.Show : null
  ];

  return (
    <Fragment>
      {props.show && <div className={classes.Backdrop}></div>}
      <section className={messageClasses.join(' ')}>
        <h1>Error message</h1>
        {props.children}
        <button onClick={props.onErrorDismiss}>Dismiss</button>
      </section>
    </Fragment>
  );
}
 
export default errorMessage;