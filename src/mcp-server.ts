import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { Server } from "@modelcontextprotocol/sdk/server/index.js"
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from "@modelcontextprotocol/sdk/types.js"
import type { ApiClient } from "./api-client.js"

const pkg = JSON.parse(readFileSync(resolve(process.cwd(), "package.json"), "utf-8"))

interface ToolDefinition {
  name: string
  description: string
  inputSchema: Record<string, unknown>
}

const TOOLS: ToolDefinition[] = [
  {
    name: "vibeos_pricing_lookup",
    description:
      "Look up the per-turn cost of a specific AI model from OpenRouter pricing",
    inputSchema: {
      type: "object",
      properties: {
        model: {
          type: "string",
          description:
            "Model identifier (e.g. 'gpt-4o', 'claude-3-opus-20240229', 'deepseek/deepseek-v3')",
        },
      },
      required: ["model"],
    },
  },
  {
    name: "vibeos_pricing_static",
    description: "List the built-in static pricing table for known models",
    inputSchema: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  {
    name: "vibeos_tier_classify",
    description:
      "Classify a model identifier into a tier (brain/medium/cheap). Used by vibeOS to route requests to the correct model tier.",
    inputSchema: {
      type: "object",
      properties: {
        model: {
          type: "string",
          description: "Model identifier to classify",
        },
        custom_regex: {
          type: "string",
          description: "Optional custom regex to override tier detection",
        },
      },
      required: ["model"],
    },
  },
  {
    name: "vibeos_route_request",
    description:
      "Route a user prompt to the optimal model tier based on content, current tier, and stress analysis. Returns the recommended tier and model.",
    inputSchema: {
      type: "object",
      properties: {
        prompt: {
          type: "string",
          description: "The user prompt to analyze for routing",
        },
        current_tier: {
          type: "string",
          description: "The currently active tier (brain/medium/cheap)",
        },
        trinity_cheap: {
          type: "string",
          description: "The cheap model override from trinity config",
        },
        trinity_medium: {
          type: "string",
          description: "The medium model override from trinity config",
        },
        stress_score: {
          type: "number",
          description:
            "Pre-computed stress score (0-100). If omitted, the API will compute it.",
        },
      },
      required: ["prompt"],
    },
  },
  {
    name: "vibeos_stress_analyze",
    description:
      "Analyze text for stress indicators. Returns a stress score (0-100), level label, gauge representation, and handling directive.",
    inputSchema: {
      type: "object",
      properties: {
        text: {
          type: "string",
          description:
            "The text to analyze for stress indicators (typically a system prompt)",
        },
      },
      required: ["text"],
    },
  },
  {
    name: "vibeos_compress",
    description:
      "Compress verbose text using vibeOS context compression. Reduces token usage while preserving semantic content.",
    inputSchema: {
      type: "object",
      properties: {
        text: {
          type: "string",
          description: "The text to compress",
        },
        threshold: {
          type: "number",
          description:
            "Compression threshold (default 0.7). Higher = more aggressive compression.",
        },
      },
      required: ["text"],
    },
  },
  {
    name: "vibeos_health",
    description:
      "Check if the vibeOS backend API is reachable and healthy. Returns connection status and backend URL.",
    inputSchema: {
      type: "object",
      properties: {},
      required: [],
    },
  },
]

export function createMcpServer(apiClient: ApiClient): Server {
  const server = new Server(
    {
      name: pkg.name,
      version: pkg.version,
    },
    {
      capabilities: {
        tools: {},
      },
    },
  )

  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: TOOLS,
  }))

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params
    if (!args) {
      throw new Error(`No arguments provided for tool: ${name}`)
    }
    try {
      let result: unknown
      switch (name) {
        case "vibeos_pricing_lookup":
          result = await apiClient.pricingLookup(args.model as string)
          break
        case "vibeos_pricing_static":
          result = await apiClient.pricingStatic()
          break
        case "vibeos_tier_classify":
          result = await apiClient.tierClassify(
            args.model as string,
            args.custom_regex as string | undefined,
          )
          break
        case "vibeos_route_request":
          result = await apiClient.routeModel({
            prompt: args.prompt,
            current_tier: args.current_tier,
            trinity_cheap: args.trinity_cheap,
            trinity_medium: args.trinity_medium,
            stress_score: args.stress_score,
          })
          break
        case "vibeos_stress_analyze":
          result = await apiClient.stressScore(args.text as string)
          break
        case "vibeos_compress":
          result = await apiClient.compressContext(
            args.text as string,
            args.threshold as number | undefined,
          )
          break
        case "vibeos_health":
          result = await apiClient.health()
          break
        default:
          throw new Error(`Unknown tool: ${name}`)
      }
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      return {
        content: [{ type: "text", text: `Error: ${message}` }],
        isError: true,
      }
    }
  })

  return server
}
