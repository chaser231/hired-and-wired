'use client';

import { forwardRef, useCallback, useMemo } from 'react';
import { Icon } from '../ui/Icon';
import { NodeConnector } from '../ui/NodeConnector';
import { NodeType, NODE_COLORS, NODE_DEFAULTS } from '@/types/automation';

interface NodeProps {
  id: string;
  type?: NodeType;
  title: string;
  description: string;
  inputs?: number;
  outputs?: number;
  onPlay?: () => void;
  onMore?: () => void;
  onConnectorDragStart?: (nodeId: string, connectorIndex: number) => void;
  onConnectorDragEnd?: (nodeId: string, connectorIndex: number) => void;
  connectedInputs?: number[];
  connectedOutputs?: number[];
  className?: string;
}

export const Node = forwardRef<HTMLDivElement, NodeProps>(function Node(
  {
    id,
    type = 'trigger',
    title,
    description,
    inputs,
    outputs,
    onPlay,
    onMore,
    onConnectorDragStart,
    onConnectorDragEnd,
    connectedInputs = [],
    connectedOutputs = [],
    className = '',
  },
  ref
) {
  // Get default inputs/outputs based on type if not specified
  const inputCount = inputs ?? NODE_DEFAULTS[type].inputs;
  const outputCount = outputs ?? NODE_DEFAULTS[type].outputs;

  const bgColor = NODE_COLORS[type];

  const handleOutputDragStart = useCallback(
    (nodeId: string, connectorIndex: number) => {
      onConnectorDragStart?.(nodeId, connectorIndex);
    },
    [onConnectorDragStart]
  );

  const handleInputDragEnd = useCallback(
    (nodeId: string, connectorIndex: number) => {
      onConnectorDragEnd?.(nodeId, connectorIndex);
    },
    [onConnectorDragEnd]
  );

  // Generate connector arrays
  const inputConnectors = useMemo(
    () => Array.from({ length: inputCount }, (_, i) => i),
    [inputCount]
  );

  const outputConnectors = useMemo(
    () => Array.from({ length: outputCount }, (_, i) => i),
    [outputCount]
  );

  return (
    <div
      ref={ref}
      data-node-id={id}
      className={`
        flex flex-col
        gap-[var(--space-l)]
        p-[var(--space-s)]
        rounded-[var(--radius-md)]
        select-none
        ${className}
      `.replace(/\s+/g, ' ').trim()}
      style={{ backgroundColor: bgColor }}
    >
      {/* Content */}
      <div className="flex flex-col gap-[var(--space-s)]">
        {/* Icons row */}
        <div className="flex items-center justify-between gap-[var(--space-xs)]">
          <div className="flex items-center gap-[var(--space-xs)]">
            {onPlay && (
              <button
                onClick={onPlay}
                className="hover:opacity-70 transition-opacity"
              >
                <Icon name="play" size="sm" />
              </button>
            )}
          </div>
          {onMore && (
            <button
              onClick={onMore}
              className="hover:opacity-70 transition-opacity"
            >
              <Icon name="more" size="sm" />
            </button>
          )}
        </div>

        {/* Text content */}
        <div className="flex flex-col gap-[var(--space-xs)]">
          <p className="text-bold">{title}</p>
          <p className="text-pixel">{description}</p>
        </div>
      </div>

      {/* Connectors row */}
      <div className="flex items-center justify-between gap-[var(--space-xxs)]">
        {/* Input connectors */}
        <div className="flex items-center gap-[var(--space-xxs)]">
          {inputConnectors.map((index) => (
            <NodeConnector
              key={`input-${index}`}
              type="input"
              nodeId={id}
              connectorIndex={index}
              isConnected={connectedInputs.includes(index)}
              onDragEnd={handleInputDragEnd}
            />
          ))}
        </div>

        {/* Output connectors */}
        <div className="flex items-center gap-[var(--space-xxs)]">
          {outputConnectors.map((index) => (
            <NodeConnector
              key={`output-${index}`}
              type="output"
              nodeId={id}
              connectorIndex={index}
              isConnected={connectedOutputs.includes(index)}
              onDragStart={handleOutputDragStart}
            />
          ))}
        </div>
      </div>
    </div>
  );
});
