import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import ProgressBarInfo from './ProgressBarInfo/ProgressBarInfo';

import { formatDuration } from '../../../utility/utility';

import classes from './ProgressBar.css';

const progressBar = (props) => {
	//const formatedDuration = formatDuration(props.duration/1000);
	const formatedProgress = formatDuration(props.progress / 1000);
	const progress = props.progress / props.duration * 100;

	const progressBarFillStyle = {
		width: progress + '%'
	};

	const loadedBarFillStyle = {
		width: props.loaded * 100 + '%'
	};

	return (
		<Fragment>
			<ProgressBarInfo
				artist={props.artist}
				name={props.name}
				formatedProgress={formatedProgress}
			/>
			<div
				className={classes.ProgressBar}
				onClick={(e) =>
					props.clicked(props.position, props.elementDimensions)}
			>
				<div
					style={progressBarFillStyle}
					className={classes.Progress}
				/>
				<div style={loadedBarFillStyle} className={classes.Loaded} />
			</div>
		</Fragment>
	);
};

progressBar.propTypes = {
	artist: PropTypes.string,
	name: PropTypes.string,
	progress: PropTypes.number,
	duration: PropTypes.number,
	loaded: PropTypes.number,
	clicked: PropTypes.func
};

export default progressBar;
