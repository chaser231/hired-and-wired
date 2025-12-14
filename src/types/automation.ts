// Node types for automation editor

export type NodeType = 'trigger' | 'message' | 'checklist' | 'condition';

export interface Position {
  x: number;
  y: number;
}

export interface NodeData {
  id: string;
  type: NodeType;
  title: string;
  description: string;
  position: Position;
  inputs: number;
  outputs: number;
}

export interface ConnectorRef {
  nodeId: string;
  connectorIndex: number;
}

export interface Connection {
  id: string;
  from: ConnectorRef;
  to: ConnectorRef;
}

export interface DragState {
  isDragging: boolean;
  fromNodeId: string | null;
  fromConnectorIndex: number | null;
  currentPosition: Position | null;
}

// Node type configuration
export const NODE_COLORS: Record<NodeType, string> = {
  trigger: 'var(--color-pink-light)',
  message: 'var(--color-mint)',
  checklist: 'var(--color-purple-light)',
  condition: 'var(--color-yellow-bright)',
};

export const NODE_DEFAULTS: Record<NodeType, { inputs: number; outputs: number }> = {
  trigger: { inputs: 0, outputs: 1 },
  message: { inputs: 1, outputs: 1 },
  checklist: { inputs: 1, outputs: 1 },
  condition: { inputs: 1, outputs: 2 },
};
