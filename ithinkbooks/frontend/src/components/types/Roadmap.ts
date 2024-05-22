import themes from '../mock/themes.json';
import Theme from './Theme';

interface RoadmapNode {
  node_level: number;
  roadmap: number;
  product: number[];
}

interface Roadmap {
  user: number;
  title: string;
  node: RoadmapNode[];
}

const emptyRoadmap: Roadmap = {
  user: -1,
  title: '',
  node: []
};

export type {Roadmap, RoadmapNode};
export {emptyRoadmap};
