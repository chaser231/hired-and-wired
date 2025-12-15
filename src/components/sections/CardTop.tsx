'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';
import { SwitchGroup } from '../ui/Switch';

type CardTopVariant = 'yellow' | 'gray';

interface DropdownOption {
  label: string;
  value: string;
}

interface CardTopProps {
  name: string;
  role: string;
  coverSrc?: string;
  variant?: CardTopVariant;
  teamsDropdowns?: DropdownOption[];
  teamsOptions?: DropdownOption[];
  accessDropdown?: DropdownOption;
  accessOptions?: DropdownOption[];
  switchOptions?: string[];
  selectedSwitch?: number;
  onSwitchChange?: (index: number) => void;
  onTeamChange?: (index: number, value: string) => void;
  onAccessChange?: (value: string) => void;
  actions?: Array<{
    label: string;
    onClick?: () => void;
  }>;
  className?: string;
}

// Functional dropdown component for on-color variant
function OnColorDropdown({
  value,
  options,
  onChange,
  color = 'gold',
}: {
  value: DropdownOption;
  options: DropdownOption[];
  onChange?: (value: string) => void;
  color?: 'gold' | 'white';
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const bgColor = color === 'gold' ? 'var(--color-gold)' : 'var(--color-white)';
  const textColor = color === 'gold' ? 'var(--color-white)' : 'var(--color-black)';

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-[var(--space-xs)] px-[var(--space-s)] py-[var(--space-xs)] rounded-[var(--radius-sm)] text-pixel hover:opacity-80 transition-opacity"
        style={{ backgroundColor: bgColor, color: textColor }}
      >
        <span>{value.label}</span>
        <Icon
          name="arrow-down"
          size="sm"
          className={`transition-transform ${isOpen ? 'rotate-180' : ''} ${color === 'gold' ? 'invert' : ''}`}
        />
      </button>

      {isOpen && (
        <div
          className="absolute z-50 mt-[var(--space-xxs)] min-w-full rounded-[var(--radius-sm)] shadow-lg overflow-hidden"
          style={{ backgroundColor: bgColor }}
        >
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange?.(option.value);
                setIsOpen(false);
              }}
              className="w-full text-left px-[var(--space-s)] py-[var(--space-xs)] text-pixel hover:opacity-70 transition-opacity"
              style={{
                color: textColor,
                backgroundColor: option.value === value.value ? 'rgba(0,0,0,0.1)' : 'transparent',
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const defaultTeamsOptions: DropdownOption[] = [
  { label: 'frontend-team', value: 'frontend' },
  { label: 'backend-team', value: 'backend' },
  { label: 'design-team', value: 'design' },
  { label: 'Innovation Lab', value: 'innovation' },
  { label: 'Lead Developer', value: 'lead' },
  { label: 'Senior Developer', value: 'senior' },
  { label: 'Member', value: 'member' },
  { label: 'Intern', value: 'intern' },
];

const defaultAccessOptions: DropdownOption[] = [
  { label: 'Access LEVEL 1 (PUBLIC)', value: 'level1' },
  { label: 'Access LEVEL 2 (INTERNAL)', value: 'level2' },
  { label: 'Access LEVEL 3 (CONFIDENTIAL)', value: 'level3' },
  { label: 'Access LEVEL 4 (CODE RED)', value: 'level4' },
  { label: 'Access LEVEL 5 (TOP SECRET)', value: 'level5' },
];

export function CardTop({
  name,
  role,
  coverSrc = '/assets/Cover Image.jpg',
  variant = 'yellow',
  teamsDropdowns = [
    { label: 'frontend-team', value: 'frontend' },
    { label: 'Innovation Lab', value: 'innovation' },
    { label: 'Lead Developer', value: 'lead' },
    { label: 'Member', value: 'member' },
  ],
  teamsOptions = defaultTeamsOptions,
  accessDropdown = { label: 'Access LEVEL 4 (CODE RED)', value: 'level4' },
  accessOptions = defaultAccessOptions,
  switchOptions = ['Team', 'Team', 'Team'],
  selectedSwitch = 0,
  onSwitchChange,
  onTeamChange,
  onAccessChange,
  actions = [
    { label: 'promote' },
    { label: 'negotiate' },
    { label: 'suspend' },
    { label: 'fire' },
  ],
  className = '',
}: CardTopProps) {
  const isYellow = variant === 'yellow';
  const [activeSwitchIndex, setActiveSwitchIndex] = useState(selectedSwitch);
  const [teams, setTeams] = useState(teamsDropdowns);
  const [access, setAccess] = useState(accessDropdown);

  const handleTeamChange = (index: number, value: string) => {
    const option = teamsOptions.find((o) => o.value === value);
    if (option) {
      const newTeams = [...teams];
      newTeams[index] = option;
      setTeams(newTeams);
      onTeamChange?.(index, value);
    }
  };

  const handleAccessChange = (value: string) => {
    const option = accessOptions.find((o) => o.value === value);
    if (option) {
      setAccess(option);
      onAccessChange?.(value);
    }
  };

  const handleAddTeam = () => {
    const unusedOption = teamsOptions.find(
      (o) => !teams.some((t) => t.value === o.value)
    );
    if (unusedOption) {
      setTeams([...teams, unusedOption]);
    }
  };

  if (isYellow) {
    return (
      <div
        className={`
          relative overflow-hidden
          flex flex-col justify-between
          h-[480px] p-[var(--space-xl)]
          rounded-[var(--radius-lg)]
          ${className}
        `.replace(/\s+/g, ' ').trim()}
      >
        {/* Background Image */}
        <Image
          src={coverSrc}
          alt={`${name} cover`}
          fill
          className="object-cover"
        />

        {/* Yellow Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(255, 183, 0, 0.95) 0%, rgba(255, 183, 0, 0.7) 50%, transparent 100%)',
          }}
        />

        {/* Content - relative to be above overlay */}
        <div className="relative z-10 flex flex-col justify-between h-full">
          {/* Top Row - Labels */}
          <div className="flex justify-between">
            <span className="text-pixel" style={{ color: 'var(--color-gold)' }}>TEAMS</span>
            <span className="text-pixel" style={{ color: 'var(--color-gold)' }}>access</span>
          </div>

          {/* Center - Name & Role & Actions */}
          <div className="flex flex-col items-center text-center">
            <h1 className="text-h1">{name}</h1>
            <p className="text-description mt-[var(--space-xs)]" style={{ color: 'var(--color-gold)' }}>
              {role}
            </p>

            {/* Action Buttons - White */}
            <div className="flex gap-[2px] mt-[var(--space-m)]">
              {actions.map((action) => (
                <Button
                  key={action.label}
                  variant="on-color"
                  onClick={action.onClick}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Bottom Row - Dropdowns */}
          <div className="flex justify-between items-end">
            {/* Left - Teams dropdowns */}
            <div className="flex flex-wrap gap-[2px]" style={{ maxWidth: '310px' }}>
              {teams.map((item, index) => (
                <OnColorDropdown
                  key={`${item.value}-${index}`}
                  value={item}
                  options={teamsOptions}
                  onChange={(val) => handleTeamChange(index, val)}
                  color="gold"
                />
              ))}
              <Button variant="color" onClick={handleAddTeam}>add</Button>
            </div>

            {/* Right - Access dropdown */}
            <div className="flex flex-wrap justify-end gap-[2px]" style={{ maxWidth: '175px' }}>
              <OnColorDropdown
                value={access}
                options={accessOptions}
                onChange={handleAccessChange}
                color="gold"
              />
              <Button variant="color">add</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Gray variant
  return (
    <div
      className={`
        relative overflow-hidden
        flex flex-col justify-end items-center
        h-[480px] p-[var(--space-xl)]
        rounded-[var(--radius-lg)]
        ${className}
      `.replace(/\s+/g, ' ').trim()}
    >
      {/* Background Image - covers entire card */}
      <Image
        src={coverSrc}
        alt={`${name} cover`}
        fill
        className="object-cover"
      />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, rgba(242, 242, 242, 1) 0%, rgba(242, 242, 242, 0) 100%)',
        }}
      />

      {/* Content - relative to be above overlay */}
      <div className="relative z-10 flex flex-col items-center gap-[var(--space-xl)] pb-[var(--space-xl)]">
        {/* Profile Info */}
        <div className="flex flex-col items-center text-center">
          {/* Name & Role */}
          <h1 className="text-h1">{name}</h1>
          <p className="text-description mt-[var(--space-xs)]">
            {role}
          </p>

          {/* Action Buttons - Black */}
          <div className="flex gap-[2px] mt-[var(--space-m)]">
            {actions.map((action) => (
              <Button
                key={action.label}
                variant="cta-small"
                onClick={action.onClick}
              >
                {action.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Switch Group - at bottom */}
        <SwitchGroup
          options={switchOptions}
          value={activeSwitchIndex}
          onChange={(index) => {
            setActiveSwitchIndex(index);
            onSwitchChange?.(index);
          }}
        />
      </div>
    </div>
  );
}
