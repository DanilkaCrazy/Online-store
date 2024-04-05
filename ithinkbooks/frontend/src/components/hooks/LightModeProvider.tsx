import React, { ReactNode, createContext, useContext, useState } from 'react';

const defaultLightModeValue = {
  isDark: false,
  toggleLightMode: () => {}
};

const LightModeContext = createContext(defaultLightModeValue);

const useLightMode = () => useContext(LightModeContext);

const LightModeProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [isDark, setIsDark] = useState<boolean>(false);

  const toggleLightMode = () => setIsDark((value) => !value);

  return (
    <LightModeContext.Provider value={{isDark, toggleLightMode}}>
      {children}
    </LightModeContext.Provider>
  );
};

export {useLightMode, LightModeProvider};
