import React from 'react';
import { Roadmap } from '../types/Roadmap';
import themes from '../mock/themes.json';
import { getFormatedWithWordsDate } from '../date-utils';
import { Link } from 'react-router-dom';
import { declineNounAfterNumber } from '../utils';

const RoadmapIcon: React.FC<{roadmap: Roadmap, removeRoadmap: (roadmapId: string) => void}> = ({roadmap, removeRoadmap}) => {
  const theme = themes.find((t) => t.title === roadmap.theme);

  if(!theme) {
    return <></>;
  }

  return (
    <div className='roadmap-icon'>
      <div className='roadmap-info'>
        <Link to={`/roadmaps/${roadmap.id}`} className='text-button'><h2>{theme.shortName}</h2></Link>
        <h3 className='secondary-color'>{roadmap.nodes.length} {declineNounAfterNumber(roadmap.nodes.length, 'шаг', 'шага', 'шагов')}</h3>
        <p className='main-p secondary-color'>{getFormatedWithWordsDate(new Date(roadmap.date))}</p>
      </div>
      <button className='secondary-button' onClick={() => removeRoadmap(roadmap.id)}>Убрать</button>
    </div>
  );
};

export default RoadmapIcon;
