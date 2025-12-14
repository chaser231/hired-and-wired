'use client';

import { useCallback } from 'react';

type ConnectorType = 'input' | 'output';

interface NodeConnectorProps {
  type: ConnectorType;
  nodeId: string;
  connectorIndex: number;
  isConnected?: boolean;
  onDragStart?: (nodeId: string, connectorIndex: number, type: ConnectorType) => void;
  onDragEnd?: (nodeId: string, connectorIndex: number, type: ConnectorType) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string;
}

export function NodeConnector({
  type,
  nodeId,
  connectorIndex,
  isConnected = false,
  onDragStart,
  onDragEnd,
  onMouseEnter,
  onMouseLeave,
  className = '',
}: NodeConnectorProps) {
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (type === 'output' && onDragStart) {
        onDragStart(nodeId, connectorIndex, type);
      }
    },
    [type, nodeId, connectorIndex, onDragStart]
  );

  const handleMouseUp = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (type === 'input' && onDragEnd) {
        onDragEnd(nodeId, connectorIndex, type);
      }
    },
    [type, nodeId, connectorIndex, onDragEnd]
  );

  return (
    <div
      data-connector-type={type}
      data-node-id={nodeId}
      data-connector-index={connectorIndex}
      className={`
        w-[10px] h-[10px]
        rounded-full
        cursor-pointer
        transition-colors duration-150
        ${isConnected ? 'bg-[var(--color-black)]' : 'bg-[var(--color-gray-dark)]'}
        hover:bg-[var(--color-black)]
        ${className}
      `.replace(/\s+/g, ' ').trim()}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
}
