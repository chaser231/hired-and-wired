import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CandidateStatus = 
  | 'applied' 
  | 'screening' 
  | 'interview' 
  | 'offer' 
  | 'hired' 
  | 'rejected';

export type CandidateStage = 
  | 'applied'
  | 'interviewed'
  | 'onboarding'
  | 'half-term'
  | 'common'
  | 'leads team'
  | 'minus one'
  | 'c-level'
  | 'fired';

export interface Candidate {
  id: string;
  campaignId: string;
  name: string;
  role: string;
  status: CandidateStatus;
  stage: CandidateStage;
  teams: string[];
  access: string[];
  accessLevel: string;
  firstWorkDay?: string;
  avatarSrc?: string;
  workExperience: Array<{
    period: string;
    title: string;
    company: string;
    description: string;
  }>;
  techSkills: string[];
  keyProjects: Array<{
    title: string;
    tags: string[];
  }>;
  assessmentResults: Array<{
    name: string;
    value: number;
  }>;
  interviewHistory: Array<{
    name: string;
    role: string;
    color: string;
  }>;
}

// Progress percentage for each stage
export const stageProgress: Record<CandidateStage, number> = {
  'applied': 5,
  'interviewed': 15,
  'onboarding': 25,
  'half-term': 40,
  'common': 55,
  'leads team': 70,
  'minus one': 85,
  'c-level': 95,
  'fired': 0,
};

// Initial mock candidates
const initialCandidates: Candidate[] = [
  {
    id: '1',
    campaignId: 'c1',
    name: 'Sarah Mitchell',
    role: 'Senior Software Engineer',
    status: 'interview',
    stage: 'interviewed',
    teams: ['frontend-team', 'Innovation Lab'],
    access: ['Lead Developer', 'Member'],
    accessLevel: 'Access LEVEL 4 (CODE RED)',
    avatarSrc: '/assets/avatar-katya.png',
    workExperience: [
      {
        period: 'Mar 2021 — Dec 2021 (9 months)',
        title: 'Senior Frontend Developer',
        company: 'WebInnovate Inc.',
        description: 'Developed interactive web components, collaborated with designers, and enhanced user experience.',
      },
      {
        period: 'Jun 2019 — Feb 2021 (1 year 8 months)',
        title: 'Senior Frontend Developer',
        company: 'Creative Solutions Co.',
        description: 'Assisted in building responsive websites, wrote clean code, and participated in code reviews.',
      },
      {
        period: 'Jan 2018 — May 2019 (1 year 4 months)',
        title: 'Senior Frontend Developer',
        company: 'TechStartups Ltd.',
        description: 'Gained hands-on experience in web development, supported team projects, and learned Agile methodologies.',
      },
    ],
    techSkills: ['Vue.js', 'Angular', 'Svelte', 'Ember.js', 'Backbone.js'],
    keyProjects: [
      {
        title: 'Mobile-responsive online marketplace using Flutter and Django',
        tags: ['Flutter', 'Django', 'PostgreSQL', 'REST API'],
      },
      {
        title: 'Real-time chat application built with Vue.js and Express',
        tags: ['Vue.js', 'Express', 'MySQL', 'Socket.IO'],
      },
      {
        title: 'Progressive web app for event management using Angular and Ruby on Rails',
        tags: ['Angular', 'Ruby on Rails', 'SQLite', 'GraphQL'],
      },
    ],
    assessmentResults: [
      { name: 'technical skills', value: 89 },
      { name: 'Productivity', value: 89 },
      { name: 'communication', value: 89 },
      { name: 'adaptivity', value: 89 },
    ],
    interviewHistory: [
      { name: 'Michael Lee', role: 'Product Manager', color: '#F7E0DD' },
      { name: 'Emily Carter', role: 'UX Designer', color: '#E0E2A4' },
      { name: 'David Smith', role: 'Data Analyst', color: '#FFE3F1' },
    ],
  },
  {
    id: '2',
    campaignId: 'c1',
    name: 'John Anderson',
    role: 'Frontend Developer',
    status: 'screening',
    stage: 'applied',
    teams: ['frontend-team'],
    access: ['Member'],
    accessLevel: 'Access LEVEL 2 (INTERNAL)',
    avatarSrc: '/assets/avatar-petya.png',
    workExperience: [
      {
        period: 'Jan 2022 — Present',
        title: 'Frontend Developer',
        company: 'StartupXYZ',
        description: 'Building React applications and contributing to design systems.',
      },
    ],
    techSkills: ['React', 'TypeScript', 'Next.js'],
    keyProjects: [
      {
        title: 'E-commerce dashboard with React and Redux',
        tags: ['React', 'Redux', 'TypeScript'],
      },
    ],
    assessmentResults: [
      { name: 'technical skills', value: 75 },
      { name: 'Productivity', value: 80 },
      { name: 'communication', value: 85 },
      { name: 'adaptivity', value: 90 },
    ],
    interviewHistory: [],
  },
  {
    id: '3',
    campaignId: 'c1',
    name: 'Emily Chen',
    role: 'Full Stack Developer',
    status: 'offer',
    stage: 'interviewed',
    teams: ['backend-team', 'frontend-team'],
    access: ['Senior Developer'],
    accessLevel: 'Access LEVEL 3 (CONFIDENTIAL)',
    avatarSrc: '/assets/avatar-dog.png',
    workExperience: [
      {
        period: 'Mar 2020 — Present',
        title: 'Full Stack Developer',
        company: 'TechCorp',
        description: 'Leading development of microservices architecture.',
      },
    ],
    techSkills: ['Node.js', 'React', 'PostgreSQL', 'Docker'],
    keyProjects: [
      {
        title: 'Microservices platform with Node.js and Kubernetes',
        tags: ['Node.js', 'Kubernetes', 'Docker', 'PostgreSQL'],
      },
    ],
    assessmentResults: [
      { name: 'technical skills', value: 92 },
      { name: 'Productivity', value: 88 },
      { name: 'communication', value: 82 },
      { name: 'adaptivity', value: 95 },
    ],
    interviewHistory: [
      { name: 'Alex Johnson', role: 'Tech Lead', color: '#DDD6EF' },
    ],
  },
  {
    id: '4',
    campaignId: 'c1',
    name: 'Michael Brown',
    role: 'Backend Developer',
    status: 'applied',
    stage: 'applied',
    teams: ['backend-team'],
    access: ['Member'],
    accessLevel: 'Access LEVEL 1 (PUBLIC)',
    avatarSrc: '/assets/avatar-petya.png',
    workExperience: [],
    techSkills: ['Python', 'Django', 'PostgreSQL'],
    keyProjects: [],
    assessmentResults: [],
    interviewHistory: [],
  },
  {
    id: '5',
    campaignId: 'c1',
    name: 'Jessica Williams',
    role: 'DevOps Engineer',
    status: 'hired',
    stage: 'onboarding',
    firstWorkDay: '2024-04-01',
    teams: ['infrastructure-team'],
    access: ['Lead Developer'],
    accessLevel: 'Access LEVEL 4 (CODE RED)',
    avatarSrc: '/assets/avatar-katya.png',
    workExperience: [
      {
        period: 'Jan 2019 — Present',
        title: 'DevOps Engineer',
        company: 'CloudFirst Inc.',
        description: 'Managing CI/CD pipelines and cloud infrastructure.',
      },
    ],
    techSkills: ['AWS', 'Terraform', 'Kubernetes', 'Jenkins'],
    keyProjects: [
      {
        title: 'Cloud migration project for enterprise clients',
        tags: ['AWS', 'Terraform', 'Docker'],
      },
    ],
    assessmentResults: [
      { name: 'technical skills', value: 94 },
      { name: 'Productivity', value: 91 },
      { name: 'communication', value: 78 },
      { name: 'adaptivity', value: 88 },
    ],
    interviewHistory: [
      { name: 'Tom Wilson', role: 'CTO', color: '#D4EEE7' },
    ],
  },
  {
    id: '6',
    campaignId: 'c1',
    name: 'David Kim',
    role: 'QA Engineer',
    status: 'rejected',
    stage: 'interviewed',
    teams: ['qa-team'],
    access: ['Member'],
    accessLevel: 'Access LEVEL 1 (PUBLIC)',
    avatarSrc: '/assets/avatar-dog.png',
    workExperience: [],
    techSkills: ['Selenium', 'Cypress', 'Jest'],
    keyProjects: [],
    assessmentResults: [
      { name: 'technical skills', value: 65 },
      { name: 'Productivity', value: 70 },
      { name: 'communication', value: 75 },
      { name: 'adaptivity', value: 72 },
    ],
    interviewHistory: [],
  },
];

