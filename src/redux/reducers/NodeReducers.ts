import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { NodeState } from "../../types/NodeStore";
import { Edges, MessageNode, NodeBase } from "../../types/Nodes";
import { MESSAGE_NODE } from "../../constants/constants";
import { Node } from "reactflow";

const initialNodes: MessageNode[] = [
  {
    id: "1",
    position: { x: 100, y: 100 },
    data: { label: "1", text: "source" },
    type: MESSAGE_NODE,
  },
  {
    id: "2",
    position: { x: 300, y: 200 },
    data: { label: "2", text: "mid" },
    type: MESSAGE_NODE,
  },
  {
    id: "3",
    position: { x: 500, y: 100 },
    data: { label: "3", text: "target" },
    type: MESSAGE_NODE,
  },
];
const initialEdges: Edges[] = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" },
  { id: "e1-3", source: "1", target: "3" },
];

const initialState: NodeState = {
  nodesCount: 3,
  isNodeSelected: false,
  Nodes: initialNodes,
  Connections: initialEdges,
  selectedNodeId: null,
};

const NodeSlice = createSlice({
  name: "Nodes",
  initialState,
  reducers: {
    addNode(state, action: PayloadAction<NodeBase>) {
      state.nodesCount++;
      state.Nodes.push(action.payload);
    },

    removeNode(state, action: PayloadAction<string>) {
      state.nodesCount--;
      state.Nodes = state.Nodes.filter((node) => node.id !== action.payload);
      state.Connections = state.Connections.filter(
        (edges) =>
          !(edges.source === action.payload || edges.target === action.payload)
      );
    },
    toggleSelection(state, action: PayloadAction<string | null>) {
      if (action.payload === null) {
        state.isNodeSelected = false;
        state.selectedNodeId = null;
      } else {
        state.isNodeSelected = true;
        state.selectedNodeId = action.payload;
      }
    },
    /**
     * method to change the text inside the message node
     * @param action {id of the node to be edited, newText string to be replaced}
     */
    changeText(state, action: PayloadAction<{ id: string; newText: string }>) {
      state.Nodes = state.Nodes.map((node) => {
        if (node.id === action.payload.id) {
          (node as MessageNode).data.text = action.payload.newText;
        }
        return node;
      });
    },
    connectNodes(state, action: PayloadAction<Edges>) {
      state.Connections.push(action.payload);
    },
    /**
     *  method to remove all connection from the node
     * @param action id of the edge to be removed
     */
    disconnectNode(state, action: PayloadAction<string>) {
      state.Connections = state.Connections.filter(
        (edges) =>
          !(edges.source === action.payload || edges.target === action.payload)
      );
    },
    /**
     * removes the node from the view
     * @param action the ID of the Node to be removed
     */
    updateNodes(state, action: PayloadAction<Node[]>) {
      state.Nodes = action.payload.map((currNode) => {
        return {
          data: currNode.data,
          id: currNode.id,
          position: currNode.position,
          type: currNode.type,
        };
      });
    },
  },
});

export const {
  addNode,
  removeNode,
  toggleSelection,
  changeText,
  updateNodes,
  disconnectNode,
} = NodeSlice.actions;
export default NodeSlice.reducer;
