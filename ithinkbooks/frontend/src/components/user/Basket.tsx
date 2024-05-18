import React from 'react';
import BookComponent from '../books/Book';
import { useBasket } from '../hooks/BasketProvider';
import { useOrders } from '../hooks/OrderProvider';

const Basket: React.FC<{}> = () => {
  const {carts, loading} = useBasket();
  const {createNewOrder} = useOrders();

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

  return (
    <div className='basket-page'>
      <div className='buttons-group'>
        <button 
          className='main-button' 
          onClick={() => createNewOrder()}>
            Оформить заказ
        </button>
        {/*<button className='secondary-button' onClick={cleanBasket}>Убрать все</button>*/}
      </div>
      <div className='books-collection'>
        {carts.map((cart, i) => <BookComponent key={i} book={cart.product} page='basket' quantity={cart.quantity}/>)}
      </div>
    </div>
  );
};

export default Basket;
