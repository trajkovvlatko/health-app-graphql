import React from 'react';
import {shallow} from 'enzyme';
import ContactForm from './ContactForm';

it('renders the contact form', () => {
  const wrapper = shallow(<ContactForm />);
  expect(wrapper.contains('Contact form')).toEqual(true);
});
