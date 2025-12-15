export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatarSrc: string;
  status: 'green' | 'red' | 'purple' | 'stopped';
  progress: number;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  department: string;
  teamLead: string;
  coverSrc: string;
  memberCount: number;
  productivity: number;
  weekHighlight: string;
  members: TeamMember[];
  createdAt: string;
}

