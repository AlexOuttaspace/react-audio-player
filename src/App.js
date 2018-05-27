import React, { Component } from 'react';

import Player from './containers/Player/Player';
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
    currentlyPlaying: 0, //null
    pause: true
  }

  render() {
    const {tracks, currentlyPlaying} = this.state;

    return (
      <main>
        <Player track={tracks[currentlyPlaying]} />
        <Playlist tracks={tracks} currentlyPlaying={currentlyPlaying}/>
      </main>
    );
  }
}

export default App;
