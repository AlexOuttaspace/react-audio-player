import React, { Component } from 'react';
import Sound from 'react-sound';

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
    const {track} = this.props

    return (
      <section className={classes.Player}>
        <Sound 
          url={track.source}
          playStatus={Sound.status.STOPPED}
        />
        <Controls  toggle={this.pauseHandler}  paused={this.state.paused}/>
      </section>
    )
  }
}
 
export default Player;