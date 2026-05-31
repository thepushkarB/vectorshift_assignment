// draggableNode.js

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    const isNote = type === 'note';

    return (
      <div
        className={`cursor-grab p-4 flex items-center justify-between rounded-lg border bg-[#051424] hover:-translate-y-0.5 transition-all
          ${isNote 
            ? 'border-yellow-600/50 hover:border-yellow-400 hover:shadow-[0_0_15px_rgba(250,204,21,0.2)]' 
            : 'border-[#3b4b37] hover:border-green-400 hover:shadow-[0_0_15px_rgba(0,255,65,0.2)]'
          }
        `}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        draggable
      >
          <span className={`font-mono text-sm uppercase font-bold tracking-wider ${isNote ? 'text-yellow-400' : 'text-gray-300'}`}>{label}</span>
          <div className={`w-2 h-2 rounded-full ${isNote ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'}`}></div>
      </div>
    );
  };