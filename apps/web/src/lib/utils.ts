import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatTime(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

export function formatDate(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatCoordinates(pos: { x: number; y: number; z: number }): string {
  return `${Math.round(pos.x)}, ${Math.round(pos.y)}, ${Math.round(pos.z)}`;
}

export function getHealthColor(health: number): string {
  if (health > 15) return 'var(--color-success)';
  if (health > 8) return 'var(--color-warning)';
  return 'var(--color-error)';
}

export function getFoodColor(food: number): string {
  if (food > 15) return 'var(--color-food)';
  if (food > 8) return 'var(--color-warning)';
  return 'var(--color-error)';
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'healthy':
    case 'online':
      return 'var(--color-success)';
    case 'degraded':
    case 'warning':
      return 'var(--color-warning)';
    case 'unhealthy':
    case 'offline':
    case 'error':
      return 'var(--color-error)';
    default:
      return 'var(--color-text-muted)';
  }
}
