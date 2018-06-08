import React from 'react';
import { shallow } from 'enzyme';
import Playlist from './Playlist';

import PlaylistItem from './PlaylistItem/PlaylistItem';
import defaultTracks from '../../defaultTracks';

let wrapped, props, currentTrackIndex;

describe('Playlist component', () => {
	beforeEach(() => {
		currentTrackIndex = 0;
		props = {
			tracks: defaultTracks,
			...defaultTracks[currentTrackIndex],
			togglePause: jest.fn(),
			onPlay: jest.fn(),
			onSelectTrack: jest.fn()
		};

		wrapped = shallow(<Playlist {...props} />);
	});

	afterEach(() => {
		wrapped.unmount();
	});

	it('creates one playlistItem per track', () => {
		expect(wrapped.find(PlaylistItem).length).toEqual(defaultTracks.length);
	});

	describe('current track', () => {
		let currentTrack;

		beforeEach(() => {
			currentTrack = wrapped
				.find(PlaylistItem)
				.findWhere((item) => item.props().isCurrentTrack);
		});

		it('is marked correctly', () => {
			expect(currentTrack.props().id).toEqual(
				props.tracks[currentTrackIndex].id
			);
		});

		it('is only one', () => {
			expect(currentTrack.length).toEqual(1);
		});

		it('has valid clicked functions', () => {
			currentTrack.props().clicked();

			expect(props.togglePause.mock.calls.length).toEqual(1);
			expect(props.onPlay.mock.calls.length).toEqual(0);
			expect(props.onSelectTrack.mock.calls.length).toEqual(0);
		});
	});

	describe('no tracks message', () => {
		beforeEach(() => {
			wrapped.setProps(wrapped.setProps({ ...props, tracks: [] }));
			wrapped.update();
		});

		it('is rendered when playlist is empty', () => {
			expect(wrapped.find('div').render().text()).toEqual(
				"Sorry. I couldn't find any tracks..."
			);
		});
	});
});
