import { Status } from '../ui/Status';
import { Button } from '../ui/Button';

type StatusVariant = 'green' | 'red' | 'purple' | 'stopped';

interface CampaignStats {
  applied: number;
  rejected: number;
  inProgress: number;
  finalRound: number;
  offersSent: number;
}

interface CampaignPreviewProps {
  title: string;
  status: StatusVariant;
  stats: CampaignStats;
  onMoreInfo?: () => void;
  className?: string;
}

export function CampaignPreview({
  title,
  status,
  stats,
  onMoreInfo,
  className = '',
}: CampaignPreviewProps) {
  const statItems = [
    { value: stats.applied, label: 'applied' },
    { value: stats.rejected, label: 'rejected' },
    { value: stats.inProgress, label: 'in progress' },
    { value: stats.finalRound, label: 'final round' },
    { value: stats.offersSent, label: 'offers sent' },
  ];

  return (
    <div
      className={`
        p-[var(--space-m)]
        bg-[var(--color-white)]
        rounded-[var(--radius-lg)]
        ${className}
      `.replace(/\s+/g, ' ').trim()}
    >
      <div className="flex items-center justify-between mb-[var(--space-m)]">
        <h3 className="text-h2">{title}</h3>
        <div className="flex items-center gap-[var(--space-s)]">
          <Status variant={status} showLabel />
          {onMoreInfo && (
            <Button variant="secondary" onClick={onMoreInfo}>
              more info
            </Button>
          )}
        </div>
      </div>

      <div className="flex gap-[var(--space-m)]">
        {statItems.map((item) => (
          <div key={item.label} className="flex-1">
            <p className="text-h1">{item.value}</p>
            <p className="text-pixel" style={{ color: 'var(--color-gray-dark)' }}>
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
