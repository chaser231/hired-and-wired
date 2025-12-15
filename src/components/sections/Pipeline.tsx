'use client';

import { useState } from 'react';
import { Profile } from '../blocks/Profile';

interface Candidate {
  id: string;
  name: string;
  role: string;
  avatarSrc: string;
}

interface PipelineColumn {
  id: string;
  title: string;
  candidates: Candidate[];
}

interface PipelineProps {
  columns?: PipelineColumn[];
  onCandidateClick?: (candidateId: string) => void;
  onColumnChange?: (candidateId: string, fromColumn: string, toColumn: string) => void;
  className?: string;
}

const defaultColumns: PipelineColumn[] = [
  {
    id: 'applied',
    title: 'Applied',
    candidates: [
      { id: '1', name: 'Michael Thompson', role: 'Product Manager', avatarSrc: '/assets/avatar-katya.png' },
      { id: '2', name: 'Emily Carter', role: 'UX Designer', avatarSrc: '/assets/avatar-katya.png' },
      { id: '3', name: 'James Wilson', role: 'Data Analyst', avatarSrc: '/assets/avatar-katya.png' },
      { id: '4', name: 'Olivia Brown', role: 'Marketing Specialist', avatarSrc: '/assets/avatar-katya.png' },
    ],
  },
  {
    id: 'screening',
    title: 'Screening',
    candidates: [
      { id: '5', name: 'Michael Thompson', role: 'Project Manager', avatarSrc: '/assets/avatar-katya.png' },
      { id: '6', name: 'Emily Davis', role: 'UX Designer', avatarSrc: '/assets/avatar-katya.png' },
      { id: '7', name: 'David Garcia', role: 'Data Analyst', avatarSrc: '/assets/avatar-katya.png' },
      { id: '8', name: 'Jessica Martinez', role: 'Marketing Specialist', avatarSrc: '/assets/avatar-katya.png' },
      { id: '9', name: 'Daniel Lee', role: 'Systems Administrator', avatarSrc: '/assets/avatar-katya.png' },
      { id: '10', name: 'Laura Wilson', role: 'Product Owner', avatarSrc: '/assets/avatar-katya.png' },
    ],
  },
  {
    id: 'interview',
    title: 'Interview',
    candidates: [
      { id: '11', name: 'Michael Thompson', role: 'Product Manager', avatarSrc: '/assets/avatar-katya.png' },
      { id: '12', name: 'Jessica Williams', role: 'UI/UX Designer', avatarSrc: '/assets/avatar-katya.png' },
      { id: '13', name: 'David Brown', role: 'Data Scientist', avatarSrc: '/assets/avatar-katya.png' },
    ],
  },
  {
    id: 'offer',
    title: 'Offer',
    candidates: [
      { id: '14', name: 'Sarah Mitchell', role: 'Senior Software Engineer', avatarSrc: '/assets/avatar-katya.png' },
    ],
  },
];

export function Pipeline({
  columns: initialColumns = defaultColumns,
  onCandidateClick,
  onColumnChange,
  className = '',
}: PipelineProps) {
  const [columns, setColumns] = useState<PipelineColumn[]>(initialColumns);
  const [draggedCandidate, setDraggedCandidate] = useState<{ candidate: Candidate; fromColumnId: string } | null>(null);
  const [dropTargetColumnId, setDropTargetColumnId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, candidate: Candidate, columnId: string) => {
    setDraggedCandidate({ candidate, fromColumnId: columnId });
    e.dataTransfer.effectAllowed = 'move';
    // Set transparent drag image
    const dragImage = document.createElement('div');
    dragImage.style.opacity = '0';
    document.body.appendChild(dragImage);
    e.dataTransfer.setDragImage(dragImage, 0, 0);
    setTimeout(() => document.body.removeChild(dragImage), 0);
  };

  const handleDragEnd = () => {
    setDraggedCandidate(null);
    setDropTargetColumnId(null);
  };

  const handleDragOver = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dropTargetColumnId !== columnId) {
      setDropTargetColumnId(columnId);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    // Only reset if leaving the column container itself
    const relatedTarget = e.relatedTarget as HTMLElement;
    if (!relatedTarget || !e.currentTarget.contains(relatedTarget)) {
      setDropTargetColumnId(null);
    }
  };

  const handleDrop = (e: React.DragEvent, toColumnId: string) => {
    e.preventDefault();
    if (!draggedCandidate) return;

    const { candidate, fromColumnId } = draggedCandidate;

    if (fromColumnId === toColumnId) {
      setDraggedCandidate(null);
      setDropTargetColumnId(null);
      return;
    }

    // Update columns state
    setColumns((prevColumns) => {
      const newColumns = prevColumns.map((column) => {
        if (column.id === fromColumnId) {
          return {
            ...column,
            candidates: column.candidates.filter((c) => c.id !== candidate.id),
          };
        }
        if (column.id === toColumnId) {
          return {
            ...column,
            candidates: [...column.candidates, candidate],
          };
        }
        return column;
      });
      return newColumns;
    });

    // Notify parent
    onColumnChange?.(candidate.id, fromColumnId, toColumnId);

    setDraggedCandidate(null);
    setDropTargetColumnId(null);
  };

  return (
    <div className={className}>
      {/* Title */}
      <h2 className="text-h1 mb-[50px]">Pipeline</h2>

      {/* Kanban Board */}
      <div className="flex gap-[var(--space-l)] p-[var(--space-xl)] bg-[var(--color-white)] rounded-[var(--radius-lg)]">
        {columns.map((column) => (
          <div
            key={column.id}
            className={`
              flex-1 min-w-[200px] p-[var(--space-xs)] rounded-[var(--radius-sm)] transition-colors duration-150
              ${dropTargetColumnId === column.id && draggedCandidate?.fromColumnId !== column.id
                ? 'bg-[var(--color-yellow-bright)] bg-opacity-30'
                : ''
              }
            `.replace(/\s+/g, ' ').trim()}
            onDragOver={(e) => handleDragOver(e, column.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            {/* Column Header */}
            <div className="flex items-center gap-[var(--space-s)] mb-[var(--space-m)]">
              <h3 className="text-h2">{column.title}</h3>
              <span className="text-h2" style={{ color: 'var(--color-gray-dark)' }}>
                {column.candidates.length}
              </span>
            </div>

            {/* Candidates */}
            <div className="flex flex-col gap-[var(--space-xxs)] min-h-[100px]">
              {column.candidates.map((candidate) => (
                <div
                  key={candidate.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, candidate, column.id)}
                  onDragEnd={handleDragEnd}
                  onClick={() => onCandidateClick?.(candidate.id)}
                  className={`
                    cursor-grab active:cursor-grabbing transition-all duration-150
                    ${draggedCandidate?.candidate.id === candidate.id
                      ? 'opacity-50 scale-95'
                      : 'hover:scale-[1.02]'
                    }
                  `.replace(/\s+/g, ' ').trim()}
                >
                  <Profile
                    name={candidate.name}
                    role={candidate.role}
                    avatarSrc={candidate.avatarSrc}
                    variant="short-outlined"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
