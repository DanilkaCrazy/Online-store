interface RoadmapNode {
  id: number;
  bookId: string[];
  next?: number;
  prev?: number;
}

interface Roadmap {
  id: string;
  theme: string;
  date: string;
  nodes: RoadmapNode[];
}

export type {Roadmap, RoadmapNode};
