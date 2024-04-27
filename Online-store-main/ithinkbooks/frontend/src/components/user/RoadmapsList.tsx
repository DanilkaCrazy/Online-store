import React from 'react';
import { useAccount } from '../hooks/AccountProvider';
import roadmap from '../roadmap/roadmap.json';
import { Roadmap } from '../Roadmap';
import RoadmapIcon from '../roadmap/RoadmapIcon';

const RoadmapsList: React.FC<{}> = () => {
  const {account, removeRoadmap} = useAccount();

  //search roadmaps here
  const roadmaps: Roadmap[] = [roadmap];

  if(!account.roadmaps.length) {
    return (
      <div className='roadmaps-page'>
        <h2>Вы ещё не строили роадмапы</h2>
      </div>
    );
  }

  return (
    <div className='roadmaps-page'>
      {roadmaps.map((rm, i) => <RoadmapIcon key={i} roadmap={rm} removeRoadmap={removeRoadmap}/>)}
    </div>
  );
};

export default RoadmapsList;
