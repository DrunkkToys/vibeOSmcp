# vibeOSmcp

MCP (Model Context Protocol) server exposing vibeOS backend capabilities.

**Tools available to MCP clients:**
- `vibeos_pricing_lookup` — Get per-turn cost of any AI model from OpenRouter
- `vibeos_pricing_static` — List the built-in pricing table
- `vibeos_tier_classify` — Classify a model string into brain/medium/cheap
- `vibeos_route_request` — Route a user prompt to the optimal model tier
- `vibeos_stress_analyze` — Analyze text for stress indicators (0–100 score)
- `vibeos_compress` — Compress verbose text to reduce token usage
- `vibeos_health` — Check if the vibeOS backend is reachable

## Quick start

```bash
cp .env.example .env
# edit .env with your keys
npm run dev
```

## Configuration

| Variable | Default | Description |
|---|---|---|
| `PORT` | `3001` | MCP server port |
| `HOST` | `0.0.0.0` | Bind address |
| `VIBEOS_API_URL` | `https://api.vibetheog.com` | vibeOS backend URL |
| `VIBEOS_API_KEY` | — | API key for the backend |
| `MCP_API_KEY` | — | Bearer token required by MCP clients (empty = no auth) |

## Transport

Standard MCP HTTP transport:
- `GET /sse` — Server-Sent Events stream (clients connect here)
- `POST /message?sessionId=...` — Client sends JSON-RPC messages here

## Usage with any MCP client

```json
{
  "mcpServers": {
    "vibeos": {
      "url": "http://localhost:3001/sse",
      "headers": {
        "Authorization": "Bearer your_mcp_api_key"
      }
    }
  }
}
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Watch mode with tsx |
| `npm run build` | Compile TypeScript |
| `npm start` | Run compiled output |

## License

MIT
