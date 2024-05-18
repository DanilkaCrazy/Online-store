import React, { ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Cart, CartResponce, emptyCart } from '../types/Cart';
import { useAccount } from './AccountProvider';
import Book, { emptyBook } from '../types/Book';
import axiosInstance, { getCookie } from '../Axios';
import { randomInteger } from '../mock/mock';
import { getRandomId } from '../utils';
import { useBooks } from './BooksProvider';

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
  const {account, getResponceFromUser} = useAccount();
  const {books, fixBookData} = useBooks();

  const [carts, setCarts] = useState<Cart[]>([]);
  const [cart, setCart] = useState<Cart>(emptyCart);
  const [loading, setLoading] = useState<boolean>(false);

  const token = getCookie('csrftoken');

  const putInBasket = (book: Book) => {
    const foundCart = carts.find((cart) => cart.product.id === book.id);

    if(!foundCart) {
      const newCart: Cart = {
        id: getRandomId(),
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

  // data fecth

  const getCartResponce = () => (
    {
      ...cart, 
      user: getResponceFromUser(account),
      product_id: cart.product.id,
      cart_id: cart.id
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
      .then((data) => setCarts(data.map((c: CartResponce) => {
        const found = books.find((book) => book.id === c.product);

        return {
          ...c,
          user: c.user.id,
          product: fixBookData(!found ? emptyBook : found)
        }
      })))
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
      .then(() => setLoading(false));
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

  useEffect(() => {
    if(account.id >= 0) {
      setLoading(true);

      if(carts.filter((c) => c.id === cart.id).length) {
        cart.quantity > 0 ? changeCart() : removeCart();
      } else {
        postCart();
      }
    }
  }, [cart, changeCart, postCart, removeCart]);

  useEffect(() => {
    if(account.id >= 0) {
      setLoading(true);
      console.log('a');
      if(books.length) {
        console.log('b');
        getCarts();
      }
    }
  }, [cart, carts.length, books.length, getCarts]);

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
