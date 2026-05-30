# vibeOScore Integration Skill

This skill provides guidance on leveraging vibeOScore's advanced AI orchestration capabilities through the vibeOSmcp MCP server to enhance AI assistant performance, cost efficiency, and output quality.

## Overview

vibeOScore is the backend API that powers the vibeOS ecosystem, providing:
- AI agent orchestration and model routing
- Cost optimization through intelligent tier selection
- ML-enhanced performance optimizations
- Advanced analytics and reporting

Through vibeOSmcp, AI assistants can access these capabilities via MCP tools.

## Key vibeOScore Features Accessible via MCP

### 1. ML Performance Enhancements
vibeOScore implements three research-backed optimizations:
- **INT8 Vector Quantization**: 3-6x speedup, 75% memory reduction
- **LSH Approximate Cache**: 90.9% hit rate on repeated queries
- **SPI Multi-Resolution Index**: Adaptive resolution selection

### 2. Policy Options (Pareto Frontier)
Different routing policies with varying quality/cost tradeoffs:
- **VibeUltraX**: Beats raw brain on both accuracy and cost (Pareto-dominant)
- **VibeMaX**: ~75% quality, $0.18 cost, 82% savings
- **VibeQMaX**: ~100% quality, $0.50 cost, 50% savings
- **Raw Brain**: 100% quality, $1.00 cost (baseline)
- **Budget**: ~40% quality, $0.00 cost, 100% savings

### 3. Available MCP Endpoints
Accessible through vibeOSmcp's trinity tool and direct API calls:
- **Status & Health**: `/status` - System state and backend connectivity
- **Savings Tracking**: `/savings` - Cost optimization metrics
- **Todo Management**: `/todos` - Task tracking
- **Session Analytics**: `/sessions` and `/sessions/current` - Usage and cost monitoring
- **Reports**: `/reports` - Generate and retrieve analytical reports
- **Diagnostics**: `/diagnose` and `/project` - System health checks
- **Research Audit**: `/research-audit` - Session quality analysis
- **Trinity Controls**: `/trinity` - Model tier and plugin management

## Best Practices for AI Assistants

### Model Selection Strategy
1. **Start with VibeMaX policy** for most tasks (~75% quality at 82% savings)
2. **Escalate to VibeQMaX** when higher quality is needed (~100% quality at 50% savings)
3. **Use VibeUltraX** for critical tasks requiring both high quality and low cost
4. **Resort to Raw Brain** only when maximum quality is absolutely required
5. **Use Budget** for trivial tasks where quality is not important

### Cost Optimization Workflow
1. Begin task with `trinity set slot=cheap` (aligns with budget policy)
2. Monitor intermediate results
3. If quality insufficient, escalate to medium (`trinity set slot=medium`)
4. For complex reasoning, use brain tier (`trinity set slot=brain`)
5. Use `trinity tdd on` to create test skeletons when appropriate
6. Enable flow enforcer (`trinity flow on`) for better task decomposition
7. Regularly check `/savings` endpoint to track optimization

### Advanced Usage Patterns

#### Cascade Routing (VibeUltraX Pattern)
1. Use cheap models for initial processing/filtering
2. Use medium models for standard tasks
3. Reserve brain models only for complex reasoning steps
4. Implement ensemble voting for critical decisions

#### Semantic Caching
- Leverage LSH approximate cache by rephrasing similar queries consistently
- Benefit from 77% fewer vector DB calls on repeated/similar tasks
- Structure repetitive tasks to maximize cache hits

#### Multi-Resolution Approach
- Start with coarse analysis (SPI 64-dim equivalent)
- Escalate to fine analysis only when needed
- Matches natural human problem-solving patterns

## MCP Tool Usage Guide

### Trinity Tool Enhancements
Beyond basic tier switching, use trinity for:
- `trinity runProject` - Run project-level diagnostics
- `trinity runDiagnose` - System health check
- `trinity research-audit` - Analyze session for research anti-patterns
- `trinity saveReport` - Persist findings and metrics
- `trinity generateSessionCheckout` - Handle billing/usage reporting

### Monitoring and Feedback Loops
1. Check `/status` before starting work
2. Monitor `/savings` during extended sessions
3. Review `/sessions/current` for real-time metrics
4. Use `/reports` for post-session analysis
5. Adjust strategy based on collected data

## Integration with Related Projects

### vibeOSmcp (This Project)
- Exposes vibeOScore capabilities via MCP
- Provides local trinity controls
- Handles model tier switching

### theSaver-oc (Frontend Dashboard)
- Visualize savings and performance metrics
- Monitor session history
- Configure optimization preferences
- View detailed reports

### Direct API Access
For advanced usage, consider direct API calls to:
- `VIBEOS_BACKEND_HEALTH_URL` (default: https://api.vibetheog.com/health)
- Custom endpoints for specialized analytics
- Webhook integrations for real-time notifications

## Troubleshooting and Optimization

### Common Issues
- **High costs**: Check if consistently using brain tier unnecessarily
- **Poor quality**: Verify appropriate policy selection for task complexity
- **Slow response**: Ensure ML optimizations are engaged (cache warming)
- **Connection issues**: Verify backend health via `/status` endpoint

### Optimization Checklist
[ ] Start with appropriate tier for task complexity
[ ] Enable flow enforcer for multi-step tasks
[ ] Use delegation enforcement to prevent unsafe operations
[ ] Leverage test-driven development features when coding
[ ] Monitor savings dashboard regularly
[ ] Generate reports for long-running sessions
[ ] Clear learned patterns periodically to prevent overfitting
[ ] Update API tokens as needed for continued access

## Example Workflows

### Software Development Task
1. `trinity status` - Check system health
2. `trinity set slot=medium` - Start with balanced tier
3. `trinity flow on` - Enable flow enforcement
4. `trinity tdd on` - Enable test skeleton generation
5. [Perform coding tasks]
6. `trinity enforce on` - Prevent direct writes on complex code
7. Periodically check `/savings` 
8. Escalate to brain tier only for architectural decisions
9. Generate report on completion

### Research/Analysis Task
1. `trinity set slot=brain` - Start with high quality for research
2. `trinity research-audit` - Baseline audit
3. [Perform research tasks]
4. Check `/reports` for insights
5. Downgrade to medium for documentation/writing
6. Final audit with `trinity research-audit`

### Maintenance/Monitoring Task
1. `trinity set slot=cheap` - Minimal quality needed
2. `trinity runDiagnose` - System health check
3. `trinity runProject` - Project-level analysis
4. Review `/sessions` for usage patterns
5. Generate savings report
6. Schedule next maintenance window

---
*Skill designed to help AI assistants leverage vibeOScore's advanced capabilities through the vibeOSmcp MCP server for optimal performance, quality, and cost efficiency.*