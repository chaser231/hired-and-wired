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

interface NodeDragState {
  isDragging: boolean;
  nodeId: string | null;
  startPosition: Position | null;
  startMousePosition: Position | null;
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

  // Wire drag state
  const [wireDragState, setWireDragState] = useState<DragState>({
    isDragging: false,
    fromNodeId: null,
    fromConnectorIndex: null,
    currentPosition: null,
  });

  // Node drag state
  const [nodeDragState, setNodeDragState] = useState<NodeDragState>({
    isDragging: false,
    nodeId: null,
    startPosition: null,
    startMousePosition: null,
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
        setWireDragState({
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
        wireDragState.isDragging &&
        wireDragState.fromNodeId &&
        wireDragState.fromConnectorIndex !== null
      ) {
        // Don't connect to same node
        if (wireDragState.fromNodeId === nodeId) {
          setWireDragState({
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
            c.from.nodeId === wireDragState.fromNodeId &&
            c.from.connectorIndex === wireDragState.fromConnectorIndex &&
            c.to.nodeId === nodeId &&
            c.to.connectorIndex === connectorIndex
        );

        if (!exists) {
          const newConnection: Connection = {
            id: `${wireDragState.fromNodeId}-${wireDragState.fromConnectorIndex}-${nodeId}-${connectorIndex}`,
            from: {
              nodeId: wireDragState.fromNodeId,
              connectorIndex: wireDragState.fromConnectorIndex,
            },
            to: {
              nodeId,
              connectorIndex,
            },
          };

          onConnectionsChange?.([...connections, newConnection]);
        }
      }

      setWireDragState({
        isDragging: false,
        fromNodeId: null,
        fromConnectorIndex: null,
        currentPosition: null,
      });
    },
    [wireDragState, connections, onConnectionsChange]
  );

  // Handle node drag start
  const handleNodeDragStart = useCallback(
    (e: React.MouseEvent, nodeId: string) => {
      // Ignore if clicking on connectors or buttons
      const target = e.target as HTMLElement;
      if (
        target.closest('[data-connector-type]') ||
        target.closest('button')
      ) {
        return;
      }

      const node = nodes.find((n) => n.id === nodeId);
      if (!node || !canvasRef.current) return;

      const canvasRect = canvasRef.current.getBoundingClientRect();

      setNodeDragState({
        isDragging: true,
        nodeId,
        startPosition: { ...node.position },
        startMousePosition: {
          x: e.clientX - canvasRect.left,
          y: e.clientY - canvasRect.top,
        },
      });

      e.preventDefault();
    },
    [nodes]
  );

  // Handle mouse move during drag
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!canvasRef.current) return;

      const canvasRect = canvasRef.current.getBoundingClientRect();
      const mouseX = e.clientX - canvasRect.left;
      const mouseY = e.clientY - canvasRect.top;

      // Wire drag
      if (wireDragState.isDragging) {
        setWireDragState((prev) => ({
          ...prev,
          currentPosition: { x: mouseX, y: mouseY },
        }));
      }

      // Node drag
      if (
        nodeDragState.isDragging &&
        nodeDragState.nodeId &&
        nodeDragState.startPosition &&
        nodeDragState.startMousePosition
      ) {
        const deltaX = mouseX - nodeDragState.startMousePosition.x;
        const deltaY = mouseY - nodeDragState.startMousePosition.y;

        const newX = Math.max(0, nodeDragState.startPosition.x + deltaX);
        const newY = Math.max(0, nodeDragState.startPosition.y + deltaY);

        const updatedNodes = nodes.map((node) =>
          node.id === nodeDragState.nodeId
            ? { ...node, position: { x: newX, y: newY } }
            : node
        );

        onNodesChange?.(updatedNodes);
      }
    },
    [wireDragState.isDragging, nodeDragState, nodes, onNodesChange]
  );

  // Handle mouse up
  const handleMouseUp = useCallback(() => {
    if (wireDragState.isDragging) {
      setWireDragState({
        isDragging: false,
        fromNodeId: null,
        fromConnectorIndex: null,
        currentPosition: null,
      });
    }

    if (nodeDragState.isDragging) {
      setNodeDragState({
        isDragging: false,
        nodeId: null,
        startPosition: null,
        startMousePosition: null,
      });
    }
  }, [wireDragState.isDragging, nodeDragState.isDragging]);

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
    if (!wireDragState.fromNodeId || wireDragState.fromConnectorIndex === null) return null;

    return connectorPositions.find(
      (p) =>
        p.nodeId === wireDragState.fromNodeId &&
        p.connectorIndex === wireDragState.fromConnectorIndex &&
        p.type === 'output'
    );
  }, [wireDragState, connectorPositions]);

  const dragWireStart = getDragWireStart();

  // Calculate canvas dimensions based on node positions
  const canvasDimensions = nodes.reduce(
    (acc, node) => ({
      width: Math.max(acc.width, node.position.x + 250),
      height: Math.max(acc.height, node.position.y + 200),
    }),
    { width: 800, height: 400 }
  );

  return (
    <div
      ref={canvasRef}
      className={`
        relative
        bg-[var(--color-gray-bg)]
        rounded-[var(--radius-lg)]
        overflow-auto
        ${className}
      `.replace(/\s+/g, ' ').trim()}
      style={{
        minHeight: '400px',
        cursor: nodeDragState.isDragging ? 'grabbing' : 'default',
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Canvas content with dynamic size */}
      <div
        className="relative"
        style={{
          width: `${canvasDimensions.width}px`,
          height: `${canvasDimensions.height}px`,
          minWidth: '100%',
          minHeight: '100%',
        }}
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
          {wireDragState.isDragging && dragWireStart && wireDragState.currentPosition && (
            <Wire
              fromX={dragWireStart.x}
              fromY={dragWireStart.y}
              toX={wireDragState.currentPosition.x}
              toY={wireDragState.currentPosition.y}
              isTemp
            />
          )}
        </svg>

        {/* Nodes layer */}
        {nodes.map((node) => {
          const { connectedInputs, connectedOutputs } = getConnectedConnectors(node.id);
          const isDragging = nodeDragState.nodeId === node.id;

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
              className="absolute w-[200px]"
              style={{
                left: `${node.position.x}px`,
                top: `${node.position.y}px`,
                zIndex: isDragging ? 10 : 1,
                cursor: isDragging ? 'grabbing' : 'grab',
              }}
              onMouseDown={(e) => handleNodeDragStart(e, node.id)}
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
  );
}
