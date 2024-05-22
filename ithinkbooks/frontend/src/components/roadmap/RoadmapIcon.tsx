import React from 'react';
import { Roadmap } from '../types/Roadmap';
import themes from '../mock/themes.json';
import { getFormatedWithWordsDate } from '../date-utils';
import { Link } from 'react-router-dom';
import { declineNounAfterNumber } from '../utils';

const RoadmapIcon: React.FC<{
  id: number, 
  roadmap: Roadmap, 
  removeRoadmap?: (roadmapId: string) => void
}> = ({id, roadmap, removeRoadmap}) => {
  const stepsAmount = roadmap.node.length | 0;

  return (
    <div className='roadmap-icon'>
      <div className='roadmap-info'>
        <Link to={`/roadmaps/${id}`} className='text-button'><h2>{roadmap.title}</h2></Link>
        <h3 className='secondary-color'>{stepsAmount} {declineNounAfterNumber(stepsAmount, 'шаг', 'шага', 'шагов')}</h3>
        {/*<p className='main-p secondary-color'>{getFormatedWithWordsDate(new Date(roadmap.date))}</p>*/}
      </div>
      <button className='secondary-button' /*I need delete method for roadmaps*/ onClick={() => {}}>Убрать</button>
    </div>
  );
};

export default RoadmapIcon;
