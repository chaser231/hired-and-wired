import { Avatars } from '../ui/Avatar';
import { Bar } from '../ui/Bar';

interface TeamMember {
  src: string;
  alt: string;
}

interface TeamProps {
  name: string;
  memberCount: number;
  productivity: number;
  weekHighlight: string;
  members: TeamMember[];
  className?: string;
}

export function Team({
  name,
  memberCount,
  productivity,
  weekHighlight,
  members,
  className = '',
}: TeamProps) {
  return (
    <div
      className={`
        flex flex-wrap gap-[24px]
        p-[var(--space-m)]
        bg-[var(--color-white)]
        rounded-[var(--radius-lg)]
        ${className}
      `.replace(/\s+/g, ' ').trim()}
    >
      {/* Header */}
      <div className="flex w-full justify-between">
        <p className="text-bold">{name}</p>
        <p className="text-pixel">{memberCount} people</p>
      </div>

      {/* Productivity */}
      <div className="w-full space-y-[var(--space-xs)]">
        <div className="flex items-center justify-between">
          <span
            className="text-grotesk uppercase"
            style={{ color: 'var(--color-gray-dark)', letterSpacing: '2px', textTransform: 'uppercase' }}
          >
            Productivity
          </span>
          <span className="text-grotesk">{productivity}%</span>
        </div>
        <Bar progress={productivity} />
      </div>

      {/* Week highlight */}
      <div className="w-full">
        <p
          className="text-grotesk uppercase"
          style={{ color: 'var(--color-gray-dark)', letterSpacing: '2px', textTransform: 'uppercase' }}
        >
          Week highlight:
        </p>
        <p className="text-pixel mt-[var(--space-xxs)]" style={{ fontSize: '11px' }}>
          {weekHighlight}
        </p>
      </div>

      {/* Members */}
      <div className="flex items-center gap-[var(--space-xs)]">
        <Avatars avatars={members} max={3} size="sm" />
        {memberCount > 3 && (
          <span className="text-pixel">+{memberCount - 3} more</span>
        )}
      </div>
    </div>
  );
}
