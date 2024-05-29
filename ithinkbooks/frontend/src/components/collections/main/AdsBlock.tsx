import React from 'react';
import { Carousel } from 'react-bootstrap';
import DesktopScrollerLight from '../../../images/pages/desktop/DesktopScrollerLight.svg';
import DesktopScrollerDark from '../../../images/pages/desktop/DesktopScrollerDark.svg';
import RoadmapBG from '../../../images/pages/still-life-books-versus-technology 1.jpg';
import DiscountBG from '../../../images/pages/modern-bookstore-showcasing-rows-vibrant-books 1.jpg';
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
        <CarouselImage imagePath={DiscountBG}/>
        <Carousel.Caption>
          <h1>Скидка 30% на первую покупку</h1>
          <a 
            className='secondary-p ads-a' 
            href="https://www.freepik.com/free-photo/modern-bookstore-showcasing-rows-vibrant-books_84718526.htm#fromView=search&page=3&position=18&uuid=0f266c6a-1e28-4ec5-a227-2a2b216ac666">
              Image by maniacvector on Freepik
          </a>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <CarouselImage imagePath={RoadmapBG}/>
        <Carousel.Caption>
          <h1>Сройте роадмапы, чтобы изучать темы в правильной для Вас последовательности книг</h1>
          <Link to='/quiz/theme' className='main-button'>Построить роадмап</Link>
          <a
            className='secondary-p ads-a' 
            href="https://www.freepik.com/free-photo/still-life-books-versus-technology_36290036.htm#fromView=search&page=1&position=31&uuid=0f266c6a-1e28-4ec5-a227-2a2b216ac666">
              Image by freepik
          </a>
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
        <div className='side-ads'>
          <h3>Реклама</h3>
        </div>
        <div className='side-ads'>
          <h3>Реклама</h3>
        </div>
      </div>
    </div>
  );
};

export default AdsBlock;
