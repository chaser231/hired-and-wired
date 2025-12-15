'use client';

import { useParams, useRouter } from 'next/navigation';
import { SecondRow, CardTop, Pipeline } from '@/components/sections';
import { CampaignPreview } from '@/components/blocks';
import { Button } from '@/components/ui';
import { useCampaignsStore } from '@/lib/stores/campaignsStore';
import { useTeamsStore } from '@/lib/stores/teamsStore';

interface MetricCardProps {
  title: string;
  value: string | number;
  label: string;
}

function MetricCard({ title, value, label }: MetricCardProps) {
  return (
    <div className="flex-1 flex flex-col gap-[var(--page-gap)] p-[var(--space-xl)] bg-[var(--color-white)] rounded-[var(--radius-lg)]">
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

  const campaign = useCampaignsStore((state) => state.getCampaign(campaignId));
  const team = useTeamsStore((state) =>
    campaign ? state.getTeam(campaign.teamId) : undefined
  );

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
    <main className="flex flex-col items-center min-h-screen px-[var(--space-m)] bg-[var(--color-gray-bg)]">
      {/* SecondRow */}
      <SecondRow
        variant="default"
        breadcrumbs={[
          { label: 'All teams', href: '/' },
          { label: teamName, href: `/teams/${campaign.teamId}` },
          { label: campaign.title },
        ]}
        onBack={() => router.back()}
      />

      {/* Content Container */}
      <div className="w-full max-w-[var(--content-width)] flex flex-col gap-[var(--section-gap)] mt-[104px]">
        {/* CardTop */}
        <CardTop
          variant="yellow"
          name={campaign.title}
          role="Active campaign"
          showDropdowns={false}
          customActions={
            <div className="flex items-center gap-[var(--space-xxs)]">
              <Button variant="cta-small" onClick={handleFinish}>
                finish
              </Button>
              <Button variant="on-color" onClick={handleCancel}>
                cancel
              </Button>
            </div>
          }
          topContent={
            <div className="flex items-center gap-[var(--space-xxs)]">
              <p className="text-pixel" style={{ color: 'var(--color-gold)' }}>
                Docs
              </p>
            </div>
          }
          dropdownContent={
            <div className="flex items-center gap-[var(--space-xxs)]">
              <Button
                variant="color"
                className="!bg-[var(--color-gold)] !text-white"
              >
                docs for designers
              </Button>
              <Button variant="color" className="!bg-[var(--color-gold)]">
                add
              </Button>
            </div>
          }
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

      {/* Pipeline Section */}
      <div className="w-full max-w-[var(--content-width)] mt-[var(--space-xl)] pb-[var(--page-gap)]">
        <Pipeline onCandidateClick={handleCandidateClick} />
      </div>
    </main>
  );
}

