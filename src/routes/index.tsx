import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { getRequestHeader } from '@tanstack/react-start/server'

/* The server function runs only on the server; the browser receives its result */
const getServerInfo = createServerFn({ method: 'GET' }).handler(() => ({
  renderedAt: new Date().toISOString(),
  runtime: process.versions.deno ? 'Deno ' + process.versions.deno : 'Node.js ' + process.version,
  userAgent: getRequestHeader('user-agent') ?? '—',
}))

export const Route = createFileRoute('/')({
  loader: () => getServerInfo(),
  component: Home,
})

function Home() {
  const info = Route.useLoaderData()

  return (
    <>
      <h1>Home</h1>
      <p className="lead">
        This page is rendered on the server (SSR) on every request.
      </p>

      <dl className="info">
        <dt>Render time</dt>
        <dd>
          <code>{info.renderedAt}</code>
        </dd>
        <dt>Runtime</dt>
        <dd>
          <code>{info.runtime}</code>
        </dd>
        <dt>User-Agent</dt>
        <dd>
          <code>{info.userAgent}</code>
        </dd>
      </dl>

      <p>
        Refresh the page and the render time will change. API endpoint example:{' '}
        <a href="/api/hello">/api/hello</a>.
      </p>
    </>
  )
}
