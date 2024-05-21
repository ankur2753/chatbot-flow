import { useDispatch, useSelector } from "react-redux"
import { NodeState } from "../types/NodeStore"
import Button from "./Button";
import { addNode, changeText, toggleSelection, removeNode, disconnectNode } from '../redux/reducers/NodeReducers'
import { MessageNode } from "../types/Nodes";
import { MESSAGE_NODE } from "../constants/constants";
import { FaArrowLeft, FaTrash } from 'react-icons/fa'

const SideBar = () => {
    const isNodeSelected = useSelector((state: NodeState) => state.isNodeSelected);
    const dispath = useDispatch();
    const selectedNodeId = useSelector((state: NodeState) => state.selectedNodeId);

    function AddNewNode() {
        const random = Math.random() * 200
        const newNode: MessageNode = {
            id: `Node ${random}`,
            position: { x: random, y: random },
            data: { label: `${random}`, text: "text" },
            type: MESSAGE_NODE,
        }
        dispath(addNode(newNode));
    }

    function updateText(text: string) {
        let payload = {
            id: selectedNodeId!,
            newText: text
        }
        console.log(payload);
        dispath(changeText(payload))
    }

    return (
        <section className='w-1/4 flex border-2 pt-2 border-solid h-full border-grey-600'>
            {isNodeSelected ?
                <>
                    {ModifyNodeProperties()}
                </>
                : <Button text="Add Message Node" onclick={AddNewNode} />}
        </section>
    )

    function ModifyNodeProperties() {
        return <div className="w-full flex flex-col px-2">
            <div className="flex justify-between px-2">
                <button className="mx-2" onClick={() => dispath(toggleSelection(null))}>
                    <FaArrowLeft />
                </button>
                Message settigns for {selectedNodeId?.split(".")[0]}
                <button onClick={() => dispath(removeNode(selectedNodeId!))}>
                    <FaTrash />
                </button>
            </div>
            <div className="w-full border p-2">
                <label htmlFor="MessageContentEditor">Text: </label>
                <input className="border rounded w-full p-3 border-grey-500" type="text" name="MessageContentEditor" id="MessageContentEditor" onChange={(event) => updateText(event.target.value)} />
            </div>
            <div>
                <button onClick={() => dispath(disconnectNode(selectedNodeId!))}>Click here to disconnected this node</button>
            </div>
        </div>;
    }
}

export default SideBar