import React from 'react';

const PaginationButton: React.FC<{isSelected: boolean, isCompleted: boolean}> = ({isSelected, isCompleted}) => (
  <button className={isSelected ? 'main-button' : `secondary-button ${isCompleted ? '.highlighted-p' : ''}`}/>
);

export default PaginationButton;
