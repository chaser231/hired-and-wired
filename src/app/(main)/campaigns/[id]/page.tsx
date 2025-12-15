'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { SecondRow, CardTop, Pipeline } from '@/components/sections';
import { CampaignPreview } from '@/components/blocks';
import { useCampaignsStore } from '@/lib/stores/campaignsStore';
import { useTeamsStore } from '@/lib/stores/teamsStore';

interface MetricCardProps {
  title: string;
  value: string | number;
  label: string;
}

function MetricCard({ title, value, label }: MetricCardProps) {
  return (
    <div className="flex-1 flex flex-col justify-between p-[var(--space-xl)] bg-[var(--color-white)] rounded-[var(--radius-lg)]" style={{ minHeight: '220px' }}>
      <h3 className="text-h2">{title}</h3>
      <div className="flex flex-col gap-[var(--space-xs)]">
        <p className="text-h1">{value}</p>
        <p className="text-pixel">{label}</p>
      </div>
    </div>
  );
}

export default function CampaignPage() {
  const params = useParams();
  const router = useRouter();
  const campaignId = params.id as string;
  const [isScrolled, setIsScrolled] = useState(false);

  const campaign = useCampaignsStore((state) => state.getCampaign(campaignId));
  const team = useTeamsStore((state) =>
    campaign ? state.getTeam(campaign.teamId) : undefined
  );

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
  if (!campaign) {
    return (
      <main className="flex flex-col items-center min-h-screen px-[var(--space-m)] bg-[var(--color-gray-bg)]">
        <div className="w-full max-w-[var(--content-width)] mt-[104px]">
          <p className="text-h2">Campaign not found</p>
        </div>
      </main>
    );
  }

  const teamName = team?.name || 'Team';
  const totalApplications = campaign.stats.applied;
  const inProgressCount = campaign.stats.inProgress;
  const conversionRate = totalApplications > 0
    ? ((campaign.stats.finalRound / totalApplications) * 100).toFixed(1)
    : '0';

  const handleCandidateClick = (candidateId: string) => {
    router.push(`/campaigns/${campaignId}/candidates/${candidateId}`);
  };

  const handleFinish = () => {
    // TODO: Implement campaign finish logic
    router.push(`/teams/${campaign.teamId}`);
  };

  const handleCancel = () => {
    router.back();
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
            { label: campaign.title },
          ]}
          onBack={() => router.back()}
        />
      </div>

      {/* Content Container */}
      <div className="w-full max-w-[var(--content-width)] flex flex-col gap-[var(--section-gap)] mt-[104px] px-[var(--space-m)]">
        {/* CardTop */}
        <CardTop
          variant="campaign"
          coverSrc="/assets/card top — копия 2.png"
          name={campaign.title}
          role="Active campaign"
          topLabel="Docs"
          actions={[
            { label: 'finish', onClick: handleFinish, variant: 'cta-small' },
            { label: 'cancel', onClick: handleCancel, variant: 'on-color' },
          ]}
        />

        {/* Metrics Row */}
        <div className="flex gap-[var(--section-gap)]">
          <MetricCard
            title="Applications"
            value={totalApplications}
            label="Total recieved"
          />
          <MetricCard
            title="in Progress"
            value={inProgressCount}
            label="Active candidates"
          />
          <MetricCard
            title="Conversion Rate"
            value={`${conversionRate}%`}
            label="To interview stage"
          />
        </div>

        {/* Funnel Stats */}
        <CampaignPreview
          title="Funnel"
          status={campaign.status as 'green' | 'red' | 'purple' | 'stopped'}
          stats={campaign.stats}
        />
      </div>

      {/* Pipeline Section - Full width with 30px padding */}
      <div className="w-full mt-[var(--page-gap)] pb-[var(--page-gap)] px-[var(--space-xl)]">
        <Pipeline campaignId={campaignId} onCandidateClick={handleCandidateClick} />
      </div>
    </main>
  );
}

