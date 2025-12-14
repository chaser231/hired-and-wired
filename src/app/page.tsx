'use client';

import { useState } from 'react';
import {
  Button,
  Avatar,
  Avatars,
  Status,
  Icon,
  Tag,
  Switch,
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
  const [switchOn, setSwitchOn] = useState(false);
  const [switchBig, setSwitchBig] = useState(true);
  const [switchGroup, setSwitchGroup] = useState('Все');
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
            Дизайн-система — Atoms
          </p>
        </header>

        {/* Buttons */}
        <section
          className="p-[var(--space-l)] rounded-[var(--radius-lg)]"
          style={{ backgroundColor: 'var(--color-white)' }}
        >
          <h2 className="text-h2 mb-[var(--space-m)]">Кнопки</h2>

          <div className="space-y-[var(--space-m)]">
            <div className="flex flex-wrap items-center gap-[var(--space-s)]">
              <Button variant="cta-big">CTA Big</Button>
              <Button variant="cta-small">CTA Small</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="color">Color</Button>
              <Button variant="on-color">On Color</Button>
              <Button variant="node">Node</Button>
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
          <h2 className="text-h2 mb-[var(--space-m)]">Аватары</h2>

          <div className="flex items-center gap-[var(--space-l)]">
            <div className="space-y-[var(--space-xs)]">
              <p className="text-caps">Размеры</p>
              <div className="flex items-end gap-[var(--space-s)]">
                <Avatar src="/assets/avatar-katya.png" alt="Katya" size="sm" />
                <Avatar src="/assets/avatar-petya.png" alt="Petya" size="md" />
                <Avatar src="/assets/avatar-dog.png" alt="Dog" size="lg" />
              </div>
            </div>

            <div className="space-y-[var(--space-xs)]">
              <p className="text-caps">Группа</p>
              <Avatars avatars={avatarList} max={2} />
            </div>
          </div>
        </section>

        {/* Status */}
        <section
          className="p-[var(--space-l)] rounded-[var(--radius-lg)]"
          style={{ backgroundColor: 'var(--color-white)' }}
        >
          <h2 className="text-h2 mb-[var(--space-m)]">Статусы</h2>

          <div className="flex items-center gap-[var(--space-m)]">
            <div className="flex items-center gap-[var(--space-xs)]">
              <Status variant="green" />
              <span className="text-grotesk">Активен</span>
            </div>
            <div className="flex items-center gap-[var(--space-xs)]">
              <Status variant="red" />
              <span className="text-grotesk">Ошибка</span>
            </div>
            <div className="flex items-center gap-[var(--space-xs)]">
              <Status variant="purple" />
              <span className="text-grotesk">Рост</span>
            </div>
            <div className="flex items-center gap-[var(--space-xs)]">
              <Status variant="stopped" />
              <span className="text-grotesk">Остановлен</span>
            </div>
          </div>
        </section>

        {/* Icons */}
        <section
          className="p-[var(--space-l)] rounded-[var(--radius-lg)]"
          style={{ backgroundColor: 'var(--color-white)' }}
        >
          <h2 className="text-h2 mb-[var(--space-m)]">Иконки</h2>

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
          <h2 className="text-h2 mb-[var(--space-m)]">Теги</h2>

          <div className="flex items-center gap-[var(--space-s)]">
            <Tag>React</Tag>
            <Tag>TypeScript</Tag>
            <Tag variant="control" onRemove={() => {}}>
              Удаляемый
            </Tag>
          </div>
        </section>

        {/* Switches */}
        <section
          className="p-[var(--space-l)] rounded-[var(--radius-lg)]"
          style={{ backgroundColor: 'var(--color-white)' }}
        >
          <h2 className="text-h2 mb-[var(--space-m)]">Переключатели</h2>

          <div className="space-y-[var(--space-m)]">
            <div className="flex items-center gap-[var(--space-m)]">
              <div className="flex items-center gap-[var(--space-xs)]">
                <Switch checked={switchOn} onChange={setSwitchOn} />
                <span className="text-grotesk">Default</span>
              </div>
              <div className="flex items-center gap-[var(--space-xs)]">
                <Switch checked={switchBig} onChange={setSwitchBig} size="big" />
                <span className="text-grotesk">Big</span>
              </div>
              <div className="flex items-center gap-[var(--space-xs)]">
                <Switch checked={false} onChange={() => {}} disabled />
                <span className="text-grotesk">Disabled</span>
              </div>
            </div>

            <div>
              <p className="text-caps mb-[var(--space-xs)]">Switch Group</p>
              <SwitchGroup
                options={['Все', 'Активные', 'Завершённые']}
                value={switchGroup}
                onChange={setSwitchGroup}
              />
            </div>
          </div>
        </section>

        {/* Form Elements */}
        <section
          className="p-[var(--space-l)] rounded-[var(--radius-lg)]"
          style={{ backgroundColor: 'var(--color-white)' }}
        >
          <h2 className="text-h2 mb-[var(--space-m)]">Форма</h2>

          <div className="grid grid-cols-2 gap-[var(--space-m)]">
            <Input label="Имя" placeholder="Введите имя" />
            <Input label="С ошибкой" placeholder="Email" error="Неверный формат" />
            <Dropdown
              options={[
                { value: '1', label: 'Команда разработки' },
                { value: '2', label: 'Команда дизайна' },
                { value: '3', label: 'Команда маркетинга' },
              ]}
              value={dropdown}
              onChange={setDropdown}
              placeholder="Выберите команду"
            />
            <div>
              <p className="text-caps mb-[var(--space-xxs)]" style={{ color: 'var(--color-gray-dark)' }}>
                Dropdown on color
              </p>
              <Dropdown
                options={[
                  { value: '1', label: 'Опция 1' },
                  { value: '2', label: 'Опция 2' },
                ]}
                value=""
                onChange={() => {}}
                variant="on-color"
                placeholder="Gold dropdown"
              />
            </div>
            <div className="col-span-2">
              <TextArea label="Описание" placeholder="Введите описание..." />
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
              <p className="text-caps mb-[var(--space-xs)]">20%</p>
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
          <h2 className="text-h2 mb-[var(--space-m)]">Флаги и Ошибки</h2>

          <div className="flex items-start gap-[var(--space-xl)]">
            <div className="space-y-[var(--space-xs)]">
              <p className="text-caps">Флаги</p>
              <div className="flex items-center gap-[var(--space-s)]">
                <Flag variant="yes" />
                <Flag variant="no" />
              </div>
            </div>

            <div className="flex-1">
              <p className="text-caps mb-[var(--space-xs)]">Блок ошибки</p>
              <ErrorBlock message="Добавьте больше информации о зарплате" />
            </div>
          </div>
        </section>

        {/* List */}
        <section
          className="p-[var(--space-l)] rounded-[var(--radius-lg)]"
          style={{ backgroundColor: 'var(--color-white)' }}
        >
          <h2 className="text-h2 mb-[var(--space-m)]">Список</h2>

          <List className="max-w-md">
            <ListItem onClick={() => {}}>Элемент 1 (кликабельный)</ListItem>
            <ListItem onClick={() => {}}>Элемент 2 (кликабельный)</ListItem>
            <ListItem>Элемент 3 (статичный)</ListItem>
          </List>
        </section>

        {/* Colors Demo - Updated */}
        <section
          className="p-[var(--space-l)] rounded-[var(--radius-lg)]"
          style={{ backgroundColor: 'var(--color-white)' }}
        >
          <h2 className="text-h2 mb-[var(--space-m)]">Цвета</h2>

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
          <p>HR Assist MVP — Фаза 3: Atoms ✓</p>
        </footer>
      </div>
    </main>
  );
}
