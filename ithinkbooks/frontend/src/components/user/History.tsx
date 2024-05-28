import React from 'react';
import { useOrders } from '../hooks/OrderProvider';
import { getFormatedWithWordsDate } from '../date-utils';
import { Link } from 'react-router-dom';

const History: React.FC<{}> = () => {
  const {orders, loading} = useOrders();

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
          <Link to={`/account/history/${order.id}`} className='text-button'><h3>Заказ №{order.id}</h3></Link>
          <p className='main-p'>{getFormatedWithWordsDate(order.created_timestamp)}</p>
          <p className='main-p'>Статус: {order.status}</p>
          <p className='main-p'>Адрес доставки: г. {order.city.city}, {order.pick_up_point}</p>
        </div>
      ))}
    </div>
  );
};

export default History;
