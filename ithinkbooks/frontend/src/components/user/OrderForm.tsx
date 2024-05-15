import React, { useState } from 'react';
import Book from '../Book';
import OrderedBook from '../books/OrderedBook';
import { Link, useParams } from 'react-router-dom';
import { useAccount } from '../hooks/AccountProvider';
import { DropdownField } from '../ui/FormFields';
import { useBooks } from '../hooks/BooksProvider';
import Order from '../Order';

const OrderedBooks: React.FC<{books: Book[]}> = ({books}) => (
  <div className='form-field'>
    <h3>Заказываемые книги</h3>
    <div className='ordered-books'>
      {books.map((book, i) => (
        <OrderedBook key={i} book={book}/>
      ))}
    </div>
  </div>
);

const OrderForm: React.FC<{}> = () => {
  const {id} = useParams();
  const {account, cleanBasket, removeOrder, updateOrder} = useAccount();

  const [order, setOrder] = useState<Order | undefined>(undefined);
  const {books, loading} = useBooks();

  if(loading) {
    <div className='page'>
      <h2>Загрузка...</h2>
    </div>
  }

  if(!order) {
    return <h2>Ваш заказ пуст. Возможно, произошла ошибка &#40;</h2>
  }

  const foundBooks = books.filter((book) => order.booksId.some((id) => id === book.id));

  const onAddressSelect = (eventKey: string | null) => {
    if(!eventKey) {
      return;
    }

    setOrder({...order, address: eventKey});
  }

  const onFormSubmit = () => {
    if(order.booksId.length) {
      updateOrder(order);
      cleanBasket();
    }
  };

  const onFormCancel = () => {
    removeOrder(order);
  }

  return (
    <div className='page'>
      <form className='separated-form'>
        <h2>Оформление заказа</h2>

        <div className='form-field'>
          <h3>Город: {order.city.city}</h3>
          <div className='map-stub'></div>
        </div>
      
        <DropdownField 
          fieldHeader='Пункт выдачи заказа' 
          options={order.city.addresses} 
          placeholder={order.address} 
          onOptionSelect={onAddressSelect}/>
        <OrderedBooks books={foundBooks}/>

        <h3>Итого: {order.price} ₽</h3>
        <p className='secondary-p secondary-color'>Уведомления о статусах доставки в пункт выдачи заказа и электронные книги в 
          выбранном формате будут приходить к Вам на электронную почту и номер телефона.</p>

        <div className='buttons-group'>
          <Link to='/account/basket' className='main-button' onClick={onFormSubmit}>Оплатить</Link>
          <Link to='/account/basket' className='secondary-button' onClick={onFormCancel}>Отменить</Link>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
