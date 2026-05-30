# theSaver-oc Integration Skill

This skill provides guidance on integrating with theSaver-oc, which is the frontend dashboard and OpenCode plugin for the vibeOS ecosystem. theSaver-oc provides real-time visualization, cost tracking, and enhanced control over AI agent operations.

## Overview

theSaver-oc is described as "vibeOS for OpenCode CLI and desktop" and provides:
- Real-time cost tracking and savings visualization
- Delegation enforcement to prevent expensive model usage
- Live footer showing model, provider, savings, and status
- Web dashboard with SolidJS SPA and real-time updates
- Advanced features like VibeBoX decision engine, stress-aware routing, and pattern learning
- MCP server integration for extended capabilities

## Key Features Accessible via Integration

### 1. Real-Time Monitoring
- Live footer displaying current model, provider, cumulative savings, cache savings, stress level, and enforcement status
- Persistent state in `~/.claude/delegation-state.json`
- Web dashboard at `/dashboard` endpoint with SolidJS SPA

### 2. Cost Optimization Controls
- **Delegation Enforcement**: Blocks write/edit operations on brain tier, forcing delegation to cheaper tiers
- **Dynamic Tier Switching**: Change model tiers mid-session via trinity commands
- **Optimization Modes**: Budget, VibeMaX, VibeQMaX, VibeUltraX, Raw Brain, Speed
- **Session Lock**: Freeze model selection for session consistency

### 3. Advanced AI Features
- **VibeBoX Decision Engine**: 7 sub-regimes with intelligent mode mapping
- **Flow Enforcer**: Pattern-rule checks and TODO/FIXME extraction
- **TDD Enforcer**: Automatic test skeleton generation
- **Pattern Learner**: Tracks recurring struggle/routine patterns per project
- **Stress-Aware Routing**: Escalates to quality mode when stress > 1.5
- **Cache Savings**: Separate tracking for scratchpad cache hits

### 4. Reporting and Analytics
- Report generation and retrieval (report-save, report-list, report-read)
- Research audit for detecting anti-patterns
- Session metrics and analytics
- Per-project analytics via `trinity project`

## MCP Server Integration Points

The vibeOSmcp MCP server enhances theSaver-oc by providing:

### Extended Tool Capabilities
Beyond the standard trinity commands, the MCP server offers:
- Direct API access to vibeOScore backend
- Enhanced reporting capabilities
- Custom diagnostic tools
- Webhook and event streaming capabilities

### Dashboard Serving
The MCP server can serve the theSaver-oc dashboard:
- Serves SolidJS SPA from `/dashboard` endpoint
- Provides Server-Sent Events (`/events`) for real-time updates
- Acts as a proxy to the vibeOScore API when needed

### Remote API Integration
When configured with a valid API token, the MCP server enables:
- Remote API authentication and token management
- Cross-session pattern learning
- Dynamic pricing updates
- Advanced VibeBoX with full session history

## Best Practices for AI Assistants

