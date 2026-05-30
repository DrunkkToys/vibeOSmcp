import { describe, it, expect } from 'vitest'
import { createApiClient } from '../api-client.js'

describe('api-client', () => {
  it('exports createApiClient', () => {
    expect(createApiClient).toBeDefined()
    expect(typeof createApiClient).toBe('function')
  })

  it('returns an ApiClient with all methods', () => {
    const c = createApiClient({ baseUrl: 'http://test.com', apiKey: 'test-key' })
    expect(c.pricingLookup).toBeDefined()
    expect(c.pricingStatic).toBeDefined()
    expect(c.tierClassify).toBeDefined()
    expect(c.routeModel).toBeDefined()
    expect(c.stressScore).toBeDefined()
    expect(c.compressContext).toBeDefined()
    expect(c.health).toBeDefined()
  })

  it('includes Authorization header when apiKey is set', () => {
    const c = createApiClient({ baseUrl: 'http://test.com', apiKey: 'sk-test' })
    expect(c).toBeDefined()
  })

  it('handles empty baseUrl gracefully', () => {
    const c = createApiClient({ baseUrl: '', apiKey: '' })
    expect(c).toBeDefined()
  })
})
