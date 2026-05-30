# vibeOSmcp

MCP (Model Context Protocol) server exposing vibeOS backend capabilities — model routing, tier classification, pricing, stress analysis, and context compression.

**Tools available to MCP clients:**
- `vibeos_pricing_lookup` — Get per-turn cost of any AI model from OpenRouter
- `vibeos_pricing_static` — List the built-in pricing table
- `vibeos_tier_classify` — Classify a model string into brain/medium/cheap
- `vibeos_route_request` — Route a user prompt to the optimal model tier
- `vibeos_stress_analyze` — Analyze text for stress indicators (0–100 score)
- `vibeos_compress` — Compress verbose text to reduce token usage
- `vibeos_health` — Check if the vibeOS backend is reachable

## Free trial (bootstrap)

Try vibeOSmcp without a backend API key:

```bash
git clone https://github.com/DrunkkToys/vibeOSmcp.git
cd vibeOSmcp
npm install
# Start in bootstrap mode — no backend API key needed
VIBEOS_API_KEY= MCP_API_KEY=test npm run dev
```

Health check works immediately. Other tools return descriptive messages explaining what they need.
When you are ready, get a free alpha bootstrap token:

```bash
# Set a bootstrap token to unlock limited backend access
export VIBEOS_API_KEY=vbs_your_bootstrap_token_here
npm run dev
```

Bootstrap tokens are exchanged for full API keys on first use (see vibeOScore docs).

## Model tiers

vibeOS routes requests across three tiers. The slot configuration is dynamic via the backend, but the default mapping is:

| Slot | Model | API ID | Per turn | Per 1K turns | Tier |
|------|-------|--------|----------|--------------|------|
| brain | DeepSeek v4 Pro | `deepseek/deepseek-v4-pro` | $0.00057 | $0.58 | high |
| medium | DeepSeek v4 Flash | `deepseek/deepseek-v4-flash` | $0.000182 | $0.18 | mid |
| cheap | DeepSeek Chat | `deepseek/deepseek-chat` | ~$0.00 | ~$0.00 | budget |
| cheap (local) | MagicCoder:7b (Ollama) | `magicoder:7b` | $0.00 | $0.00 | budget |

### Pricing per tier bucket (per 1M tokens)

| Tier | Input | Output | Cache read | Cache write |
|------|-------|--------|------------|-------------|
| high | $15.00 | $75.00 | $1.50 | $18.75 |
| mid | $3.00 | $15.00 | $0.30 | $3.75 |
| budget | $0.80 | $4.00 | $0.08 | $1.00 |

### How classification works

The server classifies any model string by regex matching:

- **high** — matches `opus|gemini.*pro|deepseek.*v4.*pro|deepseek.*r1|gpt-5|mistral.*large|qwen.*max|grok-3|command.*r.*plus|(^|[^a-z])o[134]($|[^a-z])`
- **mid** — matches `sonnet|deepseek.*v4.*flash|deepseek.*v[23]|deepseek.*coder|gemini.*flash|gpt-4o(?!-mini)|llama|mixtral|mistral(?!.*large)|qwen.*plus|grok-2|command.*r(?!.*plus)|o[134]-mini`
- **budget** — catch-all (matches `.*`)

See `vibeos_tier_classify` tool to test any model string.

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
| `VIBEOS_API_KEY` | — | API key for the backend (empty = bootstrap mode) |
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
