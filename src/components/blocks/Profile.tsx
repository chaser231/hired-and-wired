import { Avatar } from '../ui/Avatar';
import { Status } from '../ui/Status';
import { Bar } from '../ui/Bar';

type ProfileVariant = 'long' | 'short' | 'short-outlined';
type StatusVariant = 'green' | 'red' | 'purple' | 'stopped';

interface ProfileProps {
  name: string;
  role: string;
  avatarSrc: string;
  variant?: ProfileVariant;
  status?: StatusVariant;
  progress?: number;
  className?: string;
}

export function Profile({
  name,
  role,
  avatarSrc,
  variant = 'short',
  status,
  progress,
  className = '',
}: ProfileProps) {
  if (variant === 'long') {
    return (
      <div
        className={`
          flex items-start gap-[var(--space-s)]
          p-[var(--space-s)]
          border-b border-[var(--color-gray-light)]
          ${className}
        `.replace(/\s+/g, ' ').trim()}
      >
        <Avatar src={avatarSrc} alt={name} size="lg" />
        <div className="flex-1 flex flex-col gap-[var(--space-xs)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-bold">{name}</p>
              <p className="text-pixel">{role}</p>
            </div>
            {status && <Status variant={status} showLabel />}
          </div>
          {progress !== undefined && <Bar progress={progress} />}
        </div>
      </div>
    );
  }

  const bgColor = variant === 'short-outlined'
    ? 'var(--color-gray-light)'
    : 'var(--color-coral)';

  return (
    <div
      className={`
        flex items-center gap-[var(--space-s)]
        p-[var(--space-s)]
        rounded-[var(--radius-sm)]
        ${className}
      `.replace(/\s+/g, ' ').trim()}
      style={{ backgroundColor: bgColor }}
    >
      <Avatar src={avatarSrc} alt={name} size="md" />
      <div>
        <p className="text-bold">{name}</p>
        <p className="text-pixel">{role}</p>
      </div>
    </div>
  );
}
