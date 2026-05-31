# VectorShift Pipeline Builder & Validator

A web-based visual pipeline builder allowing users to design node-based workflows. The application features a drag-and-drop React interface and a FastAPI backend designed to parse the layout and perform topological validation.

## Features
- **Interactive Workspace:** Drag, drop, and connect nodes (LLM, Input, Output, Text, API, Notes, Merge, Condition, Prompt).
- **Dynamic Text Handles:** The text node dynamically parses `{{variable_name}}` patterns to generate inputs and auto-cleans orphaned connections.
- **Client State:** Global graph sync powered by Zustand.
- **FastAPI Validation:** Instant server-side verification of node counts, edge connections, and cycle detection.

---

## Architecture Decisions

### 1. BaseNode Component Abstraction
Instead of duplicate styling and handle logic across nodes, `BaseNode` acts as a styling wrapper. It maps handles, spacing percentages, and style rules dynamically. Adding a new node requires zero boilerplates for wrapper styling or handle injection.

### 2. DAG Verification (Kahn's Algorithm vs. DFS)
While DFS detects cycles efficiently, we implemented **Kahn's Algorithm** (BFS-based topological sort) in the backend. 
- It naturally handles dependency resolution by keeping track of in-degrees.
- It is iterative, avoiding python recursion limits / stack overflow risks on large graphs.
- It directly identifies whether the pipeline can be executed sequentially.

### 3. useMemo for Dynamic Text Nodes
Parsing text inputs for double-curly-braces variables runs on every keystroke. We wrapped this extraction logic in `useMemo` so regex parses only execute when the actual text value changes. This stabilizes dependency arrays for React hooks, preventing unnecessary internal React Flow updates (`useUpdateNodeInternals`) and avoiding visual glitches during typing.

---

## Setup & Run Instructions

### Prerequisites
- Python 3.9+
- Node.js 16+

### Backend Setup
```bash
cd backend
# Activate pre-existing virtual environment (or run: python -m venv venv)
source venv/bin/activate
pip install fastapi uvicorn pydantic
uvicorn main:app --reload --port 8000
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```
The application will run on `http://localhost:3000`.

---

## API Endpoints Documentation

### `POST /pipelines/parse`
Parses the layout and verifies if the current graph configuration forms a Directed Acyclic Graph.

**Request Body Schema:**
```json
{
  "nodes": [
    { "id": "1", "type": "text", "data": { "text": "Start {{name}}" } },
    { "id": "2", "type": "llm", "data": {} }
  ],
  "edges": [
    { "source": "1", "target": "2", "sourceHandle": "1-output", "targetHandle": "2-var-name" }
  ]
}
```

**Response Schema:**
```json
{
  "num_nodes": 2,
  "num_edges": 1,
  "is_dag": true
}
```

---

## Known Limitations
- **No Database Persistence:** Pipelines exist entirely client-side. Refreshing the browser resets the workspace.
- **Untyped Handles:** The UI allows connecting any output to any input without enforcing data type compatibility (e.g., text output into numeric variables).
- **Static API Port:** The frontend connects directly to `localhost:8000`. Environment variables are not set up for production builds.
