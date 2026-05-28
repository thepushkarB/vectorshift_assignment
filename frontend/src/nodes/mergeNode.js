import { Position } from "reactflow";
import { BaseNode } from "./BaseNode.js";

export const MergeNode = ({id, data}) => {
    // 3 handles- two target(input), one source (output) for each branch
    
    const handles = [
        { type: 'target', position: Position.Left, id: `${id}-input-i`, style: { top: '33%' } },
        { type: 'target', position: Position.Left, id: `${id}-input-ii`, style: { top: '66%' } },
        { type: 'source', position: Position.Right, id: `${id}-output` }
    ]

    return (
        <BaseNode title="Merge" handles={handles}>
            <div>
                <span>Merges two inputs into one array.</span>
            </div>
        </BaseNode>
    );
}