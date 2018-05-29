import React, { Component } from 'react';
import axios from 'axios';
import Sound from 'react-sound';

import Controls from './components/Controls/Controls';
import Playlist from './components/Playlist/Playlist';
import SearchBar from './components/SeachBar/SearchBar';
import MaterialCard from './components/UI/MaterialCard/MaterialCard';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import Spinner from './components/UI/Spinner/Spinner';
import {formatTracks} from './utility/utility';

const fallBackTracks =  [
  {
    id: 1,
    name: "We Were Young",
    artist: "Odesza",
    artwork: "https://funkadelphia.files.wordpress.com/2012/09/odesza-summers-gone-lp.jpg",
    duration: 192,
    source: "https://firebasestorage.googleapis.com/v0/b/react-audio-player-28dec.appspot.com/o/Alice%20Cooper%20-%20School's%20Out.mp3?alt=media&token=d1258406-10ad-41fc-b159-390e08ab3210"
  },
  {
    id: 2,
    name: "We Were  Very Young",
    artist: "Rodesza",
    artwork: "https://funkadelphia.files.wordpress.com/2012/09/odesza-summers-gone-lp.jpg",
    duration: 192,
    source: "https://freemusicarchive.org/music/download/e4507f4adfbb573336fbd498d7d0d3e4b15bd01b"
  },
  {
    id: 3,
    name: "We Were Not So Young",
    artist: "Norodezsa",
    artwork: "https://funkadelphia.files.wordpress.com/2012/09/odesza-summers-gone-lp.jpg",
    duration: 192,
    source: "https://freemusicarchive.org/music/download/e4507f4adfbb573336fbd498d7d0d3e4b15bd01b"
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
      showErrorMessage: false,
      loaded: 0
    },
    searchQuery: '',
    loading: true
  }

  componentDidMount = async () => {
    const tracks = await this.fetchTracks();
    this.setState({
      loading: false,
      tracks: tracks, 
      currentPlaylist: tracks,
      currentlyPlaying: tracks[0].id
    });
  }

  componentDidUpdate = (prevProps, prevState) => {
    // && (this.state.searchQuery.length >= 3 || this.state.searchQuery === '')
    if (prevState.searchQuery !== this.state.searchQuery ) {
      this.setCurrentPlaylist();
    }
  }
 
  fetchTracks = async () => {
    try {
      const response = await axios.get('https://api.myjson.com/bins/w0kim');
      return response.data;   
    } catch (err) {
      this.setState(prevState => ({
        player: {
          ...prevState.player,
          error: err.message + '. Using fallback tracks.',
          showErrorMessage: true
        }
      }));
      return fallBackTracks
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

  playHandler = () => {
    this.setState((prevState) =>{
      return {
        player: {
          ...prevState.player,
          paused: false
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
    const {position, duration} = e;
    this.setState((prevState) =>{
      return {
        player: {
          ...prevState.player,
          position,
          duration
        }
      };
    });
    return 0;
  }

  loadingHandler = e => {
    const {duration, bytesLoaded, bytesTotal} = e;
    
    this.setState((prevState) =>{
      return {
        player: {
          ...prevState.player,
          duration,
          loaded: bytesLoaded / bytesTotal
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
          if (currentTrackIndex >= currentPlaylist.length - 1) {
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
    this.setState(prevState => {
      const newPlaylist = this.state.tracks.filter((t, i) => (
          t.name.toLowerCase().includes(prevState.searchQuery.toLowerCase()) ||
          t.artist.toLowerCase().includes(prevState.searchQuery.toLowerCase())  
      ));
      return {currentPlaylist: newPlaylist};
    });
  }

  
  render() {
    const {
      tracks, 
      currentlyPlaying, 
      currentPlaylist, 
      searchQuery,
      loading
    } = this.state;
    const {
      paused,
      position,
      duration,
      volume,
      error,
      showErrorMessage,
      loaded
    } = this.state.player;

    const track = tracks.find(t => t.id === currentlyPlaying);

    let sound = null;

    let playList = null;

    if (track) {
      sound = (
        <Sound
          onError={this.errorHandler}
          url={track.source}
          playStatus={paused ? Sound.status.PAUSED : Sound.status.PLAYING}
          position={position}
          onPlaying={this.updatePositionHandler}
          onLoading={this.loadingHandler}
          volume={volume}
          onFinishedPlaying={()=>this.switchTrackHandler('next')}
        />
      )
    }
    
    if(!loading) {
      playList = (
      <Playlist 
        tracks={currentPlaylist} 
        {...track}
        onPlay={this.playHandler}
        togglePause={this.pauseHandler}
        onSelectTrack={this.switchTrackHandler}
      />
      )
    } else {
      playList = (
        <Spinner />
      )
    }
    
    return (
      <main>
        <ErrorMessage 
          onErrorDismiss={this.errorDismissHandler}
          show={showErrorMessage}
        >
          {error}
        </ErrorMessage>
        {sound}
        <MaterialCard>
          <Controls
            {...track}
            paused={paused}
            togglePause={this.pauseHandler}
            loaded={loaded}
            position={position}
            trackDuration={duration}
            volume={volume}
            onSeek={this.seekHandler}
            onVolumeChanged={this.volumeChangedHandler}
            onSwitchTrack={this.switchTrackHandler}
          />
        </MaterialCard>
        
        <MaterialCard>
          <SearchBar
            onInput={this.searchInputHandler}
            query={searchQuery}
          /> 
          {playList}
        </MaterialCard>
        
      </main>
    );
  }
}


export default App;
