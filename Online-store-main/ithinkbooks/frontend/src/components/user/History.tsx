import React from 'react';
import BookComponent from '../books/Book';
import Book from '../Book';
import { useAccount } from '../hooks/AccountProvider';
import { getFormatedWithWordsDate } from '../date-utils';
import { useBooks } from '../hooks/BooksProvider';

const OrderBlock: React.FC<{date: Date, orderedBooks: Book[]}> = ({date, orderedBooks}) => (
  <div className='order-block'>
    <h3>{getFormatedWithWordsDate(date)}</h3>
    <div className='books-collection'>
      {orderedBooks.map((book, i) => <BookComponent key={i} book={book}/>)}
    </div>
  </div>
);

const History: React.FC<{}> = () => {
  const {account} = useAccount();
  const {books, loading} = useBooks();

  if(loading) {
    <div className='histpry-page'>
      <h2>Загрузка...</h2>
    </div>
  }

  if(!account.orders.length) {
    return (
      <div className='histpry-page'>
        <h2>Вы ещё не покупали у нас книги</h2>
      </div>
    );
  }

  return (
    <div className='histpry-page'>
      {account.orders.map((order, i) => (
        <OrderBlock
          key={i} 
          date={order.date} 
          orderedBooks={books.filter((book) => order.booksId.some((id) => book.id === id))}/>)
      )}
    </div>
  );
};

export default History;
