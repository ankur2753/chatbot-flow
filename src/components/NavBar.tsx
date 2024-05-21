import { useSelector } from "react-redux";
import Button from "./Button"
import { NodeState } from "../types/NodeStore";
import { NodeBase } from "../types/Nodes";

const NavBar = () => {
    const nodes = useSelector((state: NodeState) => state.Nodes);
    const edges = useSelector((state: NodeState) => state.Connections);

    /**
     * check that more than one node is not diconnected if it is throw an error
     */
    function CheckAndSave() {
        if (CheckDisconnectedNodes()) {
            alert("unable to save as there are more than 1 disconnected node");
            return;
        }
        SaveNodes()

    }
    /**
     * @returns false if less than two nodes are disconnected else true 
     */
    function CheckDisconnectedNodes(): boolean {
        const nodesMap = new Map<string, NodeBase>();
        nodes.forEach((node) => nodesMap.set(node.id, node));

        const connectedNodes = new Set<string>();
        edges.forEach((edge) => {
            connectedNodes.add(edge.source);
            connectedNodes.add(edge.target);
        });
        let disconnectedCount = 0;
        nodesMap.forEach((node, nodeId) => {
            if (!connectedNodes.has(nodeId)) {
                disconnectedCount++;
            }
        });

        return disconnectedCount >= 1

    }

    /**
     * method to store the nodes and edges to local storage
     */
    function SaveNodes() {
        const values = { connections: edges, nodes: nodes }
        localStorage.setItem("FLOW MAP", JSON.stringify(values))
    }
    return (
        <div className='w-full bg-gray-300 flex justify-end'><Button text="Save Button" onclick={CheckAndSave} /></div>
    )
}

export default NavBar