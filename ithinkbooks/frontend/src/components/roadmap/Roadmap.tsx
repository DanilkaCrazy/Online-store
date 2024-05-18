import React, { useState } from 'react';
import '../../css/Quiz.css';
import themes from '../mock/themes.json';
import {NodeBook, Branch} from './RoadmapNode';
import { useBooks } from '../hooks/BooksProvider';
import '../../css/Roadmap.css';
import Book, { emptyBook } from '../types/Book';
import BookPanel from '../books/BookPanel';
import { Roadmap, emptyRoadmap } from '../types/Roadmap';
import { useParams } from 'react-router-dom';
import { useQuiz } from '../hooks/QuizProvider';
import { randomInteger } from '../mock/mock';

const RoadmapPage: React.FC<{}> = () => {
  const {id} = useParams();
  const parsedId = !id ? 0 : parseInt(id);

  const {books, loading} = useBooks();
  const {getRoadmap, roadmaps} = useQuiz();

  const roadmap = getRoadmap(parsedId);

  const [chosenBook, setChosenBook] = useState<Book>(emptyBook);

  if(loading || !roadmaps.length) {
    return (
      <div className='page'>
        <h2>Загрузка...</h2>
      </div>
    );
  }

  if(!roadmap.node || !roadmap.node.length) {
    return (
      <div className='page'>
        <h1>{roadmap.title}</h1>
        <h3>К сожалению, мы не смогли подобрать необходимую для литературу :&#40;</h3>
      </div>
    );
  }

  const booksId = roadmap.node.map((node) => node.product).reduce((prevArray, nextArray) => prevArray.concat(nextArray), []);
  const roadmapBooks = books.filter((book) => booksId.includes(book.id));
  const booksByNodes = roadmap.node.map((node) => roadmapBooks.filter((book) => node.product.includes(book.id)));

  if(chosenBook.id < 0) {
    setChosenBook(booksByNodes[0][0]);
  }

  return (
    <div className='divided-page roadmap-page'>
      <BookPanel book={chosenBook} roadmapId={parsedId}/>
      <div className='roadmap-block'>
        <h1>{roadmap.title}</h1>
        <div className='roadmap'>
          {roadmap.node.map((node, i) => <div key={i} className='roadmap-node'>
              <div className='roadmap-node-books'>
                {booksByNodes[i].map((book, j) => (
                  <NodeBook 
                    key={j} 
                    book={book} 
                    isRecommended={!randomInteger(0, 5)} 
                    chosenBookId={chosenBook.id} 
                    setChosenBook={setChosenBook}/>
                ))}
              </div>

              {i === roadmap.node.length - 1 ? <></> : <Branch upperNode={node} downNode={roadmap.node[i + 1]}/>}
            </div>)}
        </div>
      </div>
    </div>
  );
};

export default RoadmapPage;
