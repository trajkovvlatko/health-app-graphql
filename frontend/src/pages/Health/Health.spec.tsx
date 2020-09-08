import React from 'react';
import {shallow} from 'enzyme';
import Health from './Health';

it('renders the Health page', () => {
  const wrapper = shallow(<Health />);
  expect(wrapper.contains(<h1>Health page</h1>)).toEqual(true);
});
