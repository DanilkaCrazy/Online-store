import React, { useMemo, useState } from 'react';
import '../../css/Quiz.css';
import {NodeBook, Branch} from './RoadmapNode';
import '../../css/Roadmap.css';
import BookPanel from '../books/BookPanel';
import { useParams } from 'react-router-dom';
import { useQuiz } from '../hooks/QuizProvider';
import { randomInteger } from '../mock/mock';
import { Roadmap } from '../types/Roadmap';
import { fixBookData } from '../utils';
import Book, { emptyBook } from '../types/Book';

const RoadmapPage: React.FC<{}> = () => {
  const {id} = useParams();
  const parsedId = !id ? 0 : parseInt(id);

  const {roadmaps, loading} = useQuiz();

  const fixRoadmapBooks = (roadmap: Roadmap | undefined): Roadmap | undefined => !roadmap ? undefined : (
    {
      ...roadmap,
      node: roadmap.node.map((rmNode) => ({
        ...rmNode,
        product: rmNode.product.map((rmBook) => fixBookData(rmBook))
      }))
    }
  );

  const roadmap = useMemo(() => fixRoadmapBooks(roadmaps.find((r) => r.id === parsedId)), [roadmaps, parsedId]);

  const [chosenBook, setChosenBook] = useState<Book>(emptyBook);

  if(loading || !roadmap) {
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

  if(chosenBook.id < 0) {
    setChosenBook(roadmap.node[0].product[0]);
  }

  return (
    <div className='divided-page roadmap-page'>
      <BookPanel book={chosenBook}/>
      <div className='roadmap-block'>
        <h1>{roadmap.title}</h1>
        <div className='roadmap'>
          {roadmap.node.map((node, i) => <div key={i} className='roadmap-node'>
              <div className='roadmap-node-books'>
                {node.product.map((book, j) => (
                  <NodeBook 
                    key={j} 
                    book={book} 
                    isRecommended={!randomInteger(0, 5)} 
                    chosenBookId={chosenBook.id} 
                    setChosenBook={setChosenBook}/>
                ))}
              </div>

              {i === roadmap.node.length - 1 || <Branch upperNode={node} downNode={roadmap.node[i + 1]}/>}
            </div>)}
        </div>
      </div>
    </div>
  );
};

export default RoadmapPage;
