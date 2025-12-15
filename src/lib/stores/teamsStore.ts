import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Team, TeamMember } from '@/types/team';

// Default team members for new teams
const defaultMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Sarah Mitchell',
    role: 'Senior Software Engineer',
    avatarSrc: '/assets/avatar-katya.png',
    status: 'green',
    progress: 75,
  },
  {
    id: '2',
    name: 'Michael Smith',
    role: 'Product Manager',
    avatarSrc: '/assets/avatar-petya.png',
    status: 'purple',
    progress: 85,
  },
  {
    id: '3',
    name: 'Emily Davis',
    role: 'UX Designer',
    avatarSrc: '/assets/avatar-katya.png',
    status: 'green',
    progress: 60,
  },
];

// Cover images to rotate through
const coverImages = [
  '/assets/Cover Image.jpg',
  '/assets/Cover Image-1.jpg',
  '/assets/Cover Image-2.jpg',
  '/assets/Cover Image-3.jpg',
  '/assets/Cover Image-4.jpg',
  '/assets/Cover Image-5.jpg',
  '/assets/Cover Image-6.jpg',
];

// Initial mock teams
const initialTeams: Team[] = [
  {
    id: '1',
    name: 'Engineering Team',
    description: 'Building the future of HR technology',
    department: 'engineering',
    teamLead: 'sarah',
    coverSrc: '/assets/Cover Image-1.jpg',
    memberCount: 24,
    productivity: 89,
    weekHighlight: 'Kai finished the UI designs, Anya onboarded 3 new hires, and the team had a successful offsite event.',
    members: [
      { id: '1', name: 'Sarah Mitchell', role: 'Senior Software Engineer', avatarSrc: '/assets/avatar-katya.png', status: 'green', progress: 75 },
      { id: '2', name: 'Michael Smith', role: 'Product Manager', avatarSrc: '/assets/avatar-petya.png', status: 'purple', progress: 85 },
      { id: '3', name: 'Emily Davis', role: 'UX Designer', avatarSrc: '/assets/avatar-katya.png', status: 'green', progress: 60 },
      { id: '4', name: 'David Brown', role: 'QA Engineer', avatarSrc: '/assets/avatar-dog.png', status: 'purple', progress: 90 },
      { id: '5', name: 'Linda Garcia', role: 'Data Analyst', avatarSrc: '/assets/avatar-katya.png', status: 'green', progress: 70 },
      { id: '6', name: 'James Wilson', role: 'Software Engineer', avatarSrc: '/assets/avatar-petya.png', status: 'red', progress: 40 },
      { id: '7', name: 'Alice Thompson', role: 'Marketing Specialist', avatarSrc: '/assets/avatar-katya.png', status: 'green', progress: 80 },
      { id: '8', name: 'Robert Martinez', role: 'Sales Executive', avatarSrc: '/assets/avatar-dog.png', status: 'red', progress: 35 },
      { id: '9', name: 'Jessica Taylor', role: 'Content Strategist', avatarSrc: '/assets/avatar-katya.png', status: 'green', progress: 65 },
      { id: '10', name: 'Charles Lee', role: 'Systems Analyst', avatarSrc: '/assets/avatar-petya.png', status: 'red', progress: 45 },
    ],
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Design Team',
    description: 'Creating beautiful user experiences',
    department: 'design',
    teamLead: 'emily',
    coverSrc: '/assets/Cover Image-2.jpg',
    memberCount: 12,
    productivity: 92,
    weekHighlight: 'Completed the new dashboard redesign and started user testing.',
    members: defaultMembers,
    createdAt: '2024-02-01',
  },
  {
    id: '3',
    name: 'Product Team',
    description: 'Shaping the product vision and roadmap',
    department: 'product',
    teamLead: 'michael',
    coverSrc: '/assets/Cover Image-3.jpg',
    memberCount: 8,
    productivity: 85,
    weekHighlight: 'Launched Q1 roadmap and aligned with stakeholders.',
    members: defaultMembers,
    createdAt: '2024-02-10',
  },
  {
    id: '4',
    name: 'Marketing Team',
    description: 'Growing brand awareness and engagement',
    department: 'marketing',
    teamLead: 'sarah',
    coverSrc: '/assets/Cover Image-4.jpg',
    memberCount: 15,
    productivity: 78,
    weekHighlight: 'Campaign launched with 150% increase in engagement.',
    members: defaultMembers,
    createdAt: '2024-02-15',
  },
  {
    id: '5',
    name: 'Sales Team',
    description: 'Driving revenue and customer success',
    department: 'sales',
    teamLead: 'david',
    coverSrc: '/assets/Cover Image-5.jpg',
    memberCount: 20,
    productivity: 95,
    weekHighlight: 'Closed 3 enterprise deals this week.',
    members: defaultMembers,
    createdAt: '2024-03-01',
  },
  {
    id: '6',
    name: 'HR Team',
    description: 'Building an amazing workplace culture',
    department: 'hr',
    teamLead: 'emily',
    coverSrc: '/assets/Cover Image-6.jpg',
    memberCount: 6,
    productivity: 88,
    weekHighlight: 'Onboarded 15 new employees this month.',
    members: defaultMembers,
    createdAt: '2024-03-10',
  },
];

interface TeamsState {
  teams: Team[];
  addTeam: (team: Omit<Team, 'id' | 'createdAt' | 'coverSrc' | 'memberCount' | 'productivity' | 'weekHighlight' | 'members'>) => void;
  getTeam: (id: string) => Team | undefined;
  updateTeam: (id: string, updates: Partial<Team>) => void;
  deleteTeam: (id: string) => void;
}

export const useTeamsStore = create<TeamsState>()(
  persist(
    (set, get) => ({
      teams: initialTeams,

      addTeam: (teamData) => {
        const newId = String(Date.now());
        const coverIndex = get().teams.length % coverImages.length;
        
        const newTeam: Team = {
          id: newId,
          ...teamData,
          coverSrc: coverImages[coverIndex],
          memberCount: 3,
          productivity: Math.floor(Math.random() * 20) + 75, // 75-95
          weekHighlight: 'New team created! Ready to start achieving great things.',
          members: defaultMembers,
          createdAt: new Date().toISOString().split('T')[0],
        };

        set((state) => ({
          teams: [...state.teams, newTeam],
        }));
      },

      getTeam: (id) => {
        return get().teams.find((team) => team.id === id);
      },

      updateTeam: (id, updates) => {
        set((state) => ({
          teams: state.teams.map((team) =>
            team.id === id ? { ...team, ...updates } : team
          ),
        }));
      },

      deleteTeam: (id) => {
        set((state) => ({
          teams: state.teams.filter((team) => team.id !== id),
        }));
      },
    }),
    {
      name: 'hr-assist-teams',
    }
  )
);

