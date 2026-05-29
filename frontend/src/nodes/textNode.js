// textNode.js

import { useState, useEffect, useRef, useMemo } from 'react';
import { Handle, Position, useUpdateNodeInternals } from 'reactflow';
import { BaseNode } from "./BaseNode.js";
import { parseVariables } from '../utils/parseVariables.js';
import { useStore } from '../store.js';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  const textareaRef = useRef(null);

  //* parse variable names
  const variables = useMemo(() => parseVariables(currText), [currText]);
  console.log("variables: ", variables);

  //* inform reactflow that the no. of handles might change
  const updateNodeInternals = useUpdateNodeInternals();

  //* save the og variables[] state so that when variables[] changes, we can remove the obsolete edges
  const prevVariables = useRef(variables);

  //* get the removeOrphanedEdges function from the store
  const removeOrphanedEdges = useStore( (state) => state.removeOrphanedEdges);

  useEffect(() => {
    //? inform reactflow about the new handles
    updateNodeInternals(id);

    //? compare prevVariables.current with variables to check if there are any variables which got deleted/removed
    const removedVariables = prevVariables.current.filter( (v) => !variables.includes(v));
    console.log("removedVariables: ", removedVariables);

    //? clean-up: fire removeOrphanedEdges() from zustand store for each var in removedVariables
    removedVariables.forEach((removedVar) => removeOrphanedEdges(`${id}-var-${removedVar}`));

    //? update prevVariables to current variables
    prevVariables.current = variables;
  // }, [variables]);
  }, [variables, id, removeOrphanedEdges, updateNodeInternals]);

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

  
  // build handles array dynamically based on no. of variables
  variables.forEach((variableName, idx) => {
    handles.push({
      type: 'target',
      position: Position.Left,
      id: `${id}-var-${variableName}`,
      // label: `${variableName}`,
      // style:{top: `${handleTop}`},
      style: { top: `${((idx + 1) / (variables.length + 1)) * 100}%` }
      /*
       * equal spacing for handles, breakdown:
       ? formule: position_% = ((idx + 1) / (total_handles + 1)) * 100%
          - `idx` is the current index, 0-based so we do `+1` -converting to-> 1-based, making it: 1, 2, 3... 
            
          - `total_handles` is the total number of handles, which is `variables.length`
              - creates the total number of gaps between handles
              - adding `+1` to `variables.length` creates the total number of gaps, including the gap before the first handle & the gap after the last handle
              - if we have 2 varibles, we divide the space into 3 slices

          - `* 100` -> convert the fraction to a percentage
       */
    });
  })

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
