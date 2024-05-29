import React from 'react';
import Book from '../types/Book';
import { RoadmapNode } from '../types/Roadmap';
import NodeStar from '../../images/pages/NodeStar.svg';
import NodeStarDark from '../../images/pages/NodeStarDark.svg';

const NODES_V_GAP = 50;
const NODES_H_GAP = 130;
const NODE_WIDTH = 80;
const BRANCH_COLOR = '#262626';
const BRANCH_STROKE_WIDTH = 4;
const MAX_TITLE_LENGTH = 50;

const BRANCHES_GAP = NODES_H_GAP + NODE_WIDTH;

const Branch: React.FC<{upperNode: RoadmapNode, downNode: RoadmapNode}> = ({upperNode, downNode}) => {
  const upperCount = upperNode.product.length;
  const downCount = downNode.product.length;
  const shift = Math.abs(upperCount - downCount) * BRANCHES_GAP / 2; 

  const upperCoordinates = upperNode.product.map((_v, i) => (
    [i * BRANCHES_GAP + (upperCount >= downCount ? 0 : shift) + BRANCH_STROKE_WIDTH / 2, 0]
  ));
  const downCoordinates = downNode.product.map((_v, i) => (
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
  chosenBookId: number,
  isRecommended?: boolean,
  setChosenBook: React.Dispatch<React.SetStateAction<Book>>
}> = ({book, chosenBookId ,setChosenBook, isRecommended = false}) => (
  <button onClick={() => setChosenBook(book)} className={`node-book ${book.id === chosenBookId ? 'active-node' : ''}`}>
    <img hidden={!isRecommended} className='node-star' src={book.id === chosenBookId ? NodeStarDark : NodeStar} alt='Рекомендовано'/>
    <p className='secondary-p'>{book.name.length > MAX_TITLE_LENGTH ? `${book.name.slice(0, MAX_TITLE_LENGTH)}...` : book.name}</p>
    <div className='cover-stumb'></div>
  </button>
);

export {NodeBook, Branch};
