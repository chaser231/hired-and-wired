export interface CampaignStats {
  applied: number;
  rejected: number;
  inProgress: number;
  finalRound: number;
  offersSent: number;
}

export interface Campaign {
  id: string;
  teamId: string;
  title: string;
  status: 'green' | 'red' | 'purple' | 'stopped';
  stats: CampaignStats;
  createdAt: string;
}

