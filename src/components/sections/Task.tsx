'use client';

import { Flag } from '../ui/Flag';
import { Button } from '../ui/Button';

type TaskVariant = 'past' | 'next';

interface TaskProps {
  title: string;
  variant?: TaskVariant;
  isCompleted?: boolean;
  hasError?: boolean;
  errorMessage?: string;
  buttonLabel?: string;
  showButton?: boolean;
  onToggle?: () => void;
  onButtonClick?: () => void;
  className?: string;
}

export function Task({
  title,
  variant = 'past',
  isCompleted = false,
  hasError = false,
  errorMessage = 'some field need your attention',
  buttonLabel = 'job description',
  showButton = true,
  onToggle,
  onButtonClick,
  className = '',
}: TaskProps) {
  const isPast = variant === 'past';

  return (
    <div
      className={`
        flex gap-[var(--space-s)]
        py-[var(--space-s)]
        border-b border-[var(--color-gray-light)]
        ${className}
      `.replace(/\s+/g, ' ').trim()}
    >
      {/* Flag */}
      <button onClick={onToggle} className="flex-shrink-0 hover:opacity-80 transition-opacity">
        <Flag variant={isCompleted ? 'yes' : 'no'} />
      </button>

      {/* Content */}
      <div className="flex flex-col gap-[var(--space-xs)]">
        {/* Title */}
        <p
          className="text-bold"
          style={{
            color: isPast ? 'var(--color-gray-dark)' : 'var(--color-black)',
          }}
        >
          {title}
        </p>

        {/* Error */}
        {hasError && (
          <div
            className="flex gap-[var(--space-s)] items-center px-[var(--space-xs)] py-[var(--space-xxs)] rounded-[var(--radius-sm)]"
            style={{ backgroundColor: 'var(--color-coral)' }}
          >
            <span
              className="text-caps"
              style={{ color: 'var(--color-error)' }}
            >
              error!
            </span>
            <span
              className="text-caps"
              style={{ color: 'var(--color-error)' }}
            >
              {errorMessage}
            </span>
          </div>
        )}

        {/* Button */}
        {showButton && (
          <Button variant="secondary" onClick={onButtonClick}>
            {buttonLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
