import React from 'react';
import {shallow} from 'enzyme';
import Footer from './Footer'

test('renders the footer', () => {
  const wrapper = shallow(<Footer />);
  const title = <h1>Footer</h1>
  expect(wrapper.contains(title)).toEqual(true);
});
