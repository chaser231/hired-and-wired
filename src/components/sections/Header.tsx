'use client';

import { TopMenu } from './TopMenu';
import { SecondRow } from './SecondRow';
import { Bar } from '../ui/Bar';

type TopMenuVariant = 'all' | 'templates' | 'off';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface HeaderProps {
  menuVariant?: TopMenuVariant;
  breadcrumbs?: BreadcrumbItem[];
  progress?: number;
  stages?: string[];
  onBack?: () => void;
  onGenerateReport?: () => void;
  onTeamsClick?: () => void;
  onTemplatesClick?: () => void;
  onProfileClick?: () => void;
  onLogoutClick?: () => void;
  className?: string;
}

const defaultStages = [
  'applied',
  'interviewed',
  'onboarding',
  'half-term',
  'common',
  'leads team',
  'minus one',
  'c-level',
  'fired',
];

export function Header({
  menuVariant = 'all',
  breadcrumbs = [
    { label: 'Home' },
    { label: 'Something' },
    { label: 'Something' },
  ],
  progress = 75,
  stages = defaultStages,
  onBack,
  onGenerateReport,
  onTeamsClick,
  onTemplatesClick,
  onProfileClick,
  onLogoutClick,
  className = '',
}: HeaderProps) {
  return (
    <div
      className={`
        bg-[var(--color-white)]
        ${className}
      `.replace(/\s+/g, ' ').trim()}
    >
      {/* Top Menu */}
      <TopMenu
        variant={menuVariant}
        onGenerateReport={onGenerateReport}
        onTeamsClick={onTeamsClick}
        onTemplatesClick={onTemplatesClick}
        onProfileClick={onProfileClick}
        onLogoutClick={onLogoutClick}
      />

      {/* Second Row */}
      <SecondRow
        variant="default"
        breadcrumbs={breadcrumbs}
        onBack={onBack}
      />

      {/* Progress Bar with Stages */}
      <div className="px-[var(--space-m)] pb-[var(--space-s)]">
        {/* Bar */}
        <Bar progress={progress} variant="big" />

        {/* Stage Labels */}
        <div className="flex justify-between mt-[var(--space-xxs)]">
          {stages.map((stage) => (
            <span
              key={stage}
              className="text-caps"
              style={{ color: 'var(--color-gray-dark)' }}
            >
              {stage}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
