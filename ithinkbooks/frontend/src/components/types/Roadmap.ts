import Book from "./Book";

interface RoadmapNode {
  node_level: number;
  roadmap: number;
  product: Book[];
}

interface Roadmap {
  id: number;
  user: number;
  title: string;
  node: RoadmapNode[];
}

const emptyRoadmap: Roadmap = {
  id: -1,
  user: -1,
  title: '',
  node: []
};

export type {Roadmap, RoadmapNode};
export {emptyRoadmap};