interface CandidatesState {
  candidates: Candidate[];
  getCandidatesByCampaign: (campaignId: string) => Candidate[];
  getCandidate: (id: string) => Candidate | undefined;
  getCandidatesByStatus: (campaignId: string, status: CandidateStatus) => Candidate[];
  hireCandidate: (id: string, firstWorkDay: string) => void;
  rejectCandidate: (id: string) => void;
  updateCandidateStage: (id: string, stage: CandidateStage) => void;
  updateCandidate: (id: string, updates: Partial<Candidate>) => void;
}

export const useCandidatesStore = create<CandidatesState>()(
  persist(
    (set, get) => ({
      candidates: initialCandidates,

      getCandidatesByCampaign: (campaignId) => {
        return get().candidates.filter((c) => c.campaignId === campaignId);
      },

      getCandidate: (id) => {
        return get().candidates.find((c) => c.id === id);
      },

      getCandidatesByStatus: (campaignId, status) => {
        return get().candidates.filter(
          (c) => c.campaignId === campaignId && c.status === status
        );
      },

      hireCandidate: (id, firstWorkDay) => {
        set((state) => ({
          candidates: state.candidates.map((c) =>
            c.id === id
              ? { ...c, status: 'hired' as CandidateStatus, stage: 'onboarding' as CandidateStage, firstWorkDay }
              : c
          ),
        }));
      },

      rejectCandidate: (id) => {
        set((state) => ({
          candidates: state.candidates.map((c) =>
            c.id === id
              ? { ...c, status: 'rejected' as CandidateStatus }
              : c
          ),
        }));
      },

      updateCandidateStage: (id, stage) => {
        set((state) => ({
          candidates: state.candidates.map((c) =>
            c.id === id ? { ...c, stage } : c
          ),
        }));
      },

      updateCandidate: (id, updates) => {
        set((state) => ({
          candidates: state.candidates.map((c) =>
            c.id === id ? { ...c, ...updates } : c
          ),
        }));
      },
    }),
    {
      name: 'hr-assist-candidates',
    }
  )
);

