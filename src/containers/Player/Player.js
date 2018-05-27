import React, { Component } from 'react';

import classes from './Player.css';

import Controls from '../../components/Controls/Controls';

class Player extends Component {
  state = {
    paused: false
  }

  pauseHandler = () => {
    console.log('s')
    this.setState({paused: !this.state.paused})
  }

  render() { 
    return (
      <section className={classes.Player}>
        <Controls  toggle={this.pauseHandler}  paused={this.state.paused}/>
      </section>
    )
  }
}
 
export default Player;