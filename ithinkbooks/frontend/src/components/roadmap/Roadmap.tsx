import React, { useState } from 'react';
import '../../css/Quiz.css';
import mockRoadmap from './roadmap.json';
import themes from '../mock/themes.json';
import {NodeBook, Branch} from './RoadmapNode';
import { useBooks } from '../hooks/BooksProvider';
import '../../css/Roadmap.css';
import Book, { emptyBook } from '../Book';
import BookPanel from '../books/BookPanel';
import { Roadmap } from '../Roadmap';
import { useParams } from 'react-router-dom';

const RoadmapPage: React.FC<{}> = () => {
  const {id} = useParams();

  const {books, loading} = useBooks();
  const [roadmap, setRoadmap] = useState<Roadmap>(mockRoadmap);

  const [chosenBook, setChosenBook] = useState<Book>(emptyBook);

  if(loading) {
    return (
      <div className='page'>
        <h2>Загрузка...</h2>
      </div>
    );
  }

  const booksId = roadmap.nodes.map((node) => node.bookId).reduce((prevArray, nextArray) => prevArray.concat(nextArray), []);
  const roadmapBooks = books.filter((book) => booksId.includes(book.id));
  const booksByNodes = roadmap.nodes.map((node) => roadmapBooks.filter((book) => node.bookId.includes(book.id)));

  const theme = themes.find((t) => t.title === roadmap.theme);

  if(chosenBook.id < 0) {
    setChosenBook(booksByNodes[0][0]);
  }

  if(roadmap.id !== id) {
    return <div className='page'>
      <h2>К сожалению, роадмап не найден :&#40;</h2>
    </div>
  }

  return (
    <div className='divided-page roadmap-page'>
      <BookPanel book={chosenBook} roadmapId={roadmap.id}/>
      <div className='roadmap-block'>
        <h1>Роадмап по теме {theme?.name}</h1>
        <div className='roadmap'>
          {roadmap.nodes.map((node, i) => <div key={i} className='roadmap-node'>
              <div className='roadmap-node-books'>
                {booksByNodes[i].map((book, j) => (
                  <NodeBook 
                    key={j} 
                    book={book} 
                    isRecommended={node.recommended !== undefined && book.id === node.recommended} 
                    chosenBookId={chosenBook.id} 
                    setChosenBook={setChosenBook}/>
                ))}
              </div>
              {i === roadmap.nodes.length - 1 ? <></> : <Branch upperNode={node} downNode={roadmap.nodes[i + 1]}/>}
            </div>)}
        </div>
      </div>
    </div>
  );
};

export default RoadmapPage;
