type AttemptVariant = 'past' | 'next';

interface AttemptProps {
  label: string;
  date: string;
  initialSalary: string;
  finalSalary?: string;
  variant?: AttemptVariant;
  className?: string;
}

export function Attempt({
  label,
  date,
  initialSalary,
  finalSalary,
  variant = 'past',
  className = '',
}: AttemptProps) {
  const isPast = variant === 'past';

  return (
    <div
      className={`
        p-[var(--space-m)]
        rounded-[var(--radius-lg)]
        ${isPast ? 'bg-[var(--color-white)]' : 'bg-[var(--color-yellow)]'}
        ${className}
      `.replace(/\s+/g, ' ').trim()}
    >
      <p className="text-pixel mb-[var(--space-s)]">{label}</p>
      
      <div className="space-y-[var(--space-xs)]">
        <div className="flex items-center justify-between">
          <span className="text-grotesk" style={{ color: 'var(--color-gray-dark)' }}>
            Date
          </span>
          <span className="text-pixel">{date}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-grotesk" style={{ color: 'var(--color-gray-dark)' }}>
            Initial salary
          </span>
          <span className="text-pixel">{initialSalary}</span>
        </div>
        
        {finalSalary && (
          <div className="flex items-center justify-between">
            <span className="text-grotesk" style={{ color: 'var(--color-gray-dark)' }}>
              Final salary
            </span>
            <span className="text-pixel">{finalSalary}</span>
          </div>
        )}
      </div>
    </div>
  );
}
