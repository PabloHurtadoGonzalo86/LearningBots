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
├── k8s/              # Kubernetes manifests
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

## Deployment

```bash
# Build Docker images
docker build -t learning-bots-api ./apps/api
docker build -t learning-bots-web ./apps/web

# Deploy to Kubernetes
kubectl apply -k k8s/
```

## Environment Variables

See `apps/api/.env.example` for required environment variables.
