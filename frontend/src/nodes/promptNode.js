import { useState } from "react"; 
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";


export const PromptNode = ({ id, data}) => {
    const handles = [
        { type:'source', position: Position.Right, id:`${id}-prompt-output` },
    ];

    const [currPrompt, setCurrPrompt] = useState(data?.prompt || '');

    const handlePromptChange = (e) => {
        setCurrPrompt(e.target.value);
    }

    return (
        <BaseNode title="Prompt" handles={handles}>
            <div>
                <label>
                    Prompt:
                    <textarea
                        placeholder="write prompt..."
                        rows={3}
                        value={currPrompt}
                        onChange={handlePromptChange}
                    />
                </label>
            </div>

        </BaseNode>
    )

}