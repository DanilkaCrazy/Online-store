import React, { ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';
import Cart, { emptyCart } from '../types/Cart';
import { useLocation } from 'react-router-dom';
import { useAccount } from './AccountProvider';
import Book from '../types/Book';
import axiosInstance, { getCookie } from '../Axios';

const emptyCartsList: Cart[] = [];

const defaultBasketContext = {
  carts: emptyCartsList,
  loading: false,
  putInBasket: (book: Book) => {},
  changeQuantity: (bookId: number, difference: number) => {},
  removeFromBasket: (bookId: number) => {},
  getQuantity: (bookId: number) => 0
};

const BasketContext = createContext(defaultBasketContext);

const useBasket = () => useContext(BasketContext);

const BasketProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const {account} = useAccount();

  const [carts, setCarts] = useState<Cart[]>([]);
  const [cart, setCart] = useState<Cart>(emptyCart);
  const [loading, setLoading] = useState<boolean>(false);

  const token = getCookie('csrftoken');

  const putInBasket = (book: Book) => {
    const foundCart = carts.find((cart) => cart.product.id === book.id);

    if(!foundCart) {
      const newCart: Cart = {
        user: account.id,
        product: book,
        quantity: 1,
        created_timestamp: new Date()
      };

      setCart(newCart);
    } else {
      setCart({...foundCart, quantity: foundCart.quantity + 1});
    }
  };

  const changeQuantity = (bookId: number, difference: number) => {
    const foundCart = carts.find((cart) => cart.product.id === bookId);

    if(foundCart) {
      setCart({...foundCart, quantity: foundCart.quantity + difference});
    }
  };

  const removeFromBasket = (bookId: number) => {
    const foundCart = carts.find((cart) => cart.product.id === bookId);

    if(foundCart) {
      setCart({...foundCart, quantity: 0});
    }
  };

  const getQuantity = (bookId: number) => {
    const foundCart = carts.find((cart) => cart.product.id === bookId);

    return foundCart ? foundCart.quantity : 0;
  };

  const getCarts = useCallback(() => {
    axiosInstance
      .get('http://127.0.0.1:8000/cart/items', {
        headers: {
          'X-CSRFToken': token
        }
      })
      .then((resp) => resp.data)
      .then(setCarts)
      .then(() => setLoading(false));
  }, []);

  const postCart = useCallback(() => {
    axiosInstance
      .post('http://127.0.0.1:8000/cart/items', {...cart, product: cart.product.id}, {
        headers: {
          'X-CSRFToken': token
        }
      })
      .then(() => setCarts(carts.concat(cart)))
      .then(() => setLoading(false));
  }, [cart]);

  const changeCart = useCallback(() => {
    axiosInstance
      .post('http://127.0.0.1:8000/cart/change', {...cart, porduct: cart.product.id}, {
        headers: {
          'X-CSRFToken': token
        }
      })
      .then(() => setCarts(carts.map((c) => c.product.id === cart.product.id ? cart : c)))
      .then(() => setLoading(false));
  }, [cart]);

  const removeCart = useCallback(() => {
    axiosInstance
      .post('http://127.0.0.1:8000/cart/remove', {...cart, product: cart.product.id}, {
        headers: {
          'X-CSRFToken': token
        }
      })
      .then(() => setCarts(carts.filter((c) => c.product.id === cart.product.id)))
      .then(() => setLoading(false));
  }, [cart]);

  useEffect(() => {
    if(account.id >= 0) {
      setLoading(true);

      if(carts.includes(cart)) {
        cart.quantity > 0 ? changeCart() : removeCart();
      } else {
        postCart();
      }
    }
  }, [cart, changeCart, postCart, removeCart]);

  useEffect(() => {
    if(account.id >= 0 && !carts.length) {
      setLoading(true);
      getCarts();
    }
  }, [cart, getCarts]);

  return (
    <BasketContext.Provider value={{
      carts,
      loading,
      putInBasket,
      changeQuantity,
      removeFromBasket,
      getQuantity
    }}>
      {children}
    </BasketContext.Provider>
  );
};

export {useBasket, BasketProvider};
