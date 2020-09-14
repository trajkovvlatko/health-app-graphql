import React from 'react';
import {shallow} from 'enzyme';
import Sidebar from './Sidebar';
import {SidebarStateProvider} from 'contexts/SidebarStateContext';
import {BrowserRouter} from 'react-router-dom';
import MainLayout from 'layouts/Main/MainLayout';
import {act, fireEvent, render} from '@testing-library/react';
import {MockedProvider} from '@apollo/client/testing';
import {ProfileDocument} from 'generated/graphql';

it('renders the sidebar', () => {
  const wrapper = shallow(<Sidebar />);
  expect(wrapper.contains('Sidebar')).toEqual(true);
});

it('adds a toggle button', () => {
  const wrapper = shallow(<Sidebar />);
  expect(wrapper.find('button').length).toEqual(1);
});

describe('the toggle sidebar button', () => {
  it.skip('toggles the sidebar state on click', () => {
    // TODO: It doesn't work because of the initial request in AuthInfo
    const mocks = [
      {
        request: {
          query: ProfileDocument,
        },
        result: {
          data: {
            profile: {id: 1, email: 'email@email.com'},
          },
        },
      },
    ];

    const TestComponent = () => {
      return (
        <BrowserRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <SidebarStateProvider sidebarState={true}>
              <MainLayout />
            </SidebarStateProvider>
          </MockedProvider>
        </BrowserRouter>
      );
    };

    const {container} = render(<TestComponent />);
    const btn = container.querySelector('button');
    expect(container.querySelectorAll('.sidebar.active').length).toEqual(1);
    act(() => {
      fireEvent.click(btn!);
    });

    expect(container.querySelector('.sidebar.active')).toBeNull();
    expect(container.querySelector('.sidebar')).not.toBeNull();
  });
});
