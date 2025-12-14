import { Icon } from './Icon';

type TagVariant = 'static' | 'control';

interface TagProps {
  children: React.ReactNode;
  variant?: TagVariant;
  onRemove?: () => void;
  className?: string;
}

export function Tag({ children, variant = 'static', onRemove, className = '' }: TagProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-[var(--space-xxs)]
        px-[var(--space-xs)] py-[var(--space-xxxs)]
        bg-[var(--color-yellow-bright)]
        rounded-[var(--radius-sm)]
        text-caps
        ${className}
      `.replace(/\s+/g, ' ').trim()}
    >
      {children}
      {variant === 'control' && onRemove && (
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
