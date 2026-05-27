import { Handle, Position } from 'reactflow';

// children -> jsx to be rendered inside the node body
// title -> string, title of the node
// handles -> array of handles to be rendered in the node
export const BaseNode = ({ children, title, handles }) => {

    return (
        <div style={{ width:200, minHeight:80, border: '1px solid black' }}>

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

                <Handle
                    key={handle.id}
                    type={handle.type}
                    position={handle.position}
                    id={handle.id}
                    style={handle.style}
                />
            ))}

        </div>
    )
}