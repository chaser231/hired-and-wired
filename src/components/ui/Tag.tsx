import { Icon } from './Icon';

type TagVariant = 'static' | 'control';

interface TagProps {
  children: React.ReactNode;
  variant?: TagVariant;
  onRemove?: () => void;
  className?: string;
}

export function Tag({ children, variant = 'static', onRemove, className = '' }: TagProps) {
  const isControl = variant === 'control';

  return (
    <span
      className={`
        inline-flex items-center justify-center gap-[10px]
        rounded-[var(--radius-sm)]
        text-pixel
        ${isControl
          ? 'px-[var(--space-xs)] h-6 bg-[var(--color-gray-light)]'
          : 'px-[var(--space-s)] h-8 bg-[var(--color-yellow-bright)]'
        }
        ${className}
      `.replace(/\s+/g, ' ').trim()}
    >
      {children}
      {isControl && onRemove && (
        <button
          onClick={onRemove}
          className="hover:opacity-70 transition-opacity"
          type="button"
        >
          <Icon name="close" size="sm" />
        </button>
      )}
    </span>
  );
}
