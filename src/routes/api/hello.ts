import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/hello')({
  server: {
    handlers: {
      GET: () =>
        Response.json({
          message: 'Hello from the TanStack Start API (runs on the server)',
          at: new Date().toISOString(),
        }),
    },
  },
})
