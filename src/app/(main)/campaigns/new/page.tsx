'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui';
import { SecondRow, Task } from '@/components/sections';
import { useTeamsStore } from '@/lib/stores/teamsStore';

interface TaskItem {
  id: string;
  title: string;
  isCompleted: boolean;
  hasError?: boolean;
  errorMessage?: string;
  buttonLabel?: string;
  buttonAction?: string; // 'wizard' | 'review' | 'generate' etc.
}

const initialTasks: TaskItem[] = [
  {
    id: '1',
    title: 'Confirm budget allocation',
    isCompleted: true,
  },
  {
    id: '2',
    title: 'Define role requirements and job description',
    isCompleted: false,
    hasError: true,
    errorMessage: 'some field needs your attention',
    buttonLabel: 'job description',
    buttonAction: 'wizard',
  },
  {
    id: '3',
    title: 'Post job to job boards',
    isCompleted: false,
    buttonLabel: 'job description',
    buttonAction: 'wizard',
  },
  {
    id: '4',
    title: 'Review applications',
    isCompleted: false,
    buttonLabel: 'review',
  },
  {
    id: '5',
    title: 'Conduct initial interviews',
    isCompleted: false,
  },
  {
    id: '6',
    title: 'Onboarding paperwork',
    isCompleted: false,
    buttonLabel: 'generate',
  },
];

export default function HiringCampaignAddPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const teamId = searchParams.get('teamId') || '1';
  
  const team = useTeamsStore((state) => state.getTeam(teamId));
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBack = () => {
    if (team) {
      router.push(`/teams/${teamId}`);
    } else {
      router.push('/');
    }
  };

  const handleTaskToggle = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const handleTaskButtonClick = (task: TaskItem) => {
    if (task.buttonAction === 'wizard') {
      router.push(`/campaigns/new/wizard?teamId=${teamId}`);
    }
    // Other actions can be handled here
  };

  const teamName = team?.name || 'Engineering team';

  return (
    <main className="flex flex-col items-center gap-[var(--page-gap)] pb-[var(--page-gap)]">
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
            { label: teamName, href: `/teams/${teamId}` },
            { label: 'New campaign start' },
          ]}
          onBack={handleBack}
        />
      </div>

      {/* Content Container */}
      <div className="w-full max-w-[var(--content-width)] flex flex-col gap-[var(--section-gap)] mt-[104px]">
        {/* CardTop Yellow - Hero Section */}
        <div
          className="relative overflow-hidden flex flex-col justify-center items-center h-[480px] p-[var(--space-xl)] rounded-[var(--radius-lg)]"
        >
          {/* Background Image */}
          <Image
            src="/assets/card top.png"
            alt="New Campaign"
            fill
            className="object-cover"
            priority
          />

          {/* Yellow Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, rgba(255, 183, 0, 0.95) 0%, rgba(255, 183, 0, 0.7) 50%, transparent 100%)',
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center text-center gap-[var(--space-xl)]">
            <h1 className="text-h1">New Campaign Start</h1>
            <p
              className="text-description"
              style={{ color: 'var(--color-gold)' }}
            >
              Active campaign
            </p>
          </div>
        </div>

        {/* Tasks Block */}
        <div
          className="flex flex-col gap-[var(--space-l)] p-[var(--space-xl)] rounded-[var(--radius-lg)]"
          style={{ backgroundColor: 'var(--color-white)' }}
        >
          <h2 className="text-h2">Task</h2>

          <div className="flex flex-col gap-[var(--space-xxxs)]">
            {tasks.map((task, index) => (
              <Task
                key={task.id}
                title={task.title}
                variant={task.isCompleted ? 'past' : 'next'}
                isCompleted={task.isCompleted}
                hasError={task.hasError}
                errorMessage={task.errorMessage}
                buttonLabel={task.buttonLabel}
                showButton={!!task.buttonLabel}
                onToggle={() => handleTaskToggle(task.id)}
                onButtonClick={() => handleTaskButtonClick(task)}
                className={index === tasks.length - 1 ? 'border-b-0' : ''}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

