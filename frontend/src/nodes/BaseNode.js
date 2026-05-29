import { Handle } from 'reactflow';
import React from 'react';

// centralized theme mapping for all nodes - super scalable
export const nodeThemes = {
    default: {
        backgroundColor: '#e2e2e2ff',
        color: 'black'
    },
    note: {
        backgroundColor: '#f1f189b0',
        color: 'black'
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
        <div style={{ width:200, minHeight:80, border:'1px solid black', borderRadius:'8px', padding:'5px', ...currentTheme}}>

            {/* node title */}
            <div>
                <span>{title}</span>
            </div>

            {/* node body */}
            <div>
                {children}
            </div>

            {/* node handles */}
            {handles.map((handle) => (
                <div key={handle.id}>
                    <Handle
                        type={handle.type}
                        position={handle.position}
                        id={handle.id}
                        style={handle.style}
                    />
                    {/* render the label if it exists */}
                    {handle.label && (
                        <span 
                            style={{
                                position: 'absolute',
                                top: handle.style?.top || '50%',
                                transform: 'translateY(-50%)',
                                left: handle.position === 'left' ? '12px' : 'auto',
                                right: handle.position === 'right' ? '12px' : 'auto',
                                fontSize: '10px',
                                color: '#555'
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