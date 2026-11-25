import { realpathSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import handler, { createServerEntry } from '@tanstack/react-start/server-entry'
import { serve } from 'srvx'
import { staticMiddleware } from 'srvx/static'

const entry = createServerEntry({
  fetch(request) {
    return handler.fetch(request)
  },
})

export default entry

/*
 * After the build this file becomes dist/server/server.js. When it is run directly
 * (`node dist/server/server.js`), it starts an HTTP server: static files are served from dist/client,
 * all other requests go to the SSR handler. In `vite dev` and `vite preview` the file is only
 * imported, and the server does not start here.
 *
 * The port comes from the PORT variable (3000 by default); the server listens on all interfaces.
 */
const isEntryPoint =
  process.argv[1] !== undefined &&
  realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)

if (isEntryPoint) {
  serve({
    fetch: entry.fetch,
    middleware: [
      staticMiddleware({
        dir: fileURLToPath(new URL('../client', import.meta.url)),
      }),
    ],
  })
}
