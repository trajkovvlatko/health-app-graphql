import React from 'react';
import Wrapper from './Wrapper';
import {SidebarStateProvider} from 'contexts/SidebarStateContext';
import {BrowserRouter} from 'react-router-dom';
import {fireEvent, render, screen} from '@testing-library/react';

const TestComponent = () => {
  return (
    <BrowserRouter>
      <SidebarStateProvider sidebarState={true}>
        <Wrapper />
      </SidebarStateProvider>
    </BrowserRouter>
  );
};

it('renders the sidebar', () => {
  render(<TestComponent />);
  expect(screen.getByTestId('sidebar-wrapper')).toBeInTheDocument();
});

it('adds a toggle button', () => {
  render(<TestComponent />);
  expect(screen.getByTestId('toggle-sidebar-button')).toBeInTheDocument();
});

describe('the toggle sidebar button', () => {
  it('toggles the sidebar state on click', async () => {
    const {container} = render(<TestComponent />);
    const btn = container.querySelector('button');
    expect(container.querySelectorAll('.sidebar.active').length).toEqual(1);
    fireEvent.click(btn!);
    expect(container.querySelector('.sidebar.active')).toBeNull();
    expect(container.querySelector('.sidebar')).not.toBeNull();
  });
});
