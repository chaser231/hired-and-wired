'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { SwitchGroup, Button } from '@/components/ui';
import { Profile, Notify, CampaignPreview } from '@/components/blocks';
import { SecondRow } from '@/components/sections';
import { useTeamsStore } from '@/lib/stores/teamsStore';

// Mock campaigns data for teams
const mockCampaigns = [
  {
    id: '1',
    title: 'Forward Architect',
    status: 'green' as const,
    stats: { applied: 45, rejected: 12, inProgress: 98, finalRound: 112, offersSent: 6 },
  },
  {
    id: '2',
    title: 'District Integration Engineer',
    status: 'green' as const,
    stats: { applied: 78, rejected: 7, inProgress: 89, finalRound: 34, offersSent: 1 },
  },
  {
    id: '3',
    title: 'Dynamic Program Liaison',
    status: 'green' as const,
    stats: { applied: 23, rejected: 678, inProgress: 8, finalRound: 90, offersSent: 45 },
  },
  {
    id: '4',
    title: 'Product Tactics Manager',
    status: 'green' as const,
    stats: { applied: 15, rejected: 5, inProgress: 167, finalRound: 90, offersSent: 2 },
  },
];

export default function TeamDetailPage() {
  const router = useRouter();
  const params = useParams();
  const teamId = params.id as string;
  
  const team = useTeamsStore((state) => state.getTeam(teamId));
  const [activeTab, setActiveTab] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll for SecondRow background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBack = () => {
    router.push('/');
  };

  // If team not found, redirect to home
  if (!team) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-h3">Team not found</p>
        <button onClick={handleBack} className="mt-4 text-grotesk underline">
          Go back to all teams
        </button>
      </main>
    );
  }

  // Tab-specific content
  const getNotifyMessage = () => {
    if (activeTab === 1) {
      return 'This month, the hiring funnel saw 250 applicants, 50 interviews, and 10 new hires.';
    }
    return team.weekHighlight;
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0: // Team tab
        return (
          <div
            className="flex flex-col gap-[var(--space-l)] p-[var(--space-xl)] rounded-[var(--radius-lg)]"
            style={{ backgroundColor: 'var(--color-white)' }}
          >
            <h2 className="text-h2">Team</h2>
            <div className="flex flex-col gap-[var(--space-xxxs)]">
              {team.members.map((member, index) => (
                <Profile
                  key={member.id}
                  name={member.name}
                  role={member.role}
                  avatarSrc={member.avatarSrc}
                  variant="long"
                  status={member.status}
                  progress={member.progress}
                  className={index === team.members.length - 1 ? 'border-b-0' : ''}
                />
              ))}
            </div>
          </div>
        );

      case 1: // Campaigns tab
        return (
          <>
            {mockCampaigns.map((campaign) => (
              <CampaignPreview
                key={campaign.id}
                title={campaign.title}
                status={campaign.status}
                stats={campaign.stats}
                onMoreInfo={() => router.push(`/campaigns/${campaign.id}`)}
              />
            ))}
          </>
        );

      case 2: // Access tab
        return (
          <div
            className="flex flex-col gap-[var(--space-l)] p-[var(--space-xl)] rounded-[var(--radius-lg)]"
            style={{ backgroundColor: 'var(--color-white)' }}
          >
            <h2 className="text-h2">Access Management</h2>
            <p className="text-grotesk" style={{ color: 'var(--color-gray-dark)' }}>
              Configure team access levels and permissions here.
            </p>
            <div className="flex gap-[var(--space-xs)]">
              <Button variant="cta-small">manage access</Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <main className="flex flex-col items-center pb-[84px]">
      {/* SecondRow - fixed under TopMenu, transparent → white on scroll */}
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
            { label: team.name },
          ]}
          onBack={handleBack}
        />
      </div>

      {/* Hero Section - Full Width with background image */}
      <section className="relative w-full h-[580px] flex flex-col items-center justify-end overflow-hidden">
        {/* Background Image - Full Width */}
        <Image
          src={team.coverSrc}
          alt={`${team.name} cover`}
          fill
          className="object-cover"
          priority
        />

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(242, 242, 242, 1) 0%, rgba(242, 242, 242, 0) 100%)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-[160px] w-full max-w-[var(--content-width)] pb-[var(--space-xl)]">
          {/* Profile Info */}
          <div className="flex flex-col items-center text-center">
            <h1 className="text-h1">{team.name}</h1>
            <p className="text-description mt-[var(--space-xl)]">
              {team.description.length > 30 
                ? <>
                    {team.description.split(' ').slice(0, 4).join(' ')}
                    <br />
                    {team.description.split(' ').slice(4).join(' ')}
                  </>
                : team.description
              }
            </p>

            {/* Add Campaign button - only on Campaigns tab */}
            {activeTab === 1 && (
              <div className="mt-[var(--space-m)]">
                <Button variant="cta-small" onClick={() => router.push('/campaigns/new')}>
                  add campaign
                </Button>
              </div>
            )}
          </div>

          {/* Switch Group */}
          <SwitchGroup
            options={['Team', 'Campaigns', 'Access']}
            value={activeTab}
            onChange={setActiveTab}
          />
        </div>
      </section>

      {/* Content Section - 830px Width */}
      <section className="w-full max-w-[var(--content-width)] flex flex-col gap-[var(--section-gap)] mt-[var(--section-gap)]">
        {/* Notify Block */}
        <Notify message={getNotifyMessage()} />

        {/* Tab Content */}
        {renderTabContent()}
      </section>
    </main>
  );
}
