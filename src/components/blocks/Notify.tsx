interface NotifyProps {
  message: string;
  className?: string;
}

export function Notify({ message, className = '' }: NotifyProps) {
  return (
    <div
      className={`
        p-[var(--space-m)]
        bg-[var(--color-mint)]
        rounded-[var(--radius-lg)]
        ${className}
      `.replace(/\s+/g, ' ').trim()}
    >
      <p className="text-grotesk" style={{ color: 'var(--color-success)' }}>
        {message}
      </p>
    </div>
  );
}
