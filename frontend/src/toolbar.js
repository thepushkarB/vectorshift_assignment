// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div style={{ padding: '10px' }}>
            <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                {/* new nodes- part 1 */}
                <DraggableNode type='prompt' label='Prompt' />
                <DraggableNode type='api' label='API'/>
                <DraggableNode type='note' label='Note'/>
                <DraggableNode type='condition' label='Condition'/>
                <DraggableNode type='merge' label='Merge'/>

            </div>
        </div>
    );
};
