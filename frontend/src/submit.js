// submit.js
import { useState } from 'react';
import { useStore } from './store.js';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';

const SERVER_URL = 'http://localhost:8000';

export const SubmitButton = () => {

    const [modalData, setModalData] = useState(null);

    // get nodes from store
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);

    const handleSubmit = async () => {
        // loading states
        // setIsLoading(true);
        // setError(null);

        const payload = {
            nodes: nodes.map(node => ({
                id: node.id,
                type: node.type,
                data: node.data
            })),
            edges: edges.map(edge => ({
                source: edge.source,
                target: edge.target,
                sourceHandle: edge.sourceHandle,
                targetHandle: edge.targetHandle
            }))
        };


        // API call
        try {
            // api call
            const response = await fetch(`${SERVER_URL}/pipelines/parse`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });


            // check status
            if(!response.ok) {
                throw new Error(`Server Error: ${response.status}`);
            }

            // parse data
            const data = await response.json();
            console.log("DATA: ", data);

            // Open Modal instead of alert
            setModalData(data);
        }
        catch(err) {
            console.error(err);
            // setError(err.message);
        }
        finally {
            // clean up
        }
        
    }

    return (
        <div className="flex items-center justify-center">
            <button 
                type="submit"
                onClick={handleSubmit}
                className="bg-green-400 text-green-950 px-6 py-2 font-bold uppercase tracking-widest hover:shadow-[0_0_15px_rgba(0,255,65,0.4)] transition-all active:scale-95 border-b-2 border-r-2 border-green-700 rounded-md cursor-pointer"
            >
                Submit Pipeline
            </button>

            {modalData && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" id="analysisModal">
                    <div className="w-full max-w-lg bg-[#010f1f] border-2 border-green-400 p-1 shadow-[0_0_50px_rgba(0,255,65,0.2)] rounded-2xl">
                        <div className="border border-green-500/50 p-6 rounded-xl bg-[#051424]">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl text-green-400 uppercase tracking-tighter font-bold m-0">SYSTEM ANALYSIS</h2>
                            </div>
                            <div className="space-y-4 font-mono mb-8 text-left">
                                <div className="flex items-center gap-3">
                                    <FiCheckCircle className="text-green-400 text-lg" />
                                    <span className="text-gray-200">Nodes: {modalData.num_nodes} detected</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FiCheckCircle className="text-green-400 text-lg" />
                                    <span className="text-gray-200">Edges: {modalData.num_edges} verified connections</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    {modalData.is_dag ? <FiCheckCircle className="text-green-400 text-lg" /> : <FiXCircle className="text-red-400 text-lg" />}
                                    <span className="text-gray-200">Valid Pipeline (DAG): <span className={`font-bold ${modalData.is_dag ? 'text-green-400' : 'text-red-400'}`}>{modalData.is_dag ? 'YES' : 'NO'}</span></span>
                                </div>
                                <div className="pt-4 border-t border-gray-700">
                                    <p className={`${modalData.is_dag ? 'text-green-400' : 'text-red-400'} italic inline-block m-0`}>{modalData.is_dag ? 'Ready to execute!' : 'Fix cycles before executing.'}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <button className="border border-gray-600 text-gray-400 hover:border-green-400 hover:text-green-400 py-3 font-bold font-mono uppercase transition-colors rounded-xl bg-transparent cursor-pointer" onClick={() => setModalData(null)}>
                                    Cancel
                                </button>
                                <button className="bg-green-400 text-green-900 py-3 font-bold font-mono uppercase hover:shadow-[0_0_20px_rgba(0,255,65,0.4)] transition-all active:scale-95 rounded-xl border-none cursor-pointer" onClick={() => setModalData(null)}>
                                    OK
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
