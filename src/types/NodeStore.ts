import { Edges, NodeBase } from "./Nodes";

export interface NodeState {
  nodesCount: number;
  isNodeSelected: boolean;
  Nodes: NodeBase[];
  Connections: Edges[];
  selectedNodeId: string | null;
}
