import React from 'react';
import {shallow} from 'enzyme';
import Weight from './Weight';

it('renders the Weight page', () => {
  const wrapper = shallow(<Weight />);
  expect(wrapper.contains(<h1>Weight page</h1>)).toEqual(true);
});
