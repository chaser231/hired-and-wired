'use client';

import { useState } from 'react';
import {
  MenuSwitch,
  TopMenu,
  SecondRow,
  Header,
  Pipeline,
  Task,
  CardTop,
} from '@/components/sections';

export default function OrganismsPage() {
  const [menuVariant, setMenuVariant] = useState<'all' | 'templates' | 'off'>('all');

  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: 'var(--color-gray-bg)' }}
    >
      {/* Header Demo - Full Width */}
      <section className="mb-[var(--space-l)]">
        <div
          className="p-[var(--space-s)] mb-[var(--space-xs)]"
          style={{ backgroundColor: 'var(--color-purple-light)' }}
        >
          <span className="text-caps">❖ header</span>
        </div>
        <Header
          menuVariant={menuVariant}
          onTeamsClick={() => setMenuVariant('all')}
          onTemplatesClick={() => setMenuVariant('templates')}
          breadcrumbs={[
            { label: 'Home' },
            { label: 'Something' },
            { label: 'Something' },
          ]}
          progress={75}
        />
      </section>

      <div className="max-w-7xl mx-auto px-[var(--space-xl)] space-y-[var(--space-l)]">
        {/* TopMenu Variants */}
        <section
          className="p-[var(--space-l)] rounded-[var(--radius-lg)]"
          style={{ backgroundColor: 'var(--color-white)' }}
        >
          <div
            className="inline-block px-[var(--space-s)] py-[var(--space-xxs)] mb-[var(--space-m)] rounded-[var(--radius-sm)]"
            style={{ backgroundColor: 'var(--color-purple-light)' }}
          >
            <span className="text-caps">❖ topmenu</span>
          </div>

          <div className="space-y-[var(--space-m)]">
            <div className="border border-[var(--color-gray-light)] rounded-[var(--radius-lg)] overflow-hidden">
              <TopMenu variant="all" />
            </div>
            <div className="border border-[var(--color-gray-light)] rounded-[var(--radius-lg)] overflow-hidden">
              <TopMenu variant="templates" />
            </div>
            <div className="border border-[var(--color-gray-light)] rounded-[var(--radius-lg)] overflow-hidden">
              <TopMenu variant="off" />
            </div>
          </div>
        </section>

        {/* SecondRow Variants */}
        <section
          className="p-[var(--space-l)] rounded-[var(--radius-lg)]"
          style={{ backgroundColor: 'var(--color-white)' }}
        >
          <div
            className="inline-block px-[var(--space-s)] py-[var(--space-xxs)] mb-[var(--space-m)] rounded-[var(--radius-sm)]"
            style={{ backgroundColor: 'var(--color-purple-light)' }}
          >
            <span className="text-caps">❖ second-row</span>
          </div>

          <div className="space-y-[var(--space-m)]">
            <div className="border border-[var(--color-gray-light)] rounded-[var(--radius-lg)] overflow-hidden">
              <SecondRow
                variant="default"
                breadcrumbs={[
                  { label: 'Home' },
                  { label: 'Something' },
                  { label: 'Something' },
                ]}
              />
            </div>
            <div className="border border-[var(--color-gray-light)] rounded-[var(--radius-lg)] overflow-hidden">
              <SecondRow variant="builder" />
            </div>
          </div>
        </section>

        {/* MenuSwitch */}
        <section
          className="p-[var(--space-l)] rounded-[var(--radius-lg)]"
          style={{ backgroundColor: 'var(--color-white)' }}
        >
          <div
            className="inline-block px-[var(--space-s)] py-[var(--space-xxs)] mb-[var(--space-m)] rounded-[var(--radius-sm)]"
            style={{ backgroundColor: 'var(--color-purple-light)' }}
          >
            <span className="text-caps">❖ m...</span>
          </div>

          <div className="flex gap-[var(--space-m)]">
            <div>
              <p className="text-caps mb-[var(--space-xs)]">On</p>
              <MenuSwitch label="All teams" isActive />
            </div>
            <div>
              <p className="text-caps mb-[var(--space-xs)]">Off</p>
              <MenuSwitch label="All teams" isActive={false} />
            </div>
          </div>
        </section>

        {/* Pipeline */}
        <section
          className="p-[var(--space-l)] rounded-[var(--radius-lg)]"
          style={{ backgroundColor: 'var(--color-gray-bg)' }}
        >
          <Pipeline />
        </section>

        {/* Task */}
        <section
          className="p-[var(--space-l)] rounded-[var(--radius-lg)]"
          style={{ backgroundColor: 'var(--color-white)' }}
        >
          <div
            className="inline-block px-[var(--space-s)] py-[var(--space-xxs)] mb-[var(--space-m)] rounded-[var(--radius-sm)]"
            style={{ backgroundColor: 'var(--color-purple-light)' }}
          >
            <span className="text-caps">❖ task</span>
          </div>

          <div className="max-w-md">
            <div>
              <p className="text-caps mb-[var(--space-xs)]">Past (with flag=yes)</p>
              <Task
                title="Define role requirements and job description"
                variant="past"
                isCompleted={true}
                hasError
                errorMessage="some field need your attention"
                buttonLabel="job description"
              />
            </div>

            <div>
              <p className="text-caps mb-[var(--space-xs)] mt-[var(--space-m)]">Next (with flag=no)</p>
              <Task
                title="Define role requirements and job description"
                variant="next"
                isCompleted={false}
                hasError
                errorMessage="some field need your attention"
                buttonLabel="job description"
              />
            </div>
          </div>
        </section>

        {/* CardTop */}
        <section
          className="p-[var(--space-l)] rounded-[var(--radius-lg)]"
          style={{ backgroundColor: 'var(--color-white)' }}
        >
          <div
            className="inline-block px-[var(--space-s)] py-[var(--space-xxs)] mb-[var(--space-m)] rounded-[var(--radius-sm)]"
            style={{ backgroundColor: 'var(--color-purple-light)' }}
          >
            <span className="text-caps">❖ card top</span>
          </div>

          <div className="flex flex-col gap-[var(--space-m)]">
            <div>
              <p className="text-caps mb-[var(--space-xs)]">Yellow</p>
              <CardTop
                name="Sarah Mitchell"
                role="Senior Software Engineer"
                variant="yellow"
                coverSrc="/assets/Cover Image.jpg"
                teamsDropdowns={[
                  { label: 'frontend-team', value: 'frontend' },
                  { label: 'Innovation Lab', value: 'innovation' },
                  { label: 'Lead Developer', value: 'lead' },
                  { label: 'Member', value: 'member' },
                ]}
                accessDropdown={{ label: 'Access LEVEL 4 (CODE RED)', value: 'level4' }}
                actions={[
                  { label: 'promote' },
                  { label: 'negotiate' },
                  { label: 'suspend' },
                  { label: 'fire' },
                ]}
              />
            </div>

            <div>
              <p className="text-caps mb-[var(--space-xs)]">Gray</p>
              <CardTop
                name="Sarah Mitchell"
                role="Senior Software Engineer"
                variant="gray"
                coverSrc="/assets/Cover Image.jpg"
                switchOptions={['Team', 'Team', 'Team']}
                actions={[
                  { label: 'promote' },
                  { label: 'negotiate' },
                  { label: 'suspend' },
                  { label: 'fire' },
                ]}
              />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-grotesk pb-[var(--space-xl)]" style={{ color: 'var(--color-gray-dark)' }}>
          <p>HR Assist MVP — Phase 5: Organisms</p>
        </footer>
      </div>
    </main>
  );
}
