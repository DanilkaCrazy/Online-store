import React, { ReactNode, createContext, useContext, useState } from 'react';

const defaultLightModeValue = {
  isDark: false,
  toggleLightMode: () => {}
};

const ThemeColors = {
  LIGHT: {
    '--bg-color': '#E5E5E5',
    '--text-color': '#262626',
    '--panels-color': '#262626',
    '--secondary-p-color': '#4B4B4B',
    '--highlight-color': '#3F97E7',
    '--highlighted-p-color': '#1678D2',
    '--p-color-on-highlight': '#FFFFFF',
    '--danger-color': '#d21674',
    '--secondary-panel-color': '#B3B3B3',
    '--p-color-on-panel': '#E5E5E5',
    '--tertiary-panel-color': '#FFFFFF',
    '--image-bg-color': '#4B4B4B',
    '--disabled-highlight-color': '#568BBC',
    '--hovered-highlight-color': '#7DC1FF',
    '--active-highlight-color': '#1678D2',
    '--dropdown-menu-p-color': '#E5E5E5'
  },
  DARK: {
    '--bg-color': '#262626',
    '--text-color': '#E5E5E5',
    '--panels-color': '#4B4B4B',
    '--secondary-p-color': '#B3B3B3',
    '--highlight-color': '#3F97E7',
    '--highlighted-p-color': '#7DC1FF',
    '--p-color-on-highlight': '#FFFFFF',
    '--danger-color': '#d21674',
    '--secondary-panel-color': '#4B4B4B',
    '--p-color-on-panel': '#E5E5E5',
    '--tertiary-panel-color': '#000000',
    '--image-bg-color': '#B3B3B3',
    '--disabled-highlight-color': '#568BBC',
    '--hovered-highlight-color': '#7DC1FF',
    '--active-highlight-color': '#1678D2',
    '--dropdown-menu-p-color': '#262626'
  }
}

const LightModeContext = createContext(defaultLightModeValue);

const useLightMode = () => useContext(LightModeContext);

const LightModeProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [isDark, setIsDark] = useState<boolean>(false);

  const toggleLightMode = () => {
    const colors = isDark ? ThemeColors.LIGHT : ThemeColors.DARK;
    Object.entries(colors).forEach((color) => {
      document.documentElement.style.setProperty(color[0], color[1]);
    });
    setIsDark((value) => !value);
  }

  return (
    <LightModeContext.Provider value={{isDark, toggleLightMode}}>
      {children}
    </LightModeContext.Provider>
  );
};

export {useLightMode, LightModeProvider};
