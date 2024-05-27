import React from 'react';
import { getFormatedWithWordsDate } from '../date-utils';
import { useOrders } from '../hooks/OrderProvider';

const History: React.FC<{}> = () => {
  const {orders, loading, updateOrder} = useOrders();

  if(loading) {
    return (
      <div className='histpry-page'>
        <h2>Загрузка...</h2>
      </div>
    )
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
        <div key={i} className='order-info-button'>
          <button onClick={() => updateOrder(order)} className='text-button'><h3>Заказ №{order.id}</h3></button>
          <p className='main-p'>{getFormatedWithWordsDate(order.created_timestamp)}</p>
          <p className='main-p'>Статус: {order.status}</p>
          <p className='main-p'>Адрес доставки: г. {order.city.city}, {order.pick_up_point}</p>
        </div>
      ))}
    </div>
  );
};

export default History;
