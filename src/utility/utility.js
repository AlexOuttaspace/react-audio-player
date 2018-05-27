
// accepts duration in seconds,
// returns time in MM:SS format
export const formatDuration = duration => {
  let minutes = Math.floor(duration/60);
  let seconds = duration % 60;

  if (seconds < 10) {
    seconds = '0' + seconds;
  }

  return `${minutes}:${seconds}`;
}