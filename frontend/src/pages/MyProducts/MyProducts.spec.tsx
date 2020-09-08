import React from 'react';
import {shallow} from 'enzyme';
import MyProducts from './MyProducts';

it('renders the MyProducts page', () => {
  const wrapper = shallow(<MyProducts />);
  expect(wrapper.contains(<h1>MyProducts page</h1>)).toEqual(true);
});
