import React from 'react';

const Price: React.FC<{price: number}> = ({price}) => (
  <p className='price-p'>{price} ₽</p>
);

export default Price;
