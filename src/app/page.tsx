export default function Home() {
  return (
    <main className="min-h-screen p-[var(--space-xl)]" style={{ backgroundColor: 'var(--color-gray-bg)' }}>
      <div className="max-w-4xl mx-auto space-y-[var(--space-l)]">
        {/* Header */}
        <header className="p-[var(--space-l)] rounded-[var(--radius-lg)]" style={{ backgroundColor: 'var(--color-white)' }}>
          <h1 className="text-h1">HR Assist</h1>
          <p className="text-h4 mt-[var(--space-xs)]" style={{ color: 'var(--color-gray-dark)' }}>
            Внутренняя HR платформа для автоматизации процессов онбординга и найма
          </p>
        </header>

        {/* Typography Demo */}
        <section className="p-[var(--space-l)] rounded-[var(--radius-lg)]" style={{ backgroundColor: 'var(--color-white)' }}>
          <h2 className="text-h2 mb-[var(--space-m)]">Типографика</h2>
          
          <div className="space-y-[var(--space-s)]">
            <p className="text-h1">H1 — Instrument Serif 84px</p>
            <p className="text-h2">H2 — Instrument Serif 40px</p>
            <p className="text-h3">H3 — Akkurat LL 20px</p>
            <p className="text-h4">H4 — Akkurat LL 15px</p>
            <p className="text-description">Description — Pixform 30px</p>
            <p className="text-pixel">Text Pixel — Pixform 10px</p>
            <p className="text-grotesk">Text Grotesk — Akkurat LL 11px</p>
            <p className="text-bold">Text Bold — Akkurat LL 11px Bold</p>
            <p className="text-caps">Caps — Akkurat LL 8px</p>
          </div>
        </section>

        {/* Colors Demo */}
        <section className="p-[var(--space-l)] rounded-[var(--radius-lg)]" style={{ backgroundColor: 'var(--color-white)' }}>
          <h2 className="text-h2 mb-[var(--space-m)]">Цвета</h2>
          
          <div className="grid grid-cols-4 gap-[var(--space-xs)]">
            {/* Base */}
            <div className="p-[var(--space-s)] rounded-[var(--radius-md)] border" style={{ backgroundColor: 'var(--color-white)', borderColor: 'var(--color-gray-light)' }}>
              <p className="text-caps">White</p>
            </div>
            <div className="p-[var(--space-s)] rounded-[var(--radius-md)]" style={{ backgroundColor: 'var(--color-black)', color: 'var(--color-white)' }}>
              <p className="text-caps">Black</p>
            </div>
            <div className="p-[var(--space-s)] rounded-[var(--radius-md)]" style={{ backgroundColor: 'var(--color-gray-bg)' }}>
              <p className="text-caps">Gray BG</p>
            </div>
            <div className="p-[var(--space-s)] rounded-[var(--radius-md)]" style={{ backgroundColor: 'var(--color-gray-light)' }}>
              <p className="text-caps">Gray Light</p>
            </div>

            {/* Accent */}
            <div className="p-[var(--space-s)] rounded-[var(--radius-md)]" style={{ backgroundColor: 'var(--color-yellow)' }}>
              <p className="text-caps">Yellow</p>
            </div>
            <div className="p-[var(--space-s)] rounded-[var(--radius-md)]" style={{ backgroundColor: 'var(--color-gold)', color: 'var(--color-white)' }}>
              <p className="text-caps">Gold</p>
            </div>
            <div className="p-[var(--space-s)] rounded-[var(--radius-md)]" style={{ backgroundColor: 'var(--color-yellow-bright)' }}>
              <p className="text-caps">Yellow Bright</p>
            </div>
            <div className="p-[var(--space-s)] rounded-[var(--radius-md)]" style={{ backgroundColor: 'var(--color-success)', color: 'var(--color-white)' }}>
              <p className="text-caps">Success</p>
            </div>

            {/* Semantic */}
            <div className="p-[var(--space-s)] rounded-[var(--radius-md)]" style={{ backgroundColor: 'var(--color-error)', color: 'var(--color-white)' }}>
              <p className="text-caps">Error</p>
            </div>
            <div className="p-[var(--space-s)] rounded-[var(--radius-md)]" style={{ backgroundColor: 'var(--color-purple)', color: 'var(--color-white)' }}>
              <p className="text-caps">Purple</p>
            </div>
            <div className="p-[var(--space-s)] rounded-[var(--radius-md)]" style={{ backgroundColor: 'var(--color-mint)' }}>
              <p className="text-caps">Mint</p>
            </div>
            <div className="p-[var(--space-s)] rounded-[var(--radius-md)]" style={{ backgroundColor: 'var(--color-coral)' }}>
              <p className="text-caps">Coral</p>
            </div>

            {/* Card Backgrounds */}
            <div className="p-[var(--space-s)] rounded-[var(--radius-md)]" style={{ backgroundColor: 'var(--color-pink-light)' }}>
              <p className="text-caps">Pink Light</p>
            </div>
            <div className="p-[var(--space-s)] rounded-[var(--radius-md)]" style={{ backgroundColor: 'var(--color-pink)' }}>
              <p className="text-caps">Pink</p>
            </div>
            <div className="p-[var(--space-s)] rounded-[var(--radius-md)]" style={{ backgroundColor: 'var(--color-purple-light)' }}>
              <p className="text-caps">Purple Light</p>
            </div>
            <div className="p-[var(--space-s)] rounded-[var(--radius-md)]" style={{ backgroundColor: 'var(--color-green-light)' }}>
              <p className="text-caps">Green Light</p>
            </div>
          </div>
        </section>

        {/* Spacing Demo */}
        <section className="p-[var(--space-l)] rounded-[var(--radius-lg)]" style={{ backgroundColor: 'var(--color-white)' }}>
          <h2 className="text-h2 mb-[var(--space-m)]">Отступы</h2>
          
          <div className="space-y-[var(--space-xs)]">
            <div className="flex items-center gap-[var(--space-s)]">
              <div className="w-[2px] h-4" style={{ backgroundColor: 'var(--color-purple)' }}></div>
              <span className="text-grotesk">xxxs — 2px</span>
            </div>
            <div className="flex items-center gap-[var(--space-s)]">
              <div className="w-[4px] h-4" style={{ backgroundColor: 'var(--color-purple)' }}></div>
              <span className="text-grotesk">xxs — 4px</span>
            </div>
            <div className="flex items-center gap-[var(--space-s)]">
              <div className="w-[8px] h-4" style={{ backgroundColor: 'var(--color-purple)' }}></div>
              <span className="text-grotesk">xs — 8px</span>
            </div>
            <div className="flex items-center gap-[var(--space-s)]">
              <div className="w-[14px] h-4" style={{ backgroundColor: 'var(--color-purple)' }}></div>
              <span className="text-grotesk">s — 14px</span>
            </div>
            <div className="flex items-center gap-[var(--space-s)]">
              <div className="w-[20px] h-4" style={{ backgroundColor: 'var(--color-purple)' }}></div>
              <span className="text-grotesk">m — 20px</span>
            </div>
            <div className="flex items-center gap-[var(--space-s)]">
              <div className="w-[24px] h-4" style={{ backgroundColor: 'var(--color-purple)' }}></div>
              <span className="text-grotesk">l — 24px</span>
            </div>
            <div className="flex items-center gap-[var(--space-s)]">
              <div className="w-[30px] h-4" style={{ backgroundColor: 'var(--color-purple)' }}></div>
              <span className="text-grotesk">xl — 30px</span>
            </div>
            <div className="flex items-center gap-[var(--space-s)]">
              <div className="w-[90px] h-4" style={{ backgroundColor: 'var(--color-purple)' }}></div>
              <span className="text-grotesk">xxl — 90px</span>
            </div>
          </div>
        </section>

        {/* Border Radius Demo */}
        <section className="p-[var(--space-l)] rounded-[var(--radius-lg)]" style={{ backgroundColor: 'var(--color-white)' }}>
          <h2 className="text-h2 mb-[var(--space-m)]">Border Radius</h2>
          
          <div className="flex gap-[var(--space-m)]">
            <div className="w-16 h-16 flex items-center justify-center rounded-[var(--radius-sm)]" style={{ backgroundColor: 'var(--color-yellow)' }}>
              <span className="text-caps">SM</span>
            </div>
            <div className="w-16 h-16 flex items-center justify-center rounded-[var(--radius-md)]" style={{ backgroundColor: 'var(--color-yellow)' }}>
              <span className="text-caps">MD</span>
            </div>
            <div className="w-16 h-16 flex items-center justify-center rounded-[var(--radius-lg)]" style={{ backgroundColor: 'var(--color-yellow)' }}>
              <span className="text-caps">LG</span>
            </div>
            <div className="w-16 h-16 flex items-center justify-center rounded-[var(--radius-full)]" style={{ backgroundColor: 'var(--color-yellow)' }}>
              <span className="text-caps">FULL</span>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-grotesk" style={{ color: 'var(--color-gray-dark)' }}>
          <p>HR Assist MVP — Фаза 1 завершена ✓</p>
        </footer>
      </div>
    </main>
  );
}
