#!/usr/bin/env node
import Fastify from 'fastify'
import { createMcpServer } from './mcp-server.js'
import { createApiClient } from './api-client.js'
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js'
import type { Server } from '@modelcontextprotocol/sdk/server/index.js'

const PORT = parseInt(process.env.PORT || '3001', 10)
const HOST = process.env.HOST || '0.0.0.0'
const API_BASE_URL = process.env.VIBEOS_API_URL || 'https://api.vibetheog.com'
const VIBEOS_API_KEY = process.env.VIBEOS_API_KEY || ''
const MCP_API_KEY = process.env.MCP_API_KEY || ''

const apiClient = createApiClient({ baseUrl: API_BASE_URL, apiKey: VIBEOS_API_KEY })
const mcpServer: Server = createMcpServer(apiClient)

const app = Fastify({ logger: true })
const transports = new Map<string, SSEServerTransport>()

function checkAuth(req: Fastify.FastifyRequest, reply: Fastify.FastifyReply): boolean {
  if (!MCP_API_KEY) return true
  const auth = req.headers.authorization
  if (!auth || !auth.startsWith('Bearer ') || auth.slice(7) !== MCP_API_KEY) {
    reply.status(401).send({ error: 'Unauthorized' })
    return false
  }
  return true
}

app.get('/sse', async (req, reply) => {
  if (!checkAuth(req, reply)) return
  const transport = new SSEServerTransport('/message', reply.raw)
  transports.set(transport.sessionId, transport)
  reply.raw.on('close', () => {
    transports.delete(transport.sessionId)
  })
  await mcpServer.connect(transport)
})

app.post('/message', async (req, reply) => {
  if (!checkAuth(req, reply)) return
  const sessionId = (req.query as { sessionId?: string }).sessionId
  const transport = sessionId ? transports.get(sessionId) : undefined
  if (!transport) {
    return reply.status(404).send({ error: 'Session not found' })
  }
  await transport.handlePostMessage(req.raw, reply.raw)
})

const start = async () => {
  try {
    await app.listen({ port: PORT, host: HOST })
    console.log(`vibeOSmcp listening on ${HOST}:${PORT}`)
    console.log(`  Backend API: ${API_BASE_URL}`)
    console.log(`  SSE: http://localhost:${PORT}/sse`)
    console.log(`  POST: http://localhost:${PORT}/message`)
    if (MCP_API_KEY) console.log(`  Auth: Bearer token required`)
    else console.log(`  Auth: disabled (set MCP_API_KEY to enable)`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
