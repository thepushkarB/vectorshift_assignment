// llmNode.js

import { Handle, Position } from 'reactflow';
import { BaseNode } from './BaseNode.js';

export const LLMNode = ({ id, data }) => {

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-system`},
    { type: 'target', position: Position.Left, id: `${id}-prompt`},
    { type: 'source', position: Position.Right, id: `${id}-response`}
  ];

  return (
    // <div style={{width: 200, height: 80, border: '1px solid black'}}>
    //   <Handle
    //     type="target"
    //     position={Position.Left}
    //     id={`${id}-system`}
    //     style={{top: `${100/3}%`}}
    //   />
    //   <Handle
    //     type="target"
    //     position={Position.Left}
    //     id={`${id}-prompt`}
    //     style={{top: `${200/3}%`}}
    //   />


    //   <div>
    //     <span>LLM</span>
    //   </div>
    //   <div>
    //     <span>This is a LLM.</span>
    //   </div>
    //   <Handle
    //     type="source"
    //     position={Position.Right}
    //     id={`${id}-response`}
    //   />
    // </div>

    <BaseNode title="LLM" handles={handles}>
      <div>
        <span>This is a LLM</span>
      </div>
    </BaseNode>
  );
}
