type StatusVariant = 'green' | 'red' | 'purple' | 'stopped';

interface StatusProps {
  variant: StatusVariant;
  showLabel?: boolean;
  className?: string;
}

const variantConfig: Record<StatusVariant, { color: string; label: string }> = {
  purple: { color: 'var(--color-purple)', label: 'ROCKET GROWTH' },
  green: { color: 'var(--color-success)', label: 'ON TRACK' },
  red: { color: 'var(--color-error)', label: 'FAILING' },
  stopped: { color: 'var(--color-gray-medium)', label: 'FAILING' },
};

export function Status({ variant, showLabel = false, className = '' }: StatusProps) {
  const { color, label } = variantConfig[variant];

  if (showLabel) {
    return (
      <div className={`flex items-center gap-[10px] ${className}`}>
        <div
          className="w-[5px] h-[5px] rounded-full"
          style={{ backgroundColor: color }}
        />
        <span className="text-pixel" style={{ color }}>
          {label}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`w-[5px] h-[5px] rounded-full ${className}`}
      style={{ backgroundColor: color }}
    />
  );
}
