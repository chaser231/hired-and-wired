'use client';

import { useRef, useEffect, useState } from 'react';

type BarSize = 'default' | 'big';

interface BarProps {
  progress: number; // 0-100
  size?: BarSize;
  className?: string;
}

const DOT_SIZE = 5;
const DOT_GAP = 2;
const DOT_STEP = DOT_SIZE + DOT_GAP; // 7px

export function Bar({ progress, size = 'default', className = '' }: BarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dotCount, setDotCount] = useState(0);

  const clampedProgress = Math.min(100, Math.max(0, progress));
  const isBig = size === 'big';
  const rows = isBig ? 2 : 1;

  useEffect(() => {
    const updateDotCount = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        const dotsPerRow = Math.floor((width + DOT_GAP) / DOT_STEP);
        setDotCount(dotsPerRow * rows);
      }
    };

    updateDotCount();
    window.addEventListener('resize', updateDotCount);
    return () => window.removeEventListener('resize', updateDotCount);
  }, [rows]);

  const filledCount = Math.round((clampedProgress / 100) * dotCount);
  const dotsPerRow = Math.ceil(dotCount / rows);

  const renderDots = (rowIndex: number) => {
    const rowDots = [];
    const startIndex = rowIndex * dotsPerRow;
    const endIndex = Math.min(startIndex + dotsPerRow, dotCount);

    for (let i = startIndex; i < endIndex; i++) {
      const isFilled = i < filledCount;
      rowDots.push(
        <div
          key={i}
          className="rounded-full"
          style={{
            width: DOT_SIZE,
            height: DOT_SIZE,
            backgroundColor: isFilled ? 'var(--color-black)' : '#B8C6C3',
          }}
        />
      );
    }
    return rowDots;
  };

  return (
    <div
      ref={containerRef}
      className={`w-full bg-[var(--color-white)] ${className}`}
    >
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="flex"
          style={{ gap: DOT_GAP, marginTop: rowIndex > 0 ? DOT_GAP : 0 }}
        >
          {renderDots(rowIndex)}
        </div>
      ))}
    </div>
  );
}
