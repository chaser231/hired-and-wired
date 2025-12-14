import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-[var(--space-xxs)]">
        {label && (
          <label className="text-caps text-[var(--color-gray-dark)]">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            w-full
            px-[var(--space-s)] py-[var(--space-xs)]
            bg-[var(--color-white)]
            border border-[var(--color-gray-light)]
            rounded-[var(--radius-sm)]
            text-grotesk
            placeholder:text-[var(--color-gray-dark)]
            focus:outline-none focus:border-[var(--color-black)]
            transition-colors
            ${error ? 'border-[var(--color-error)]' : ''}
            ${className}
          `.replace(/\s+/g, ' ').trim()}
          {...props}
        />
        {error && (
          <span className="text-caps text-[var(--color-error)]">{error}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
