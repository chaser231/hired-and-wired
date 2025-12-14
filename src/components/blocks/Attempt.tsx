import { Status } from '../ui/Status';

type AttemptVariant = 'past' | 'next';
type StatusVariant = 'green' | 'red' | 'purple' | 'stopped';

interface SalaryOffer {
  amount: string;
  benefits: string[];
}

interface AttemptProps {
  label: string;
  leftOffer: SalaryOffer;
  rightOffer: SalaryOffer;
  status?: StatusVariant;
  statusLabel?: string;
  variant?: AttemptVariant;
  className?: string;
}

export function Attempt({
  label,
  leftOffer,
  rightOffer,
  status,
  statusLabel,
  variant = 'past',
  className = '',
}: AttemptProps) {
  const isPast = variant === 'past';

  return (
    <div
      className={`
        flex flex-col gap-[var(--space-l)]
        p-[var(--space-xl)]
        rounded-[var(--radius-lg)]
        bg-[var(--color-white)]
        ${className}
      `.replace(/\s+/g, ' ').trim()}
    >
      <p className="text-pixel">{label}</p>
      
      <div className="flex justify-between gap-[60px]">
        {/* Left Offer */}
        <div className="flex flex-col gap-[var(--space-s)] w-[290px]">
          <p className="text-h2">{leftOffer.amount}</p>
          <div className="flex flex-col gap-[var(--space-xs)]">
            {leftOffer.benefits.map((benefit, index) => (
              <p 
                key={index} 
                className="text-pixel"
                style={{ color: 'var(--color-gray-dark)' }}
              >
                {benefit}
              </p>
            ))}
          </div>
        </div>

        {/* Status (only for past variant) */}
        {isPast && status && (
          <div className="flex items-center">
            <Status variant={status} showLabel label={statusLabel} />
          </div>
        )}

        {/* Right Offer */}
        <div className="flex flex-col items-end justify-start gap-[var(--space-s)] w-[290px]">
          <p className="text-h2" style={{ textAlign: 'right' }}>{rightOffer.amount}</p>
          <div className="flex flex-col gap-[var(--space-xs)]" style={{ textAlign: 'right' }}>
            {rightOffer.benefits.map((benefit, index) => (
              <p 
                key={index} 
                className="text-pixel"
                style={{ color: 'var(--color-gray-dark)' }}
              >
                {benefit}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
