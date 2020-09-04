import React from 'react';
import {shallow} from 'enzyme';
import Wrapper from './Wrapper';

it('renders the contact form', () => {
  const wrapper = shallow(<Wrapper />);
  expect(wrapper.contains('Contact form')).toEqual(true);
});
