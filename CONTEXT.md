# Project Context: HR Assist Platform

## Название проекта
**HR Assist** — внутренняя HR платформа для автоматизации процессов онбординга и найма

## Ссылки на Figma
- [User Flows & Service Map](https://www.figma.com/design/CS2o4VL3FkMxgvAmMTQeyx/UX-UI-Project?node-id=7154-44246)
- [Design Tokens](https://www.figma.com/design/CS2o4VL3FkMxgvAmMTQeyx/UX-UI-Project?node-id=7152-30026)
- [Atoms (DS)](https://www.figma.com/design/CS2o4VL3FkMxgvAmMTQeyx/UX-UI-Project?node-id=7152-27382)
- [Molecules (DS)](https://www.figma.com/design/CS2o4VL3FkMxgvAmMTQeyx/UX-UI-Project?node-id=7152-29148)
- [Organisms (DS)](https://www.figma.com/design/CS2o4VL3FkMxgvAmMTQeyx/UX-UI-Project?node-id=7152-29280)

---

## Описание проблемы
Процессы онбординга разрозненные:
- Задачи ведутся в Excel
- Доступы создаются вручную через IT
- Документы пересылаются по почте
- Отсутствует единая система контроля и автоматизации

## Решение
Внутренняя HR платформа, которая объединит и автоматизирует эти процессы в единой системе.

---

## Целевая аудитория

### Основной пользователь: HR Manager
**Основная потребность**: Легко и быстро проводить онбординг новых сотрудников

### Дополнительные пользователи:
- Рекрутеры
- Тимлиды / Менеджеры
- Кураторы (Buddy)
- Новые сотрудники

---

## Основная функциональность

### 1. Управление командами (Teams)
- Просмотр всех команд организации
- Добавление новых команд
- Организационная структура компании (Org Chart)
- Генерация отчётов по командам

### 2. Кампании найма (Hiring Campaigns)
- Создание новых кампаний найма
- Мастер настройки кампании (Wizard)
- Описание вакансии (Job Description)
- Отслеживание статуса кампаний
- Просмотр всех активных кампаний

### 3. Работа с кандидатами (Candidates)
- Профиль кандидата
- Статусы кандидата: pre-approved → approved → onboarding
- Фиксация даты выхода
- Одобрение кандидата после интервью

### 4. Управление сотрудниками (Employees)
- Централизованный список всех сотрудников
- Фильтрация по статусу (new, onboarding)
- Назначение кураторов
- Мониторинг статусов в реальном времени

### 5. Шаблоны и настройки (Templates)
- **Документы**: Настройка списка необходимых документов для сбора
- **Доступы**: Управление списком доступов для разных команд
- Автоматическая проверка документов
- Автоматическое создание доступов

### 6. Автоматизации (Automations)
- Создание автоматизаций через визуальный редактор (node-based)
- **Типы автоматизаций**:
  - Отправка сообщений (welcome-письма)
  - Чек-листы для онбординга
  - Уведомления менеджерам и buddy
  - Автоматическое изменение статусов
- Триггеры: принятие оффера, выход сотрудника, изменение статуса

### 7. Профиль и развитие (Profile & PDP)
- Профиль сотрудника
- План развития (PDP)
- Переговоры (Negotiations)

### 8. Отчётность (Reports)
- Метрики по этапам найма и онбординга
- Генерация и шаринг отчётов
- Аналитика по командам

---

## Технический стек

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Язык**: TypeScript
- **Стили**: Tailwind CSS (кастомная дизайн-система, без UI-библиотек)
- **Состояние**: Zustand или TanStack Query
- **Формы**: React Hook Form + Zod

### Backend
> ⏸️ Откладывается на следующий этап. Пока фокус на фронтенде.

### Хранение ресурсов
- Медиа и ассеты хранятся локально в `/assets`
- Шрифты в `/fonts`

---

## Ограничения MVP

1. **Фокус на frontend**: Бэкенд откладывается
2. **Один тип пользователя**: HR Manager
3. **Локальные данные**: Mock-данные и локальное хранение
4. **Web-only**: Без мобильного приложения
5. **Локализация**: Только русский язык

---

## Локальные ресурсы

### Шрифты (`/fonts`)
- **Akkurat LL Cyrillic**: Regular, Bold, Light, Thin, Black (+ Italic варианты)
- **Instrument Serif**: Regular, Italic
- **Pixform**: Regular

### Изображения (`/assets`)
- `avatar-*.png` — аватары пользователей
- `card top*.png` — декоративные карточки
- `Cover Image*.jpg` — обложки
- `flag-*.png` — флаги (yes/no)
- `icons/*.svg` — иконки (arrow-down, close, more, play)

---

# Кастомная дизайн-система

## Design Tokens

### Spacing (Indents)
| Токен | Значение |
|-------|----------|
| `--space-xxxs` | 2px |
| `--space-xxs` | 4px |
| `--space-xs` | 8px |
| `--space-s` | 14px |
| `--space-m` | 20px |
| `--space-l` | 24px |
| `--space-xl` | 30px |
| `--space-xxl` | 90px |

### Typography

| Стиль | Шрифт | Размер | Line-height | Weight | Особенности |
|-------|-------|--------|-------------|--------|-------------|
| H1 | Instrument Serif | 84px | 0.9 | 700 | letter-spacing: -1% |
| H2 | Instrument Serif | 40px | 0.9 | 600 | letter-spacing: -1% |
| H3 | Akkurat LL Cyrillic | 20px | 0.9 | 600 | letter-spacing: -2% |
| H4 | Akkurat LL Cyrillic | 15px | 0.9 | 600 | letter-spacing: -2% |
| Description | Pixform | 30px | 0.9 | 600 | uppercase, letter-spacing: -3% |
| text-pixel | Pixform | 10px | 0.9 | 400 | uppercase, letter-spacing: 20% |
| text-grotesk | Akkurat LL Cyrillic | 11px | 0.9 | 400 | — |
| text-bold | Akkurat LL Cyrillic | 11px | 0.9 | 700 | — |
| caps | Akkurat LL Cyrillic | 8px | 0.9 | 500 | uppercase, letter-spacing: 20% |

### Colors

#### Base
| Название | HEX | Использование |
|----------|-----|---------------|
| White | `#FFFFFF` | Основной фон, карточки |
| Black | `#000000` | Текст, иконки |
| Gray Background | `#F2F2F2` | Фоны секций |

#### Neutral
| Название | HEX | Использование |
|----------|-----|---------------|
| Gray Light | `#EAEAEA` | Бордеры, secondary bg |
| Gray Medium | `#CBCBCB` | Disabled, muted text |
| Gray Dark | `#979797` | Placeholder text |

#### Accent
| Название | HEX | Использование |
|----------|-----|---------------|
| Yellow | `#FFE900` | Primary accent, switch group |
| Gold | `#D1A63B` | CTA on color, dropdowns |
| Yellow Bright | `#FFFD9E` | Tags, highlights |

#### Semantic
| Название | HEX | Использование |
|----------|-----|---------------|
| Success | `#00867B` | Status green, positive |
| Error | `#CC0000` | Status red, errors |
| Purple | `#9747FF` | Rocket growth status |

#### Card Backgrounds
| Название | HEX | Использование |
|----------|-----|---------------|
| Pink Light | `#F5CFCA` | Node cards |
| Pink | `#FAD5E7` | Decorative |
| Coral | `#F7E0DD` | Profile short, error bg |
| Mint | `#D4EEE7` | Notify, metric cards |
| Purple Light | `#DDD6EF` | Decorative |
| Green Light | `#E0E2A4` | Decorative |

### Border Radius
| Токен | Значение | Использование |
|-------|----------|---------------|
| `--radius-sm` | 4px | Buttons, tags, inputs |
| `--radius-md` | 8px | Cards, switch group |
| `--radius-lg` | 12px | Large cards, containers |
| `--radius-full` | 999px | Pill buttons |

---

## Компоненты дизайн-системы

### Atoms (Базовые элементы)
- **bar** — Progress bar (default, big; 20%, 75%)
- **avatar** — Аватар пользователя (katya, dog, petya)
- **status** — Статус-индикатор (purple, green, red, stopped)
- **icons** — Иконки (play, more, arrow-down, close)
- **switch** — Переключатель (on/off, big)
- **flag** — Флаг да/нет (yes, no)
- **tag** — Тег (control с крестиком, static)
- **error** — Блок ошибки
- **avatars** — Группа аватаров
- **list** — Строка списка
- **text_area** — Текстовое поле
- **input** — Поле ввода
- **dropdown** — Выпадающий список (default, on color; filled on/off)
- **graph** — Мини-график
- **switch group** — Группа переключателей
- **btn** — Кнопка (big CTA, small CTA, secondary, color, on color, node)

### Molecules (Составные компоненты)
- **profile** — Профиль пользователя (long, short, short-outlined)
- **node** — Нода автоматизации
- **campaign_preview** — Превью кампании найма
- **project_preview** — Превью проекта
- **experience_preview** — Превью опыта работы
- **team** — Карточка команды
- **card_metric** — Метрика (Health и т.п.)
- **cards_metrica** — Большая карточка метрики
- **notify** — Уведомление
- **attempt** — Попытка переговоров (past, next)

### Organisms (Сложные блоки)
- **second-row** — Вторая строка хедера с breadcrumbs (default, builder)
- **topmenu** — Верхнее меню (all, templates, off)
- **header** — Полный хедер с progress bar
- **canban** — Канбан-доска (Pipeline)
- **task** — Задача в визарде (past, next)
- **card top** — Hero-карточка профиля (yellow, gray)
- **menu_switch** — Переключатель меню (on, off)

---

## Принципы вёрстки контента

### Layout Tokens
| Токен | Значение | Использование |
|-------|----------|---------------|
| `--content-width` | 830px | Максимальная ширина основного контента |
| `--page-gap` | 90px | Отступ между крупными секциями страницы |
| `--section-gap` | 4px | Отступ между карточками и элементами внутри секции |

### Принципы
1. **Шапка (TopMenu)** — верстается во всю ширину экрана, `fixed` позиционирование
2. **Hero-секция (CardTop)** — верстается во всю ширину с фоновым изображением, начинается от верха страницы (под хедером)
3. **Основной контент** — ограничен шириной 830px и центрируется
4. **Сетки карточек** — используют gap: 4px между элементами
5. **Метрики** — выстраиваются в ряд с равной шириной (flex: 1)

### Поведение хедера при скролле
- **Начальное состояние**: прозрачный фон, без border
- **После скролла (> 10px)**: белый фон (`--color-white`), border снизу (`--color-gray-light`)
- **Переход**: `transition-colors duration-200` для плавной анимации
- **Реализация**: prop `isScrolled` в компоненте `TopMenu`, отслеживание `window.scrollY` в layout

---

## Уточнения по дизайн-системе

> Этот раздел будет дополняться в процессе разработки

<!-- Добавлять уточнения сюда -->

---

## User Stories (из Figma)

### Этап: Принятие оффера
> «Когда кандидат принимает оффер, я хочу автоматически собрать и проверить документы, чтобы избежать переписок и ошибок»

> «Когда передаю данные в IT, я хочу использовать автоматизированную систему, чтобы исключить ошибки и задержки»

### Этап: Подготовка к выходу
> «Когда сотрудник выходит в первый рабочий день, я хочу чтобы у него были готовые доступы, чтобы он сразу начал работу»

> «Когда доступы не созданы, я хочу видеть это заранее, чтобы вмешаться до выхода»

### Этап: Настройка системы
> «Когда я хочу настроить доступы, я хочу иметь интерфейс управления доступами в разные команды, чтобы не терять время каждый раз»

> «Когда я хочу настроить сбор первоначальных документов, я хочу иметь интерфейс управления списком документов»

### Этап: Онбординг
> «Когда начинается новый квартал, я хочу видеть централизованный список новых сотрудников, чтобы ничего не упустить»

> «Когда сотрудник выходит на работу, я хочу уведомить менеджера и бадди, чтобы обеспечить сопровождение»

> «Когда планируется массовый выход, я хочу распределить кураторов, чтобы повысить контроль»

> «Когда веду 200 онбордов, я хочу видеть статусы в реальном времени, чтобы выявлять узкие места»

> «Когда менеджер принимает новичка, я хочу дать ему шаблон сопровождения, чтобы облегчить адаптацию»

### Этап: Найм
> «Когда кандидат прошёл финальное интервью, я хочу зафиксировать дату выхода, чтобы все были в курсе»

> «Когда запускается поток найма, я хочу автоматически формировать задачи, чтобы ничего не забыть»

> «Когда возникает сбой, я хочу видеть, на каком этапе, чтобы быстро устранить его»

### Этап: Аналитика
> «Когда анализирую квартал, я хочу видеть метрики по этапам, чтобы улучшать процесс»

---

## Карта страниц (Site Map)

```
├── All Teams (главная)
│   ├── Team (детали команды)
│   │   ├── Add Campaign
│   │   └── Generate Report → Report
│   ├── Add Team
│   └── Company Org Chart
│
├── All Hiring Campaigns
│   ├── Hiring Campaign (детали)
│   │   ├── Candidate
│   │   │   └── Approve → Choose Date
│   │   └── Documents
│   └── Hiring Campaign Add
│       └── Hiring Campaign Wizard → Success
│
├── All Employees
│   └── (Фильтры: status, curator dropdown)
│
├── All Templates
│   ├── Accesses → Accesses Edit → Success
│   ├── Documents → Documents Edit → Success
│   └── Automations
│       └── Automations Add
│           ├── Nodes Message → Save
│           └── Nodes Checklist → Save
│           └── Success
│
├── Profile
│   ├── PDP
│   └── Negotiations
│
├── Settings
│
└── Report (отчёты)
```
