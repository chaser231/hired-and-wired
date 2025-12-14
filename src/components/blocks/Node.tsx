import { Icon } from '../ui/Icon';

interface NodeProps {
  title: string;
  description: string;
  onPlay?: () => void;
  onMore?: () => void;
  className?: string;
}

export function Node({
  title,
  description,
  onPlay,
  onMore,
  className = '',
}: NodeProps) {
  return (
    <div
      className={`
        p-[var(--space-s)]
        bg-[var(--color-pink-light)]
        rounded-[var(--radius-md)]
        ${className}
      `.replace(/\s+/g, ' ').trim()}
    >
      <div className="flex items-start justify-between gap-[var(--space-s)]">
        <div className="flex items-center gap-[var(--space-xs)]">
          {onPlay && (
            <button onClick={onPlay} className="hover:opacity-70 transition-opacity">
              <Icon name="play" size="sm" />
            </button>
          )}
          {onMore && (
            <button onClick={onMore} className="hover:opacity-70 transition-opacity">
              <Icon name="more" size="sm" />
            </button>
          )}
        </div>
        <div className="flex-1">
          <p className="text-bold">{title}</p>
          <p className="text-pixel mt-[var(--space-xxs)]">{description}</p>
        </div>
      </div>
    </div>
  );
}
