import React from 'react';
import {shallow} from 'enzyme';
import Reports from './Reports';

it('renders the Reports page', () => {
  const wrapper = shallow(<Reports />);
  expect(wrapper.contains(<h1>Reports page</h1>)).toEqual(true);
});
