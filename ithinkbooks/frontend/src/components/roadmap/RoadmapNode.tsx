import React from 'react';
import Book from '../Book';
import { RoadmapNode } from '../Roadmap';

const NODES_V_GAP = 50;
const NODES_H_GAP = 130;
const NODE_WIDTH = 80;
const BRANCH_COLOR = '#262626';
const BRANCH_STROKE_WIDTH = 4;

const BRANCHES_GAP = NODES_H_GAP + NODE_WIDTH;

const Branch: React.FC<{upperNode: RoadmapNode, downNode: RoadmapNode}> = ({upperNode, downNode}) => {
  const upperCount = upperNode.bookId.length;
  const downCount = downNode.bookId.length;
  const shift = Math.abs(upperCount - downCount) * BRANCHES_GAP / 2; 

  const upperCoordinates = upperNode.bookId.map((_v, i) => (
    [i * BRANCHES_GAP + (upperCount >= downCount ? 0 : shift) + BRANCH_STROKE_WIDTH / 2, 0]
  ));
  const downCoordinates = downNode.bookId.map((_v, i) => (
    [i * BRANCHES_GAP + (downCount >= upperCount ? 0 : shift)  + BRANCH_STROKE_WIDTH / 2, NODES_V_GAP]
  ));

  const allCoordinates = upperCoordinates.concat(downCoordinates).sort((a, b) => a[0] - b[0]);

  const paths = Array.from({length: upperCount + downCount - 1}, (_v, i) => {
    const current = allCoordinates[i];
    const next = allCoordinates[i + 1];

    return `${current[0]} ${current[1]}, ${current[0]} ${NODES_V_GAP / 2}, ${next[0]} ${NODES_V_GAP / 2}, ${next[0]} ${next[1]}`;
  });

  return (
    <svg 
      className='node-branch' 
      width={((upperCount >= downCount ? upperCount : downCount) - 1) * BRANCHES_GAP + BRANCH_STROKE_WIDTH}
      height={NODES_V_GAP}>
        <polyline 
          points={paths.join(', ')} 
          stroke={BRANCH_COLOR} 
          strokeWidth={BRANCH_STROKE_WIDTH} 
          fill='transparent'/>
    </svg>
  );
};

const NodeBook:React.FC<{
  book: Book, 
  chosenBookId: string,
  setChosenBook: React.Dispatch<React.SetStateAction<Book>>
}> = ({book, chosenBookId ,setChosenBook}) => (
  <button onClick={() => setChosenBook(book)} className={`node-book ${book.id === chosenBookId ? 'active-node' : ''}`}>
    <p className='secondary-p'>{book.title}</p>
    <div className='cover-stumb'></div>
  </button>
);

export {NodeBook, Branch};
