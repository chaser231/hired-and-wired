'use client';

import { useParams, useRouter } from 'next/navigation';
import { SecondRow, CardTop } from '@/components/sections';
import { Profile, ExperiencePreview, ProjectPreview } from '@/components/blocks';
import { Button, Tag, Bar } from '@/components/ui';
import { useCampaignsStore } from '@/lib/stores/campaignsStore';
import { useTeamsStore } from '@/lib/stores/teamsStore';

// Mock candidate data
const mockCandidate = {
  id: '14',
  name: 'Sarah Mitchell',
  role: 'Senior Software Engineer',
  teams: ['frontend-team', 'Innovation Lab'],
  access: ['Lead Developer', 'Member'],
  accessLevel: 'Access LEVEL 4 (CODE RED)',
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
};

const progressStages = [
  'applied',
  'interviewed',
  'onboarding',
  'half-term',
  'common',
  'leads team',
  'minus one',
  'c-level',
  'fired',
];

export default function CandidatePage() {
  const params = useParams();
  const router = useRouter();
  const campaignId = params.id as string;
  const candidateId = params.candidateId as string;

  const campaign = useCampaignsStore((state) => state.getCampaign(campaignId));
  const team = useTeamsStore((state) =>
    campaign ? state.getTeam(campaign.teamId) : undefined
  );

  const candidate = mockCandidate; // In real app, fetch by candidateId
  const teamName = team?.name || 'Team';

  const handlePromote = () => {
    // TODO: Implement promote logic
  };

  const handleNegotiate = () => {
    router.push(`/campaigns/${campaignId}/candidates/${candidateId}/negotiate`);
  };

  const handleSuspend = () => {
    // TODO: Implement suspend logic
  };

  const handleFire = () => {
    // TODO: Implement fire logic
  };

  const handleHire = () => {
    // TODO: Implement hire logic
    router.push(`/campaigns/${campaignId}`);
  };

  const handleReject = () => {
    router.back();
  };

  return (
    <main className="flex flex-col items-center min-h-screen px-[var(--space-m)] bg-[var(--color-gray-bg)]">
      {/* SecondRow */}
      <SecondRow
        variant="default"
        breadcrumbs={[
          { label: 'All teams', href: '/' },
          { label: teamName, href: `/teams/${campaign?.teamId}` },
          { label: campaign?.title || 'Campaign', href: `/campaigns/${campaignId}` },
          { label: candidate.name },
        ]}
        onBack={() => router.back()}
      />

      {/* Progress Bar */}
      <div className="w-full px-[var(--space-m)] mt-[90px]">
        <Bar variant="big" percentage={20} />
        <div className="flex justify-between mt-[var(--space-xs)]">
          {progressStages.map((stage) => (
            <span
              key={stage}
              className="uppercase"
              style={{
                fontFamily: 'var(--font-akkurat)',
                fontSize: '8px',
                letterSpacing: '0.2em',
                color: 'var(--color-gray-dark)',
              }}
            >
              {stage}
            </span>
          ))}
        </div>
      </div>

      {/* Content Container */}
      <div className="w-full max-w-[var(--content-width)] flex flex-col gap-[var(--section-gap)] mt-[var(--space-xl)]">
        {/* CardTop */}
        <CardTop
          variant="yellow"
          name={candidate.name}
          role={candidate.role}
          showDropdowns={true}
          customActions={
            <div className="flex items-center gap-[var(--space-xxs)]">
              <Button variant="cta-small" onClick={handlePromote}>
                promote
              </Button>
              <Button variant="on-color" onClick={handleNegotiate}>
                negotiate
              </Button>
              <Button variant="on-color" onClick={handleSuspend}>
                suspend
              </Button>
              <Button variant="on-color" onClick={handleFire}>
                fire
              </Button>
            </div>
          }
          topContent={
            <div className="flex justify-between w-full">
              <p className="text-pixel" style={{ color: 'var(--color-gold)' }}>
                TEAMS
              </p>
              <p className="text-pixel" style={{ color: 'var(--color-gold)' }}>
                access
              </p>
            </div>
          }
          dropdownContent={
            <div className="flex justify-between w-full">
              <div className="flex items-center gap-[var(--space-xxs)] flex-wrap" style={{ maxWidth: '310px' }}>
                {candidate.teams.map((t) => (
                  <Button key={t} variant="color" className="!bg-[var(--color-gold)] !text-white">
                    {t}
                  </Button>
                ))}
                {candidate.access.map((a) => (
                  <Button key={a} variant="color" className="!bg-[var(--color-gold)] !text-white">
                    {a}
                  </Button>
                ))}
                <Button variant="color" className="!bg-[var(--color-gold)]">
                  add
                </Button>
              </div>
              <div className="flex items-center gap-[var(--space-xxs)]">
                <Button variant="color" className="!bg-[var(--color-gold)] !text-white">
                  {candidate.accessLevel}
                </Button>
                <Button variant="color" className="!bg-[var(--color-gold)]">
                  add
                </Button>
              </div>
            </div>
          }
        />

        {/* Hire/Reject Card */}
        <div className="flex items-end justify-between p-[var(--space-xl)] bg-[var(--color-white)] rounded-[var(--radius-lg)]">
          <div className="flex flex-col gap-[var(--space-xs)]">
            <p
              className="uppercase"
              style={{
                fontFamily: 'var(--font-akkurat)',
                fontSize: '8px',
                letterSpacing: '0.2em',
              }}
            >
              first work day
            </p>
            <div className="flex items-center justify-between px-[var(--space-s)] h-[32px] bg-[var(--color-gray-light)] rounded-[var(--radius-sm)]" style={{ width: '140px' }}>
              <span className="text-pixel" style={{ color: 'var(--color-gray-dark)' }}>
                choose date
              </span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6L8 10L12 6" stroke="var(--color-gray-dark)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className="flex gap-[var(--space-xxs)]">
            <Button variant="cta-small" onClick={handleHire}>
              hire
            </Button>
            <Button variant="secondary" onClick={handleReject}>
              reject
            </Button>
          </div>
        </div>

        {/* Work Experience */}
        <div className="flex flex-col gap-[var(--space-l)] p-[var(--space-xl)] bg-[var(--color-white)] rounded-[var(--radius-lg)]">
          <h3 className="text-h2">Work Experience</h3>
          <div className="flex flex-col gap-[var(--space-xxs)]">
            {candidate.workExperience.map((exp, index) => (
              <ExperiencePreview
                key={index}
                period={exp.period}
                title={exp.title}
                company={exp.company}
                description={exp.description}
              />
            ))}
          </div>
        </div>

        {/* Tech Skills */}
        <div className="flex flex-col gap-[var(--space-l)] p-[var(--space-xl)] bg-[var(--color-white)] rounded-[var(--radius-lg)]">
          <h3 className="text-h2">Tech Skills</h3>
          <div className="flex gap-[var(--space-xxs)] flex-wrap">
            {candidate.techSkills.map((skill) => (
              <Tag key={skill} variant="static" className="!bg-[var(--color-mint)]">
                {skill}
              </Tag>
            ))}
          </div>
        </div>

        {/* Key Projects */}
        <div className="flex flex-col gap-[var(--space-l)] p-[var(--space-xl)] bg-[var(--color-white)] rounded-[var(--radius-lg)]">
          <h3 className="text-h2">Key projects</h3>
          <div className="flex flex-col gap-[var(--space-xxs)]">
            {candidate.keyProjects.map((project, index) => (
              <ProjectPreview
                key={index}
                title={project.title}
                tags={project.tags}
              />
            ))}
          </div>
        </div>

        {/* Assessment Results */}
        <div className="flex flex-col gap-[var(--page-gap)] p-[var(--space-xl)] bg-[var(--color-white)] rounded-[var(--radius-lg)]">
          <h3 className="text-h2">Assessment Results</h3>
          <div className="flex gap-[var(--space-s)]">
            <div className="flex-1 flex flex-col gap-[60px]">
              {candidate.assessmentResults.slice(0, 2).map((result) => (
                <div key={result.name} className="flex flex-col gap-[15px]">
                  <div className="flex justify-between">
                    <span className="text-bold">{result.name}</span>
                    <span className="text-pixel">{result.value}%</span>
                  </div>
                  <Bar variant="default" percentage={result.value} />
                </div>
              ))}
            </div>
            <div className="flex-1 flex flex-col gap-[60px]">
              {candidate.assessmentResults.slice(2, 4).map((result) => (
                <div key={result.name} className="flex flex-col gap-[15px]">
                  <div className="flex justify-between">
                    <span className="text-bold">{result.name}</span>
                    <span className="text-pixel">{result.value}%</span>
                  </div>
                  <Bar variant="default" percentage={result.value} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interview History */}
        <div className="flex flex-col gap-[var(--space-l)] p-[var(--space-xl)] bg-[var(--color-white)] rounded-[var(--radius-lg)] mb-[var(--page-gap)]">
          <h3 className="text-h2">Interview History</h3>
          <div className="flex gap-[var(--space-xxs)]">
            {candidate.interviewHistory.map((interviewer, index) => (
              <Profile
                key={index}
                name={interviewer.name}
                role={interviewer.role}
                variant="short"
                avatarSrc="/assets/avatar-katya.png"
                className={`!bg-[${interviewer.color}]`}
                style={{ backgroundColor: interviewer.color }}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

