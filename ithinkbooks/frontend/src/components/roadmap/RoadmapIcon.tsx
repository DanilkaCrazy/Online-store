import React from 'react';
import { Roadmap } from '../types/Roadmap';
import { getFormatedWithWordsDate } from '../date-utils';
import { Link } from 'react-router-dom';
import { declineNounAfterNumber } from '../utils';

const RoadmapIcon: React.FC<{
  roadmap: Roadmap, 
  removeRoadmap: (roadmapId: number) => void
}> = ({roadmap, removeRoadmap}) => {
  const stepsAmount = roadmap.node.length | 0;

  return (
    <div className='roadmap-icon'>
      <div className='roadmap-info'>
        <Link to={`/roadmaps/${roadmap.id}`} className='text-button'><h2>{roadmap.title}</h2></Link>
        <h3 className='secondary-color'>{stepsAmount} {declineNounAfterNumber(stepsAmount, 'шаг', 'шага', 'шагов')}</h3>
        {/*<p className='main-p secondary-color'>{getFormatedWithWordsDate(new Date(roadmap.date))}</p>*/}
      </div>
      <button className='secondary-button' onClick={() => removeRoadmap(roadmap.id)}>Убрать</button>
    </div>
  );
};

export default RoadmapIcon;
