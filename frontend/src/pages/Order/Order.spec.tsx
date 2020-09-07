import React from 'react';
import {shallow} from 'enzyme';
import Order from './Order';

it('renders the order page', () => {
  const wrapper = shallow(<Order />);
  expect(wrapper.contains(<h1>Order page</h1>)).toEqual(true);
});
