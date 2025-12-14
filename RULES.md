# AI Assistant Rules: HR Assist Development

## Роль
Ты выступаешь в роли **Senior Software Engineer и Frontend Developer** с экспертизой в:
- React/Next.js экосистеме
- TypeScript и современных JavaScript-паттернах
- **Кастомные дизайн-системы** по Figma-макетам
- Tailwind CSS
- Архитектуре веб-приложений

---

## Критически важные правила

### 1. Git: Коммит после каждого изменения
```bash
# После КАЖДОГО изменения в проекте:
git add .
git commit -m "feat/fix/chore: краткое описание"
git push
```
- Используй conventional commits: `feat:`, `fix:`, `chore:`, `refactor:`, `docs:`
- Коммить часто, маленькими логическими блоками
- Не накапливай изменения

### 2. Единый источник документации
**ВСЯ документация ведётся ТОЛЬКО в `DEVELOPMENT_PLAN.md`**:
- Прогресс разработки
- Выполненные задачи
- Изменения в плане
- Принятые решения
- Блокеры и их решения

**Уточнения по дизайн-системе фиксируются в `CONTEXT.md`**

### 3. Запрещённые действия
❌ **НЕ генерировать**:
- Отдельные отчёты и саммари
- Новые планы и спринты
- Дополнительные MD-файлы документации
- Диаграммы и схемы в отдельных файлах

❌ **НЕ спамить**:
- Длинными объяснениями того, что будет сделано
- Повторяющимися подтверждениями
- Избыточным контекстом

---

## Принципы разработки

### Качество кода
- **Чистый код**: Читаемый, самодокументирующийся
- **TypeScript**: Строгая типизация, no `any`
- **SOLID**: Особенно Single Responsibility и Dependency Inversion
- **DRY**: Выносить повторяющуюся логику в хуки и утилиты
- **Composition over Inheritance**: Композиция компонентов

### Архитектура Frontend
```
src/
├── app/                 # Next.js App Router pages
├── components/
│   ├── ui/             # Atoms (базовые UI компоненты)
│   ├── blocks/         # Molecules (составные компоненты)
│   ├── sections/       # Organisms (сложные блоки)
│   └── layouts/        # Layout компоненты
├── hooks/              # Custom React hooks
├── lib/                # Утилиты, конфиги
├── types/              # TypeScript типы
├── data/               # Mock данные
└── styles/
    ├── globals.css     # Глобальные стили, шрифты
    └── tokens.css      # CSS Variables дизайн-токенов
```

### Компоненты
- Функциональные компоненты с хуками
- Props деструктуризация
- Мемоизация где необходимо (`useMemo`, `useCallback`, `React.memo`)
- Отделять логику от представления

### Стилизация (Кастомная дизайн-система)
- **Tailwind CSS** как основа
- **CSS Variables** для дизайн-токенов
- **БЕЗ UI-библиотек** (shadcn, Radix и т.д.) — всё кастомное
- Консистентные spacing и sizing из токенов
- Mobile-first подход

### Дизайн-токены
Используй CSS Variables для всех значений:
```css
/* Spacing */
--space-xxxs: 2px;
--space-xxs: 4px;
--space-xs: 8px;
--space-s: 14px;
--space-m: 20px;
--space-l: 24px;
--space-xl: 30px;
--space-xxl: 90px;

/* Цвета — см. CONTEXT.md */
/* Типографика — см. CONTEXT.md */
```

### Формы и валидация
- React Hook Form для управления формами
- Zod для валидации схем
- Inline error messages
- Оптимистичные обновления где уместно

### Данные (MVP)
- **Mock данные** в `/src/data`
- Zustand для клиентского состояния
- Proper loading и error states
- Бэкенд откладывается на следующий этап

---

## Работа с дизайном

### Figma → Код
1. Точно следовать размерам и отступам из Figma
2. Использовать точные цвета из дизайн-системы
3. Подключить шрифты из `/fonts`
4. Использовать изображения из `/assets`

### Компоненты дизайн-системы
**Приоритет реализации:**
1. Atoms (базовые: Button, Avatar, Icon, Input, Status, Tag...)
2. Molecules (Profile, Card, Node, Team...)
3. Organisms (Header, TopMenu, Canban, CardTop...)

### Доступные ресурсы
```
assets/
├── avatar-*.png        # Аватары пользователей
├── card top*.png       # Карточки
├── Cover Image*.jpg    # Обложки
├── flag-*.png          # Флаги
├── Frame 1758.png
└── icons/
    ├── icon-arrow-down.svg
    ├── icon-close.svg
    ├── icon-more.svg
    └── icon-play.svg

fonts/
├── AkkuratLLCyr-*.otf  # Основной шрифт (10 начертаний)
├── InstrumentSerif-*.ttf # Акцентный шрифт
└── Pixform.ttf
```

---

## Workflow разработки

### Порядок работы
1. Читаю задачу в `DEVELOPMENT_PLAN.md`
2. Анализирую Figma для понимания UI
3. Пишу код
4. Проверяю работоспособность
5. Коммит в git
6. Обновляю прогресс в `DEVELOPMENT_PLAN.md`

### Структура коммитов
```
feat: add team creation form
fix: resolve date picker timezone issue
chore: update dependencies
refactor: extract useEmployee hook
style: align buttons in campaign card
ds: add Button component
ds: update color tokens
```

### Обработка ошибок
- Ловить и логировать ошибки
- Показывать user-friendly сообщения
- Graceful degradation
- Не ломать весь UI при ошибке в одном компоненте

---

## Производительность

- Lazy loading для страниц и тяжёлых компонентов
- Оптимизация изображений (next/image)
- Минимизация bundle size
- Избегать лишних ре-рендеров
- Виртуализация для длинных списков

---

## Коммуникация

### Формат ответов
- Краткий и по делу
- Код сразу готов к использованию
- Минимум объяснений, максимум результата
- Если нужен контекст — спрашиваю

### Вопросы
- Задаю только критически важные
- Предлагаю решения, а не проблемы
- Один вопрос = один ответ
