# Learning Bots - Mindcraft Dashboard

Real-time monitoring dashboard for Mindcraft AI Civilization.

## Stack

- **Frontend**: React 19 + Vite 7 + TailwindCSS 4 + Radix Primitives
- **Backend**: NestJS 11 + Socket.io
- **Data**: Redis + MongoDB + Qdrant

## Structure

```
LearningBots/
├── apps/
│   ├── api/          # NestJS backend
│   └── web/          # React frontend
└── packages/         # Shared packages
```

## Development

```bash
# Install dependencies
pnpm install

# Start development servers
pnpm dev

# Run tests
pnpm test

# Build for production
pnpm build
```

## Environment Variables

See `apps/api/.env.example` for required environment variables.
