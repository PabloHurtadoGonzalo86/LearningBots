import { Header } from './components/layout/Header';
import { BotsGrid } from './components/dashboard/BotsGrid';
import { CurriculumPanel } from './components/dashboard/CurriculumPanel';
import { MemoriesPanel } from './components/dashboard/MemoriesPanel';
import { MessagesPanel } from './components/dashboard/MessagesPanel';
import { ImprovementsPanel } from './components/dashboard/ImprovementsPanel';
import { useSocket } from './hooks/useSocket';

export function App() {
  const { isConnected, bots, improvements, messages } = useSocket();

  return (
    <div className="min-h-screen flex flex-col">
      <Header isConnected={isConnected} />

      <main className="flex-1 max-w-screen-2xl mx-auto w-full px-4 py-6 space-y-6">
        <BotsGrid bots={bots} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <CurriculumPanel />
            <MemoriesPanel />
          </div>

          <aside className="space-y-6">
            <ImprovementsPanel improvements={improvements} />
            <MessagesPanel messages={messages} />
          </aside>
        </div>
      </main>

      <footer className="border-t border-[var(--color-border)] py-4">
        <p className="text-center text-sm text-[var(--color-text-muted)]">
          Mindcraft Dashboard v1.0.0
        </p>
      </footer>
    </div>
  );
}
