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
          flex items-center gap-[var(--space-s)]
          py-[var(--space-s)]
          border-b border-[var(--color-gray-light)]
          ${className}
        `.replace(/\s+/g, ' ').trim()}
      >
        {/* Avatar 30x30 */}
        <div className="w-[30px] h-[30px] flex-shrink-0">
          <Avatar src={avatarSrc} alt={name} size="md" className="w-full h-full" />
        </div>
        
        {/* Content: Name/Role + Status - fixed width 333px as in Figma */}
        <div className="flex justify-between gap-[var(--space-m)]" style={{ width: '333px' }}>
          {/* Name and Role */}
          <div className="flex flex-col gap-[var(--space-xs)]" style={{ width: '243px' }}>
            <p className="text-h3">{name}</p>
            <p className="text-pixel">{role}</p>
          </div>
          
          {/* Status */}
          {status && <Status variant={status} showLabel />}
        </div>
        
        {/* Progress Bar - fills remaining space */}
        {progress !== undefined && (
          <div className="flex-1">
            <Bar progress={progress} variant="profile" />
          </div>
        )}
      </div>
    );
  }

  const bgColor = variant === 'short-outlined'
    ? 'var(--color-gray-light)'
    : 'var(--color-coral)';

  return (
    <div
      className={`
        flex items-center justify-start gap-[var(--space-s)]
        p-[var(--space-s)]
        rounded-[var(--radius-sm)]
        ${className}
      `.replace(/\s+/g, ' ').trim()}
      style={{ backgroundColor: bgColor }}
    >
      <Avatar src={avatarSrc} alt={name} size="md" />
      <div className="flex flex-col gap-[var(--space-xs)]">
        <p className="text-bold" style={{ fontSize: '20px' }}>{name}</p>
        <p className="text-pixel">{role}</p>
      </div>
    </div>
  );
}
