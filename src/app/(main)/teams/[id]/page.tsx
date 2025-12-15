'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { SwitchGroup } from '@/components/ui';
import { Profile, Notify } from '@/components/blocks';
import { SecondRow } from '@/components/sections';
import { useTeamsStore } from '@/lib/stores/teamsStore';

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
        <Notify message={team.weekHighlight} />

        {/* Team Section - White Card */}
        <div
          className="flex flex-col gap-[var(--space-l)] p-[var(--space-xl)] rounded-[var(--radius-lg)]"
          style={{ backgroundColor: 'var(--color-white)' }}
        >
          {/* Title */}
          <h2 className="text-h2">Team</h2>

          {/* Team Members List */}
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
      </section>
    </main>
  );
}
