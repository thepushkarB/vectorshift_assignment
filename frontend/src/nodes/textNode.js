// textNode.js

import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { BaseNode } from "./BaseNode.js";

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  const handles = [
    { type:'source', position: Position.Right, id: `${id}-output` }
  ];

  return (
    // <div style={{width: 200, height: 80, border: '1px solid black'}}>
    //   <div>
    //     <span>Text</span>
    //   </div>
      
    //   <div>
    //     <label>
    //       Text:
    //       <input 
    //         type="text" 
    //         value={currText} 
    //         onChange={handleTextChange} 
    //       />
    //     </label>
    //   </div>
      
    //   <Handle
    //     type="source"
    //     position={Position.Right}
    //     id={`${id}-output`}
    //   />
    // </div>


    <BaseNode title="Text" handles={handles}>
      <div>
        <label>
          Text:
          <input 
            type="text" 
            value={currText} 
            onChange={handleTextChange} 
          />
        </label>
      </div>
    </BaseNode>
  );
}
