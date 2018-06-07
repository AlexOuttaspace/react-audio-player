// accepts duration in seconds,
// returns time in MM:SS format
export const formatDuration = (duration) => {
	let minutes = Math.floor(duration / 60);
	let seconds = Math.floor(duration % 60);

	if (seconds < 10) {
		seconds = '0' + seconds;
	}
	return `${minutes}:${seconds}`;
};

// accepts time in string format HH:MM:SS returns number of seconds
export const getDuration = (durationStr) => {
	const times = durationStr.split(':');
	const minutes = Number(times[1]);
	const seconds = Number(times[2]);
	return minutes * 60 + seconds;
};
