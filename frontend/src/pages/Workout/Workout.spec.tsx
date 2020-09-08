import React from 'react';
import {shallow} from 'enzyme';
import Workout from './Workout';

it('renders the Workout page', () => {
  const wrapper = shallow(<Workout />);
  expect(wrapper.contains(<h1>Workout page</h1>)).toEqual(true);
});
