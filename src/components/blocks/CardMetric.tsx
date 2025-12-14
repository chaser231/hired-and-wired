interface CardMetricProps {
  title: string;
  summary?: string;
  className?: string;
}

export function CardMetric({
  title,
  summary,
  className = '',
}: CardMetricProps) {
  return (
    <div
      className={`
        p-[var(--space-m)]
        bg-[var(--color-mint)]
        rounded-[var(--radius-lg)]
        ${className}
      `.replace(/\s+/g, ' ').trim()}
    >
      <p className="text-bold mb-[var(--space-s)]">{title}</p>
      {summary && (
        <p className="text-pixel">{summary}</p>
      )}
    </div>
  );
}

interface CardsMetricaProps {
  title: string;
  value: number | string;
  label: string;
  className?: string;
}

export function CardsMetrica({
  title,
  value,
  label,
  className = '',
}: CardsMetricaProps) {
  return (
    <div
      className={`
        p-[var(--space-m)]
        bg-[var(--color-white)]
        rounded-[var(--radius-lg)]
        ${className}
      `.replace(/\s+/g, ' ').trim()}
    >
      <p className="text-h2 mb-[var(--space-s)]">{title}</p>
      <div>
        <p className="text-h1">{value}</p>
        <p className="text-pixel">{label}</p>
      </div>
    </div>
  );
}
