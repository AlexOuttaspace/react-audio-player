import React from 'react';
import PropTypes from 'prop-types';
import ReactCursorPosition from 'react-cursor-position';

import PlayButton from '../UI/PlayButton/PlayButton';
import NextButton from '../UI/NextButton/NextButton';
import ProgressBar from '../UI/ProgressBar/ProgressBar';
import VolumeBar from '../UI/VolumeBar/VolumeBar';

import classes from './Controls.css';

const controls = (props) => {
	return (
		<section className={classes.Controls}>
			<section className={classes.Buttons}>
				<div className={classes.Prev}>
					<NextButton
						back
						clicked={() => props.onSwitchTrack('prev')}
					/>
				</div>
				<div className={classes.Play}>
					<PlayButton
						clicked={props.togglePause}
						paused={props.paused}
					/>
				</div>
				<div className={classes.Next}>
					<NextButton clicked={() => props.onSwitchTrack('next')} />
				</div>
			</section>

			<ReactCursorPosition className={classes.Progress}>
				<ProgressBar
					loaded={props.loaded}
					artist={props.artist}
					name={props.name}
					duration={props.trackDuration}
					progress={props.position}
					clicked={props.onSeek}
				/>
			</ReactCursorPosition>

			<ReactCursorPosition className={classes.Volume}>
				<VolumeBar
					volume={props.volume}
					clicked={props.onVolumeChanged}
				/>
			</ReactCursorPosition>
		</section>
	);
};

controls.propTypes = {
	artist: PropTypes.string,
	name: PropTypes.string,
	paused: PropTypes.bool,
	togglePause: PropTypes.func.isRequired,
	loaded: PropTypes.number,
	position: PropTypes.number,
	trackDuration: PropTypes.number.isRequired,
	volume: PropTypes.number,
	onSeek: PropTypes.func.isRequired,
	onVolumeChanged: PropTypes.func.isRequired,
	onSwitchTrack: PropTypes.func.isRequired
};

export default controls;
