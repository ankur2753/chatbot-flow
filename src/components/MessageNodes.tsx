import React from 'react';
import { Handle, Position } from 'reactflow';
import { MessageNodeData } from '../types/Nodes';
import { FaWhatsapp } from 'react-icons/fa';

export interface MessageNodeProps {
    isConnectable: boolean;
    data: MessageNodeData;
}

const MessageNodes: React.FC<MessageNodeProps> = ({ data, isConnectable = true }) => {
    return (
        <div className="shadow-md rounded-md bg-stone-100">
            <div className='flex bg-green-300 w-full rounded-t-md p-1'>
                <span>Send Message</span>
                <span className='rounded-full grid place-content-center px-1 bg-slate-100'>
                    <FaWhatsapp />
                </span>
            </div>
            <span className='p-2 m-1'> {data.text}</span>
            <Handle
                type="target"
                position={Position.Left}
                id="a"
                isConnectable={isConnectable}
            />
            <Handle type="source" position={Position.Right} id="b" className="w-16 !bg-teal-500" isConnectable={isConnectable} />
        </div>
    );
}

export default MessageNodes