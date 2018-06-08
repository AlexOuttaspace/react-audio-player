import React from 'react';
import { shallow } from 'enzyme';

import SearchBar from './SearchBar';

describe('Search bar', () => {
	let wrapper;
	let props;

	beforeEach(() => {
		props = {
			onInput: jest.fn(),
			query: ''
		};
		wrapper = shallow(<SearchBar {...props} />);
	});

	afterEach(() => {
		wrapper.unmount();
	});

	it('calls onInput on change event', () => {
		wrapper.find('input').simulate('change');
		expect(props.onInput.mock.calls.length).toEqual(1);
	});

	it('assignes query prop to input field value', () => {
		expect(wrapper.find('input').props().value).toEqual(props.query);

		const newProps = { ...props, query: 'newQuery' };
		wrapper.setProps(newProps);
		wrapper.update();

		expect(wrapper.find('input').props().value).toEqual(newProps.query);
	});
});
