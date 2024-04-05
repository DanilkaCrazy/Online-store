import React from 'react';
import { Rating, ThinRoundedStar } from '@smastrom/react-rating';
import { ScreensWidth } from '../utils';

const STAR_STYLE = {
  itemShapes: ThinRoundedStar,
  activeFillColor: '#3F97E7',
  inactiveFillColor: '#262626'
};

const Star: React.FC<{rating: number}> = ({rating}) => (
  <Rating readOnly value={rating} style={{maxWidth: ScreensWidth.BOOK_COVER_WIDTH.DESKTOP}} itemStyles={STAR_STYLE}/>
);

export default Star;
