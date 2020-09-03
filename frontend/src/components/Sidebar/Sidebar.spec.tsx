import React from 'react';
import {shallow, mount} from 'enzyme';
import Sidebar from './Sidebar';
import {SidebarStateProvider} from 'contexts/SidebarStateContext';
import {BrowserRouter} from 'react-router-dom';
import MainLayout from 'layouts/Main/MainLayout';

it('renders the sidebar', () => {
  const wrapper = shallow(<Sidebar />);
  expect(wrapper.contains('Sidebar')).toEqual(true);
});

it('adds a toggle button', () => {
  const wrapper = shallow(<Sidebar />);
  expect(wrapper.find('button').length).toEqual(1);
});

describe('the toggle sidebar button', () => {
  it('toggles the sidebar state on click', () => {
    const TestComponent = () => {
      return (
        <BrowserRouter>
          <SidebarStateProvider>
            <MainLayout />
            <Sidebar />
          </SidebarStateProvider>
        </BrowserRouter>
      );
    };
    const wrapper = mount(<TestComponent />);
    const btn = wrapper.find('button').at(0);
    expect(wrapper.find('.sidebar.active').length).toEqual(1);

    btn.simulate('click');
    expect(wrapper.find('.sidebar.active').length).toEqual(0);
    expect(wrapper.find('.sidebar').length).toEqual(1);
  });
});
