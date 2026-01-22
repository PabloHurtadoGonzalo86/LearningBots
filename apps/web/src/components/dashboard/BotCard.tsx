import type { Bot } from '../../types';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';
import { formatCoordinates, getHealthColor, getFoodColor } from '../../lib/utils';

interface BotCardProps {
  bot: Bot;
}

const roleIcons: Record<string, string> = {
  LEADER: '👑',
  MINER: '⛏️',
  LUMBERJACK: '🪓',
  FARMER: '🌾',
  BUILDER: '🏗️',
  CRAFTER: '🔨',
  EXPLORER: '🧭',
  GUARD: '🛡️',
  MERCHANT: '💰',
  SMITH: '🔥',
};

export function BotCard({ bot }: BotCardProps) {
  const isOnline = bot.gameState !== null;
  const health = bot.gameState?.health ?? 0;
  const food = bot.gameState?.food ?? 0;
  const position = bot.gameState?.position;
  const goal = bot.goal?.goal;

  // Critical status detection
  const isCriticalHealth = health > 0 && health < 5;
  const isCriticalFood = food < 5;
  const isDying = health > 0 && health < 2;
  const isStarving = food === 0;
  const isCritical = isCriticalHealth || isCriticalFood;

  return (
    <Card className={`h-full ${isCritical ? 'ring-2 ring-red-500 animate-pulse' : ''} ${isDying || isStarving ? 'bg-red-900/20' : ''}`}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle as="h3" className="flex items-center gap-2">
          <span role="img" aria-label={bot.role}>
            {roleIcons[bot.role] || '🤖'}
          </span>
          {bot.name}
          {(isDying || isStarving) && (
            <span className="text-red-500 text-xs font-bold animate-pulse" title="Bot en peligro crítico">
              ⚠️ CRÍTICO
            </span>
          )}
        </CardTitle>
        <Badge variant={isOnline ? 'success' : 'error'}>{isOnline ? 'Online' : 'Offline'}</Badge>
      </CardHeader>

      <CardContent className="space-y-3">
        <dl className="text-sm">
          <div className="flex justify-between">
            <dt className="text-[var(--color-text-muted)]">Rol</dt>
            <dd className="font-medium">{bot.role}</dd>
          </div>
        </dl>

        <ProgressBar value={health} max={20} color={getHealthColor(health)} label="Salud" showValue />

        <ProgressBar value={food} max={20} color={getFoodColor(food)} label="Comida" showValue />

        {position && (
          <dl className="text-sm">
            <div className="flex justify-between">
              <dt className="text-[var(--color-text-muted)]">Posición</dt>
              <dd className="font-mono text-xs">{formatCoordinates(position)}</dd>
            </div>
          </dl>
        )}

        {goal && (
          <dl className="text-sm">
            <div>
              <dt className="text-[var(--color-text-muted)]">Objetivo actual</dt>
              <dd className="mt-1 text-[var(--color-info)] truncate" title={goal}>
                {goal}
              </dd>
            </div>
          </dl>
        )}
      </CardContent>
    </Card>
  );
}
