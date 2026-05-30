import { describe, it, expect } from 'vitest'
import { createMcpServer } from '../mcp-server.js'

const mockApiClient = {
  pricingLookup: () => Promise.resolve({}),
  pricingStatic: () => Promise.resolve({}),
  tierClassify: () => Promise.resolve({}),
  routeModel: () => Promise.resolve({}),
  stressScore: () => Promise.resolve({}),
  compressContext: () => Promise.resolve({}),
  health: () => Promise.resolve({}),
}

describe('mcp-server', () => {
  it('exports createMcpServer', () => {
    expect(createMcpServer).toBeDefined()
    expect(typeof createMcpServer).toBe('function')
  })

  it('creates a Server instance with valid client', () => {
    const server = createMcpServer(mockApiClient)
    expect(server).toBeDefined()
  })
})
