# vibeOSmcp

MCP (Model Context Protocol) server exposing vibeOS backend capabilities — model routing, tier classification, pricing, stress analysis, context compression, and delegation enforcement.

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

`vibeos_health` works immediately. Other tools return descriptive guidance.
When ready, get a free alpha bootstrap token:

```bash
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

### Classification rules

High — `opus|gemini.*pro|deepseek.*v4.*pro|deepseek.*r1|gpt-5|mistral.*large|qwen.*max|grok-3|command.*r.*plus|(^|[^a-z])o[134]($|[^a-z])`

Mid — `sonnet|deepseek.*v4.*flash|deepseek.*v[23]|deepseek.*coder|gemini.*flash|gpt-4o(?!-mini)|llama|mixtral|mistral(?!.*large)|qwen.*plus|grok-2|command.*r(?!.*plus)|o[134]-mini`

Budget — catch-all (`.*`)

Use `vibeos_tier_classify` to test any model string.

## Optimization modes

### Policy comparison — sorted by quality descending

| Policy | Quality vs Brain | Cost vs Brain | Savings | Method |
|--------|-----------------|--------------|---------|--------|
| VibeUltraX | **107%** | 0.58× | 42% | local → Flash → Pro cascade |
| VibeQMaX | ~100% | 0.50× | 50% | same model, framework optimizations |
| Raw Brain | 100% | 1.00× | — | baseline |
| VibeMaX | ~75% | 0.18× | **82%** | trained cascade (conservative escalate) |
| Speed | ~55% | 0.32× | 68% | v4 Flash, thinking off |
| Budget | ~40% | 0.00× | 100% | DeepSeek Chat, direct routing |

**VibeUltraX** — Cascade pipeline: MagicCoder:7b (local Ollama) proposes, v4 Flash reviews, v4 Pro refines. Benchmarked at **107% of Brain quality** at 58% cost. Pareto-dominant mode — beats Raw Brain on both accuracy and cost.

**VibeQMaX (Quality Max)** — Routes strategic turns through v4 Pro with full thinking, strict enforcement, strict flow, and quality TDD. Write/edit turns delegated to cheaper tiers. Effective blended cost ~$0.00029/turn (50% of Raw Brain).

**Raw Brain** — v4 Pro with full thinking, no framework overhead. Baseline for all comparisons.

**VibeMaX (ML-optimized, default)** — Routes through v4 Flash (medium). Uses a random forest classifier (29 trees, gini-split, trained on telemetry) to decide each turn. Classifies on 11 derived features: message length, code block density, urgency, complexity, repetition, question ratio, and more. ~75% quality at 18% cost.

**Speed** — v4 Flash with thinking off, relaxed enforcement, audit flow, lazy TDD. ~55% quality at 32% cost.

**Budget** — DeepSeek Chat, direct routing, thinking off. ~40% quality at $0.00 cost.

### Configuration per mode

| Mode | Model | Thinking | Enforcement | Flow | TDD |
|------|-------|----------|-------------|------|-----|
| Raw Brain | v4 Pro | full | — | — | — |
| VibeQMaX | v4 Pro | full | strict | strict | quality |
| VibeUltraX | cascade (local→Flash→Pro) | auto | auto | auto | auto |
| VibeMaX | v4 Flash (auto-escalate) | auto | auto | auto | auto |
| Speed | v4 Flash | off | relaxed | audit | lazy |
| Budget | DeepSeek Chat | off | relaxed | audit | lazy |

### Cost vs quality visual

```
Quality
  baseline  . Raw Brain . VibeQMaX
    107%        |   . VibeUltraX
   ~75%      |   . VibeMaX (default)
   ~55%      |   . Speed
   ~40%      |   . Budget
              |
              +--------------------------------
              1.0x  0.50x 0.32x 0.18x 0.00x
                          Cost Multiplier
```

### Benchmark details

All tests run with DeepSeek v4 family. Quality scores measured against Raw Brain (v4 Pro, full thinking, no vibeOS overhead).

- **VibeMaX** quality benchmark derived from real session telemetry with bootstrap confidence intervals (36 bootstrap samples). Pareto frontier computed from 70 holdout scenarios across 170 training samples via hyperparameter sweep.
- **VibeUltraX** is the first mode that beats Raw Brain on both accuracy and cost — Pareto-dominant.
- Benchmarked on 1000 simulated questions across 20 runs, using model accuracies from MMLU-Pro / GPQA Diamond with real error correlation data.

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
