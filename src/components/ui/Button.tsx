import { ButtonHTMLAttributes, forwardRef } from 'react';

type ButtonVariant = 'cta-big' | 'cta-small' | 'secondary' | 'color' | 'on-color' | 'node';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
  /** For node variant - description text */
  description?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  'cta-big': `
    px-[var(--space-l)] py-[var(--space-s)]
    bg-[var(--color-black)] text-[var(--color-white)]
    rounded-[var(--radius-full)]
    text-h2
  `,
  'cta-small': `
    px-[var(--space-m)] py-[var(--space-xs)]
    bg-[var(--color-black)] text-[var(--color-white)]
    rounded-[var(--radius-full)]
    text-pixel
  `,
  secondary: `
    px-[var(--space-m)] py-[var(--space-xs)]
    bg-[var(--color-gray-light)] text-[var(--color-black)]
    rounded-[var(--radius-full)]
    text-pixel
  `,
  color: `
    px-[var(--space-m)] py-[var(--space-xs)]
    bg-[var(--color-gold)] text-[var(--color-white)]
    rounded-[var(--radius-full)]
    text-pixel
  `,
  'on-color': `
    px-[var(--space-m)] py-[var(--space-xs)]
    bg-[var(--color-white)] text-[var(--color-black)]
    rounded-[var(--radius-full)]
    text-pixel
  `,
  node: `
    p-[var(--space-s)]
    bg-[var(--color-coral)] text-[var(--color-black)]
    rounded-[var(--radius-sm)]
  `,
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'cta-small', children, description, className = '', ...props }, ref) => {
    const baseStyles = `
      transition-opacity
      hover:opacity-80
      disabled:opacity-50 disabled:cursor-not-allowed
    `;

    // Node variant has special layout
    if (variant === 'node') {
      return (
        <button
          ref={ref}
          className={`
            ${baseStyles}
            ${variantStyles[variant]}
            flex flex-col gap-[var(--space-xs)]
            ${className}
          `.replace(/\s+/g, ' ').trim()}
          {...props}
        >
          <span className="text-bold">{children}</span>
          {description && <span className="text-pixel">{description}</span>}
        </button>
      );
    }

    return (
      <button
        ref={ref}
        className={`
          ${baseStyles}
          ${variantStyles[variant]}
          inline-flex items-center justify-center
          ${className}
        `.replace(/\s+/g, ' ').trim()}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