### Setup and Initialization
1. Ensure theSaver-oc plugin is installed and enabled in OpenCode
2. Verify MCP server is running and accessible
3. Check initial state with `trinity status`
4. Confirm dashboard accessibility (typically at http://localhost:3001/dashboard)

### Monitoring During Work
1. **Watch the Live Footer**: 
   - Model: Currently active model tier
   - Provider: API provider being used
   - Savings: Cumulative delegation and cache savings
   - Stress Level: Low/Elevated/High indicator
   - Tags: ENFORCE, LOCK, Quality indicators
   - Mode: Current optimization mode

2. **Regular Status Checks**:
   - Use `trinity status` for detailed state
   - Check `/savings` endpoint for metrics
   - Review `/sessions/current` for real-time usage

### Cost Optimization Workflow
1. **Start Appropriate**: Begin with tier matching task complexity
2. **Monitor Feedback**: Watch for enforcement blocks and savings accrual
3. **Adjust Dynamically**: Use `trinity set` to change tiers as needed
4. **Leverage Automation**: 
   - Enable flow enforcer for complex tasks
   - Use TDD features when coding
   - Allow stress-aware routing to adapt
5. **Review Periodically**: 
   - Check dashboard for visual trends
   - Generate reports for long sessions
   - Analyze patterns with `trinity patterns`

### Advanced Usage Patterns

#### Delegation-Aware Coding
1. When enforcement blocks a write/edit:
   - Acknowledge the block and suggested savings
   - Delegate the operation to medium or cheap tier
   - Continue work in the delegated tier
   - Only return to brain for strategic decisions

#### Flow-Driven Development
1. Enable flow enforcer: `trinity flow on`
2. Allow automatic TODO/FIXME extraction
3. Work through the generated TODO queue
4. Use `trinity flow enforce on` to auto-extract TODOs from code

#### Test-First Enhancement
1. Enable TDD: `trinity tdd on`
2. Make changes to source files
3. Observe auto-generated test skeletons
4. Implement tests before or alongside implementation
5. Use strict mode (`trinity tdd strict`) for failing TODO templates

#### Pattern Learning Utilization
1. Review learned patterns periodically: `trinity patterns`
2. Use insights to improve work habits
3. Clear patterns when starting new project types: `trinity patterns clear`
4. Leverage VibeBoX regime detection for adaptive workflows

## Troubleshooting Common Issues

### Plugin Not Active
- **Symptoms**: No live footer, trinity commands not recognized
- **Fix**: 
  - Check `opencode.json` for plugin entry
  - Restart OpenCode Desktop
  - Run `trinity diagnose` for health check

### Dashboard Not Loading
- **Symptoms**: Blank dashboard, connection errors
- **Fix**:
  - Verify MCP server is running
  - Check port configuration (default 3001)
  - Ensure dashboard build is current (`npm run build:dashboard` in theSaver-oc)
  - Verify network connectivity to localhost:3001

### Savings Not Tracking
- **Symptoms**: Footer shows $0 saved despite enforcement
- **Fix**:
  - Check delegation-state.json for corruption
  - Run `trinity repair-state preview` then apply if needed
  - Verify enforcement is actually triggering (look for warn entries)
  - Ensure plugin is not in disabled state

### Model Switching Issues
- **Symptoms**: Unable to change tiers, stuck on current model
- **Fix**:
  - Run `trinity rebuild` to refresh model detection
  - Try explicit tier switch: `trinity set medium`
  - Check for session lock: `trinity lock off`
  - Verify provider configuration in OpenCode settings

## Integration Workflows

### Development Session Workflow
1. **Initialization**:
   - `trinity status` - Check baseline
   - `trinity set medium` - Start with balanced tier
   - `trinity flow on` - Enable flow enforcement
   - `trinity tdd on` - Enable test skeletons

2. **Active Development**:
   - Monitor footer for enforcement events
   - When blocked, delegate to appropriate tier
   - Let flow extract TODOs from complex changes
   - Use generated test skeletons as TDD guides

3. **Complex Reasoning**:
   - Escalate to brain for architectural decisions: `trinity set brain`
   - Use enforcement to prevent accidental writes
   - Delegate implementation back to medium/cheap
   - Return to brain only for review/validation

4. **Session Close**:
   - `trinity research-audit` - Check for anti-patterns
   - Generate final report: `trinity save-report`
   - Review savings: `trinity savings`
   - Reset for next session: `trinity set cheap`

### Research/Analysis Session
1. **Setup**:
   - `trinity set brain` - Start with quality for research
   - `trinity thinking full` - Enable deep reasoning
   - Disable enforcement if purely analytical: `trinity enforce off`

2. **Research Phase**:
   - Leverage full model capabilities
   - Monitor stress levels to prevent unnecessary escalation
   - Use flow enforcer to capture research questions as TODOs

3. **Synthesis Phase**:
   - Switch to medium for organizing findings: `trinity set medium`
   - Re-enable enforcement for write operations
   - Use TDD features if creating code artifacts
   - Generate structured reports

4. **Documentation**:
   - Use cheap tier for documentation writing
   - Leverage cache savings for repetitive text
   - Final review with medium tier

## Maintenance and Optimization

### Regular Maintenance Tasks
- Weekly: Run `trinity diagnose` and apply repairs if suggested
- Monthly: Clear learned patterns with `trinity patterns clear` when shifting project types
- Quarterly: Review model-tiers.json for updates
- As needed: Refresh dashboard build with `npm run build:dashboard` in theSaver-oc

### Optimization Techniques
1. **Cache Warming**: Perform representative tasks early to populate LSH approximate cache
2. **Stress Monitoring**: Watch for stress > 1.5 indicators and preemptively adjust
3. **Pattern Utilization**: Leverage learned patterns to anticipate workflow needs
4. **Regime Awareness**: Understand VibeBoX regimes to match optimization modes
5. **Batch Similar Tasks**: Group similar operations to maximize cache hits

## Related Resources

- **theSaver-oc Repository**: https://github.com/DrunkkToys/theSaver-oc
- **vibeOScore Backend**: https://github.com/DrunkkToys/vibeOScore
- **MCP Server**: This repository (vibeOSmcp)
- **Live Dashboard**: Typically available at http://localhost:3001/dashboard when MCP server is running
- **State Files**: Located in ~/.claude/ (delegation-state.json, model-tiers.json, etc.)

---
*Skill designed to help AI assistants effectively integrate with and leverage theSaver-oc for enhanced OpenCode/Desktop experience with real-time cost tracking, intelligent model routing, and advanced AI development features.*