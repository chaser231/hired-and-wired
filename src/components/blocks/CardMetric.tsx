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

type CardMetricColor = 'mint' | 'pink-light' | 'pink' | 'purple-light' | 'green-light';

const colorMap: Record<CardMetricColor, string> = {
  'mint': 'var(--color-mint)',
  'pink-light': 'var(--color-pink-light)',
  'pink': 'var(--color-pink)',
  'purple-light': 'var(--color-purple-light)',
  'green-light': 'var(--color-green-light)',
};

interface CardMetricProps {
  title: string;
  summary?: string;
  graphBars?: number[];
  color?: CardMetricColor;
  className?: string;
}

export function CardMetric({
  title,
  summary,
  graphBars = [100, 58],
  color = 'mint',
  className = '',
}: CardMetricProps) {
  return (
    <div
      className={`
        flex flex-col gap-[var(--space-l)]
        flex-1
        p-[var(--space-xl)]
        rounded-[var(--radius-lg)]
        ${className}
      `.replace(/\s+/g, ' ').trim()}
      style={{ backgroundColor: colorMap[color] }}
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
