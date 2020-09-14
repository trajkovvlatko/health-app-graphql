import React, {useContext} from 'react';
import {SidebarStateContext, SidebarStateProvider} from './SidebarStateContext';
import {mount} from 'enzyme';
import {act} from '@testing-library/react';

describe('SidebarStateContext', () => {
  describe('sidebarState', () => {
    const TestComponent = () => {
      const {sidebarState} = useContext(SidebarStateContext);
      return <>{sidebarState.toString()}</>;
    };

    it('sets sidebarState to a default value true', () => {
      const container = mount(<TestComponent />);
      expect(container.text()).toEqual('true');
    });

    it('sets the initial sidebarState to the prop.sidebarState', () => {
      const container1 = mount(
        <SidebarStateProvider sidebarState={true}>
          <TestComponent />
        </SidebarStateProvider>,
      );
      expect(container1.text()).toEqual('true');

      const container2 = mount(
        <SidebarStateProvider sidebarState={false}>
          <TestComponent />
        </SidebarStateProvider>,
      );
      expect(container2.text()).toEqual('false');
    });
  });

  describe('toggle', () => {
    const TestComponent = () => {
      const {toggle, sidebarState} = useContext(SidebarStateContext);
      return (
        <>
          <div className='result'>{sidebarState.toString()}</div>
          <button onClick={toggle}></button>
        </>
      );
    };

    it('toggles the sidebarState value from true to false', () => {
      const container = mount(
        <SidebarStateProvider sidebarState={true}>
          <TestComponent />
        </SidebarStateProvider>,
      );
      act(() => {
        container.find('button').simulate('click');
      });
      expect(container.find('.result').text()).toEqual('false');
    });

    it('toggles the sidebarState value from false to true', () => {
      const container = mount(
        <SidebarStateProvider sidebarState={false}>
          <TestComponent />
        </SidebarStateProvider>,
      );
      act(() => {
        container.find('button').simulate('click');
      });
      expect(container.find('.result').text()).toEqual('true');
    });
  });
});
