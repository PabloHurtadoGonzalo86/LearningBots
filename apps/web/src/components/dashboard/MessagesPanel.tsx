import type { Message } from '../../types';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { ScrollArea } from '../ui/ScrollArea';
import { formatTime } from '../../lib/utils';

interface MessagesPanelProps {
  messages: Message[];
}

export function MessagesPanel({ messages }: MessagesPanelProps) {
  return (
    <Card as="section" aria-labelledby="messages-heading">
      <CardHeader>
        <CardTitle as="h2" className="text-xl" id="messages-heading">
          Comunicación entre Bots
        </CardTitle>
      </CardHeader>

      <CardContent>
        {messages.length === 0 ? (
          <p className="text-[var(--color-text-muted)] text-sm py-4 text-center">
            Sin mensajes recientes
          </p>
        ) : (
          <ScrollArea className="h-64">
            <ol className="space-y-2" role="log" aria-live="polite" aria-label="Mensajes de bots">
              {messages.map((message, index) => (
                <li key={`${message.timestamp}-${index}`} className="p-2 rounded bg-[var(--color-surface-elevated)]">
                  <header className="flex items-center gap-2 mb-1">
                    <strong className="text-sm text-[var(--color-info)]">{message.sender}</strong>
                    <time
                      dateTime={message.timestamp}
                      className="text-xs text-[var(--color-text-muted)]"
                    >
                      {formatTime(message.timestamp)}
                    </time>
                  </header>
                  <blockquote className="text-sm text-[var(--color-text-secondary)]">
                    {message.content}
                  </blockquote>
                </li>
              ))}
            </ol>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
