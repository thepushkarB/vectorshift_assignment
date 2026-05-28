// textNode.js

import { useState, useRef } from 'react';
import { Handle, Position } from 'reactflow';
import { BaseNode } from "./BaseNode.js";

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  const textareaRef = useRef(null);

  const handleTextChange = (e) => {
    // adjust height automatically
    //? reset height on delete
    textareaRef.current.style.height = 'auto';
    //? increase height when text exceeds current height
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    
    // update the node data
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
          {/* change to textarea coz inputs only ever have one line */}
          <textarea 
            ref={textareaRef}
            rows={2}
            value={currText} 
            onChange={handleTextChange} 
            className='nowheel nodrag'
            // nowheel -> prevent reactflow from capturing mousewheel events, allowing user to scroll vertically inside textarea
            // nodrag -> prevent reactflow from capturing drag events from inside the textarea
            style={{ 
              resize: 'none',
              overflowY: 'auto',
              maxHeight: '300px'
            }}
          />
        </label>
      </div>
    </BaseNode>
  );
}
