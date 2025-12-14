'use client';

import { useMemo } from 'react';

interface WireProps {
  id?: string;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  isTemp?: boolean;
  className?: string;
}

export function Wire({
  id,
  fromX,
  fromY,
  toX,
  toY,
  isTemp = false,
  className = '',
}: WireProps) {
  // Calculate bezier curve control points
  const path = useMemo(() => {
    const deltaX = Math.abs(toX - fromX);
    const controlOffset = Math.max(50, deltaX * 0.5);
    
    // Control points for smooth bezier curve
    const cp1x = fromX + controlOffset;
    const cp1y = fromY;
    const cp2x = toX - controlOffset;
    const cp2y = toY;

    return `M ${fromX} ${fromY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${toX} ${toY}`;
  }, [fromX, fromY, toX, toY]);

  return (
    <path
      id={id}
      d={path}
      fill="none"
      stroke={isTemp ? 'var(--color-gray-dark)' : 'var(--color-black)'}
      strokeWidth={2}
      strokeLinecap="round"
      className={`
        transition-colors duration-150
        ${isTemp ? 'opacity-50' : 'opacity-100'}
        ${className}
      `.replace(/\s+/g, ' ').trim()}
    />
  );
}
