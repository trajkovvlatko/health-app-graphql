import React from 'react';
import {shallow, mount} from 'enzyme';
import Form from './Form';
import {act} from 'react-dom/test-utils';

it('renders the form', () => {
  const mockOnSubmit = jest.fn();
  const wrapper = shallow(<Form onSubmit={mockOnSubmit} />);
  expect(wrapper.find('form').length).toEqual(1);
});

describe('for invalid input', () => {
  it('renders an error for missing name', async () => {
    const mockOnSubmit = jest.fn();
    const wrapper = mount(<Form onSubmit={mockOnSubmit} />);

    await act(async () => {
      const message = wrapper.find('input.message').at(0);
      message.instance().value = 'message';
      wrapper.find('form').simulate('submit');
    });

    expect(wrapper.html()).toContain('Name is required');
    expect(wrapper.html()).not.toContain('Message is required');
    expect(mockOnSubmit).not.toBeCalled();
  });

  it('renders an error for missing message', async () => {
    const mockOnSubmit = jest.fn();
    const wrapper = mount(<Form onSubmit={mockOnSubmit} />);

    await act(async () => {
      const name = wrapper.find('input.name').first();
      name.instance().value = 'name';
      wrapper.find('form').simulate('submit');
    });

    expect(wrapper.html()).not.toContain('Name is required');
    expect(wrapper.html()).toContain('Message is required');
    expect(mockOnSubmit).not.toBeCalled();
  });
});

describe('for invalid input', () => {
  it('calls the submit function', async () => {
    const mockOnSubmit = jest.fn();
    const wrapper = mount(<Form onSubmit={mockOnSubmit} />);

    await act(async () => {
      const name = wrapper.find('input.name').first();
      name.instance().value = 'name';
      const message = wrapper.find('input.message').first();
      message.instance().value = 'name';
      wrapper.find('form').simulate('submit');
    });

    expect(wrapper.html()).not.toContain('Name is required');
    expect(wrapper.html()).not.toContain('Message is required');
    expect(mockOnSubmit).toBeCalledTimes(1);
  });
});
