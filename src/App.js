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
        name: "Луна",
        artist: "Badda Boo",
        album: "Summer's Gone",
        year: 2012,
        artwork: "https://funkadelphia.files.wordpress.com/2012/09/odesza-summers-gone-lp.jpg",
        duration: 271,
        source: "https://cs1-49v4.vkuseraudio.net/p15/e89c9646cbee3c.mp3"
      }
    ],
    player: {
      currentlyPlaying: 0, // index of song that's currently in the player
      paused: true,
      position: 0,
      duration: 0,
      volume: 100
    }
  }

  seekHandler = (mousePosition, elementDimensions) => {
    
    this.setState((prevState) =>{
      const newPosition = (mousePosition.x / elementDimensions.width) * prevState.player.duration;
      return {
        player: {
          ...prevState.player,
          position: newPosition
        }
      };
    });
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
          position: e.position,
          duration: e.duration
        }
      };
    });
    return 0;
  }

  loadingHandler = e => {
    console.log('esa')
    this.setState((prevState) =>{
      return {
        player: {
          ...prevState.player,
          duration: e.duration
        }
      };
    });
  }

  volumeChangedHandler = (mousePosition, elementDimensions) => {
    this.setState((prevState) =>{
      const newVolume = (mousePosition.x / elementDimensions.width) * 100
      return {
        player: {
          ...prevState.player,
          volume: newVolume
        }
      };
    });
  }

  switchTrackHandler = (index) => {

    this.setState(({player, tracks}) =>{
      let newTrackIndex = index;
      if (index === 'next') {
        // using modulo allows to loop playlist
        newTrackIndex = (player.currentlyPlaying + 1) % tracks.length
      } else if (index === 'prev') {
        // this if statement allow to loop playlist backwards
        if(player.currentlyPlaying === 0) {
          newTrackIndex = tracks.length - 1;
        } else {
          newTrackIndex = (player.currentlyPlaying - 1) % tracks.length
        }
      }

      return {
        player: {
          ...player,
          currentlyPlaying: newTrackIndex,
          position: 0 // play new track from start
        }
      };
    });
  }

  render() {
    const {tracks} = this.state;
    const {currentlyPlaying, paused, position, duration, volume} = this.state.player;

    return (
      <main>
        <Sound 
          url={tracks[currentlyPlaying].source}
          playStatus={paused ? Sound.status.PAUSED : Sound.status.PLAYING}
          onPlaying={this.updatePositionHandler}
          onLoading={this.loadingHandler}
          position={position}
          volume={volume}
          onFinishedPlaying={()=>this.switchTrackHandler('next')}
        />
        <Controls
          track={tracks[currentlyPlaying]}
          paused={paused}
          togglePause={this.pauseHandler}
          position={position}
          duration={duration}
          volume={volume}
          onSeek={this.seekHandler}
          onVolumeChanged={this.volumeChangedHandler}
          onSwitchTrack={this.switchTrackHandler}
        />
        <Playlist 
          tracks={tracks} 
          currentlyPlaying={currentlyPlaying}
          togglePause={this.pauseHandler}
          onSelectTrack={this.switchTrackHandler}
        />
      </main>
    );
  }
}

export default App;
