'use client';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  disabled?: boolean;
  className?: string;
}

export function Switch({
  checked,
  onChange,
  label,
  disabled = false,
  className = '',
}: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`
        h-8 px-[var(--space-s)]
        flex items-center justify-center
        rounded-[var(--radius-sm)]
        text-pixel
        transition-colors
        ${checked ? 'bg-[var(--color-white)]' : 'bg-transparent'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:opacity-80'}
        ${className}
      `.replace(/\s+/g, ' ').trim()}
    >
      {label}
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
        inline-flex items-center
        gap-[2px] p-1
        bg-[var(--color-yellow)]
        rounded-[var(--radius-md)]
        ${className}
      `.replace(/\s+/g, ' ').trim()}
    >
      {options.map((option) => (
        <Switch
          key={option}
          checked={value === option}
          onChange={() => onChange(option)}
          label={option}
        />
      ))}
    </div>
  );
}
