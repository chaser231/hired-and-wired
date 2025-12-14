interface ErrorBlockProps {
  title?: string;
  message: string;
  className?: string;
}

export function ErrorBlock({ title = 'error!', message, className = '' }: ErrorBlockProps) {
  return (
    <div
      className={`
        p-[var(--space-s)]
        bg-[var(--color-coral)]
        rounded-[var(--radius-sm)]
        ${className}
      `.replace(/\s+/g, ' ').trim()}
    >
      <p className="text-bold text-[var(--color-error)]">{title}</p>
      <p className="text-grotesk text-[var(--color-error)] mt-[var(--space-xxxs)]">
        {message}
      </p>
    </div>
  );
}
