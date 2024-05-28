import React from 'react';
import { OrderItem } from '../types/Order';
import { declineNounAfterNumber } from '../utils';

const OrderedBook: React.FC<{item: OrderItem}> = ({item}) => (
  <div className='ordered-book'>
    <div className='cover-stumb'></div>
    <div className='ordered-book-info'>
      <p className='main-p'>{item.name}</p>
      <p className='secondary-p'>{item.quantity} {declineNounAfterNumber(item.quantity, 'копия', 'копии', 'копий')}</p>
      <p className='secondary-p'>{item.price} ₽</p>
    </div>
  </div>
);

export default OrderedBook;
