'use client';

import { useState } from 'react';
import {
  Button,
  Avatar,
  Avatars,
  Status,
  Icon,
  Tag,
  SwitchGroup,
  Input,
  TextArea,
  Dropdown,
  Bar,
  Flag,
  ErrorBlock,
  List,
  ListItem,
} from '@/components/ui';

export default function Home() {
  const [switchGroup, setSwitchGroup] = useState('All');
  const [dropdown, setDropdown] = useState('');

  const avatarList = [
    { src: '/assets/avatar-katya.png', alt: 'Katya' },
    { src: '/assets/avatar-petya.png', alt: 'Petya' },
    { src: '/assets/avatar-dog.png', alt: 'Dog' },
  ];

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
            Design System — Atoms
          </p>
        </header>

        {/* Buttons */}
        <section
          className="p-[var(--space-l)] rounded-[var(--radius-lg)]"
          style={{ backgroundColor: 'var(--color-white)' }}
        >
          <h2 className="text-h2 mb-[var(--space-m)]">Buttons</h2>

          <div className="space-y-[var(--space-m)]">
            <div className="flex flex-wrap items-start gap-[var(--space-s)]">
              <Button variant="cta-big">CTA Big</Button>
              <Button variant="cta-small">CTA Small</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="color">Color</Button>
              <Button variant="on-color">On Color</Button>
              <Button variant="node" description="click to edit">
                Node Title
              </Button>
            </div>

            <div className="flex items-center gap-[var(--space-s)]">
              <Button variant="cta-small" disabled>
                Disabled
              </Button>
            </div>
          </div>
        </section>

        {/* Avatars */}
        <section
          className="p-[var(--space-l)] rounded-[var(--radius-lg)]"
          style={{ backgroundColor: 'var(--color-white)' }}
        >
          <h2 className="text-h2 mb-[var(--space-m)]">Avatars</h2>

          <div className="flex items-center gap-[var(--space-l)]">
            <div className="space-y-[var(--space-xs)]">
              <p className="text-caps">Sizes</p>
              <div className="flex items-end gap-[var(--space-s)]">
                <Avatar src="/assets/avatar-katya.png" alt="Katya" size="sm" />
                <Avatar src="/assets/avatar-petya.png" alt="Petya" size="md" />
                <Avatar src="/assets/avatar-dog.png" alt="Dog" size="lg" />
              </div>
            </div>

            <div className="space-y-[var(--space-xs)]">
              <p className="text-caps">Group</p>
              <Avatars avatars={avatarList} max={2} />
            </div>
          </div>
        </section>

        {/* Status */}
        <section
          className="p-[var(--space-l)] rounded-[var(--radius-lg)]"
          style={{ backgroundColor: 'var(--color-white)' }}
        >
          <h2 className="text-h2 mb-[var(--space-m)]">Status</h2>

          <div className="flex flex-wrap items-center gap-[var(--space-m)]">
            <Status variant="purple" showLabel />
            <Status variant="green" showLabel />
            <Status variant="red" showLabel />
            <Status variant="stopped" showLabel />
          </div>
        </section>

        {/* Icons */}
        <section
          className="p-[var(--space-l)] rounded-[var(--radius-lg)]"
          style={{ backgroundColor: 'var(--color-white)' }}
        >
          <h2 className="text-h2 mb-[var(--space-m)]">Icons</h2>

          <div className="flex items-center gap-[var(--space-m)]">
            <div className="flex items-center gap-[var(--space-xs)]">
              <Icon name="play" />
              <span className="text-grotesk">Play</span>
            </div>
            <div className="flex items-center gap-[var(--space-xs)]">
              <Icon name="more" />
              <span className="text-grotesk">More</span>
            </div>
            <div className="flex items-center gap-[var(--space-xs)]">
              <Icon name="arrow-down" />
              <span className="text-grotesk">Arrow</span>
            </div>
            <div className="flex items-center gap-[var(--space-xs)]">
              <Icon name="close" />
              <span className="text-grotesk">Close</span>
            </div>
          </div>
        </section>

        {/* Tags */}
        <section
          className="p-[var(--space-l)] rounded-[var(--radius-lg)]"
          style={{ backgroundColor: 'var(--color-white)' }}
        >
          <h2 className="text-h2 mb-[var(--space-m)]">Tags</h2>

          <div className="flex items-center gap-[var(--space-s)]">
            <Tag variant="static">React</Tag>
            <Tag variant="static">TypeScript</Tag>
            <Tag variant="control" onRemove={() => {}}>
              Removable
            </Tag>
          </div>
        </section>

        {/* Switch Group */}
        <section
          className="p-[var(--space-l)] rounded-[var(--radius-lg)]"
          style={{ backgroundColor: 'var(--color-white)' }}
        >
          <h2 className="text-h2 mb-[var(--space-m)]">Switch Group</h2>

          <SwitchGroup
            options={['All', 'Active', 'Completed']}
            value={switchGroup}
            onChange={setSwitchGroup}
          />
        </section>

        {/* Form Elements */}
        <section
          className="p-[var(--space-l)] rounded-[var(--radius-lg)]"
          style={{ backgroundColor: 'var(--color-white)' }}
        >
          <h2 className="text-h2 mb-[var(--space-m)]">Form</h2>

          <div className="grid grid-cols-2 gap-[var(--space-m)]">
            <Input label="Name" placeholder="Michael Lee" />
            <Input label="With Error" placeholder="Email" error="Invalid format" />
            <Dropdown
              options={[
                { value: '1', label: 'Development Team' },
                { value: '2', label: 'Design Team' },
                { value: '3', label: 'Marketing Team' },
              ]}
              value={dropdown}
              onChange={setDropdown}
              placeholder="Select team"
            />
            <div>
              <p
                className="mb-[var(--space-xs)]"
                style={{
                  fontFamily: 'var(--font-akkurat)',
                  fontSize: '8px',
                  fontWeight: 400,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--color-gray-dark)',
                }}
              >
                Dropdown on color
              </p>
              <Dropdown
                options={[
                  { value: '1', label: 'Option 1' },
                  { value: '2', label: 'Option 2' },
                ]}
                value=""
                onChange={() => {}}
                variant="on-color"
                placeholder="Gold dropdown"
              />
            </div>
            <div className="col-span-2">
              <TextArea label="Description" placeholder="type something here" />
            </div>
          </div>
        </section>

        {/* Progress Bars */}
        <section
          className="p-[var(--space-l)] rounded-[var(--radius-lg)]"
          style={{ backgroundColor: 'var(--color-white)' }}
        >
          <h2 className="text-h2 mb-[var(--space-m)]">Progress Bar</h2>

          <div className="space-y-[var(--space-m)]">
            <div>
              <p className="text-caps mb-[var(--space-xs)]">20% (Default)</p>
              <Bar progress={20} />
            </div>
            <div>
              <p className="text-caps mb-[var(--space-xs)]">75% (Big)</p>
              <Bar progress={75} size="big" />
            </div>
          </div>
        </section>

        {/* Flags & Error */}
        <section
          className="p-[var(--space-l)] rounded-[var(--radius-lg)]"
          style={{ backgroundColor: 'var(--color-white)' }}
        >
          <h2 className="text-h2 mb-[var(--space-m)]">Flags & Errors</h2>

          <div className="flex items-start gap-[var(--space-xl)]">
            <div className="space-y-[var(--space-xs)]">
              <p className="text-caps">Flags</p>
              <div className="flex items-center gap-[var(--space-s)]">
                <Flag variant="yes" />
                <Flag variant="no" />
              </div>
            </div>

            <div className="flex-1">
              <p className="text-caps mb-[var(--space-xs)]">Error Block</p>
              <ErrorBlock message="Add more details about salary" />
            </div>
          </div>
        </section>

        {/* List */}
        <section
          className="p-[var(--space-l)] rounded-[var(--radius-lg)]"
          style={{ backgroundColor: 'var(--color-white)' }}
        >
          <h2 className="text-h2 mb-[var(--space-m)]">List</h2>

          <List className="max-w-md">
            <ListItem onClick={() => {}}>Item 1 (clickable)</ListItem>
            <ListItem onClick={() => {}}>Item 2 (clickable)</ListItem>
            <ListItem>Item 3 (static)</ListItem>
          </List>
        </section>

        {/* Colors Demo */}
        <section
          className="p-[var(--space-l)] rounded-[var(--radius-lg)]"
          style={{ backgroundColor: 'var(--color-white)' }}
        >
          <h2 className="text-h2 mb-[var(--space-m)]">Colors</h2>

          <div className="space-y-[var(--space-m)]">
            {/* Base & Neutral */}
            <div>
              <p className="text-caps mb-[var(--space-xs)]">Base & Neutral</p>
              <div className="grid grid-cols-6 gap-[var(--space-xs)]">
                <div
                  className="p-[var(--space-s)] rounded-[var(--radius-md)] border"
                  style={{ backgroundColor: 'var(--color-white)', borderColor: 'var(--color-gray-light)' }}
                >
                  <p className="text-caps">White</p>
                </div>
                <div
                  className="p-[var(--space-s)] rounded-[var(--radius-md)]"
                  style={{ backgroundColor: 'var(--color-black)', color: 'var(--color-white)' }}
                >
                  <p className="text-caps">Black</p>
                </div>
                <div
                  className="p-[var(--space-s)] rounded-[var(--radius-md)]"
                  style={{ backgroundColor: 'var(--color-gray-bg)' }}
                >
                  <p className="text-caps">Gray BG</p>
                </div>
                <div
                  className="p-[var(--space-s)] rounded-[var(--radius-md)]"
                  style={{ backgroundColor: 'var(--color-gray-light)' }}
                >
                  <p className="text-caps">Gray Light</p>
                </div>
                <div
                  className="p-[var(--space-s)] rounded-[var(--radius-md)]"
                  style={{ backgroundColor: 'var(--color-gray-medium)' }}
                >
                  <p className="text-caps">Gray Medium</p>
                </div>
                <div
                  className="p-[var(--space-s)] rounded-[var(--radius-md)]"
                  style={{ backgroundColor: 'var(--color-gray-dark)', color: 'var(--color-white)' }}
                >
                  <p className="text-caps">Gray Dark</p>
                </div>
              </div>
            </div>

            {/* Accent */}
            <div>
              <p className="text-caps mb-[var(--space-xs)]">Accent</p>
              <div className="grid grid-cols-3 gap-[var(--space-xs)]">
                <div
                  className="p-[var(--space-s)] rounded-[var(--radius-md)]"
                  style={{ backgroundColor: 'var(--color-yellow)' }}
                >
                  <p className="text-caps">Yellow</p>
                </div>
                <div
                  className="p-[var(--space-s)] rounded-[var(--radius-md)]"
                  style={{ backgroundColor: 'var(--color-gold)', color: 'var(--color-white)' }}
                >
                  <p className="text-caps">Gold</p>
                </div>
                <div
                  className="p-[var(--space-s)] rounded-[var(--radius-md)]"
                  style={{ backgroundColor: 'var(--color-yellow-bright)' }}
                >
                  <p className="text-caps">Yellow Bright</p>
                </div>
              </div>
            </div>

            {/* Semantic */}
            <div>
              <p className="text-caps mb-[var(--space-xs)]">Semantic</p>
              <div className="grid grid-cols-3 gap-[var(--space-xs)]">
                <div
                  className="p-[var(--space-s)] rounded-[var(--radius-md)]"
                  style={{ backgroundColor: 'var(--color-success)', color: 'var(--color-white)' }}
                >
                  <p className="text-caps">Success #00867B</p>
                </div>
                <div
                  className="p-[var(--space-s)] rounded-[var(--radius-md)]"
                  style={{ backgroundColor: 'var(--color-error)', color: 'var(--color-white)' }}
                >
                  <p className="text-caps">Error #CC0000</p>
                </div>
                <div
                  className="p-[var(--space-s)] rounded-[var(--radius-md)]"
                  style={{ backgroundColor: 'var(--color-purple)', color: 'var(--color-white)' }}
                >
                  <p className="text-caps">Purple #9747FF</p>
                </div>
              </div>
            </div>

            {/* Card Backgrounds */}
            <div>
              <p className="text-caps mb-[var(--space-xs)]">Card Backgrounds</p>
              <div className="grid grid-cols-6 gap-[var(--space-xs)]">
                <div
                  className="p-[var(--space-s)] rounded-[var(--radius-md)]"
                  style={{ backgroundColor: 'var(--color-coral)' }}
                >
                  <p className="text-caps">Coral</p>
                  <p className="text-pixel mt-1" style={{ color: 'var(--color-error)' }}>Error BG</p>
                </div>
                <div
                  className="p-[var(--space-s)] rounded-[var(--radius-md)]"
                  style={{ backgroundColor: 'var(--color-mint)' }}
                >
                  <p className="text-caps">Mint</p>
                </div>
                <div
                  className="p-[var(--space-s)] rounded-[var(--radius-md)]"
                  style={{ backgroundColor: 'var(--color-pink-light)' }}
                >
                  <p className="text-caps">Pink Light</p>
                </div>
                <div
                  className="p-[var(--space-s)] rounded-[var(--radius-md)]"
                  style={{ backgroundColor: 'var(--color-pink)' }}
                >
                  <p className="text-caps">Pink</p>
                </div>
                <div
                  className="p-[var(--space-s)] rounded-[var(--radius-md)]"
                  style={{ backgroundColor: 'var(--color-purple-light)' }}
                >
                  <p className="text-caps">Purple Light</p>
                </div>
                <div
                  className="p-[var(--space-s)] rounded-[var(--radius-md)]"
                  style={{ backgroundColor: 'var(--color-green-light)' }}
                >
                  <p className="text-caps">Green Light</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-grotesk" style={{ color: 'var(--color-gray-dark)' }}>
          <p>HR Assist MVP — Phase 3: Atoms</p>
        </footer>
      </div>
    </main>
  );
}
