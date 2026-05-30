from typing import List, Dict, Any
from collections import deque

'''
    # indegree = no. of incoming edges to a node
    # topological sorting via task analogy:
        # if task-B depends on task-A then {A, B}
    # adjacency list = that represents a graph by storing, for each node, the list of nodes it connects to
    # uses Kahn's Algorithm:
        # 1. Calculate the indegree of every node
        # 2. Add all nodes with indegree 0 to a queue (they have no dependencies)
        # 3. Process the queue:
            # Remove a node from the queue
            # For each edge from that node to a neighbor, decrease the neighbor's indegree by 1
            # If any neighbor's indegree becomes 0, add it to the queue
        # 4. If all nodes were processed, the graph is acyclic
        # 5. If some nodes remain unprocessed, there's a cycle
'''

def is_dag(nodes:list, edges: list) -> bool:
    #* Step 1: Initialize data structures
    # Every node starts with 0 incoming edges
    in_degree = {}
    adjacency_list = {}
    for node in nodes:
        node_id = node['id']
        in_degree[node_id] = 0
        adjacency_list[node_id] = []


    #* Step 2: Populate from the edge list- filling the graph
    for edge in edges:
        source = edge['source']
        target = edge['target']

        # append target to adjacency list of source
        # i.e. add target to source's list of neighbors
        # i.e. source points to target
        adjacency_list[source].append(target)
        # increment incoming edge count for the target
        in_degree[target] += 1
    
    #* Step 3: find all nodes w/ in_degree 0 & put then in queue
    # 1. an empty list to hold our starting nodes
    ready_nodes = []
    # 2. poop through every node and its degree count
    # in_degree.items() returns a list of tuples, where each tuple contains a (key, value) pair
        # key = node_id, value = degree
        # `in_degree.items()` creates a view like: [ (node_id, 0), (node_id, 1), ... ]
    for node_id, degree in in_degree.items():
        # 3. check if the node has 0 incoming edges
        if degree == 0:
            # 4. append it to ready_nodes
            ready_nodes.append(node_id)
    # 5. convert the list into deque
    queue = deque(ready_nodes)

    processed = 0

    '''
    # Step 4: Process Loop: While the queue is not empty:
        Pop a node
        Increment a processed_count
        For each neighbor this node points to: decrement their in_degree
        If any neighbor's in_degree hits 0, add them to the queue
    '''
    while queue:
        # Take the first node out
        curr_node = queue.popleft()

        # Add 1 to our "finished"(processed) counter
        processed += 1 

        #* Reduce neighbors' indegree
        # Get the list of neighbors for this node
        neighbors = adjacency_list[curr_node] 
        # Reduce Count: Subtract 1 from their dependency count (because we just finished a prerequisite).
        for neighbor in neighbors:
            in_degree[neighbor] -= 1

            # Check Ready: If a neighbor's count hits 0, they are now ready! Add them to the line. 
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    

    #* Step 5: Final Check
    # If we processed everyone, it's a DAG else a cycle stopped us
    return processed == len(nodes)

#* Only runs when executed directly, NOT when imported as a module
if __name__ == '__main__':
    nodes = [
        {'id': '1', 'type': 'text', 'data': {'text': 'Hello {{name}}'}},
        {'id': '2', 'type': 'input', 'data': {'text': 'World'}},
        {'id': '3', 'type': 'output', 'data': {'text': 'Bye'}}
    ]
    edges = [
        {'id': 'e1-2', 'source': '1', 'target': '2', 'sourceHandle': 'var-name'},
        {'id': 'e2-3', 'source': '2', 'target': '3', 'sourceHandle': 'output'},
        {'id': 'e3-1', 'source': '3', 'target': '1', 'sourceHandle': 'loop'} # cycle here -> false
    ]
    print("Is DAG?: ", is_dag(nodes, edges))
    




        



