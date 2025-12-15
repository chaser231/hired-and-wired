'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button, SwitchGroup } from '@/components/ui';
import { CardMetric, Team } from '@/components/blocks';
import { useTeamsStore } from '@/lib/stores/teamsStore';

const metricsData = [
  { title: 'Health', summary: 'Overall: Good', color: 'pink-light' as const },
  { title: 'Productivity', summary: '+12% This Month', color: 'pink' as const },
  { title: 'Distribution', summary: '8 Teams Active', color: 'purple-light' as const },
  { title: 'Hiring', summary: '15 Open Position', color: 'green-light' as const },
];

export default function AllTeamsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const teams = useTeamsStore((state) => state.teams);

  return (
    <main className="flex flex-col items-center pb-[84px]">
      {/* Hero Section - Full Width, starts from top (under header) */}
      <section className="relative w-full h-[580px] flex flex-col items-center justify-end overflow-hidden">
        {/* Background Image */}
        <Image
          src="/assets/Cover Image.jpg"
          alt="All teams cover"
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
        <div className="relative z-10 flex flex-col items-center justify-center gap-[160px] w-full max-w-[var(--content-width)] mt-[130px] pb-[var(--space-xl)]">
          {/* Title & Button */}
          <div className="flex flex-col items-center gap-[var(--space-xl)]">
            <div className="text-center">
              <h1 className="text-h1">All teams</h1>
              <p className="text-description mt-[var(--space-xl)]">
                Overview of all teams
                <br />
                and their performance metrics
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-[var(--space-xs)]">
              <Button variant="cta-small" onClick={() => router.push('/teams/new')}>
                add team
              </Button>
              <Button variant="secondary" onClick={() => router.push('/org-chart')}>
                org chart
              </Button>
            </div>
          </div>

          {/* Tab Switcher - at bottom */}
          <SwitchGroup
            options={['Overview', 'Employees', 'Report']}
            value={activeTab}
            onChange={setActiveTab}
          />
        </div>
      </section>

      {/* Content Section - 830px Width */}
      <section className="w-full max-w-[var(--content-width)] flex flex-col gap-[var(--section-gap)] mt-[var(--section-gap)]">
        {/* Metrics Row */}
        <div className="flex gap-[var(--section-gap)]">
          {metricsData.map((metric, index) => (
            <CardMetric
              key={index}
              title={metric.title}
              summary={metric.summary}
              color={metric.color}
              graphBars={[100, 58]}
            />
          ))}
        </div>

        {/* Teams Grid - 2 columns */}
        <div className="grid grid-cols-2 gap-[var(--section-gap)]">
          {teams.map((team) => (
            <Team
              key={team.id}
              id={team.id}
              name={team.name}
              memberCount={team.memberCount}
              productivity={team.productivity}
              weekHighlight={team.weekHighlight}
              members={team.members.slice(0, 3).map((m) => ({
                src: m.avatarSrc,
                alt: m.name,
              }))}
              href={`/teams/${team.id}`}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
