'use client';

import { Button } from '../ui/Button';
import { MenuSwitch } from './MenuSwitch';

type TopMenuVariant = 'all' | 'templates' | 'off';

interface TopMenuProps {
  variant?: TopMenuVariant;
  onGenerateReport?: () => void;
  onTeamsClick?: () => void;
  onTemplatesClick?: () => void;
  onProfileClick?: () => void;
  onLogoutClick?: () => void;
  className?: string;
}

export function TopMenu({
  variant = 'all',
  onGenerateReport,
  onTeamsClick,
  onTemplatesClick,
  onProfileClick,
  onLogoutClick,
  className = '',
}: TopMenuProps) {
  return (
    <div
      className={`
        flex items-center justify-between
        px-[var(--space-m)] py-[var(--space-s)]
        border-b border-[var(--color-gray-light)]
        ${className}
      `.replace(/\s+/g, ' ').trim()}
    >
      {/* Left section: Logo + Actions */}
      <div className="flex items-center gap-[var(--space-m)]">
        {/* Logo */}
        <span className="text-h4 font-semibold">Hired & Wired</span>

        {/* Actions */}
        <div className="flex items-center gap-[var(--space-xs)]">
          <Button variant="on-color" onClick={onGenerateReport}>
            Generate report
          </Button>

          <MenuSwitch
            label="All teams"
            isActive={variant === 'all'}
            onClick={onTeamsClick}
          />

          <MenuSwitch
            label="All templates"
            isActive={variant === 'templates'}
            onClick={onTemplatesClick}
          />
        </div>
      </div>

      {/* Right section: Profile + Logout */}
      <div className="flex items-center gap-[var(--space-s)]">
        <button
          onClick={onProfileClick}
          className="text-grotesk hover:opacity-80 transition-opacity"
        >
          Profile
        </button>
        <button
          onClick={onLogoutClick}
          className="text-grotesk hover:opacity-80 transition-opacity"
        >
          Log out
        </button>
      </div>
    </div>
  );
}
