// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <aside className="flex flex-col h-full border-r border-[#3b4b37] bg-[#010f1f] w-64 z-30 overflow-y-auto shrink-0">
            <div className="p-4 border-b border-[#3b4b37]">
                <h3 className="text-gray-400 font-bold uppercase text-xs tracking-widest">Components</h3>
            </div>
            <nav className="flex-1 p-4 space-y-3">
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='prompt' label='Prompt' />
                <DraggableNode type='api' label='API'/>
                <DraggableNode type='note' label='Note'/>
                <DraggableNode type='condition' label='Condition'/>
                <DraggableNode type='merge' label='Merge'/>
            </nav>
        </aside>
    );
};
