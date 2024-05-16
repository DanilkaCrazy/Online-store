import React from 'react';
import BookComponent from '../books/Book';
import { Link } from 'react-router-dom';
import { getArraySum } from '../utils';
import { useBasket } from '../hooks/BasketProvider';

const Basket: React.FC<{}> = () => {
  const {carts, loading} = useBasket();

  if(loading) {
    <div className='basket-page'>
      <h2>Загрузка...</h2>
    </div>
  }

  if(!carts.length) {
    return (
      <div className='basket-page'>
        <h2>Ваша корзина пуста</h2>
      </div>
    );
  }

  const totalPrice = getArraySum(carts.map((cart) => cart.product.price * cart.quantity));

  /*const order: Order = {
    id: nanoid(),
    city: account.location,
    address: account.location.addresses[0],
    booksId: [],
    price: 0,
    date: new Date()
  };

  const generateOrder = (booksId: number[], price: number) => {
    order.booksId = booksId;
    order.price = price;
    order.date = new Date();

    if(!account.orders.find((o) => o.id === order.id)) {
      addOrder(order);
    }
  };*/

  return (
    <div className='basket-page'>
      <div className='buttons-group'>
        <Link 
          to={`/order/`} 
          className='main-button' 
          onClick={() => {}}>
            Купить все
        </Link>
        {/*<button className='secondary-button' onClick={cleanBasket}>Убрать все</button>*/}
      </div>
      <div className='books-collection'>
        {carts.map((cart, i) => <BookComponent key={i} book={cart.product} isInBasket/>)}
      </div>
    </div>
  );
};

export default Basket;
