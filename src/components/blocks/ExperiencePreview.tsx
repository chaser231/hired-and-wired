interface ExperiencePreviewProps {
  period: string;
  title: string;
  company: string;
  description: string;
  className?: string;
}

export function ExperiencePreview({
  period,
  title,
  company,
  description,
  className = '',
}: ExperiencePreviewProps) {
  return (
    <div
      className={`
        p-[var(--space-s)]
        border-t border-[var(--color-gray-light)]
        ${className}
      `.replace(/\s+/g, ' ').trim()}
    >
      <p className="text-pixel mb-[var(--space-xs)]">{period}</p>
      <div className="flex flex-col">
        <p className="text-bold">{title}</p>
        <div className="flex flex-col mt-[var(--space-xxs)]">
          <p className="text-grotesk">{company}</p>
          <p className="text-grotesk mt-[var(--space-xxs)]">{description}</p>
        </div>
      </div>
    </div>
  );
}
