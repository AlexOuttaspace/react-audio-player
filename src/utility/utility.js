import defaultCover from '../assets/images/defaultCover.png'

// accepts duration in seconds,
// returns time in MM:SS format
export const formatDuration = duration => {
  let minutes = Math.floor(duration/60);
  let seconds = Math.floor(duration % 60);

  if (seconds < 10) {
    seconds = '0' + seconds;
  }

  return `${minutes}:${seconds}`;
}

export const formatTracks = tracks => {
  return tracks.map(t => ({
    id: t.track_id,
    name: t.track_title,
    artist: t.artist_name,
    artwork: checkValidCover(t.track_image_file),
    duration: getDuration(t.track_duration),
    source: t.track_file_url
  }));
}

// accepts time in string format HH:MM:SS returns number of seconds
export const getDuration = durationStr => {
  const times = durationStr.split(':');
  const minutes = Number(times[1]);
  const seconds = Number(times[2]);
  return minutes * 60 + seconds;
}

export const checkValidCover = (coverUrl) => {
  if (/\.(jpg|jpeg|png|gif)$/i.test(coverUrl) ) {
    return coverUrl;
  } else {
    return defaultCover;
  }
}