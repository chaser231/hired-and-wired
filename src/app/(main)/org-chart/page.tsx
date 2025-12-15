'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SecondRow } from '@/components/sections';
import { OrgNode } from '@/components/blocks/OrgNode';
import { OrgNode as OrgNodeType } from '@/types/org';

// Mock organization structure
const orgData: OrgNodeType = {
  id: 'ceo',
  name: 'Alexandra Chen',
  role: 'CEO',
  avatarSrc: '/assets/avatar-katya.png',
  department: 'Executive',
  children: [
    {
      id: 'cto',
      name: 'Michael Smith',
      role: 'CTO',
      avatarSrc: '/assets/avatar-petya.png',
      department: 'Technology',
      children: [
        {
          id: 'eng-lead',
          name: 'Sarah Mitchell',
          role: 'Engineering Lead',
          avatarSrc: '/assets/avatar-katya.png',
          children: [
            {
              id: 'dev-1',
              name: 'James Wilson',
              role: 'Senior Developer',
              avatarSrc: '/assets/avatar-petya.png',
            },
            {
              id: 'dev-2',
              name: 'Emily Davis',
              role: 'Developer',
              avatarSrc: '/assets/avatar-katya.png',
            },
          ],
        },
        {
          id: 'design-lead',
          name: 'David Brown',
          role: 'Design Lead',
          avatarSrc: '/assets/avatar-dog.png',
          children: [
            {
              id: 'designer-1',
              name: 'Linda Garcia',
              role: 'UX Designer',
              avatarSrc: '/assets/avatar-katya.png',
            },
          ],
        },
      ],
    },
    {
      id: 'coo',
      name: 'Robert Martinez',
      role: 'COO',
      avatarSrc: '/assets/avatar-dog.png',
      department: 'Operations',
      children: [
        {
          id: 'hr-lead',
          name: 'Jessica Taylor',
          role: 'HR Director',
          avatarSrc: '/assets/avatar-katya.png',
          children: [
            {
              id: 'hr-1',
              name: 'Alice Thompson',
              role: 'HR Manager',
              avatarSrc: '/assets/avatar-petya.png',
            },
          ],
        },
        {
          id: 'ops-lead',
          name: 'Charles Lee',
          role: 'Operations Manager',
          avatarSrc: '/assets/avatar-petya.png',
        },
      ],
    },
    {
      id: 'cfo',
      name: 'Patricia White',
      role: 'CFO',
      avatarSrc: '/assets/avatar-katya.png',
      department: 'Finance',
      children: [
        {
          id: 'finance-lead',
          name: 'Thomas Anderson',
          role: 'Finance Manager',
          avatarSrc: '/assets/avatar-dog.png',
        },
      ],
    },
  ],
};

export default function OrgChartPage() {
  const router = useRouter();
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

  return (
    <main className="flex flex-col items-center pb-[84px] min-h-screen">
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
            { label: 'Organization Chart' },
          ]}
          onBack={handleBack}
        />
      </div>

      {/* Header */}
      <div className="w-full max-w-[var(--content-width)] mt-[140px] mb-[var(--space-xl)]">
        <h1 className="text-h2">Organization Chart</h1>
        <p className="text-grotesk mt-[var(--space-xs)]" style={{ color: 'var(--color-gray-dark)' }}>
          Company structure and reporting hierarchy
        </p>
      </div>

      {/* Org Chart Container */}
      <div 
        className="w-full overflow-x-auto pb-[var(--space-xl)]"
        style={{ minHeight: '500px' }}
      >
        <div className="flex justify-center min-w-max px-[var(--space-xl)]">
          <OrgNode node={orgData} isRoot />
        </div>
      </div>
    </main>
  );
}

