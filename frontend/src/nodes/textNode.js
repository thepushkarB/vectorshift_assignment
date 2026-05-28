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
