import React from 'react';

const RoadmapsList: React.FC<{}> = () => {
  const roadmaps: string[] = [];

  return (
    <div className='roadmaps-page'>
      {roadmaps.length 
      ? roadmaps.map((roadmap, i) => <p key={i}>{roadmap}</p>)
      : <h2>Вы ещё не строили роадмапы</h2>}
    </div>
  );
};

export default RoadmapsList;
