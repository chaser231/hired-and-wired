interface ListItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function ListItem({ children, onClick, className = '' }: ListItemProps) {
  const Component = onClick ? 'button' : 'div';

  return (
    <Component
      onClick={onClick}
      className={`
        w-full
        flex items-center
        px-[var(--space-s)] py-[var(--space-xs)]
        text-grotesk text-left
        border-b border-[var(--color-gray-light)]
        last:border-b-0
        ${onClick ? 'hover:bg-[var(--color-gray-bg)] cursor-pointer' : ''}
        ${className}
      `.replace(/\s+/g, ' ').trim()}
    >
      {children}
    </Component>
  );
}

interface ListProps {
  children: React.ReactNode;
  className?: string;
}

export function List({ children, className = '' }: ListProps) {
  return (
    <div
      className={`
        bg-[var(--color-white)]
        border border-[var(--color-gray-light)]
        rounded-[var(--radius-md)]
        overflow-hidden
        ${className}
      `.replace(/\s+/g, ' ').trim()}
    >
      {children}
    </div>
  );
}
