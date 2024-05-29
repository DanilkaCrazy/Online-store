import React, { ReactNode, useLayoutEffect, useRef, useState } from 'react';
import DesktopScrollerLight from '../../images/pages/desktop/DesktopScrollerLight.svg';
import DesktopScrollerDark from '../../images/pages/desktop/DesktopScrollerDark.svg';
import DesktopLightScrollerOnPanel from '../../images/pages/desktop/LightScrollerOnPanel.svg';
import { ScreensWidth } from '../utils';
import '../../css/UI.css';

const HorizontalScroller: React.FC<
{
  children: ReactNode, 
  isScrollerDark: boolean,
  itemsCount: number, 
  itemWidth: number,
  itemHeight: number,
  isOnPanel?: boolean
}> = ({children, isScrollerDark: isDark, itemsCount, itemWidth, itemHeight, isOnPanel = false}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [screenWidth, setScreenWidth] = useState<number>(document.documentElement.clientWidth);

  const deviceWidth = ScreensWidth.RELATIVE_WIDTH.DESKTOP * screenWidth;
  const gap = (deviceWidth - ScreensWidth.COLLUMNS_COUNT.DESKTOP * itemWidth) / (ScreensWidth.COLLUMNS_COUNT.DESKTOP - 1);
  const width = itemsCount * itemWidth + (itemsCount - 1) * gap;
  const step = itemWidth + gap;

  const isButtonVisible = itemsCount > ScreensWidth.COLLUMNS_COUNT.DESKTOP;

  const onScrollButton = (step: number) => {
    const newScrollPosition = scrollPosition + step;
    let endScrollPosition = 0;

    if(scrollerRef.current) {
      if(newScrollPosition - step / 2 + deviceWidth > scrollerRef.current.scrollWidth) {
        endScrollPosition = 0;
      } else if(newScrollPosition < 0) {
        endScrollPosition = scrollerRef.current.scrollWidth - deviceWidth;
      } else {
        endScrollPosition = newScrollPosition;
      }

      setScrollPosition(endScrollPosition);
      scrollerRef.current.scrollLeft = endScrollPosition;
    }
  };

  useLayoutEffect(() => {
    const recalculate = () => setScreenWidth(document.documentElement.scrollWidth);
    window.addEventListener('resize', recalculate);
    recalculate();
    return () => window.removeEventListener('resize', recalculate);
  }, [])
  
  return (
    <div className='h-scroller'>
      <button 
        className='scroller-button h-scroller-left' 
        hidden={!isButtonVisible} 
        onClick={() => onScrollButton(-step)} style={{height: itemHeight}}>
          <img 
            className='scroller-left' 
            src={isDark ? DesktopScrollerDark : (isOnPanel ? DesktopLightScrollerOnPanel : DesktopScrollerLight)} 
            alt='влево'/>
        </button>
        <button 
          className='scroller-button h-scroller-right' 
          hidden={!isButtonVisible}
          onClick={() => onScrollButton(step)} style={{height: itemHeight}}>
          <img 
            className='scroller-right' 
            src={isDark ? DesktopScrollerDark : (isOnPanel ? DesktopLightScrollerOnPanel : DesktopScrollerLight)} 
            alt='вправо'/>
        </button>
      <div className='h-scroller-container' ref={scrollerRef}>
        <div className='h-scroller-inner-container' style={{width}}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default HorizontalScroller;
