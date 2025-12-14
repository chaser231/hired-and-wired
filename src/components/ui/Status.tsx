type StatusVariant = 'green' | 'red' | 'purple' | 'stopped';

interface StatusProps {
  variant: StatusVariant;
  className?: string;
}

const variantStyles: Record<StatusVariant, string> = {
  green: 'bg-[var(--color-success)]',
  red: 'bg-[var(--color-error)]',
  purple: 'bg-[var(--color-purple)]',
  stopped: 'bg-[var(--color-gray-medium)]',
};

export function Status({ variant, className = '' }: StatusProps) {
  return (
    <div
      className={`w-4 h-4 rounded-full ${variantStyles[variant]} ${className}`}
    />
  );
}
