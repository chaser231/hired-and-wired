type StatusVariant = 'green' | 'red' | 'purple' | 'stopped';

interface StatusProps {
  variant: StatusVariant;
  showLabel?: boolean;
  label?: string; // Custom label override
  className?: string;
}

const variantConfig: Record<StatusVariant, { color: string; label: string }> = {
  purple: { color: 'var(--color-purple)', label: 'ROCKET GROWTH' },
  green: { color: 'var(--color-success)', label: 'ON TRACK' },
  red: { color: 'var(--color-error)', label: 'FAILED' },
  stopped: { color: 'var(--color-gray-medium)', label: 'STOPPED' },
};

export function Status({ variant, showLabel = false, label: customLabel, className = '' }: StatusProps) {
  const { color, label: defaultLabel } = variantConfig[variant];
  const displayLabel = customLabel || defaultLabel;

  if (showLabel) {
    return (
      <div className={`flex items-center gap-[10px] ${className}`}>
        <div
          className="w-[5px] h-[5px] rounded-full"
          style={{ backgroundColor: color }}
        />
        <span className="text-pixel" style={{ color }}>
          {displayLabel}
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
