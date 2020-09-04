import React from 'react';
import {shallow, mount} from 'enzyme';
import Wrapper from './Wrapper';
import {act} from '@testing-library/react';

it('renders the contact form', () => {
  const wrapper = shallow(<Wrapper />);
  expect(wrapper.contains('Contact form')).toEqual(true);
});

describe('on submit', () => {
  describe('when an error happens', () => {
    it('shows an error message', async () => {
      const mockFetchPromise = Promise.resolve({
        json: () => Promise.reject(),
      });

      var globalRef: any = global;
      globalRef.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

      const wrapper = mount(<Wrapper />);
      await act(async () => {
        const name = wrapper.find('input.name').at(0);
        name.instance().value = 'name';
        const message = wrapper.find('input.message').at(0);
        message.instance().value = 'message';
        wrapper.find('form').simulate('submit');
      });

      expect(wrapper.html()).toContain('An error occured.');
    });
  });

  describe('when a successful response happens', () => {
    it('shows a success message', async () => {
      const mockFetchPromise = Promise.resolve({
        json: () => Promise.resolve({success: true}),
      });

      var globalRef: any = global;
      globalRef.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

      const wrapper = mount(<Wrapper />);
      await act(async () => {
        const name = wrapper.find('input.name').at(0);
        name.instance().value = 'name';
        const message = wrapper.find('input.message').at(0);
        message.instance().value = 'message';
        wrapper.find('form').simulate('submit');
      });

      expect(wrapper.html()).not.toContain('An error occured.');
      expect(wrapper.html()).toContain('Successfully submitted.');
    });
  });
});
