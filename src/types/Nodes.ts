export interface NodeComponent extends React.FC {}

export interface NodeBase {
  id: string;
  position: { x: number; y: number };
  data: { label: string };
  type: string | undefined;
}

export interface MessageNode extends NodeBase {
  data: MessageNodeData;
  //need to use constant here also but will fix later
  type: "MESSAGE_NODE";
}

export interface MessageNodeData {
  label: string;
  text: string;
}

export interface Edges {
  id: string;
  source: string;
  target: string;
}
