interface NotifyProps {
  message: string;
  className?: string;
}

export function Notify({ message, className = '' }: NotifyProps) {
  return (
    <div
      className={`
        flex flex-col gap-[var(--space-s)]
        p-[var(--space-xl)]
        bg-[var(--color-mint)]
        rounded-[var(--radius-lg)]
        ${className}
      `.replace(/\s+/g, ' ').trim()}
    >
      <p className="text-description" style={{ color: 'var(--color-success)' }}>
        {message}
      </p>
    </div>
  );
}
