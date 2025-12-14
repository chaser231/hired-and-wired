'use client';

import { useState } from 'react';
import {
  Profile,
  Node,
  NodeCanvas,
  CampaignPreview,
  ProjectPreview,
  ExperiencePreview,
  Team,
  CardMetric,
  CardsMetrica,
  Notify,
  Attempt,
} from '@/components/blocks';
import { NodeData, Connection } from '@/types/automation';

// Demo nodes for NodeCanvas
const initialNodes: NodeData[] = [
  {
    id: 'node-1',
    type: 'trigger',
    title: 'Start Trigger',
    description: 'New Application received',
    position: { x: 0, y: 0 },
    inputs: 0,
    outputs: 1,
  },
  {
    id: 'node-2',
    type: 'message',
    title: 'Send Welcome',
    description: 'Email to candidate',
    position: { x: 250, y: 0 },
    inputs: 1,
    outputs: 1,
  },
  {
    id: 'node-3',
    type: 'checklist',
    title: 'Collect Documents',
    description: 'Passport, CV, Diploma',
    position: { x: 500, y: 0 },
    inputs: 1,
    outputs: 1,
  },
  {
    id: 'node-4',
    type: 'condition',
    title: 'Check Status',
    description: 'Documents verified?',
    position: { x: 750, y: 0 },
    inputs: 1,
    outputs: 2,
  },
];

const initialConnections: Connection[] = [];

