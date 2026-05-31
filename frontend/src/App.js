import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div className="flex flex-col h-screen w-full bg-[#051424] text-[#d4e4fa] font-mono overflow-hidden">
      {/* Top Header */}
      <header className="flex justify-between items-center w-full px-6 py-4 border-b border-green-900 bg-black z-20">
          <div className="flex items-center gap-8">
              <span className="text-2xl font-bold text-green-400 tracking-tighter uppercase">Vectorshift</span>
          </div>
          <SubmitButton />
      </header>

      {/* Main Workspace */}
      <div className="flex flex-1 relative overflow-hidden">
          <PipelineToolbar />
          <PipelineUI />
      </div>
    </div>
  );
}

export default App;
