import React, { useMemo } from 'react';
import OrderedBook from '../books/OrderedBook';
import { Link, useParams } from 'react-router-dom';
import { DropdownField } from '../ui/FormFields';
import { useOrders } from '../hooks/OrderProvider';
import { getArraySum } from '../utils';
import { OrderItem } from '../types/Order';

const OrderedBooks: React.FC<{items: OrderItem[]}> = ({items}) => (
  <div className='form-field'>
    <h3>Заказываемые книги</h3>
    <div className='ordered-books'>
      {items.map((item, i) => (
        <OrderedBook key={i} item={item}/>
      ))}
    </div>
  </div>
);

const OrderForm: React.FC<{}> = () => {
  const {id} = useParams();
  const {currentOrder, updateOrder, cancelOrder, loading, items} = useOrders();

  const price = useMemo(() => getArraySum(items.map((item) => item.price)), [items]);

  if(loading) {
    return (
      <div className='page'>
        <h2>Загрузка...</h2>
      </div>
    );
  }

  console.log(items);

  /*if(!id || parseInt(id) !== currentOrder.id) {
    return (
      <div className='page'>
        <h2>Произошла ошибка: заказ не найден :&#40;</h2>
      </div>
    );
  }*/

  const onAddressSelect = (eventKey: string | null) => {
    if(!eventKey) {
      return;
    }

    updateOrder({pick_up_point: eventKey});
  }

  return (
    <div className='page'>
      <form className='separated-form'>
        <h2>Оформление заказа</h2>

        <div className='form-field'>
          <h3>Город: {currentOrder.city.city}</h3>
          <div className='map-stub'></div>
        </div>
      
        <DropdownField 
          fieldHeader='Пункт выдачи заказа' 
          options={currentOrder.city.addresses} 
          placeholder={currentOrder.pick_up_point} 
          onOptionSelect={onAddressSelect}/>
        <OrderedBooks items={items}/>

        <h3>Итого: {price} ₽</h3>
        <p className='secondary-p secondary-color'>Уведомления о статусах доставки в пункт выдачи заказа и электронные книги в 
          выбранном формате будут приходить к Вам на электронную почту и номер телефона.</p>

        <div className='buttons-group'>
          <Link to='/account/basket' className='main-button' /*I need put method for order change*/>Оплатить</Link>
          <Link to='/account/basket' className='secondary-button' /*I need delete method for order cancel*/ onClick={() => cancelOrder()}>Отменить</Link>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
