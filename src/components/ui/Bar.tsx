type BarSize = 'default' | 'big';

interface BarProps {
  progress: number; // 0-100
  size?: BarSize;
  className?: string;
}

const sizeStyles: Record<BarSize, string> = {
  default: 'h-1',
  big: 'h-2',
};

export function Bar({ progress, size = 'default', className = '' }: BarProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div
      className={`
        w-full
        bg-[var(--color-gray-light)]
        rounded-[var(--radius-full)]
        overflow-hidden
        ${sizeStyles[size]}
        ${className}
      `.replace(/\s+/g, ' ').trim()}
    >
      <div
        className="h-full bg-[var(--color-black)] rounded-[var(--radius-full)] transition-all"
        style={{ width: `${clampedProgress}%` }}
      />
    </div>
  );
}