export default function MoleculesPage() {
  const avatarList = [
    { src: '/assets/avatar-katya.png', alt: 'Katya' },
    { src: '/assets/avatar-petya.png', alt: 'Petya' },
    { src: '/assets/avatar-dog.png', alt: 'Dog' },
  ];

  const [nodes] = useState<NodeData[]>(initialNodes);
  const [connections, setConnections] = useState<Connection[]>(initialConnections);

  return (
    <main
      className="min-h-screen p-[var(--space-xl)]"
      style={{ backgroundColor: 'var(--color-gray-bg)' }}
    >
      <div className="max-w-5xl mx-auto space-y-[var(--space-l)]">
        {/* Header */}
        <header
          className="p-[var(--space-l)] rounded-[var(--radius-lg)]"
          style={{ backgroundColor: 'var(--color-white)' }}
        >
          <h1 className="text-h1">HR Assist</h1>
          <p className="text-h4 mt-[var(--space-xs)]" style={{ color: 'var(--color-gray-dark)' }}>
            Design System — Molecules
          </p>
        </header>

        {/* Profile */}
        <section
          className="p-[var(--space-l)] rounded-[var(--radius-lg)]"
          style={{ backgroundColor: 'var(--color-white)' }}
        >
          <h2 className="text-h2 mb-[var(--space-m)]">Profile</h2>

          <div className="space-y-[var(--space-m)]">
            <div>
              <p className="text-caps mb-[var(--space-xs)]">Long</p>
              <Profile
                name="Sarah Mitchell"
                role="Senior Software Engineer"
                avatarSrc="/assets/avatar-katya.png"
                variant="long"
                status="green"
                progress={75}
              />
            </div>

            <div className="flex gap-[var(--space-m)]">
              <div>
                <p className="text-caps mb-[var(--space-xs)]">Short</p>
                <Profile
                  name="Sarah Johnson"
                  role="Senior Developer"
                  avatarSrc="/assets/avatar-katya.png"
                  variant="short"
                />
              </div>
              <div>
                <p className="text-caps mb-[var(--space-xs)]">Short Outlined</p>
                <Profile
                  name="Sarah Mitchell"
                  role="Senior Software Engineer"
                  avatarSrc="/assets/avatar-katya.png"
                  variant="short-outlined"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Node Types */}
        <section
          className="p-[var(--space-l)] rounded-[var(--radius-lg)]"
          style={{ backgroundColor: 'var(--color-white)' }}
        >
          <h2 className="text-h2 mb-[var(--space-m)]">Node Types</h2>

          <div className="grid grid-cols-4 gap-[var(--space-m)]">
            <div>
              <p className="text-caps mb-[var(--space-xs)]">Trigger</p>
              <Node
                id="demo-trigger"
                type="trigger"
                title="Start Trigger"
                description="New Application received"
                onPlay={() => {}}
                onMore={() => {}}
              />
            </div>
            <div>
              <p className="text-caps mb-[var(--space-xs)]">Message</p>
              <Node
                id="demo-message"
                type="message"
                title="Send Welcome"
                description="Email to candidate"
                onPlay={() => {}}
                onMore={() => {}}
              />
            </div>
            <div>
              <p className="text-caps mb-[var(--space-xs)]">Checklist</p>
              <Node
                id="demo-checklist"
                type="checklist"
                title="Collect Documents"
                description="Passport, CV, Diploma"
                onPlay={() => {}}
                onMore={() => {}}
              />
            </div>
            <div>
              <p className="text-caps mb-[var(--space-xs)]">Condition</p>
              <Node
                id="demo-condition"
                type="condition"
                title="Check Status"
                description="Documents verified?"
                onPlay={() => {}}
                onMore={() => {}}
              />
            </div>
          </div>
        </section>

        {/* Node Canvas */}
        <section
          className="p-[var(--space-l)] rounded-[var(--radius-lg)]"
          style={{ backgroundColor: 'var(--color-white)' }}
        >
          <h2 className="text-h2 mb-[var(--space-m)]">Node Canvas</h2>
          <p className="text-grotesk mb-[var(--space-m)]" style={{ color: 'var(--color-gray-dark)' }}>
            Drag from output connector (right) to input connector (left) to create connections
          </p>

          <NodeCanvas
            nodes={nodes}
            connections={connections}
            onConnectionsChange={setConnections}
          />
        </section>

        {/* Campaign Preview */}
        <section
          className="p-[var(--space-l)] rounded-[var(--radius-lg)]"
          style={{ backgroundColor: 'var(--color-gray-bg)' }}
        >
          <h2 className="text-h2 mb-[var(--space-m)]">Campaign Preview</h2>

          <CampaignPreview
            title="Senior DevOps"
            status="green"
            stats={{
              applied: 142,
              rejected: 89,
              inProgress: 282,
              finalRound: 31,
              offersSent: 4,
            }}
            onMoreInfo={() => {}}
          />
        </section>

        {/* Project & Experience Preview */}
        <section
          className="p-[var(--space-l)] rounded-[var(--radius-lg)]"
          style={{ backgroundColor: 'var(--color-white)' }}
        >
          <h2 className="text-h2 mb-[var(--space-m)]">Project & Experience</h2>

          <div className="grid grid-cols-2 gap-[var(--space-m)]">
            <div>
              <p className="text-caps mb-[var(--space-xs)]">Project Preview</p>
              <ProjectPreview
                description="Full-stack e-commerce solution with React frontend and Node.js backend"
                tags={['React', 'Node.js', 'MongoDB', 'WebSocket']}
              />
            </div>

            <div>
              <p className="text-caps mb-[var(--space-xs)]">Experience Preview</p>
              <ExperiencePreview
                period="Jan 2022 — Present (3 years)"
                title="Senior Frontend Developer"
                company="TechCorp Solutions"
                description="Led development of React applications, mentored junior developers, improved performance by 40%"
              />
            </div>
          </div>
        </section>

        {/* Team */}
        <section
          className="p-[var(--space-l)] rounded-[var(--radius-lg)]"
          style={{ backgroundColor: 'var(--color-gray-bg)' }}
        >
          <h2 className="text-h2 mb-[var(--space-m)]">Team</h2>

          <div className="max-w-md">
            <Team
              name="Engineering Team"
              memberCount={24}
              productivity={89}
              weekHighlight="Petya was drinking too much tea this week"
              members={avatarList}
            />
          </div>
        </section>

        {/* Metrics */}
        <section
          className="p-[var(--space-l)] rounded-[var(--radius-lg)]"
          style={{ backgroundColor: 'var(--color-white)' }}
        >
          <h2 className="text-h2 mb-[var(--space-m)]">Metrics</h2>

          <div className="grid grid-cols-3 gap-[var(--space-m)]">
            <CardMetric
              title="Health"
              summary="Overall: Good"
            />
            <CardsMetrica
              title="Applications"
              value={142}
              label="Total received"
            />
            <Notify
              message="Sarah finalized the UX flows, Anya trained three junior engineers, and the team enjoyed a ski trip."
            />
          </div>
        </section>

        {/* Attempt */}
        <section
          className="p-[var(--space-l)] rounded-[var(--radius-lg)]"
          style={{ backgroundColor: 'var(--color-white)' }}
        >
          <h2 className="text-h2 mb-[var(--space-m)]">Attempt</h2>

          <div className="grid grid-cols-2 gap-[var(--space-m)]">
            <div>
              <p className="text-caps mb-[var(--space-xs)]">Past</p>
              <Attempt
                label="first attempt"
                date="12.03.2024"
                initialSalary="$120,000"
                finalSalary="$135,000"
                variant="past"
              />
            </div>

            <div>
              <p className="text-caps mb-[var(--space-xs)]">Next</p>
              <Attempt
                label="next attempt"
                date="15.06.2024"
                initialSalary="$140,000"
                variant="next"
              />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-grotesk" style={{ color: 'var(--color-gray-dark)' }}>
          <p>HR Assist MVP — Phase 4: Molecules</p>
        </footer>
      </div>
    </main>
  );
}
