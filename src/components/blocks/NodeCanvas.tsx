'use client';

import { useCallback, useRef, useState, useEffect } from 'react';
import { Node } from './Node';
import { Wire } from '../ui/Wire';
import { NodeData, Connection, DragState, Position } from '@/types/automation';

interface NodeCanvasProps {
  nodes: NodeData[];
  connections: Connection[];
  onNodesChange?: (nodes: NodeData[]) => void;
  onConnectionsChange?: (connections: Connection[]) => void;
  className?: string;
}

interface ConnectorPosition {
  nodeId: string;
  connectorIndex: number;
  type: 'input' | 'output';
  x: number;
  y: number;
}

export function NodeCanvas({
  nodes,
  connections,
  onNodesChange,
  onConnectionsChange,
  className = '',
}: NodeCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    fromNodeId: null,
    fromConnectorIndex: null,
    currentPosition: null,
  });

  const [connectorPositions, setConnectorPositions] = useState<ConnectorPosition[]>([]);

  // Calculate connector positions based on node positions
  const updateConnectorPositions = useCallback(() => {
    if (!canvasRef.current) return;

    const canvasRect = canvasRef.current.getBoundingClientRect();
    const positions: ConnectorPosition[] = [];

    nodeRefs.current.forEach((nodeEl, nodeId) => {
      const nodeData = nodes.find((n) => n.id === nodeId);
      if (!nodeData) return;

      // Find input connectors
      const inputConnectors = nodeEl.querySelectorAll('[data-connector-type="input"]');
      inputConnectors.forEach((connector, index) => {
        const rect = connector.getBoundingClientRect();
        positions.push({
          nodeId,
          connectorIndex: index,
          type: 'input',
          x: rect.left - canvasRect.left + rect.width / 2,
          y: rect.top - canvasRect.top + rect.height / 2,
        });
      });

      // Find output connectors
      const outputConnectors = nodeEl.querySelectorAll('[data-connector-type="output"]');
      outputConnectors.forEach((connector, index) => {
        const rect = connector.getBoundingClientRect();
        positions.push({
          nodeId,
          connectorIndex: index,
          type: 'output',
          x: rect.left - canvasRect.left + rect.width / 2,
          y: rect.top - canvasRect.top + rect.height / 2,
        });
      });
    });

    setConnectorPositions(positions);
  }, [nodes]);

  // Update connector positions when nodes change
  useEffect(() => {
    // Small delay to ensure DOM is updated
    const timer = setTimeout(updateConnectorPositions, 50);
    return () => clearTimeout(timer);
  }, [nodes, updateConnectorPositions]);

  // Handle drag start from output connector
  const handleConnectorDragStart = useCallback(
    (nodeId: string, connectorIndex: number) => {
      const outputPos = connectorPositions.find(
        (p) => p.nodeId === nodeId && p.connectorIndex === connectorIndex && p.type === 'output'
      );

      if (outputPos) {
        setDragState({
          isDragging: true,
          fromNodeId: nodeId,
          fromConnectorIndex: connectorIndex,
          currentPosition: { x: outputPos.x, y: outputPos.y },
        });
      }
    },
    [connectorPositions]
  );

  // Handle drag end on input connector
  const handleConnectorDragEnd = useCallback(
    (nodeId: string, connectorIndex: number) => {
      if (
        dragState.isDragging &&
        dragState.fromNodeId &&
        dragState.fromConnectorIndex !== null
      ) {
        // Don't connect to same node
        if (dragState.fromNodeId === nodeId) {
          setDragState({
            isDragging: false,
            fromNodeId: null,
            fromConnectorIndex: null,
            currentPosition: null,
          });
          return;
        }

        // Check if connection already exists
        const exists = connections.some(
          (c) =>
            c.from.nodeId === dragState.fromNodeId &&
            c.from.connectorIndex === dragState.fromConnectorIndex &&
            c.to.nodeId === nodeId &&
            c.to.connectorIndex === connectorIndex
        );

        if (!exists) {
          const newConnection: Connection = {
            id: `${dragState.fromNodeId}-${dragState.fromConnectorIndex}-${nodeId}-${connectorIndex}`,
            from: {
              nodeId: dragState.fromNodeId,
              connectorIndex: dragState.fromConnectorIndex,
            },
            to: {
              nodeId,
              connectorIndex,
            },
          };

          onConnectionsChange?.([...connections, newConnection]);
        }
      }

      setDragState({
        isDragging: false,
        fromNodeId: null,
        fromConnectorIndex: null,
        currentPosition: null,
      });
    },
    [dragState, connections, onConnectionsChange]
  );

  // Handle mouse move during drag
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!dragState.isDragging || !canvasRef.current) return;

      const canvasRect = canvasRef.current.getBoundingClientRect();
      setDragState((prev) => ({
        ...prev,
        currentPosition: {
          x: e.clientX - canvasRect.left,
          y: e.clientY - canvasRect.top,
        },
      }));
    },
    [dragState.isDragging]
  );

  // Handle mouse up outside of connector
  const handleMouseUp = useCallback(() => {
    if (dragState.isDragging) {
      setDragState({
        isDragging: false,
        fromNodeId: null,
        fromConnectorIndex: null,
        currentPosition: null,
      });
    }
  }, [dragState.isDragging]);

  // Get connected inputs/outputs for a node
  const getConnectedConnectors = useCallback(
    (nodeId: string) => {
      const connectedInputs: number[] = [];
      const connectedOutputs: number[] = [];

      connections.forEach((conn) => {
        if (conn.from.nodeId === nodeId) {
          connectedOutputs.push(conn.from.connectorIndex);
        }
        if (conn.to.nodeId === nodeId) {
          connectedInputs.push(conn.to.connectorIndex);
        }
      });

      return { connectedInputs, connectedOutputs };
    },
    [connections]
  );

  // Get wire endpoints
  const getWireEndpoints = useCallback(
    (connection: Connection) => {
      const fromPos = connectorPositions.find(
        (p) =>
          p.nodeId === connection.from.nodeId &&
          p.connectorIndex === connection.from.connectorIndex &&
          p.type === 'output'
      );

      const toPos = connectorPositions.find(
        (p) =>
          p.nodeId === connection.to.nodeId &&
          p.connectorIndex === connection.to.connectorIndex &&
          p.type === 'input'
      );

      if (!fromPos || !toPos) return null;

      return { from: fromPos, to: toPos };
    },
    [connectorPositions]
  );

  // Get drag wire start position
  const getDragWireStart = useCallback(() => {
    if (!dragState.fromNodeId || dragState.fromConnectorIndex === null) return null;

    return connectorPositions.find(
      (p) =>
        p.nodeId === dragState.fromNodeId &&
        p.connectorIndex === dragState.fromConnectorIndex &&
        p.type === 'output'
    );
  }, [dragState, connectorPositions]);

  const dragWireStart = getDragWireStart();

  return (
    <div
      ref={canvasRef}
      className={`
        relative
        min-h-[400px]
        bg-[var(--color-gray-bg)]
        rounded-[var(--radius-lg)]
        overflow-hidden
        ${className}
      `.replace(/\s+/g, ' ').trim()}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* SVG layer for wires */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      >
        {/* Existing connections */}
        {connections.map((connection) => {
          const endpoints = getWireEndpoints(connection);
          if (!endpoints) return null;

          return (
            <Wire
              key={connection.id}
              id={connection.id}
              fromX={endpoints.from.x}
              fromY={endpoints.from.y}
              toX={endpoints.to.x}
              toY={endpoints.to.y}
            />
          );
        })}

        {/* Temporary drag wire */}
        {dragState.isDragging && dragWireStart && dragState.currentPosition && (
          <Wire
            fromX={dragWireStart.x}
            fromY={dragWireStart.y}
            toX={dragState.currentPosition.x}
            toY={dragState.currentPosition.y}
            isTemp
          />
        )}
      </svg>

      {/* Nodes layer */}
      <div className="relative" style={{ zIndex: 1 }}>
        <div className="flex flex-wrap gap-[var(--space-xl)] p-[var(--space-l)]">
          {nodes.map((node) => {
            const { connectedInputs, connectedOutputs } = getConnectedConnectors(node.id);

            return (
              <div
                key={node.id}
                ref={(el) => {
                  if (el) {
                    nodeRefs.current.set(node.id, el);
                  } else {
                    nodeRefs.current.delete(node.id);
                  }
                }}
                className="w-[200px]"
              >
                <Node
                  id={node.id}
                  type={node.type}
                  title={node.title}
                  description={node.description}
                  inputs={node.inputs}
                  outputs={node.outputs}
                  onPlay={() => console.log('Play', node.id)}
                  onMore={() => console.log('More', node.id)}
                  onConnectorDragStart={handleConnectorDragStart}
                  onConnectorDragEnd={handleConnectorDragEnd}
                  connectedInputs={connectedInputs}
                  connectedOutputs={connectedOutputs}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
