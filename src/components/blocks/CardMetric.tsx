// Simple bar graph component
interface GraphProps {
  bars?: number[]; // Heights as percentages (0-100)
  className?: string;
}

function Graph({ bars = [100, 58], className = '' }: GraphProps) {
  return (
    <div
      className={`flex gap-[2px] h-[82px] ${className}`}
    >
      {bars.map((height, index) => (
        <div
          key={index}
          className="flex-1 bg-[var(--color-gray-bg)] rounded-[var(--radius-sm)]"
          style={{ 
            height: `${height}%`,
            alignSelf: 'flex-end'
          }}
        />
      ))}
    </div>
  );
}

interface CardMetricProps {
  title: string;
  summary?: string;
  graphBars?: number[];
  className?: string;
}

export function CardMetric({
  title,
  summary,
  graphBars = [100, 58],
  className = '',
}: CardMetricProps) {
  return (
    <div
      className={`
        flex flex-col gap-[var(--space-l)]
        w-[190px] h-[195px]
        p-[var(--space-xl)]
        bg-[var(--color-mint)]
        rounded-[var(--radius-lg)]
        ${className}
      `.replace(/\s+/g, ' ').trim()}
    >
      <p className="text-bold">{title}</p>
      <div className="flex flex-col gap-[var(--space-xs)] flex-1">
        <Graph bars={graphBars} className="flex-1" />
        {summary && (
          <p className="text-pixel">{summary}</p>
        )}
      </div>
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
        flex flex-col justify-between gap-[var(--space-l)]
        w-[224px] h-[254px]
        p-[var(--space-xl)]
        bg-[var(--color-white)]
        rounded-[var(--radius-lg)]
        ${className}
      `.replace(/\s+/g, ' ').trim()}
    >
      <p
        className="text-bold"
        style={{ fontFamily: 'var(--font-instrument)', fontSize: '30px', fontWeight: 400 }}
      >
        {title}
      </p>
      <div className="flex flex-col gap-[var(--space-xs)]">
        <p className="text-h2" style={{ fontSize: '84px' }}>{value}</p>
        <p className="text-pixel">{label}</p>
      </div>
    </div>
  );
}
