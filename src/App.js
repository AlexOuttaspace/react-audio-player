import React, { Component } from 'react';

import Sound from 'react-sound';

import Controls from './components/Controls/Controls';
import Playlist from './components/Playlist/Playlist';

class App extends Component {
  state = {
    tracks: [
      {
        name: "We Were Young",
        artist: "Odesza",
        album: "Summer's Gone",
        year: 2012,
        artwork: "https://funkadelphia.files.wordpress.com/2012/09/odesza-summers-gone-lp.jpg",
        duration: 192,
        source: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/wwy.mp3"
      },
      {
        name: "We Were Young 2",
        artist: "Odesza",
        album: "Summer's Gone",
        year: 2012,
        artwork: "https://funkadelphia.files.wordpress.com/2012/09/odesza-summers-gone-lp.jpg",
        duration: 192,
        source: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/wwy.mp3"
      }
    ],
    player: {
      currentlyPlaying: 0, // index of song that's currently in the player
      paused: true,
      position: 0,
      duration: 0
    }
    
  }

  pauseHandler = () => {
    this.setState((prevState) =>{
      return {
        player: {
          ...prevState.player,
          paused: !prevState.player.paused
        }
      };
    });
  }

  updatePositionHandler = e => {
    this.setState((prevState) =>{
      return {
        player: {
          ...prevState.player,
          position: e.position
        }
      };
    });
  }

  loadingHandler = e => {
    this.setState((prevState) =>{
      return {
        player: {
          ...prevState.player,
          duration: e.duration
        }
      };
    });
  }

  render() {
    const {tracks} = this.state;
    const {currentlyPlaying, paused, position, duration} = this.state.player;

    return (
      <main>
        <Sound 
          url={tracks[currentlyPlaying].source}
          playStatus={paused ? Sound.status.PAUSED : Sound.status.PLAYING}
          onPlaying={this.updatePositionHandler}
          onLoading={this.loadingHandler}
        />
        <Controls
          track={tracks[currentlyPlaying]}
          paused={paused}
          toggle={this.pauseHandler}
          position={position}
          duration={duration}
          volume={1}
        />
        <Playlist 
          tracks={tracks} 
          currentlyPlaying={currentlyPlaying}
        />
      </main>
    );
  }
}

export default App;
