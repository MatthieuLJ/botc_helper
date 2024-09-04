import React, { PropsWithChildren } from 'react';
import { createContext } from 'react';

export type PlayContextType = {
  hideInformation: boolean,
  playersWithOverlay: number[],
  overlayImage: null|JSX.Element,
};

const initialState: PlayContextType = {
  hideInformation: false,
  playersWithOverlay: [],
  overlayImage: null,
};

const PlayContext = createContext<PlayContextType>(initialState);

type PlayContextProviderPropsType = {
  hideInformation: boolean,
  playersWithOverlay: number[],
  overlayImage: null|JSX.Element,
};

const PlayContextProvider = (props: PropsWithChildren<PlayContextProviderPropsType>) => {
  const {hideInformation , playersWithOverlay, overlayImage } = props;

  return <PlayContext.Provider value={{
    hideInformation,
    playersWithOverlay,
    overlayImage,
  }}>
    {props.children}
  </PlayContext.Provider>;
};

export { PlayContextProvider, PlayContext };
