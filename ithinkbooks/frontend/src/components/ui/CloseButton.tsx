import React, { MouseEventHandler } from 'react';
import CloseButtonIcon from '../../images/pages/CloseButton.svg';

const CloseButton: React.FC<{onClick: MouseEventHandler<HTMLButtonElement> | undefined}> = ({onClick}) => (
  <button className='secondary-button close-button' onClick={onClick}>
    <img src={CloseButtonIcon} alt='Закрыть'/>
  </button>
);

export default CloseButton;
