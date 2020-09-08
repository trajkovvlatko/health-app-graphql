import React from 'react';
import {shallow} from 'enzyme';
import Meals from './Meals';

it('renders the Meals page', () => {
  const wrapper = shallow(<Meals />);
  expect(wrapper.contains(<h1>Meals page</h1>)).toEqual(true);
});
