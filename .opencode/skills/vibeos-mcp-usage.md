# vibeOS MCP Server Usage Skill

This skill provides guidance on effectively using the vibeOSmcp MCP server to enhance AI agent interactions with the vibeOS ecosystem.

## Overview

The vibeOSmcp MCP server exposes capabilities from the vibeOS ecosystem, including:
- Access to vibeOScore backend API for AI agent orchestration
- Model routing and cost optimization controls via the trinity tool
- Integration with related projects (vibeOScore, theSaver-oc)

## Available Tools

### Trinity Tool
Controls the vibeOS plugin and active model slots:
- `trinity status` - Check current state
- `trinity enable/disable` - Toggle the plugin
- `trinity set slot=brain|medium|cheap` - Switch model tiers
- `trinity rebuild` - Reassign brain/medium/cheap slots
- `trinity flow` - Toggle flow enforcer
- `trinity enforce` - Toggle delegation enforcement
- `trinity tdd` - Toggle test-driven development features
- `trinity setup` - Create compatibility profile
- `trinity project` - Show per-project analytics
- `trinity patterns` - Inspect/clear learned patterns
- `trinity guard` - Ensure AGENTS.md/README.md exist
- `trinity api-token` - Update API token
- `trinity api-bootstrap-token` - Handle bootstrap tokens

### Pricing and Tier Tools
- `pricing` - Get pricing information
- `tier` - Determine appropriate model tier for prompts

## Best Practices

### Model Selection
1. Start with `cheap` tier for simple tasks
2. Use `medium` tier for most general-purpose tasks
3. Reserve `brain` tier for complex reasoning tasks
4. Monitor costs using the pricing tool

### Workflow Recommendations
1. Always check `trinity status` before starting work
2. Use `trinity set` to adjust tiers based on task complexity
3. Enable flow enforcer (`trinity flow on`) for better task decomposition
4. Use delegation enforcement (`trinity enforce on`) to prevent direct writes on brain tier
5. Regularly check pricing to optimize costs

### Integration with vibeOScore
This MCP server consumes the vibeOScore API for:
- AI agent orchestration
- Model routing decisions
- Cost optimization
- Tier routing recommendations

## Related Projects
- **[vibeOScore](https://github.com/DrunkkToys/vibeOScore)** - Backend API
- **[theSaver-oc](https://github.com/DrunkkToys/theSaver-oc)** - Frontend dashboard (SolidJS)
- **[vibeOSmcp](https://github.com/DrunkkToys/vibeOSmcp)** - This MCP server

## Troubleshooting
- If tools aren't responding, check `trinity status` to ensure plugin is enabled
- For authentication issues, verify API token with `trinity api-token`
- If model behavior is unexpected, check current tier with `trinity status`

---
*Skill designed for use with Claude Code, Codex, and other AI coding assistants*