// submit.js
import { useStore } from './store.js';

const SERVER_URL = 'http://localhost:8000';

export const SubmitButton = () => {

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

            // window.alert(
            //     `Pipeline Parsed!\n` +
            //     `Nodes: ${data.num_nodes}\n` +
            //     `Edges: ${data.num_edges}\n` +
            //     `Is DAG: ${data.is_dag}`
            // );
            alert(
                `Pipeline Analysis:\n\n` +
                `Nodes: ${data.num_nodes}\n` +
                `Edges: ${data.num_edges}\n` +
                `Valid Pipeline (DAG): ${data.is_dag ? '✓ Yes' : '✗ No'}\n\n` +
                `${data.is_dag ? 'Ready to execute!' : 'Fix cycles before executing.'}`
            );
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
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <button 
                type="submit"
                onClick={handleSubmit}
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    backgroundColor: '#0fce05ff',
                    color: 'black',
                    fontWeight: '500',
                    border: 'none',
                    borderRadius: '5px'
                }}
            >
                Submit
            </button>
        </div>
    );
}
