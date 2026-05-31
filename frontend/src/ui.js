// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { PromptNode } from './nodes/promptNode';
import { ApiNode } from './nodes/apiNode';
import { NoteNode } from './nodes/noteNode';
import { ConditionNode } from './nodes/conditionNode';
import { MergeNode } from './nodes/mergeNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  prompt: PromptNode,
  api: ApiNode,
  note: NoteNode,
  condition: ConditionNode,
  merge: MergeNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      onNodesChange,
      onEdgesChange,
      onConnect
    } = useStore(selector, shallow);

    const getInitNodeData = (nodeID, type) => {
      let nodeData = { id: nodeID, nodeType: `${type}` };
      return nodeData;
    }

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();
    
          // get the coordinates of the drop event relative to the ReactFlow canvas
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;
      
            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
              return;
            }
      
            // calculate the position of the new node
            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };
      
            addNode(newNode);
          }
        },
        [reactFlowInstance]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
        <>
        <div ref={reactFlowWrapper} className="flex-1 w-full h-full relative canvas-grid">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                connectionLineType='smoothstep'
                className="bg-transparent"
            >
                <Background color="#1c2b3c" gap={gridSize} size={2} />
                <Controls 
                    className="!bg-transparent !border-none !shadow-none [&_button]:!bg-[#010f1f] [&_button]:!border-b [&_button]:!border-[#3b4b37] [&_button]:!fill-green-400 [&_button:hover]:!bg-[#1c2b3c] [&_button:last-child]:!border-none overflow-hidden rounded-md border !border-[#3b4b37]" 
                />
                <MiniMap 
                    className="![background-color:#010f1f] !border !border-[#3b4b37] !rounded-lg" 
                    nodeColor={(node) => node.type === 'note' ? 'rgba(250, 204, 21, 0.2)' : 'rgba(0, 255, 65, 0.2)'} 
                    nodeStrokeColor={(node) => node.type === 'note' ? '#facc15' : '#00ff41'}
                    nodeStrokeWidth={4}
                    nodeBorderRadius={8}
                    maskColor="rgba(1, 15, 31, 0.8)" 
                />
            </ReactFlow>
        </div>
        </>
    )
}
