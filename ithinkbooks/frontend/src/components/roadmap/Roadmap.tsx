import React from 'react';
import { Link } from 'react-router-dom';

const Roadmap: React.FC<{onExit: React.DispatchWithoutAction}> = ({onExit}) => (
  <>
    <h1>Страница с построенным роадмапом</h1>
    <Link to='/account/roadmaps' onClick={onExit}>Сохранить</Link>
  </>
);

export default Roadmap;
