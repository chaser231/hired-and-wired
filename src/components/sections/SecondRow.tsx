'use client';

import { Button } from '../ui/Button';

type SecondRowVariant = 'default' | 'builder';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface SecondRowProps {
  variant?: SecondRowVariant;
  breadcrumbs?: BreadcrumbItem[];
  onBack?: () => void;
  onSave?: () => void;
  onDeploy?: () => void;
  className?: string;
}

export function SecondRow({
  variant = 'default',
  breadcrumbs = [],
  onBack,
  onSave,
  onDeploy,
  className = '',
}: SecondRowProps) {
  return (
    <div
      className={`
        flex items-center justify-between
        px-[var(--space-m)] py-[var(--space-xs)]
        ${className}
      `.replace(/\s+/g, ' ').trim()}
    >
      {/* Left section: Back + Breadcrumbs */}
      <div className="flex items-center gap-[var(--space-s)]">
        <Button variant="on-color" onClick={onBack}>
          Back
        </Button>

        {variant === 'default' && breadcrumbs.length > 0 && (
          <div className="flex items-center gap-[var(--space-xs)]">
            {breadcrumbs.map((crumb, index) => (
              <span key={index} className="flex items-center gap-[var(--space-xs)]">
                {index > 0 && <span className="text-grotesk">•</span>}
                <span className="text-grotesk">{crumb.label}</span>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Right section: Save + Deploy (builder variant) */}
      {variant === 'builder' && (
        <div className="flex items-center gap-[var(--space-xs)]">
          <Button variant="on-color" onClick={onSave}>
            save
          </Button>
          <Button variant="cta-small" onClick={onDeploy}>
            deploy
          </Button>
        </div>
      )}
    </div>
  );
}
