'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Profile } from '../blocks/Profile';
import { useCandidatesStore, CandidateStatus } from '@/lib/stores/candidatesStore';

interface PipelineCandidate {
  id: string;
  name: string;
  role: string;
  avatarSrc: string;
  status: CandidateStatus;
}

interface PipelineColumn {
  id: CandidateStatus;
  title: string;
  candidates: PipelineCandidate[];
}

interface PipelineProps {
  campaignId?: string;
  onCandidateClick?: (candidateId: string) => void;
  onColumnChange?: (candidateId: string, fromColumn: string, toColumn: string) => void;
  className?: string;
}

const columnConfig: { id: CandidateStatus; title: string }[] = [
  { id: 'applied', title: 'Applied' },
  { id: 'screening', title: 'Screening' },
  { id: 'interview', title: 'Interview' },
  { id: 'offer', title: 'Offer' },
];

export function Pipeline({
  campaignId,
  onCandidateClick,
  onColumnChange,
  className = '',
}: PipelineProps) {
  // Get raw candidates array from store (stable reference)
  const allCandidates = useCandidatesStore((state) => state.candidates);
  const updateCandidate = useCandidatesStore((state) => state.updateCandidate);

  // Filter candidates by campaignId with useMemo to avoid new array on each render
  const candidatesFromStore = useMemo(() => {
    if (!campaignId) return allCandidates;
    return allCandidates.filter((c) => c.campaignId === campaignId);
  }, [allCandidates, campaignId]);

  // Build columns from store data
  const buildColumns = useCallback((): PipelineColumn[] => {
    return columnConfig.map((config) => ({
      ...config,
      candidates: candidatesFromStore
        .filter((c) => c.status === config.id)
        .map((c) => ({
          id: c.id,
          name: c.name,
          role: c.role,
          avatarSrc: c.avatarSrc || '/assets/avatar-katya.png',
          status: c.status,
        })),
    }));
  }, [candidatesFromStore]);

  const [columns, setColumns] = useState<PipelineColumn[]>([]);
  const [draggedCandidate, setDraggedCandidate] = useState<{ candidate: PipelineCandidate; fromColumnId: string } | null>(null);
  const [dropTargetColumnId, setDropTargetColumnId] = useState<string | null>(null);

  // Update columns when store changes
  useEffect(() => {
    setColumns(buildColumns());
  }, [buildColumns]);

  const handleDragStart = (e: React.DragEvent, candidate: PipelineCandidate, columnId: string) => {
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

    // Update candidate status in store
    updateCandidate(candidate.id, { status: toColumnId as CandidateStatus });

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
