import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-[var(--space-xs)]">
        {label && (
          <label
            className="text-pixel"
            style={{
              fontFamily: 'var(--font-akkurat)',
              fontSize: '8px',
              fontWeight: 400,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            {label}
          </label>
        )}
        <div
          className={`
            flex items-center
            px-[var(--space-s)] py-[var(--space-xs)]
            bg-[var(--color-gray-light)]
            rounded-[var(--radius-sm)]
            ${error ? 'ring-1 ring-[var(--color-error)]' : ''}
          `.replace(/\s+/g, ' ').trim()}
        >
          <input
            ref={ref}
            className={`
              w-full
              bg-transparent
              text-pixel
              placeholder:text-[var(--color-gray-medium)]
              focus:outline-none
              ${className}
            `.replace(/\s+/g, ' ').trim()}
            {...props}
          />
        </div>
        {error && (
          <span className="text-pixel text-[var(--color-error)]">{error}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
