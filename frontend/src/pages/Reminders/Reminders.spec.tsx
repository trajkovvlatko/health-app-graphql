import React from 'react';
import {shallow} from 'enzyme';
import Reminders from './Reminders';

it('renders the Reminders page', () => {
  const wrapper = shallow(<Reminders />);
  expect(wrapper.contains(<h1>Reminders page</h1>)).toEqual(true);
});
