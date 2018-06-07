import React from 'react';
import { shallow } from 'enzyme';
import Controls from './Controls';

import PlayButton from '../UI/PlayButton/PlayButton';
import NextButton from '../UI/NextButton/NextButton';
import ProgressBar from '../UI/ProgressBar/ProgressBar';
import VolumeBar from '../UI/VolumeBar/VolumeBar';

describe('Controls component', () => {
	let wrapped;

	const initialProps = {
		paused: true,
		loaded: 0,
		name: 'name',
		artist: 'artist',
		position: 0,
		trackDuration: 100,
		volume: 100,
		togglePause: () => {},
		onSeek: () => {},
		onVolumeChanged: () => {},
		onSwitchTrack: (option) => {
			return option;
		}
	};

	beforeEach(() => {
		wrapped = shallow(<Controls {...initialProps} />);
	});

	afterEach(() => {
		wrapped.unmount();
	});

	it('has 2 nextButtons', () => {
		expect(wrapped.find(NextButton).length).toEqual(2);
	});

	it('has 1 playButton', () => {
		expect(wrapped.find(PlayButton).length).toEqual(1);
	});

	it('has a progressBar', () => {
		expect(wrapped.find(ProgressBar).length).toEqual(1);
	});

	it('has a volumeBar', () => {
		expect(wrapped.find(VolumeBar).length).toEqual(1);
	});

	describe('props object passed to nextButtons', () => {
		it('has correct back property', () => {
			expect(wrapped.find(NextButton).get(0).props.back).toBe(true);

			expect(wrapped.find(NextButton).get(1).props.back).toBeFalsy();
		});

		it('has correct functions for switching tracks', () => {
			expect(wrapped.find(NextButton).get(0).props.clicked()).toEqual(
				initialProps.onSwitchTrack('prev')
			);

			expect(wrapped.find(NextButton).get(1).props.clicked()).toEqual(
				initialProps.onSwitchTrack('next')
			);
		});
	});

	describe('props object passed to play button', () => {
		it('has correct paused property', () => {
			expect(wrapped.find(PlayButton).props().paused).toEqual(
				initialProps.paused
			);
		});

		it('has correct togglePause function', () => {
			expect(wrapped.find(PlayButton).props().clicked).toBe(
				initialProps.togglePause
			);
		});
	});

	describe('props object passed to progressBar', () => {
		it('has correct onSeek function', () => {
			expect(wrapped.find(ProgressBar).props().clicked).toBe(
				initialProps.onSeek
			);
		});

		it('has correct trackDuration property', () => {
			expect(wrapped.find(ProgressBar).props().duration).toBe(
				initialProps.trackDuration
			);
		});

		it('has correct position property', () => {
			expect(wrapped.find(ProgressBar).props().progress).toBe(
				initialProps.position
			);
		});

		it('has correct loaded property', () => {
			expect(wrapped.find(ProgressBar).props().loaded).toBe(
				initialProps.loaded
			);
		});

		it('has correct artist property', () => {
			expect(wrapped.find(ProgressBar).props().artist).toBe(
				initialProps.artist
			);
		});

		it('has correct name property', () => {
			expect(wrapped.find(ProgressBar).props().name).toBe(
				initialProps.name
			);
		});
	});

	describe('props object passed to volumeBar', () => {
		it('has correct onVolumeChanged function', () => {
			expect(wrapped.find(VolumeBar).props().clicked).toBe(
				initialProps.onVolumeChanged
			);
		});

		it('has correct volume property', () => {
			expect(wrapped.find(VolumeBar).props().volume).toBe(
				initialProps.volume
			);
		});
	});
});
