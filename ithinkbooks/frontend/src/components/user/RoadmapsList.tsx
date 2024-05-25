import React from 'react';
import RoadmapIcon from '../roadmap/RoadmapIcon';
import { useQuiz } from '../hooks/QuizProvider';

const RoadmapsList: React.FC<{}> = () => {
  const {roadmaps, deleteRoadmap} = useQuiz();

  if(!roadmaps.length) {
    return (
      <div className='roadmaps-page'>
        <h2>Вы ещё не строили роадмапы</h2>
      </div>
    );
  }

  return (
    <div className='roadmaps-page'>
      {roadmaps.map((rm, i) => <RoadmapIcon key={i} roadmap={rm} removeRoadmap={deleteRoadmap}/>)}
    </div>
  );
};

export default RoadmapsList;
