import React from 'react';
import { Carousel } from 'react-bootstrap';
import CarouselBGLight from '../../../images/pages/CarouselImage.svg';
import CarouselBGDarl from '../../../images/pages/CarouselBGDark.svg';
import DesktopScrollerLight from '../../../images/pages/desktop/DesktopScrollerLight.svg';
import DesktopScrollerDark from '../../../images/pages/desktop/DesktopScrollerDark.svg';
import { Link } from 'react-router-dom';
import { useLightMode } from '../../hooks/LightModeProvider';

const CAROUSEL_INTERVAL = 5000;

const CarouselScroll: React.FC<{isLeft: boolean, isDark: boolean}> = ({isLeft, isDark}) => (
    <img 
      className={isLeft ? 'scroller-left' : 'scroller-right'} 
      src={isDark ? DesktopScrollerDark : DesktopScrollerLight} 
      alt={isLeft ? 'влево' : 'вправо'}/>
  );

const CarouselImage: React.FC<{imagePath: string}> = ({imagePath}) => (
  <img className='carousel-bg' src={imagePath} alt='carousel-bg'/>
);

const AdsCarousel: React.FC<{isDark: boolean}> = ({isDark}) => (
  <>
    <Carousel wrap slide indicators interval={CAROUSEL_INTERVAL} prevIcon={<CarouselScroll isDark={isDark} isLeft={true}/>} nextIcon={<CarouselScroll isDark={isDark} isLeft={false}/>}>
      <Carousel.Item>
        <CarouselImage imagePath={isDark ? CarouselBGDarl : CarouselBGLight}/>
        <Carousel.Caption>
          <h1>Скидка 30% на первую покупку</h1>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <CarouselImage imagePath={isDark ? CarouselBGDarl : CarouselBGLight}/>
        <Carousel.Caption>
          <h1>Сройте роадмапы, чтобы изучать темы в правильной для Вас последовательности книг</h1>
          <Link to='/quiz/theme' className='main-button'>Построить роадмап</Link>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  </>
);

const AdsBlock: React.FC<{}> = () => {
  const {isDark} = useLightMode();

  return (
    <div className='ads-block'>
      <AdsCarousel isDark={isDark}/>
      <div className='side-ads-block'>
        <div className='side-ads'></div>
        <div className='side-ads'></div>
      </div>
    </div>
  );
};

export default AdsBlock;
