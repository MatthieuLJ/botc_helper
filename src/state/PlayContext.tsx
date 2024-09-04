import React, { PropsWithChildren } from 'react';
import { createContext } from 'react';

export type PlayContextType = {
  hideInformation: boolean,
};

const initialState: PlayContextType = {
  hideInformation: false
};

const PlayContext = createContext<PlayContextType>(initialState);

type PlayContextProviderPropsType = {
  hideInformation: boolean,
};

const PlayContextProvider = (props: PropsWithChildren<PlayContextProviderPropsType>) => {
  const hideInformation = props.hideInformation;

  return <PlayContext.Provider value={{
    hideInformation
  }}>
    {props.children}
  </PlayContext.Provider>;
};

export { PlayContextProvider, PlayContext };
