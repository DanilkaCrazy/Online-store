import React from 'react';
import Theme from '../../Theme';
import HorizontalScroller from '../../ui/HorizontalScroller';
import { DesktopImages } from '../../ui/ImagesCollection';
import { Link } from 'react-router-dom';
import { ScreensWidth } from '../../utils';
import { useLightMode } from '../../hooks/LightModeProvider';

const ThemeButton: React.FC<{theme: Theme}> = ({theme}) => (
  <Link to={`/${theme.title}`} className='theme-button'>
    <img src={DesktopImages.find((image) => image.theme === theme.title)?.desktop} alt={theme.name}/>
    <p>{theme.shortName}</p>
  </Link>
);

const ThemeMenu: React.FC<{themes: Theme[]}> = ({themes}) => {
  const {isDark} = useLightMode();

  return (
    <div className='theme-menu'>
      <h2>Тематики</h2>
      <HorizontalScroller
        isScrollerDark={!isDark}
        itemsCount={themes.length} 
        itemWidth={ScreensWidth.THEME_BUTTON_WIDTH.DESKTOP}
        itemHeight={ScreensWidth.THEME_BUTTON_WIDTH.DESKTOP}>
        {themes.map((theme, i) => <ThemeButton key={i} theme={theme}/>)}
      </HorizontalScroller>
    </div>
  );
};

export default ThemeMenu;
