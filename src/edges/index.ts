import type { Edge, EdgeTypes } from "reactflow";

export const initialEdges = [
  { id: "t1r1-t2", source: "table1", sourceHandle:"1", target: "table2", animated: true },
] satisfies Edge[];

export const edgeTypes = {
  // Add your custom edge types here!
} satisfies EdgeTypes;
