import React from 'react';
import BookComponent from '../books/Book';
import Order from '../Order';
import { nanoid } from 'nanoid';
import { Link } from 'react-router-dom';
import { getArraySum } from '../utils';
import { useAccount } from '../hooks/AccountProvider';
import { useBooks } from '../hooks/BooksProvider';

const Basket: React.FC<{}> = () => {
  const {account, cleanBasket, addOrder} = useAccount();
  const {books} = useBooks();
  const foundBooks = books.filter((book) => account.booksInBasket.some((id) => id === book.id));

  if(!foundBooks.length) {
    return (
      <div className='basket-page'>
        <h2>Ваша корзина пуста</h2>
      </div>
    );
  }

  const totalPrice = getArraySum(foundBooks.map((book) => book.price));

  const order: Order = {
    id: nanoid(),
    city: account.city,
    address: account.city.addresses[0],
    booksId: [],
    price: 0,
    date: new Date()
  };

  const generateOrder = (booksId: string[], price: number) => {
    order.booksId = booksId;
    order.price = price;
    order.date = new Date();

    if(!account.orders.find((o) => o.id === order.id)) {
      addOrder(order);
    }
  };

  return (
    <div className='basket-page'>
      <div className='buttons-group'>
        <Link 
          to={`/order/${order.id}`} 
          className='main-button' 
          onClick={() => generateOrder(account.booksInBasket, totalPrice)}>
            Купить все
        </Link>
        <button className='secondary-button' onClick={cleanBasket}>Убрать все</button>
      </div>
      <div className='books-collection'>
        {foundBooks.map((book, i) => <BookComponent key={i} book={book} isInBasket/>)}
      </div>
    </div>
  );
};

export default Basket;
