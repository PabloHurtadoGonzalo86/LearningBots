import type { Bot } from '../../types';
import { BotCard } from './BotCard';

interface BotsGridProps {
  bots: Bot[];
}

export function BotsGrid({ bots }: BotsGridProps) {
  if (bots.length === 0) {
    return (
      <section aria-labelledby="bots-heading">
        <h2 id="bots-heading" className="sr-only">
          Estado de los bots
        </h2>
        <p className="text-center text-[var(--color-text-muted)] py-8">Cargando bots...</p>
      </section>
    );
  }

  return (
    <section aria-labelledby="bots-heading">
      <h2 id="bots-heading" className="text-xl font-semibold mb-4">
        Estado de los Bots
      </h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4" role="list">
        {bots.map((bot) => (
          <li key={bot.name}>
            <BotCard bot={bot} />
          </li>
        ))}
      </ul>
    </section>
  );
}
