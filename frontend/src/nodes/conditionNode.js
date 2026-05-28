import { useState } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const ConditionNode = ({id, data}) => {
    const [condition, setCondition] = useState(data?.condition || '');

    // 3 handles- one target(input), two source(true/false)
    const handles = [
        { type:'target', position:Position.Left, id:`${id}-input` },
        { type:'source', position:Position.Right, id:`${id}-true`, style:{ top:'33%' }, label: 'True' },
        { type:'source', position:Position.Right, id:`${id}-false`, style:{top:'66%'}, label: 'False' }
    ];

    return (
        <BaseNode title="Condition" handles={handles}>
            <div>
                <input 
                    placeholder="write condition logic"
                    type="text"
                    value={condition}
                    onChange={(e)=>setCondition(e.target.value)}
                />
            </div>
        </BaseNode>
    );
}