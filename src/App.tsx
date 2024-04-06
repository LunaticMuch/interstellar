import Dagre from "@dagrejs/dagre";
import { useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  Background,
  MiniMap,
  Panel,
  Controls,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from "reactflow";

import { initialEdges, initialNodes, nodeTypes } from "./graph";
import "reactflow/dist/style.css";

const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

// All options are listed https://github.com/dagrejs/dagre/wiki#configuring-the-layout
const getLayoutedElements = (nodes, edges, options) => {
  g.setGraph({ rankdir: options.direction, ranker: options.alg });

  edges.forEach((edge) => g.setEdge(edge.source, edge.target));
  nodes.forEach((node) => g.setNode(node.id, node));

  Dagre.layout(g);

  return {
    nodes: nodes.map((node) => {
      const { x, y } = g.node(node.id);

      return { ...node, position: { x, y } };
    }),
    edges,
  };
};

const LayoutFlow = () => {
  const { fitView } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onLayout = useCallback(
    (direction,alg) => {
      const layouted = getLayoutedElements(nodes, edges, { direction, alg });

      setNodes([...layouted.nodes]);
      setEdges([...layouted.edges]);

      window.requestAnimationFrame(() => {
        fitView();
      });
    },
    [nodes, edges]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView
    >
      <Background />
      <MiniMap />
      <Controls />
      <Panel position="top-right" className="flex flex-col">
        <button className='bg-lime-200 p-1 rounded-md m-1' onClick={() => onLayout('TB','longest-path')}>vertical layout</button>
        <button className='bg-lime-200 p-1 rounded-md m-1' onClick={() => onLayout('LR','network-simplex')}>Horizontal / Network Simplex</button>
        <button className='bg-lime-200 p-1 rounded-md m-1' onClick={() => onLayout('LR','longest-path')}>Horizontal / Longest Path</button>
        <button className='bg-lime-200 p-1 rounded-md m-1' onClick={() => onLayout('LR','tight-tree')}>Horizontal / Tight Tree</button>
      </Panel>
    </ReactFlow>
  );
};

export default function () {
  return (
    <ReactFlowProvider>
      <LayoutFlow />
    </ReactFlowProvider>
  );
}
