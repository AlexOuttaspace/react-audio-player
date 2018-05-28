import React, { Component } from 'react';

import Sound from 'react-sound';

import Controls from './components/Controls/Controls';
import Playlist from './components/Playlist/Playlist';
import SearchBar from './components/SeachBar/SearchBar';
import MaterialCard from './components/UI/MaterialCard/MaterialCard';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';

const initialTracks =  [
  {
    id: 1,
    name: "We Were Young",
    artist: "Odesza",
    album: "Summer's Gone",
    year: 2012,
    artwork: "https://funkadelphia.files.wordpress.com/2012/09/odesza-summers-gone-lp.jpg",
    duration: 192,
    source: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/wwy.mp3"
  },
  {
    id: 2,
    name: "Луна",
    artist: "Badda Boo",
    album: "Summer's Gone",
    year: 2012,
    artwork: "https://funkadelphia.files.wordpress.com/2012/09/odesza-summers-gone-lp.jpg",
    duration: 271,
    source: "https://cs1-49v4.vkuseraudio.net/p15/e89c9646cbee3c.mp3"
  },
  {
    id: 3,
    name: "Луна",
    artist: "Badda Boo",
    album: "Summer's Gone",
    year: 2012,
    artwork: "https://funkadelphia.files.wordpress.com/2012/09/odesza-summers-gone-lp.jpg",
    duration: 271,
    source: "https://cs1-49v4.vkuseraudio.net/p15/e89c9646cbee3c.mp3"
  }
]

class App extends Component {
  state = {
    tracks: [],
    currentPlaylist: [],
    currentlyPlaying: null, // id of the song that's currently in the player
    player: {
      paused: true,
      position: 0,
      duration: 0,
      volume: 80,
      error: '',
      showErrorMessage: false
    },
    searchQuery: '',
  }

  componentDidMount = () => {
    this.setState({
      tracks: initialTracks, 
      currentPlaylist: initialTracks,
      currentlyPlaying: initialTracks[0].id
    });
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.setCurrentPlaylist();
    }
  }

  // ERRORS
  errorHandler = (code) => {
    let error;
    if (code === 4) {
      error = 'Sorry. Track is missing';
    } else {
      error = 'Sorry. Something bad has happenned.';
    }

    this.setState((prevState) =>{
      return {
        player: {
          ...prevState.player,
          error,
          showErrorMessage: true
        }
      };
    });
  }

  errorDismissHandler = () => {
    this.setState((prevState) =>{
      return {
        player: {
          ...prevState.player,
          showErrorMessage: false
        }
      };
    });
  }

  // PLAYER CONTROLS
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

  switchTrackHandler = (id) => {
    this.setState(({player, currentPlaylist, currentlyPlaying}) =>{
      let newTrackId = id;

      if (id === 'next' || id === 'prev') {
        // find index of current track in current playlist
        let currentTrackIndex = currentPlaylist.findIndex(track => 
          track.id === currentlyPlaying
        );

        let newTrackIndex;
        if (id === 'next') {
          if (currentTrackIndex >= currentPlaylist.length) {
            newTrackIndex = 0;
          } else {
            newTrackIndex = (currentTrackIndex + 1);
          }
        } else {
          if (currentTrackIndex <= 0) {
            newTrackIndex = currentPlaylist.length - 1;
          } else {
            newTrackIndex = (currentTrackIndex - 1);
          }
        }
        newTrackId = currentPlaylist[newTrackIndex].id;
      }
      
      return {
        currentlyPlaying: newTrackId,
        player: {
          ...player,
          position: 0 // play new track from start
        }
      };
    });
  }

  // SEARCH
  searchInputHandler = e => {
    this.setState({searchQuery: e.target.value});
  }

  setCurrentPlaylist = () => {
    this.setState(() => {
      const newPlaylist = this.state.tracks.filter((t, i) => {
        return (t.id < 3);
      });

      return {currentPlaylist: newPlaylist};
    });
  }

  render() {
    const {tracks, currentlyPlaying, currentPlaylist, searchQuery} = this.state;
    const {
      paused,
      position,
      duration,
      volume,
      error,
      showErrorMessage
    } = this.state.player;

    const track = tracks.find(t => t.id === currentlyPlaying);

    return (
      <main>
        <ErrorMessage 
          onErrorDismiss={this.errorDismissHandler}
          show={showErrorMessage}
        >
          {error}
        </ErrorMessage>
        {track &&
          <Sound
            autoLoad
            onError={this.errorHandler}
            url={track.source}
            playStatus={paused ? Sound.status.PAUSED : Sound.status.PLAYING}
            onPlaying={this.updatePositionHandler}
            onLoading={this.loadingHandler}
            position={position}
            volume={volume}
            onFinishedPlaying={()=>this.switchTrackHandler('next')}
          />
        }
        <MaterialCard>
          <Controls
            {...track}
            paused={paused}
            togglePause={this.pauseHandler}
            position={position}
            trackDuration={duration}
            volume={volume}
            onSeek={this.seekHandler}
            onVolumeChanged={this.volumeChangedHandler}
            onSwitchTrack={this.switchTrackHandler}
          />
        </MaterialCard>
        {!!currentPlaylist.length &&
          <MaterialCard>
            <SearchBar
              onInput={this.searchInputHandler}
              query={searchQuery}
            /> 
            <Playlist 
              tracks={currentPlaylist} 
              currentlyPlaying={track.id}
              togglePause={this.pauseHandler}
              onSelectTrack={this.switchTrackHandler}
            />
          </MaterialCard>
        }
      </main>
    );
  }
}


export default App;
