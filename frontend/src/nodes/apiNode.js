import { useState } from "react";
import { Handle, Position } from "reactflow";
import { BaseNode } from "./BaseNode.js";

export const ApiNode = ({ id, data }) => {
    // handles 
    const handles = [
        { type:'target', position: Position.Left, id:`${id}-input` },
        { type:'source', position: Position.Right, id:`${id}-output` }
    ];


    const [currUrl, setCurrUrl] = useState(data?.url || '');
    const [currMethod, setCurrMethod] = useState(data?.method || 'GET');

    const handleUrlChange = (e) => {
        setCurrUrl(e.target.value);
    };

    const handleMethodChange = (e) => {
        setCurrMethod(e.target.value);
    };

    return (
        <BaseNode title="API" handles={handles}>
            <div>
                <input
                    placeholder="url"
                    type="text"
                    value={currUrl}
                    onChange={handleUrlChange}
                />
                <select value={currMethod} onChange={handleMethodChange}>
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                </select>
            </div>
        </BaseNode>
    );
}