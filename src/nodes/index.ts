import type { Node, NodeTypes } from "reactflow";
import  TableNode  from './tableNode'


export const initialNodes = [
  { id: "table1", type:"tableNode", position: { x: 0, y: 0 }, data: ['row 1','row 2'] },
  { id: "table2", type:"tableNode", position: { x: 100, y: 100 }, data: ['row 3','row 4','row 5','row 6'] },
  { id: "table3", type:"tableNode", position: { x: 200, y: 200 }, data: ['row 7'] },
] satisfies Node[];

export const nodeTypes = {
  tableNode: TableNode
} satisfies NodeTypes;
