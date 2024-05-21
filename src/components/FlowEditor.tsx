import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ReactFlow, { Connection, Controls, Edge, EdgeChange, NodeChange, addEdge, applyEdgeChanges, applyNodeChanges, useEdgesState, useNodesState, useOnSelectionChange } from 'reactflow'
import { NodeState } from '../types/NodeStore';
import MessageNodes from './MessageNodes';
import { toggleSelection } from '../redux/reducers/NodeReducers';

const nodeTypes = { "MESSAGE_NODE": MessageNodes };


const FlowEditor = () => {
    // not updating on text change because array remains same just the inner contnets change need to handle that inside the components
    const initialNodes = useSelector((state: NodeState) => state.Nodes);
    const initialEdges = useSelector((state: NodeState) => state.Connections);
    const [nodes, setNodes] = useNodesState(initialNodes);
    const [edges, setEdges] = useEdgesState(initialEdges);
    const dispatch = useDispatch();
    useOnSelectionChange({
        onChange: ({ nodes }) => {
            console.log(nodes);

            if (nodes.length === 0) {
                // dispatch(toggleSelection(null));
            } else {
                dispatch(toggleSelection(nodes[0].id));
            }

        }
    });

    //rerender using useEffect once anything changes in redux store
    useEffect(
        () => {
            setNodes(initialNodes);
            setEdges(initialEdges);
        },
        [initialNodes, setNodes, initialEdges, setEdges]
    )

    const onNodesChange = useCallback(
        (changes: NodeChange[]) => {
            setNodes((oldNodes) => applyNodeChanges(changes, oldNodes));
            //handle update in store too some how
        },
        [setNodes],
    );
    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges],
    );
    const onConnect = useCallback(
        (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );
    return (
        <div className='flex w-3/4 h-full'>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                panOnScroll
                fitView
                nodeTypes={nodeTypes}
            >
                <Controls />
            </ReactFlow>
        </div>
    )
}

export default FlowEditor