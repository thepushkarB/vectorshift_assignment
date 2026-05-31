import { Handle } from 'reactflow';
import React from 'react';

// centralized theme mapping for all nodes - super scalable
export const nodeThemes = {
    default: {
        containerClass: 'bg-[#051424] border border-[#3b4b37] node-glow hover:node-active transition-all',
        headerClass: 'bg-[#1c2b3c] border-b border-[#3b4b37] text-green-400',
        bodyClass: 'text-gray-300',
        handleClass: 'react-flow__handle',
        labelClass: 'text-gray-400'
    },
    note: {
        containerClass: 'bg-[#1f1a05] border border-yellow-700/50 node-glow-yellow hover:node-active-yellow transition-all',
        headerClass: 'bg-[#3b300a] border-b border-yellow-700/50 text-yellow-400',
        bodyClass: 'text-yellow-200',
        handleClass: 'react-flow__handle react-flow__handle-yellow',
        labelClass: 'text-yellow-600'
    }
};

// children -> jsx to be rendered inside the node body
// title -> string, title of the node
// handles -> array of handles to be rendered in the node
// theme -> string matching a key in nodeThemes (defaults to 'default')
export const BaseNode = ({ children, title, handles, theme = 'default' }) => {
    
    // get the selected theme, fallback to default if not found
    const currentTheme = nodeThemes[theme] || nodeThemes.default;

    return (
        <div className={`w-56 min-h-20 rounded-lg overflow-hidden flex flex-col font-mono text-xs ${currentTheme.containerClass}`}>

            {/* node title */}
            <div className={`px-3 py-1 flex justify-between items-center font-bold uppercase tracking-widest ${currentTheme.headerClass}`}>
                <span>{title}</span>
            </div>

            {/* node body */}
            <div className={`p-3 flex flex-col gap-2 ${currentTheme.bodyClass}`}>
                {children}
            </div>

            {/* node handles */}
            {handles.map((handle) => (
                <div key={handle.id}>
                    <Handle
                        type={handle.type}
                        position={handle.position}
                        id={handle.id}
                        className={currentTheme.handleClass}
                        style={handle.style}
                    />
                    {/* render the label if it exists */}
                    {handle.label && (
                        <span 
                            className={`absolute text-[9px] uppercase tracking-wider font-bold ${currentTheme.labelClass}`}
                            style={{
                                top: handle.style?.top || '50%',
                                transform: 'translateY(-50%)',
                                left: handle.position === 'left' ? '12px' : 'auto',
                                right: handle.position === 'right' ? '12px' : 'auto',
                            }}
                        >
                            {handle.label}
                        </span>
                    )}
                </div>
            ))}

        </div>
    )
}