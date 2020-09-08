import React from 'react';
import {shallow} from 'enzyme';
import History from './History';

it('renders the History page', () => {
  const wrapper = shallow(<History />);
  expect(wrapper.contains(<h1>History page</h1>)).toEqual(true);
});
