'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input, TextArea, Dropdown, Button } from '@/components/ui';
import { SecondRow } from '@/components/sections';
import { useTeamsStore } from '@/lib/stores/teamsStore';

// Mock data for team leads
const teamLeadOptions = [
  { value: 'sarah', label: 'Sarah Mitchell' },
  { value: 'michael', label: 'Michael Smith' },
  { value: 'emily', label: 'Emily Davis' },
  { value: 'david', label: 'David Brown' },
];

// Mock data for departments
const departmentOptions = [
  { value: 'engineering', label: 'Engineering' },
  { value: 'product', label: 'Product' },
  { value: 'design', label: 'Design' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'sales', label: 'Sales' },
  { value: 'hr', label: 'Human Resources' },
];

export default function CreateTeamPage() {
  const router = useRouter();
  const addTeam = useTeamsStore((state) => state.addTeam);
  const [isScrolled, setIsScrolled] = useState(false);

  // Form state
  const [teamName, setTeamName] = useState('');
  const [description, setDescription] = useState('');
  const [teamLead, setTeamLead] = useState('');
  const [department, setDepartment] = useState('');

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

  const handleCancel = () => {
    router.push('/');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addTeam({
      name: teamName,
      description: description || `${teamName} - building great things together`,
      department,
      teamLead,
    });

    router.push('/');
  };

  const isFormValid = teamName.trim() && teamLead && department;

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
            { label: 'Create team' },
          ]}
          onBack={handleBack}
        />
      </div>

      {/* Content */}
      <div className="w-full max-w-[var(--content-width)] flex flex-col gap-[var(--section-gap)] mt-[140px]">
        {/* Form Card */}
        <div
          className="flex flex-col gap-[var(--space-xl)] p-[var(--space-xl)] rounded-[var(--radius-lg)]"
          style={{ backgroundColor: 'var(--color-white)' }}
        >
          {/* Title */}
          <h1 className="text-h2">Create Team</h1>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-[var(--space-l)]">
            {/* Team Name */}
            <Input
              label="Team name"
              placeholder="ENTER TEAM NAME..."
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />

            {/* Description */}
            <TextArea
              label="Description"
              placeholder="DESCRIBE THE TEAM'S PURPOSE AND RESPONSIBILITIES..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />

            {/* Two-column layout for dropdowns */}
            <div className="grid grid-cols-2 gap-[var(--space-m)]">
              {/* Team Lead */}
              <div className="flex flex-col gap-[var(--space-xs)]">
                <label
                  className="text-pixel"
                  style={{
                    fontFamily: 'var(--font-akkurat)',
                    fontSize: '8px',
                    fontWeight: 400,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                  }}
                >
                  Team lead
                </label>
                <Dropdown
                  options={teamLeadOptions}
                  value={teamLead}
                  onChange={setTeamLead}
                  placeholder="Select team lead..."
                />
              </div>

              {/* Department */}
              <div className="flex flex-col gap-[var(--space-xs)]">
                <label
                  className="text-pixel"
                  style={{
                    fontFamily: 'var(--font-akkurat)',
                    fontSize: '8px',
                    fontWeight: 400,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                  }}
                >
                  Department
                </label>
                <Dropdown
                  options={departmentOptions}
                  value={department}
                  onChange={setDepartment}
                  placeholder="Select department..."
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-[var(--space-xs)] pt-[var(--space-m)]">
              <Button
                type="button"
                variant="secondary"
                onClick={handleCancel}
              >
                cancel
              </Button>
              <Button
                type="submit"
                variant="cta-small"
                disabled={!isFormValid}
              >
                create team
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
