'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input, TextArea, Button, Tag } from '@/components/ui';
import { SecondRow } from '@/components/sections';
import { useTeamsStore } from '@/lib/stores/teamsStore';
import { useCampaignsStore } from '@/lib/stores/campaignsStore';

// Dropdown with label component
function LabeledDropdown({
  label,
  value,
  options,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((o) => o.value === value);

  return (
    <div className="flex flex-col gap-[var(--space-xs)] flex-1">
      <label
        className="text-caps"
        style={{ color: 'var(--color-black)' }}
      >
        {label}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-[var(--space-s)] py-[var(--space-xs)] bg-[var(--color-gray-light)] rounded-[var(--radius-sm)] text-pixel"
        >
          <span className={!selectedOption ? 'text-[var(--color-gray-dark)]' : ''}>
            {selectedOption?.label || placeholder || 'Select...'}
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-[var(--space-xxxs)] bg-[var(--color-white)] border border-[var(--color-gray-light)] rounded-[var(--radius-sm)] shadow-lg overflow-hidden">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-[var(--space-s)] py-[var(--space-xs)] text-pixel hover:bg-[var(--color-gray-bg)] ${
                  value === option.value ? 'bg-[var(--color-gray-light)]' : ''
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Form data interface
interface CampaignFormData {
  name: string;
  location: string;
  department: string;
  employmentType: string;
  remoteOptions: string;
  jobDescription: string;
  salary: string;
  deadline: string;
  requiredSkills: string[];
  experienceLevel: string;
  educationLevel: string;
  qualifications: string;
  interviewDuration: string;
  numberOfRounds: string;
  hiringTeam: string;
  teamMember: string;
}

const initialFormData: CampaignFormData = {
  name: '',
  location: '',
  department: '',
  employmentType: '',
  remoteOptions: '',
  jobDescription: '',
  salary: '',
  deadline: '',
  requiredSkills: [],
  experienceLevel: '',
  educationLevel: '',
  qualifications: '',
  interviewDuration: '',
  numberOfRounds: '',
  hiringTeam: '',
  teamMember: '',
};

const departmentOptions = [
  { value: 'engineering', label: 'Engineering' },
  { value: 'design', label: 'Design' },
  { value: 'product', label: 'Product' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'sales', label: 'Sales' },
  { value: 'hr', label: 'HR' },
];

const employmentTypeOptions = [
  { value: 'full-time', label: 'Full-time' },
  { value: 'part-time', label: 'Part-time' },
  { value: 'contract', label: 'Contract' },
  { value: 'internship', label: 'Internship' },
];

const remoteOptions = [
  { value: 'on-site', label: 'On-site' },
  { value: 'remote', label: 'Remote' },
  { value: 'hybrid', label: 'Hybrid' },
];

const experienceLevelOptions = [
  { value: 'entry', label: 'Entry Level' },
  { value: 'junior', label: 'Junior' },
  { value: 'mid', label: 'Mid-Level' },
  { value: 'senior', label: 'Senior' },
  { value: 'lead', label: 'Lead' },
  { value: 'principal', label: 'Principal' },
];

const educationLevelOptions = [
  { value: 'high-school', label: 'High School' },
  { value: 'bachelor', label: "Bachelor's Degree" },
  { value: 'master', label: "Master's Degree" },
  { value: 'phd', label: 'PhD' },
  { value: 'none', label: 'No Requirement' },
];

const interviewDurationOptions = [
  { value: '15', label: '15 mins' },
  { value: '30', label: '30 mins' },
  { value: '45', label: '45 mins' },
  { value: '60', label: '60 mins' },
  { value: '90', label: '90 mins' },
];

const numberOfRoundsOptions = [
  { value: '1', label: '1 round' },
  { value: '2', label: '2 rounds' },
  { value: '3', label: '3 rounds' },
  { value: '4', label: '4 rounds' },
  { value: '5', label: '5 rounds' },
];

export default function CampaignWizardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const teamId = searchParams.get('teamId') || '1';

  const team = useTeamsStore((state) => state.getTeam(teamId));
  const teams = useTeamsStore((state) => state.teams);
  const addCampaign = useCampaignsStore((state) => state.addCampaign);

  const [formData, setFormData] = useState<CampaignFormData>(initialFormData);
  const [skillInput, setSkillInput] = useState('');
  const [errors, setErrors] = useState<Partial<Record<keyof CampaignFormData, string>>>({});
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
    router.push(`/campaigns/new?teamId=${teamId}`);
  };

  const handleSave = () => {
    // Save as draft - just go back
    router.push(`/campaigns/new?teamId=${teamId}`);
  };

  const handleAddSkill = () => {
    if (skillInput.trim() && !formData.requiredSkills.includes(skillInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        requiredSkills: [...prev.requiredSkills, skillInput.trim()],
      }));
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      requiredSkills: prev.requiredSkills.filter((s) => s !== skill),
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CampaignFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Campaign name is required';
    }
    if (!formData.department) {
      newErrors.department = 'Department is required';
    }
    if (!formData.salary.trim()) {
      newErrors.salary = 'Salary is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePublish = () => {
    if (!validateForm()) {
      return;
    }

    // Create campaign
    addCampaign({
      teamId,
      title: formData.name,
      status: 'green',
      stats: {
        applied: 0,
        rejected: 0,
        inProgress: 0,
        finalRound: 0,
        offersSent: 0,
      },
    });

    // Navigate to success page
    router.push(`/campaigns/new/success?teamId=${teamId}`);
  };

  const teamName = team?.name || 'Engineering team';

  // Get team options for hiring team dropdown
  const teamOptions = teams.map((t) => ({
    value: t.id,
    label: t.name,
  }));

  // Get team members for selected team
  const selectedTeam = teams.find((t) => t.id === formData.hiringTeam);
  const memberOptions = selectedTeam?.members.map((m) => ({
    value: m.id,
    label: m.name,
  })) || [];

  return (
    <main className="flex flex-col items-center pb-[var(--page-gap)]">
      {/* SecondRow - fixed under TopMenu, builder variant */}
      <div
        className="fixed top-[60px] left-0 right-0 z-40 transition-colors duration-200"
        style={{
          backgroundColor: isScrolled ? 'var(--color-white)' : 'transparent',
          borderBottom: isScrolled ? '1px solid var(--color-gray-light)' : 'none',
        }}
      >
        <SecondRow
          variant="builder"
          onBack={handleBack}
          onSave={handleSave}
          onDeploy={handlePublish}
        />
      </div>

      {/* Content */}
      <div className="w-full flex flex-col items-center gap-[var(--page-gap)] mt-[60px] px-[var(--space-m)]">
        {/* Title */}
        <h1 className="text-h1 text-center">New Campaign</h1>

        {/* Form Box */}
        <div
          className="w-full max-w-[var(--content-width)] flex flex-col gap-[var(--page-gap)] p-[var(--space-xl)] rounded-[var(--radius-lg)]"
          style={{
            backgroundColor: 'var(--color-white)',
            paddingLeft: '174px',
            paddingRight: '174px',
          }}
        >
          {/* Details Section */}
          <section className="flex flex-col gap-[var(--space-l)]">
            <h2 className="text-h2">Details</h2>

            {/* Row 1: Campaign Name (left) + Department (right) */}
            <div className="flex gap-[var(--section-gap)]">
              <div className="flex-1">
                <Input
                  label="campaign name"
                  placeholder="e.g. UX Researcher, Q1 2025"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  error={errors.name}
                />
              </div>
              <LabeledDropdown
                label="Department"
                value={formData.department}
                options={departmentOptions}
                onChange={(value) => setFormData({ ...formData, department: value })}
                placeholder="Select Department"
              />
            </div>

            {/* Row 2: Location (left) + Employment Type (right) */}
            <div className="flex gap-[var(--section-gap)]">
              <div className="flex-1">
                <Input
                  label="location"
                  placeholder="Select Location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
              <LabeledDropdown
                label="employment type"
                value={formData.employmentType}
                options={employmentTypeOptions}
                onChange={(value) => setFormData({ ...formData, employmentType: value })}
                placeholder="Select Type"
              />
            </div>

            {/* Row 3: Campaign Name 2 (left) + Remote Options (right) */}
            <div className="flex gap-[var(--section-gap)]">
              <div className="flex-1">
                <Input
                  label="campaign name"
                  placeholder="e.g. UX Researcher, Q1 2025"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <LabeledDropdown
                label="remote options"
                value={formData.remoteOptions}
                options={remoteOptions}
                onChange={(value) => setFormData({ ...formData, remoteOptions: value })}
                placeholder="Select Option"
              />
            </div>

            {/* Job Description */}
            <TextArea
              label="job description"
              placeholder="type something here"
              value={formData.jobDescription}
              onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
              className="min-h-[100px]"
            />

            {/* Row: Salary + Deadline */}
            <div className="flex gap-[var(--section-gap)]">
              <div className="flex-1">
                <Input
                  label="salary"
                  placeholder="$34 500"
                  value={formData.salary}
                  onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                  error={errors.salary}
                />
              </div>
              <LabeledDropdown
                label="deadline"
                value={formData.deadline}
                options={[
                  { value: '2025-01-15', label: '15.01.2025' },
                  { value: '2025-02-01', label: '01.02.2025' },
                  { value: '2025-03-01', label: '01.03.2025' },
                  { value: '2025-06-01', label: '01.06.2025' },
                ]}
                onChange={(value) => setFormData({ ...formData, deadline: value })}
                placeholder="Select Date"
              />
            </div>

            {/* Error Block */}
            {Object.keys(errors).length > 0 && (
              <div
                className="flex gap-[var(--space-s)] items-center px-[var(--space-xs)] py-[var(--space-xxs)] rounded-[var(--radius-sm)]"
                style={{ backgroundColor: 'var(--color-coral)' }}
              >
                <span className="text-caps" style={{ color: 'var(--color-error)' }}>
                  error!
                </span>
                <span className="text-caps" style={{ color: 'var(--color-error)' }}>
                  add more money for salary, you dumb ass
                </span>
              </div>
            )}
          </section>

          {/* Requirements Section */}
          <section className="flex flex-col gap-[var(--space-l)]">
            <h2 className="text-h2">Requirements</h2>

            {/* Required Skills Input + Add Button */}
            <div className="flex flex-col gap-[var(--section-gap)]">
              <div className="flex gap-[var(--section-gap)] items-end">
                <div className="flex-1">
                  <Input
                    label="required skills"
                    placeholder="e.g. Python, SQL, etc."
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSkill();
                      }
                    }}
                  />
                </div>
                <Button variant="secondary" onClick={handleAddSkill}>
                  add
                </Button>
              </div>

              {/* Tags */}
              {formData.requiredSkills.length > 0 && (
                <div className="flex flex-wrap gap-[var(--space-xxxs)]">
                  {formData.requiredSkills.map((skill) => (
                    <Tag
                      key={skill}
                      variant="control"
                      onRemove={() => handleRemoveSkill(skill)}
                    >
                      {skill}
                    </Tag>
                  ))}
                </div>
              )}
            </div>

            {/* Experience Level + Education Level */}
            <div className="flex gap-[var(--space-xs)]">
              <LabeledDropdown
                label="experience level"
                value={formData.experienceLevel}
                options={experienceLevelOptions}
                onChange={(value) => setFormData({ ...formData, experienceLevel: value })}
                placeholder="Select Experience Level"
              />
              <LabeledDropdown
                label="education level"
                value={formData.educationLevel}
                options={educationLevelOptions}
                onChange={(value) => setFormData({ ...formData, educationLevel: value })}
                placeholder="Select Education Level"
              />
            </div>

            {/* Preferred Qualifications */}
            <TextArea
              label="Preffered Qualifications"
              placeholder="type something here"
              value={formData.qualifications}
              onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
              className="min-h-[100px]"
            />

            {/* Interview Duration x2 */}
            <div className="flex gap-[var(--space-xs)]">
              <LabeledDropdown
                label="interview duration in minutes"
                value={formData.interviewDuration}
                options={interviewDurationOptions}
                onChange={(value) => setFormData({ ...formData, interviewDuration: value })}
                placeholder="30 mins"
              />
              <LabeledDropdown
                label="number of rounds"
                value={formData.numberOfRounds}
                options={numberOfRoundsOptions}
                onChange={(value) => setFormData({ ...formData, numberOfRounds: value })}
                placeholder="3 rounds"
              />
            </div>

            {/* Hiring Team + Team Member */}
            <div className="flex gap-[var(--space-xs)]">
              <LabeledDropdown
                label="hiring team"
                value={formData.hiringTeam}
                options={teamOptions}
                onChange={(value) => setFormData({ ...formData, hiringTeam: value, teamMember: '' })}
                placeholder="Select Team"
              />
              <LabeledDropdown
                label="team member"
                value={formData.teamMember}
                options={memberOptions}
                onChange={(value) => setFormData({ ...formData, teamMember: value })}
                placeholder="Select Team Member"
              />
            </div>
          </section>

          {/* Publish Button */}
          <Button
            variant="cta-big"
            onClick={handlePublish}
            className="w-full"
          >
            Publish
          </Button>
        </div>
      </div>
    </main>
  );
}

