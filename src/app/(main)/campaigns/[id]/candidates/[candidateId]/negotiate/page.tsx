'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { SecondRow, CardTop } from '@/components/sections';
import { Attempt } from '@/components/blocks';
import { Button, Dropdown } from '@/components/ui';
import { useCampaignsStore } from '@/lib/stores/campaignsStore';
import { useTeamsStore } from '@/lib/stores/teamsStore';
import { useCandidatesStore } from '@/lib/stores/candidatesStore';

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

const MIN_SALARY = 30000;
const MAX_SALARY = 80000;

export default function NegotiatePage() {
  const params = useParams();
  const router = useRouter();
  const campaignId = params.id as string;
  const candidateId = params.candidateId as string;
  const [isScrolled, setIsScrolled] = useState(false);

  const campaign = useCampaignsStore((state) => state.getCampaign(campaignId));
  const team = useTeamsStore((state) =>
    campaign ? state.getTeam(campaign.teamId) : undefined
  );
  const candidate = useCandidatesStore((state) => state.getCandidate(candidateId));

  const teamName = team?.name || 'Team';

  const [salary, setSalary] = useState(48000);
  const [benefit1, setBenefit1] = useState('');
  const [benefit2, setBenefit2] = useState('');
  const [benefit3, setBenefit3] = useState('');

  // Calculate prediction based on salary and benefits
  const calculatePrediction = () => {
    // Base prediction from salary (higher salary = higher chance)
    const salaryRange = MAX_SALARY - MIN_SALARY;
    const salaryScore = ((salary - MIN_SALARY) / salaryRange) * 50; // Max 50% from salary
    
    // Benefits add extra percentage
    const benefitsCount = [benefit1, benefit2, benefit3].filter(Boolean).length;
    const benefitsScore = benefitsCount * 10; // 10% per benefit
    
    const total = Math.min(95, Math.max(20, salaryScore + benefitsScore + 30));
    return Math.round(total);
  };

  const prediction = calculatePrediction();

  // Track scroll for SecondRow background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSalary(Number(e.target.value));
  };

  const formatSalary = (value: number) => {
    return `$${value.toLocaleString()}`;
  };

  const handleSendOffer = () => {
    // TODO: Implement send offer logic
    router.push(`/campaigns/${campaignId}/candidates/${candidateId}`);
  };

  if (!candidate) {
    return (
      <main className="flex flex-col items-center min-h-screen px-[var(--space-m)] bg-[var(--color-gray-bg)]">
        <div className="w-full max-w-[var(--content-width)] mt-[104px]">
          <p className="text-h2">Candidate not found</p>
        </div>
      </main>
    );
  }

  const sliderPercentage = ((salary - MIN_SALARY) / (MAX_SALARY - MIN_SALARY)) * 100;

  return (
    <main className="flex flex-col items-center min-h-screen bg-[var(--color-gray-bg)] pb-[var(--page-gap)]">
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
            { label: teamName, href: `/teams/${campaign?.teamId}` },
            { label: campaign?.title || 'Campaign', href: `/campaigns/${campaignId}` },
            { label: candidate.name, href: `/campaigns/${campaignId}/candidates/${candidateId}` },
          ]}
          onBack={() => router.back()}
        />
      </div>

      {/* Content Container */}
      <div className="w-full max-w-[var(--content-width)] flex flex-col gap-[var(--section-gap)] mt-[104px] px-[var(--space-m)]">
        {/* CardTop - minimal variant with only name and role */}
        <CardTop
          variant="yellow"
          coverSrc="/assets/card top — копия.png"
          name={candidate.name}
          role={candidate.role}
          actions={[]}
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
                <div className="flex flex-col gap-[var(--space-xxs)]">
                  <label className="text-caps">salary</label>
                  <div 
                    className="flex items-center px-[var(--space-s)] h-[32px] bg-[var(--color-gray-light)] rounded-[var(--radius-sm)]"
                  >
                    <span className="text-pixel">{formatSalary(salary)}</span>
                  </div>
                </div>
                {/* Functional Slider */}
                <div className="relative w-full h-[20px] flex items-center">
                  <input
                    type="range"
                    min={MIN_SALARY}
                    max={MAX_SALARY}
                    step={1000}
                    value={salary}
                    onChange={handleSliderChange}
                    className="w-full h-[4px] appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, var(--color-black) 0%, var(--color-black) ${sliderPercentage}%, var(--color-gray-light) ${sliderPercentage}%, var(--color-gray-light) 100%)`,
                      borderRadius: '4px',
                    }}
                  />
                  <style jsx>{`
                    input[type="range"]::-webkit-slider-thumb {
                      -webkit-appearance: none;
                      appearance: none;
                      width: 14px;
                      height: 14px;
                      background: var(--color-white);
                      border: 2px solid var(--color-black);
                      border-radius: 50%;
                      cursor: pointer;
                      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    }
                    input[type="range"]::-moz-range-thumb {
                      width: 14px;
                      height: 14px;
                      background: var(--color-white);
                      border: 2px solid var(--color-black);
                      border-radius: 50%;
                      cursor: pointer;
                      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    }
                  `}</style>
                </div>
                <div className="flex justify-between text-caps" style={{ color: 'var(--color-gray-dark)' }}>
                  <span>{formatSalary(MIN_SALARY)}</span>
                  <span>{formatSalary(MAX_SALARY)}</span>
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

          {/* Prediction Card - no background image */}
          <div 
            className="flex-1 flex flex-col items-center justify-center gap-[var(--space-l)] p-[var(--space-xl)] rounded-[var(--radius-lg)] bg-[var(--color-white)]"
          >
            <span
              style={{
                fontFamily: 'var(--font-instrument)',
                fontSize: '230px',
                lineHeight: '1.3',
                letterSpacing: '-0.01em',
                color: prediction >= 70 ? 'var(--color-success)' : prediction >= 50 ? 'var(--color-gold)' : 'var(--color-error)',
              }}
            >
              {prediction}%
            </span>
            <h3 
              className="text-h2" 
              style={{ 
                color: prediction >= 70 ? 'var(--color-success)' : prediction >= 50 ? 'var(--color-gold)' : 'var(--color-error)' 
              }}
            >
              predicted approvement
            </h3>
          </div>
        </div>
      </div>
    </main>
  );
}
