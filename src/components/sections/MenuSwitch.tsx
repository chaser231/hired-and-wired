interface MenuSwitchProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export function MenuSwitch({
  label,
  isActive = false,
  onClick,
  className = '',
}: MenuSwitchProps) {
  return (
    <button
      onClick={onClick}
      className={`
        px-[var(--space-s)] py-[var(--space-xs)]
        text-grotesk
        rounded-[var(--radius-sm)]
        transition-all
        hover:opacity-80
        ${isActive ? 'border border-[var(--color-black)]' : ''}
        ${className}
      `.replace(/\s+/g, ' ').trim()}
    >
      {label}
    </button>
  );
}
