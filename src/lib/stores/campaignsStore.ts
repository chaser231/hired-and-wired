import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Campaign } from '@/types/campaign';

// Initial mock campaigns for existing teams
const initialCampaigns: Campaign[] = [
  // Engineering Team (id: 1)
  {
    id: 'c1',
    teamId: '1',
    title: 'Forward Architect',
    status: 'green',
    stats: { applied: 45, rejected: 12, inProgress: 98, finalRound: 112, offersSent: 6 },
    createdAt: '2024-01-15',
  },
  {
    id: 'c2',
    teamId: '1',
    title: 'District Integration Engineer',
    status: 'green',
    stats: { applied: 78, rejected: 7, inProgress: 89, finalRound: 34, offersSent: 1 },
    createdAt: '2024-02-01',
  },
  {
    id: 'c3',
    teamId: '1',
    title: 'Dynamic Program Liaison',
    status: 'green',
    stats: { applied: 23, rejected: 678, inProgress: 8, finalRound: 90, offersSent: 45 },
    createdAt: '2024-02-15',
  },
  {
    id: 'c4',
    teamId: '1',
    title: 'Product Tactics Manager',
    status: 'green',
    stats: { applied: 15, rejected: 5, inProgress: 167, finalRound: 90, offersSent: 2 },
    createdAt: '2024-03-01',
  },
  // Design Team (id: 2)
  {
    id: 'c5',
    teamId: '2',
    title: 'Senior UX Designer',
    status: 'green',
    stats: { applied: 120, rejected: 45, inProgress: 30, finalRound: 15, offersSent: 3 },
    createdAt: '2024-02-10',
  },
  {
    id: 'c6',
    teamId: '2',
    title: 'Visual Design Lead',
    status: 'purple',
    stats: { applied: 85, rejected: 20, inProgress: 40, finalRound: 10, offersSent: 2 },
    createdAt: '2024-03-05',
  },
  // Product Team (id: 3)
  {
    id: 'c7',
    teamId: '3',
    title: 'Product Manager',
    status: 'green',
    stats: { applied: 200, rejected: 80, inProgress: 60, finalRound: 25, offersSent: 5 },
    createdAt: '2024-01-20',
  },
  // Marketing Team (id: 4)
  {
    id: 'c8',
    teamId: '4',
    title: 'Content Marketing Specialist',
    status: 'green',
    stats: { applied: 95, rejected: 30, inProgress: 45, finalRound: 12, offersSent: 2 },
    createdAt: '2024-02-25',
  },
  {
    id: 'c9',
    teamId: '4',
    title: 'Growth Marketing Manager',
    status: 'stopped',
    stats: { applied: 150, rejected: 60, inProgress: 0, finalRound: 0, offersSent: 0 },
    createdAt: '2024-01-10',
  },
  // Sales Team (id: 5)
  {
    id: 'c10',
    teamId: '5',
    title: 'Enterprise Account Executive',
    status: 'green',
    stats: { applied: 180, rejected: 90, inProgress: 50, finalRound: 20, offersSent: 4 },
    createdAt: '2024-03-10',
  },
  // HR Team (id: 6) - no campaigns yet
];

interface CampaignsState {
  campaigns: Campaign[];
  getCampaignsByTeam: (teamId: string) => Campaign[];
  getCampaign: (id: string) => Campaign | undefined;
  addCampaign: (campaign: Omit<Campaign, 'id' | 'createdAt'>) => void;
  updateCampaign: (id: string, updates: Partial<Campaign>) => void;
  deleteCampaign: (id: string) => void;
}

export const useCampaignsStore = create<CampaignsState>()(
  persist(
    (set, get) => ({
      campaigns: initialCampaigns,

      getCampaignsByTeam: (teamId) => {
        return get().campaigns.filter((c) => c.teamId === teamId);
      },

      getCampaign: (id) => {
        return get().campaigns.find((c) => c.id === id);
      },

      addCampaign: (campaignData) => {
        const newCampaign: Campaign = {
          id: `c${Date.now()}`,
          ...campaignData,
          createdAt: new Date().toISOString().split('T')[0],
        };

        set((state) => ({
          campaigns: [...state.campaigns, newCampaign],
        }));
      },

      updateCampaign: (id, updates) => {
        set((state) => ({
          campaigns: state.campaigns.map((c) =>
            c.id === id ? { ...c, ...updates } : c
          ),
        }));
      },

      deleteCampaign: (id) => {
        set((state) => ({
          campaigns: state.campaigns.filter((c) => c.id !== id),
        }));
      },
    }),
    {
      name: 'hr-assist-campaigns',
    }
  )
);

