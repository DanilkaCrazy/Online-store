import React from 'react';
import { Carousel } from 'react-bootstrap';
import CarouselBGImage from '../../../images/pages/CarouselImage.svg';
import DesktopScrollerLight from '../../../images/pages/desktop/DesktopScrollerLight.svg';
import DesktopScrollerDark from '../../../images/pages/desktop/DesktopScrollerDark.svg';
import { Link } from 'react-router-dom';
import { useLightMode } from '../../hooks/LightModeProvider';

const CAROUSEL_INTERVAL = 5000;

const CarouselScroll: React.FC<{isLeft: boolean}> = ({isLeft}) => {
  const {isDark} = useLightMode();

  return (
    <img 
      className={isLeft ? 'scroller-left' : 'scroller-right'} 
      src={isDark ? DesktopScrollerDark : DesktopScrollerLight} 
      alt={isLeft ? 'влево' : 'вправо'}/>
  );
};

const CarouselImage: React.FC<{imagePath: string}> = ({imagePath}) => (
  <img className='carousel-bg' src={imagePath} alt='carousel-bg'/>
);

const AdsCarousel: React.FC<{}> = () => (
  <>
    <Carousel wrap slide indicators interval={CAROUSEL_INTERVAL} prevIcon={<CarouselScroll isLeft={true}/>} nextIcon={<CarouselScroll isLeft={false}/>}>
      <Carousel.Item>
        <CarouselImage imagePath={CarouselBGImage}/>
        <Carousel.Caption>
          <h1>Скидка 30% на первую покупку</h1>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <CarouselImage imagePath={CarouselBGImage}/>
        <Carousel.Caption>
          <h1>Сройте роадмапы, чтобы изучать темы в правильной для Вас последовательности книг</h1>
          <Link to='/roadmap' className='main-button'>Построить роадмап</Link>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  </>
);

const AdsBlock: React.FC<{}> = () => (
  <div className='ads-block'>
    <AdsCarousel/>
    <div className='side-ads-block'>
      <div className='side-ads'></div>
      <div className='side-ads'></div>
    </div>
  </div>
);

export default AdsBlock;
