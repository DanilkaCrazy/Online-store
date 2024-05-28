/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';
import Cart, { emptyCart } from '../types/Cart';
import { useAccount } from './AccountProvider';
import Book from '../types/Book';
import axiosInstance, { getCookie } from '../Axios';
import { fixBookData, getRandomId } from '../utils';
import { useLocation } from 'react-router-dom';
import dayjs from 'dayjs';

const emptyCartsList: Cart[] = [];

const defaultBasketContext = {
  carts: emptyCartsList,
  loading: false,
  putInBasket: (book: Book) => {},
  changeQuantity: (bookId: number, difference: number) => {},
  removeFromBasket: (bookId: number) => {},
  getQuantity: (bookId: number) => 0,
  cleanBasket: () => {}
};

const BasketContext = createContext(defaultBasketContext);

const useBasket = () => useContext(BasketContext);

const BasketProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const {account} = useAccount();

  const [carts, setCarts] = useState<Cart[]>([]);
  const [cart, setCart] = useState<Cart>(emptyCart);

  const [clean, setClean] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const token = getCookie('csrftoken');

  const location = useLocation();

  const putInBasket = (book: Book) => {
    const foundCart = carts.find((cart) => cart.product.id === book.id);

    if(!foundCart) {
      const newCart: Cart = {
        id: getRandomId(),
        user: account.id,
        product: book,
        quantity: 1,
        created_timestamp: dayjs()
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

  const cleanBasket = () => {
    setClean(true);
  };

  // data fecth

  const getCartResponce = () => (
    {
      ...cart, 
      user_id: account.id,
      product_id: cart.product.id,
      cart_id: cart.id,
      created_timestamp: cart.created_timestamp.format('YYYY-MM-DD')
    }
  );

  const getCarts = useCallback(() => {
    axiosInstance
      .get('http://127.0.0.1:8000/cart/items', {
        headers: {
          'X-CSRFToken': token
        }
      })
      .then((resp) => resp.data)
      .then((data) => setCarts(data.map((c: Cart) => ({
        ...c, 
        product: fixBookData(c.product),
        created_timestamp: dayjs(c.created_timestamp)
      }))))
      .then(() => setLoading(false));
  }, [token]);

  const postCart = useCallback(() => {
    axiosInstance
      .post('http://127.0.0.1:8000/cart/items', getCartResponce(), {
        headers: {
          'X-CSRFToken': token
        }
      })
      .then(() => setCarts(carts.concat(cart)))
      .then(() => setLoading(false));
  }, [cart, token]);

  const changeCart = useCallback(() => {
    axiosInstance
      .post('http://127.0.0.1:8000/cart/change', getCartResponce(), {
        headers: {
          'X-CSRFToken': token
        }
      })
      .then(() => setCarts(carts.map((c) => c.product.id === cart.product.id ? cart : c)))
      .then(() => getCarts());
  }, [cart, token]);

  const removeCart = useCallback(() => {
    axiosInstance
      .post('http://127.0.0.1:8000/cart/remove', getCartResponce(), {
        headers: {
          'X-CSRFToken': token
        }
      })
      .then(() => setCarts(carts.filter((c) => c.id !== cart.id)))
      .then(() => setLoading(false));
  }, [cart, token]);

  const deleteBasket = useCallback(() => {
    axiosInstance
      .delete('http://127.0.0.1:8000/cart/items', {
        headers: {
          'X-CSRFToken': token
        }
      })
      .then(() => setCarts([]))
      .then(() => setClean(false))
      .then(() => setLoading(false));
  }, [token]);

  useEffect(() => {
    if(account.id >= 0) {
      setLoading(true);

      if(carts.find((c) => c.id === cart.id)) {
        cart.quantity > 0 ? changeCart() : removeCart();
      } else if(cart.id >= 0) {
        postCart();
      }
    }
  }, [cart, changeCart, postCart, removeCart]);

  useEffect(() => {
    if(account.id >= 0 && location.pathname.includes('basket')) {
      setLoading(true);
      getCarts();
    }
  }, [location.pathname, carts.length, getCarts]);

  useEffect(() => {
    if(clean) {
      setLoading(false);
      deleteBasket();
    }
  }, [clean, deleteBasket]);

  return (
    <BasketContext.Provider value={{
      carts,
      loading,
      putInBasket,
      changeQuantity,
      removeFromBasket,
      getQuantity,
      cleanBasket
    }}>
      {children}
    </BasketContext.Provider>
  );
};

export {useBasket, BasketProvider};
