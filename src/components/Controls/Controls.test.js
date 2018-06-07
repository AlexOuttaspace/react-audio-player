import React from 'react';
import { shallow } from 'enzyme';
import Controls from './Controls';

import PlayButton from '../UI/PlayButton/PlayButton';
import NextButton from '../UI/NextButton/NextButton';
import ProgressBar from '../UI/ProgressBar/ProgressBar';
import VolumeBar from '../UI/VolumeBar/VolumeBar';

describe('Controls component', () => {
	let wrapped;

	beforeEach(() => {
		wrapped = shallow(<Controls />);
	});

	afterEach(() => {
		//wrapped.unmount();
	});

	it('has 2 next buttons', () => {
		expect(wrapped.find(NextButton).length).toEqual(2);
	});
});
