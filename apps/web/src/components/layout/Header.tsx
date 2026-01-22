import { HealthStatus } from '../dashboard/HealthStatus';

interface HeaderProps {
  isConnected: boolean;
}

export function Header({ isConnected }: HeaderProps) {
  return (
    <header className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
      <nav className="max-w-screen-2xl mx-auto px-4 py-3 flex items-center justify-between">
        <hgroup>
          <h1 className="text-xl font-bold">Mindcraft Dashboard</h1>
          <p className="text-sm text-[var(--color-text-muted)]">AI Civilization Monitor</p>
        </hgroup>

        <div className="flex items-center gap-4">
          <HealthStatus />
          <output aria-label="Estado de conexión WebSocket" className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: isConnected ? 'var(--color-success)' : 'var(--color-error)' }}
              aria-hidden="true"
            />
            <span className="text-xs text-[var(--color-text-secondary)]">
              {isConnected ? 'Conectado' : 'Desconectado'}
            </span>
          </output>
        </div>
      </nav>
    </header>
  );
}
