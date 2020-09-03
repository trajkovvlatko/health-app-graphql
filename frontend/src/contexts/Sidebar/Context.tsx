import React, {useState, ReactNode, createContext} from 'react';

interface IProps {
  children: ReactNode;
}

interface ISidebarStateContext {
  sidebarState: boolean;
  setSidebarState: (sidebarState: boolean) => void;
}

const SidebarStateContext = createContext<ISidebarStateContext>({
  sidebarState: true,
  setSidebarState: () => {},
});

const SidebarStateProvider = (props: IProps) => {
  const [sidebarState, setSidebarState] = useState<boolean>(true);

  return (
    <SidebarStateContext.Provider
      value={{
        sidebarState,
        setSidebarState,
      }}
    >
      {props.children}
    </SidebarStateContext.Provider>
  );
};

export {SidebarStateContext, SidebarStateProvider};
