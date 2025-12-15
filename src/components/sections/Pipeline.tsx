'use client';

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
  count: number;
  candidates: Candidate[];
}

interface PipelineProps {
  columns?: PipelineColumn[];
  onCandidateClick?: (candidateId: string) => void;
  className?: string;
}

const defaultColumns: PipelineColumn[] = [
  {
    id: 'applied',
    title: 'Applied',
    count: 4,
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
    count: 6,
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
    count: 3,
    candidates: [
      { id: '11', name: 'Michael Thompson', role: 'Product Manager', avatarSrc: '/assets/avatar-katya.png' },
      { id: '12', name: 'Jessica Williams', role: 'UI/UX Designer', avatarSrc: '/assets/avatar-katya.png' },
      { id: '13', name: 'David Brown', role: 'Data Scientist', avatarSrc: '/assets/avatar-katya.png' },
    ],
  },
  {
    id: 'offer',
    title: 'Offer',
    count: 1,
    candidates: [
      { id: '14', name: 'Sarah Mitchell', role: 'Senior Software Engineer', avatarSrc: '/assets/avatar-katya.png' },
    ],
  },
];

export function Pipeline({
  columns = defaultColumns,
  onCandidateClick,
  className = '',
}: PipelineProps) {
  return (
    <div className={className}>
      {/* Title */}
      <h2 className="text-h1 mb-[var(--space-m)]">Pipeline</h2>

      {/* Kanban Board */}
      <div
        className="flex gap-[var(--space-xs)] p-[var(--space-m)] bg-[var(--color-white)] rounded-[var(--radius-lg)]"
      >
        {columns.map((column) => (
          <div
            key={column.id}
            className="flex-1 min-w-[180px]"
          >
            {/* Column Header */}
            <div className="flex items-center gap-[var(--space-s)] mb-[var(--space-s)]">
              <h3 className="text-h2">{column.title}</h3>
              <span className="text-h2" style={{ color: 'var(--color-gray-dark)' }}>
                {column.count}
              </span>
            </div>

            {/* Candidates */}
            <div className="space-y-[var(--space-xs)]">
              {column.candidates.map((candidate) => (
                <div
                  key={candidate.id}
                  onClick={() => onCandidateClick?.(candidate.id)}
                  className="cursor-pointer"
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
