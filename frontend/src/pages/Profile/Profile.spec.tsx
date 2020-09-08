import React from 'react';
import {shallow} from 'enzyme';
import Profile from './Profile';

it('renders the Profile page', () => {
  const wrapper = shallow(<Profile />);
  expect(wrapper.contains(<h1>Profile page</h1>)).toEqual(true);
});
