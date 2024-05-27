import React, { useMemo } from 'react';
import { getFormatedWithWordsDate } from '../date-utils';
import { useOrders } from '../hooks/OrderProvider';
import { ScreensWidth, getArraySum } from '../utils';
import { OrderItem } from '../types/Order';
import { Link } from 'react-router-dom';
import Price from '../books/Price';

const OrderItemComponent: React.FC<{item: OrderItem}> = ({item}) => (
  <div className='book'>
      <Link to={`/book/${item.product}`}>
        <div 
          className='cover-stumb' 
          style={
            {width: ScreensWidth.BOOK_COVER_WIDTH.DESKTOP, 
            height: ScreensWidth.BOOK_COVER_HEIGHT.DESKTOP}}> 
        </div>
      </Link>

      <div className='book-title'>
        <Link className='main-p' to={`/book/${item.product}`}>{item.name}</Link>
        <p className='secondary-p secondary-color'>{item.author}</p>
      </div>

      <Price price={Math.round(item.price / item.quantity * 100) / 100}/>

      <p className='main-p'><b>Число копий: </b>{item.quantity}</p>
  </div>
);

const OrderInfo: React.FC<{}> = () => {
  const {currentOrder, loading, items} = useOrders();

  const price = useMemo(() => getArraySum(items.map((item) => item.price)), [items]);

  if(loading) {
    return (
      <div className='histpry-page'>
        <h2>Загрузка...</h2>
      </div>
    )
  }

  if(!currentOrder || !items.length) {
    return (
      <div className='histpry-page'>
        <h2>Мы не нашли этот заказ. Возможно, произошла ошибка</h2>
      </div>
    );
  }

  return (
    <div className='order-info-page'>
      <h3>Заказ №{currentOrder.id}</h3>

      <div className='order-main-info'>
        <p className='main-p'>Дата заказа: {getFormatedWithWordsDate(currentOrder.created_timestamp)}</p>
        <p className='main-p'>Статус: {currentOrder.status}</p>
        <p className='main-p'>Адрес доставки: г. {currentOrder.city.city}, {currentOrder.pick_up_point}</p>
        <p className='main-p'>Стоимость: {price}</p>
      </div>
      
      <div className='books-collection'>
        {items.map((item, i) => <OrderItemComponent key={i} item={item}/>)}
      </div>
    </div>
  );
};

export default OrderInfo;
