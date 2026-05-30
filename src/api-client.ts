export interface ApiClient {
  pricingLookup(model: string): Promise<unknown>
  pricingStatic(): Promise<unknown>
  tierClassify(model: string, customRegex?: string): Promise<unknown>
  routeModel(params: Record<string, unknown>): Promise<unknown>
  stressScore(text: string): Promise<unknown>
  compressContext(text: string, threshold?: number): Promise<unknown>
  health(): Promise<unknown>
}

export function createApiClient({
  baseUrl,
  apiKey,
}: {
  baseUrl: string
  apiKey: string
}): ApiClient {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  }
  if (apiKey) {
    headers["Authorization"] = `Bearer ${apiKey}`
  }

  async function post(path: string, body: unknown): Promise<unknown> {
    const res = await fetch(`${baseUrl}${path}`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: res.statusText }))
      throw new Error(err.error || `API error: ${res.status}`)
    }
    return res.json()
  }

  async function get(path: string): Promise<unknown> {
    const res = await fetch(`${baseUrl}${path}`, { headers })
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: res.statusText }))
      throw new Error(err.error || `API error: ${res.status}`)
    }
    return res.json()
  }

  return {
    pricingLookup: (model: string) => post("/api/v1/pricing/lookup", { model }),
    pricingStatic: () => get("/api/v1/pricing/static"),
    tierClassify: (model: string, customRegex?: string) =>
      post("/api/v1/tier/classify", { model, custom_regex: customRegex }),
    routeModel: (params: Record<string, unknown>) =>
      post("/api/v1/route/model", params),
    stressScore: (text: string) => post("/api/v1/stress/score", { text }),
    compressContext: (text: string, threshold?: number) =>
      post("/api/v1/compress/context", { text, threshold }),
    health: () => get("/health"),
  }
}
