type SwitchSize = 'default' | 'big';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  size?: SwitchSize;
  disabled?: boolean;
  className?: string;
}

const sizeStyles: Record<SwitchSize, { track: string; thumb: string; translate: string }> = {
  default: {
    track: 'w-10 h-5',
    thumb: 'w-4 h-4',
    translate: 'translate-x-5',
  },
  big: {
    track: 'w-14 h-7',
    thumb: 'w-6 h-6',
    translate: 'translate-x-7',
  },
};

export function Switch({
  checked,
  onChange,
  size = 'default',
  disabled = false,
  className = '',
}: SwitchProps) {
  const styles = sizeStyles[size];

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`
        relative inline-flex items-center
        ${styles.track}
        rounded-[var(--radius-full)]
        transition-colors
        ${checked ? 'bg-[var(--color-yellow)]' : 'bg-[var(--color-gray-light)]'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `.replace(/\s+/g, ' ').trim()}
    >
      <span
        className={`
          ${styles.thumb}
          bg-[var(--color-white)]
          rounded-full
          shadow-sm
          transition-transform
          ${checked ? styles.translate : 'translate-x-0.5'}
        `.replace(/\s+/g, ' ').trim()}
      />
    </button>
  );
}

interface SwitchGroupProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function SwitchGroup({ options, value, onChange, className = '' }: SwitchGroupProps) {
  return (
    <div
      className={`
        inline-flex
        bg-[var(--color-yellow)]
        rounded-[var(--radius-md)]
        p-[var(--space-xxxs)]
        ${className}
      `.replace(/\s+/g, ' ').trim()}
    >
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={`
            px-[var(--space-s)] py-[var(--space-xxs)]
            rounded-[var(--radius-sm)]
            text-caps
            transition-colors
            ${value === option
              ? 'bg-[var(--color-white)] text-[var(--color-black)]'
              : 'bg-transparent text-[var(--color-black)] hover:opacity-70'
            }
          `.replace(/\s+/g, ' ').trim()}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
