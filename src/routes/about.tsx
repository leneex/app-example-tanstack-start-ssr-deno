import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [{ title: 'About — TanStack Start SSR' }],
  }),
  component: About,
})

function About() {
  return (
    <>
      <h1>About</h1>
      <p>
        A basic{' '}
        <a
          href="https://tanstack.com/start"
          target="_blank"
          rel="noopener noreferrer"
        >
          TanStack Start
        </a>{' '}
        app with server-side rendering. Routes in the <code>src/routes/</code>{' '}
        folder are picked up automatically, and the server is defined in{' '}
        <code>src/server.ts</code>.
      </p>
    </>
  )
}
