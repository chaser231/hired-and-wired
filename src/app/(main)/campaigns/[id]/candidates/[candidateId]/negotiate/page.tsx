'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { SecondRow, CardTop } from '@/components/sections';
import { Attempt } from '@/components/blocks';
import { Button, Input, Dropdown } from '@/components/ui';
import { useCampaignsStore } from '@/lib/stores/campaignsStore';
import { useTeamsStore } from '@/lib/stores/teamsStore';

// Mock data
const mockCandidate = {
  id: '14',
  name: 'Sarah Mitchell',
  role: 'Senior Software Engineer',
};

const mockAttempts = [
  {
    label: 'first attempt',
    leftOffer: { amount: '$8 750', benefits: ['Lead Role', 'Cookies', 'Free Education'] },
    rightOffer: { amount: '$12 750', benefits: ['Lead Role', 'Remote-work', 'Gym'] },
    status: 'red' as const,
    statusLabel: 'failed',
  },
  {
    label: 'second attempt',
    leftOffer: { amount: '$8 750', benefits: ['Lead Role', 'Cookies', 'Free Education'] },
    rightOffer: { amount: '$12 750', benefits: ['Lead Role', 'Remote-work', 'Gym'] },
    status: 'red' as const,
    statusLabel: 'failed',
  },
];

const benefitOptions = [
  { value: 'remote', label: 'Remote-work' },
  { value: 'gym', label: 'Gym' },
  { value: 'education', label: 'Free Education' },
  { value: 'cookies', label: 'Cookies' },
  { value: 'lead', label: 'Lead Role' },
  { value: 'bonus', label: 'Annual Bonus' },
  { value: 'insurance', label: 'Health Insurance' },
  { value: 'stocks', label: 'Stock Options' },
];

export default function NegotiatePage() {
  const params = useParams();
  const router = useRouter();
  const campaignId = params.id as string;
  const candidateId = params.candidateId as string;

  const campaign = useCampaignsStore((state) => state.getCampaign(campaignId));
  const team = useTeamsStore((state) =>
    campaign ? state.getTeam(campaign.teamId) : undefined
  );

  const candidate = mockCandidate;
  const teamName = team?.name || 'Team';

  const [salary, setSalary] = useState('$48 000');
  const [benefit1, setBenefit1] = useState('');
  const [benefit2, setBenefit2] = useState('');
  const [benefit3, setBenefit3] = useState('');

  const handleSendOffer = () => {
    // TODO: Implement send offer logic
    router.push(`/campaigns/${campaignId}/candidates/${candidateId}`);
  };

  return (
    <main className="flex flex-col items-center min-h-screen px-[var(--space-m)] bg-[var(--color-gray-bg)] pb-[var(--page-gap)]">
      {/* SecondRow */}
      <SecondRow
        variant="default"
        breadcrumbs={[
          { label: 'All teams', href: '/' },
          { label: teamName, href: `/teams/${campaign?.teamId}` },
          { label: campaign?.title || 'Campaign', href: `/campaigns/${campaignId}` },
          { label: candidate.name, href: `/campaigns/${campaignId}/candidates/${candidateId}` },
        ]}
        onBack={() => router.back()}
      />

      {/* Content Container */}
      <div className="w-full max-w-[var(--content-width)] flex flex-col gap-[var(--section-gap)] mt-[104px]">
        {/* CardTop */}
        <CardTop
          variant="yellow"
          name={candidate.name}
          role={candidate.role}
          showDropdowns={false}
        />

        {/* Attempts History */}
        <div className="flex flex-col gap-[var(--section-gap)]">
          {mockAttempts.map((attempt, index) => (
            <Attempt
              key={index}
              label={attempt.label}
              leftOffer={attempt.leftOffer}
              rightOffer={attempt.rightOffer}
              status={attempt.status}
              statusLabel={attempt.statusLabel}
              variant="past"
            />
          ))}

          {/* Current Attempt (Next) */}
          <Attempt
            label="third attempt"
            leftOffer={{ amount: '$?', benefits: ['Lead Role', 'Cookies', 'Gym'] }}
            rightOffer={{ amount: '$?', benefits: ['Lead Role', 'Cookies', 'Gym'] }}
            variant="next"
          />
        </div>

        {/* Offer Form + Prediction */}
        <div className="flex gap-[var(--section-gap)]">
          {/* Offer Form */}
          <div className="flex flex-col items-center gap-[var(--space-l)] p-[var(--space-xl)] bg-[var(--color-white)] rounded-[var(--radius-lg)]">
            <h3 className="text-h2 w-full">Offer</h3>
            
            <div className="flex flex-col gap-[var(--space-xl)]" style={{ width: '280px' }}>
              {/* Salary + Slider */}
              <div className="flex flex-col gap-[var(--space-s)]">
                <Input
                  label="salary"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                />
                {/* Slider placeholder */}
                <div className="w-full h-[4px] bg-[var(--color-gray-light)] rounded-[var(--radius-lg)] relative">
                  <div 
                    className="absolute left-0 top-0 h-full bg-[var(--color-gray-light)] rounded-[var(--radius-lg)]"
                    style={{ width: '70%' }}
                  />
                  <div 
                    className="absolute top-1/2 -translate-y-1/2 w-[14px] h-[14px] bg-[var(--color-white)] border-2 border-[var(--color-white)] rounded-full"
                    style={{ left: '70%', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                  />
                </div>
              </div>

              {/* Benefits */}
              <Dropdown
                label="1st benefit"
                value={benefit1}
                onChange={setBenefit1}
                options={benefitOptions}
                placeholder="Select benefit"
                variant="on-color"
              />

              <Dropdown
                label="2nd benefit"
                value={benefit2}
                onChange={setBenefit2}
                options={benefitOptions}
                placeholder="Select benefit"
                variant="on-color"
              />

              <Dropdown
                label="3rd benefit"
                value={benefit3}
                onChange={setBenefit3}
                options={benefitOptions}
                placeholder="Select benefit"
                variant="on-color"
              />
            </div>

            <Button variant="cta-small" onClick={handleSendOffer}>
              Send Offer
            </Button>
          </div>

          {/* Prediction Card */}
          <div 
            className="flex-1 flex flex-col items-center justify-center gap-[var(--space-l)] p-[var(--space-xl)] rounded-[var(--radius-lg)]"
            style={{
              backgroundImage: 'url(/assets/card\\ top.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-instrument)',
                fontSize: '230px',
                lineHeight: '1.3',
                letterSpacing: '-0.01em',
                color: 'var(--color-success)',
              }}
            >
              78%
            </span>
            <h3 className="text-h2" style={{ color: 'var(--color-success)' }}>
              predicted approvement
            </h3>
          </div>
        </div>
      </div>
    </main>
  );
}

