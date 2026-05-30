from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict, Any
from fastapi.middleware.cors import CORSMiddleware
from utils.graph import is_dag


app = FastAPI()

#* CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins = ['*'],
    # allow_credentials = True,
    allow_headers = ['*'],
    allow_methods = ['*']
)

#* request body schema
# class Pipeline(BaseModel):
#     nodes: List[Dict[str, Any]]
#     edges: List[Dict[str, Any]]
class Node(BaseModel):
    id: str
    type: str
    data: dict

class Edge(BaseModel):
    source: str
    target: str
    sourceHandle: str | None = None
    targetHandle: str | None = None

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]


@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    nodes = [node.model_dump() for node in pipeline.nodes]
    edges = [edge.model_dump() for edge in pipeline.edges]
    return {
        'num_nodes': len(pipeline.nodes),
        'num_edges': len(pipeline.edges),
        'is_dag': is_dag(nodes, edges)
    }
