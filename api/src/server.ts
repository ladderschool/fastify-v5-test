import { createServer } from '@redwoodjs/api-server'

import { logger } from 'src/lib/logger'

async function main() {
  const server = await createServer({
    logger,
    async configureApiServer(server) {
      server.addContentTypeParser(/^image\/.*/, (_req, payload, done) => {
        payload.on('end', () => {
          done(null, payload)
        })
      })

      // Add a test route to verify Fastify v5 is working
      server.get('/api/test', async (request, reply) => {
        return {
          message: 'Fastify v5 is working!',
          timestamp: new Date().toISOString(),
          fastifyVersion: server.version,
          method: request.method,
          url: request.url
        }
      })
    },
  })
  await server.start()
}

main()
