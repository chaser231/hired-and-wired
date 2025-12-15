'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Avatar, SwitchGroup } from '@/components/ui';
import { Profile, Notify } from '@/components/blocks';
import { SecondRow } from '@/components/sections';

// Mock data for team members
const teamMembersData = [
  {
    id: '1',
    name: 'Sarah Mitchell',
    role: 'Senior Software Engineer',
    avatarSrc: '/assets/avatar-katya.png',
    status: 'green' as const,
    progress: 75,
  },
  {
    id: '2',
    name: 'Michael Smith',
    role: 'Product Manager',
    avatarSrc: '/assets/avatar-petya.png',
    status: 'purple' as const,
    progress: 85,
  },
  {
    id: '3',
    name: 'Emily Davis',
    role: 'UX Designer',
    avatarSrc: '/assets/avatar-katya.png',
    status: 'green' as const,
    progress: 60,
  },
  {
    id: '4',
    name: 'David Brown',
    role: 'QA Engineer',
    avatarSrc: '/assets/avatar-dog.png',
    status: 'purple' as const,
    progress: 90,
  },
  {
    id: '5',
    name: 'Linda Garcia',
    role: 'Data Analyst',
    avatarSrc: '/assets/avatar-katya.png',
    status: 'green' as const,
    progress: 70,
  },
  {
    id: '6',
    name: 'James Wilson',
    role: 'Software Engineer',
    avatarSrc: '/assets/avatar-petya.png',
    status: 'red' as const,
    progress: 40,
  },
  {
    id: '7',
    name: 'Alice Thompson',
    role: 'Marketing Specialist',
    avatarSrc: '/assets/avatar-katya.png',
    status: 'green' as const,
    progress: 80,
  },
  {
    id: '8',
    name: 'Robert Martinez',
    role: 'Sales Executive',
    avatarSrc: '/assets/avatar-dog.png',
    status: 'red' as const,
    progress: 35,
  },
  {
    id: '9',
    name: 'Jessica Taylor',
    role: 'Content Strategist',
    avatarSrc: '/assets/avatar-katya.png',
    status: 'green' as const,
    progress: 65,
  },
  {
    id: '10',
    name: 'Charles Lee',
    role: 'Systems Analyst',
    avatarSrc: '/assets/avatar-petya.png',
    status: 'red' as const,
    progress: 45,
  },
];

// Mock team data
const teamData = {
  id: '1',
  name: 'Engineering Team',
  description: 'Detailed team overview and performance metrics',
  coverSrc: '/assets/Cover Image-1.jpg',
  weekUpdate: 'Kai finished the UI designs, Anya onboarded 3 new hires, and the team had a successful offsite event.',
};

export default function TeamDetailPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);

  const handleBack = () => {
    router.push('/');
  };

  return (
    <main className="flex flex-col items-center gap-[var(--page-gap)] pb-[84px]">
      {/* SecondRow - fixed under TopMenu */}
      <div 
        className="fixed top-[60px] left-0 right-0 z-40"
        style={{ backgroundColor: 'var(--color-white)' }}
      >
        <SecondRow
          variant="default"
          breadcrumbs={[
            { label: 'All teams', href: '/' },
            { label: teamData.name },
          ]}
          onBack={handleBack}
        />
      </div>

      {/* Main Content */}
      <div className="w-full max-w-[var(--content-width)] flex flex-col gap-[var(--section-gap)] mt-[120px]">
        {/* CardTop - Gray variant */}
        <div
          className="relative overflow-hidden flex flex-col justify-end items-center h-[480px] p-[var(--space-xl)] rounded-[var(--radius-lg)]"
        >
          {/* Background Image */}
          <Image
            src={teamData.coverSrc}
            alt={`${teamData.name} cover`}
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
          <div className="relative z-10 flex flex-col items-center gap-[160px]">
            {/* Profile Info */}
            <div className="flex flex-col items-center text-center">
              <h1 className="text-h1">{teamData.name}</h1>
              <p className="text-description mt-[var(--space-xl)]">
                {teamData.description.split(' ').slice(0, 3).join(' ')}
                <br />
                {teamData.description.split(' ').slice(3).join(' ')}
              </p>
            </div>

            {/* Switch Group */}
            <SwitchGroup
              options={['Team', 'Campaigns', 'Access']}
              value={activeTab}
              onChange={setActiveTab}
            />
          </div>
        </div>

        {/* Notify Block with Avatars */}
        <div className="flex flex-col gap-[var(--section-gap)]">
          <Notify message={teamData.weekUpdate} />
          
          {/* Avatars - stacked with overlap */}
          <div className="relative h-[30px] ml-[var(--space-xl)]">
            <div className="absolute left-0 top-0">
              <Avatar src="/assets/avatar-dog.png" alt="Team member" size="md" />
            </div>
            <div className="absolute left-[4px] top-[4px]">
              <Avatar src="/assets/avatar-katya.png" alt="Team member" size="md" />
            </div>
          </div>
        </div>

        {/* Team Section - White Card */}
        <div
          className="flex flex-col gap-[var(--space-l)] p-[var(--space-xl)] rounded-[var(--radius-lg)]"
          style={{ backgroundColor: 'var(--color-white)' }}
        >
          {/* Title */}
          <h2 className="text-h2">Team</h2>

          {/* Team Members List */}
          <div className="flex flex-col gap-[var(--space-xxxs)]">
            {teamMembersData.map((member, index) => (
              <Profile
                key={member.id}
                name={member.name}
                role={member.role}
                avatarSrc={member.avatarSrc}
                variant="long"
                status={member.status}
                progress={member.progress}
                className={index === teamMembersData.length - 1 ? 'border-b-0' : ''}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

