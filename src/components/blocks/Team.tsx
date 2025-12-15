import Link from 'next/link';
import { Avatars } from '../ui/Avatar';
import { Bar } from '../ui/Bar';

interface TeamMember {
  src: string;
  alt: string;
}

interface TeamProps {
  id?: string;
  name: string;
  memberCount: number;
  productivity: number;
  weekHighlight: string;
  members: TeamMember[];
  href?: string;
  className?: string;
}

export function Team({
  id,
  name,
  memberCount,
  productivity,
  weekHighlight,
  members,
  href,
  className = '',
}: TeamProps) {
  const content = (
    <div
      className={`
        flex flex-col gap-[var(--space-l)]
        p-[var(--space-xl)]
        bg-[var(--color-white)]
        rounded-[var(--radius-lg)]
        transition-all
        ${href ? 'hover:shadow-lg cursor-pointer' : ''}
        ${className}
      `.replace(/\s+/g, ' ').trim()}
    >
      {/* Header */}
      <div className="flex justify-between items-end">
        <p className="text-bold">{name}</p>
        <p className="text-pixel">{memberCount} people</p>
      </div>

      {/* Productivity */}
      <div className="space-y-[var(--space-xs)]">
        <div className="flex items-center justify-between">
          <span className="text-caps" style={{ color: 'var(--color-gray-medium)' }}>
            Productivity
          </span>
          <span className="text-caps">{productivity}%</span>
        </div>
        <Bar progress={productivity} />
      </div>

      {/* Week highlight */}
      <div className="space-y-[var(--space-xs)]">
        <p className="text-caps" style={{ color: 'var(--color-gray-medium)' }}>
          Week highlight:
        </p>
        <p className="text-pixel">
          {weekHighlight}
        </p>
      </div>

      {/* Members */}
      <div className="flex items-center gap-[var(--space-s)]">
        <Avatars avatars={members} max={3} size="sm" />
        {memberCount > 3 && (
          <span className="text-pixel">+{memberCount - 3} more</span>
        )}
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
