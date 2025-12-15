'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { SecondRow, CardTop } from '@/components/sections';
import { Profile, ExperiencePreview, ProjectPreview } from '@/components/blocks';
import { Button, Tag, Bar } from '@/components/ui';
import { useCampaignsStore } from '@/lib/stores/campaignsStore';
import { useTeamsStore } from '@/lib/stores/teamsStore';
import { useCandidatesStore, stageProgress, CandidateStage } from '@/lib/stores/candidatesStore';

const progressStages: CandidateStage[] = [
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const campaign = useCampaignsStore((state) => state.getCampaign(campaignId));
  const team = useTeamsStore((state) =>
    campaign ? state.getTeam(campaign.teamId) : undefined
  );
  const candidate = useCandidatesStore((state) => state.getCandidate(candidateId));
  const hireCandidate = useCandidatesStore((state) => state.hireCandidate);
  const rejectCandidate = useCandidatesStore((state) => state.rejectCandidate);

  // Track scroll for SecondRow background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle loading state
  if (!candidate || !campaign) {
    return (
      <main className="flex flex-col items-center min-h-screen px-[var(--space-m)] bg-[var(--color-gray-bg)]">
        <div className="w-full max-w-[var(--content-width)] mt-[104px]">
          <p className="text-h2">Candidate not found</p>
        </div>
      </main>
    );
  }

  const teamName = team?.name || 'Team';
  const currentProgress = stageProgress[candidate.stage];

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
    if (selectedDate) {
      hireCandidate(candidateId, selectedDate);
      router.push(`/campaigns/${campaignId}`);
    } else {
      alert('Please select a first work day');
    }
  };

  const handleReject = () => {
    rejectCandidate(candidateId);
    router.push(`/campaigns/${campaignId}`);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
    setShowDatePicker(false);
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'choose date';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <main className="flex flex-col items-center min-h-screen bg-[var(--color-gray-bg)]">
      {/* SecondRow - fixed under TopMenu */}
      <div
        className="fixed top-[60px] left-0 right-0 z-40 transition-colors duration-200"
        style={{
          backgroundColor: isScrolled ? 'var(--color-white)' : 'transparent',
          borderBottom: isScrolled ? '1px solid var(--color-gray-light)' : 'none',
        }}
      >
        <SecondRow
          variant="default"
          breadcrumbs={[
            { label: 'All teams', href: '/' },
            { label: teamName, href: `/teams/${campaign.teamId}` },
            { label: campaign.title, href: `/campaigns/${campaignId}` },
            { label: candidate.name },
          ]}
          onBack={() => router.back()}
        />
      </div>

      {/* Progress Bar */}
      <div className="w-full px-[var(--space-xl)] mt-[104px]">
        <Bar variant="default" progress={currentProgress} size="big" />
        <div className="flex justify-between mt-[var(--space-xs)]">
          {progressStages.map((stage) => (
            <span
              key={stage}
              className="uppercase"
              style={{
                fontFamily: 'var(--font-akkurat)',
                fontSize: '8px',
                letterSpacing: '0.2em',
                color: candidate.stage === stage ? 'var(--color-black)' : 'var(--color-gray-dark)',
                fontWeight: candidate.stage === stage ? 700 : 400,
              }}
            >
              {stage}
            </span>
          ))}
        </div>
      </div>

      {/* Content Container */}
      <div className="w-full max-w-[var(--content-width)] flex flex-col gap-[var(--section-gap)] mt-[var(--space-xl)] px-[var(--space-m)]">
        {/* CardTop */}
        <CardTop
          variant="yellow"
          coverSrc="/assets/card top — копия.png"
          name={candidate.name}
          role={candidate.role}
          actions={[
            { label: 'promote', onClick: handlePromote },
            { label: 'negotiate', onClick: handleNegotiate },
            { label: 'suspend', onClick: handleSuspend },
            { label: 'fire', onClick: handleFire },
          ]}
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
            <div className="relative">
              <button
                onClick={() => setShowDatePicker(!showDatePicker)}
                className="flex items-center justify-between px-[var(--space-s)] h-[32px] bg-[var(--color-gray-light)] rounded-[var(--radius-sm)] cursor-pointer hover:bg-[var(--color-gray-medium)] transition-colors"
                style={{ width: '160px' }}
              >
                <span className="text-pixel" style={{ color: selectedDate ? 'var(--color-black)' : 'var(--color-gray-dark)' }}>
                  {formatDate(selectedDate)}
                </span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6L8 10L12 6" stroke="var(--color-gray-dark)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {showDatePicker && (
                <div className="absolute top-[36px] left-0 z-50 bg-white rounded-[var(--radius-sm)] shadow-lg p-[var(--space-xs)]">
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    className="text-grotesk p-[var(--space-xs)] border border-[var(--color-gray-light)] rounded-[var(--radius-sm)]"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              )}
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

        {/* Status Badge */}
        {(candidate.status === 'hired' || candidate.status === 'rejected') && (
          <div 
            className="flex items-center gap-[var(--space-xs)] p-[var(--space-m)] rounded-[var(--radius-lg)]"
            style={{
              backgroundColor: candidate.status === 'hired' ? 'var(--color-mint)' : 'var(--color-coral)',
            }}
          >
            <span className="text-h3">
              {candidate.status === 'hired' 
                ? `✓ Hired — First work day: ${formatDate(candidate.firstWorkDay || '')}`
                : '✕ Rejected'
              }
            </span>
          </div>
        )}

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
          <div className="flex flex-col gap-[2px]">
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
        {candidate.assessmentResults.length > 0 && (
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
                    <Bar variant="default" progress={result.value} />
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
                    <Bar variant="default" progress={result.value} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Interview History */}
        {candidate.interviewHistory.length > 0 && (
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
                  style={{ backgroundColor: interviewer.color }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
