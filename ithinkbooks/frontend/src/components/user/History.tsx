import React from 'react';
import { getFormatedWithWordsDate } from '../date-utils';
import { useBooks } from '../hooks/BooksProvider';
import { useOrders } from '../hooks/OrderProvider';

const History: React.FC<{}> = () => {
  const {orders, loading} = useOrders();

  if(loading) {
    <div className='histpry-page'>
      <h2>Загрузка...</h2>
    </div>
  }

  if(!orders.length) {
    return (
      <div className='histpry-page'>
        <h2>Вы ещё не покупали у нас книги</h2>
      </div>
    );
  }

  return (
    <div className='histpry-page'>
      {orders.map((order, i) => (
        <button key={i} /*It will lead to page about order*/ className='order-info-button'>
          <h3>{getFormatedWithWordsDate(order.created_timestamp)}</h3>
          <p className='main-p'>Статус: {order.status}</p>
          <p className='main-p'>Адрес доставки: г. {order.city.city}, {order.pick_up_point}</p>
        </button>
      ))}
    </div>
  );
};

export default History;
