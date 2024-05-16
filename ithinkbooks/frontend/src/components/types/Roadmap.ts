interface RoadmapNode {
  id: number;
  bookId: number[];
  next?: number;
  recommended?: number;
}

interface Roadmap {
  id: string;
  theme: string;
  date: string;
  nodes: RoadmapNode[];
}

export type {Roadmap, RoadmapNode};
