# AI Assistant Integration Skill

This skill provides specific guidance for integrating the vibeOSmcp MCP server with various AI assistants including Claude Code, Codex, and others.

## Claude Code Integration

### Setup
1. Ensure the vibeOSmcp MCP server is running and accessible
2. Configure Claude Code to connect to the MCP server endpoint
3. Verify connection by checking available tools

### Usage Patterns
- Use `/mcp` prefix or appropriate Claude Code MCP invocation syntax
- Common workflow: `trinity status` → assess task → `trinity set` appropriate tier → execute task
- Leverage flow enforcer for complex multi-step tasks

### Claude-Specific Tips
- Utilize Claude's tool use capabilities effectively with trinity commands
- Combine with Claude's thinking mode for complex orchestration tasks
- Use MCP context to maintain vibeOS state across conversations

## Codex Integration

### Setup
1. Configure Codex to recognize vibeOSmcp as an available MCP server
2. Test basic connectivity with simple trinity commands
3. Ensure proper authentication token handling

### Usage Patterns
- Use Codex's natural language capabilities to invoke MCP tools
- Example: "Check the current model tier settings" → invokes `trinity status`
- Use Codex's code generation abilities alongside vibeOS model routing

### Codex-Specific Tips
- Leverage Codex's strength in code generation while using vibeOS for orchestration
- Use tier switching to optimize: cheap for boilerplate, medium for standard code, brain for complex algorithms
- Combine with Codex's debugging capabilities

## General AI Assistant Best Practices

### Tool Discovery
- Always start by discovering available MCP tools
- Document which tools are most effective for different task types
- Create assistant-specific shortcuts or macros for frequent operations

### State Management
- Use `trinity guard` to ensure AGENTS.md and README.md are present
- Regularly check `trinity project` for optimization suggestions
- Monitor learned patterns with `trinity patterns`

### Error Handling
- If MCP tools fail, verify server connectivity
- Check authentication with `trinity api-token` if needed
- Rebuild model assignments with `trinity rebuild` if behavior seems off

### Performance Optimization
- Start tasks in appropriate tier to avoid unnecessary costs
- Use flow enforcer to break down complex tasks
- Leverage delegation enforcement to maintain proper agent boundaries

## Assistant-Specific Skill Creation

### For Claude Code
Consider creating Claude-specific MCP skills that:
- Wrap common vibeOS workflows in single invocations
- Provide Claude-optimized prompts for tier selection
- Integrate with Claude's project knowledge features

### For Codex
Consider Codex-specific approaches that:
- Leverage Codex's strength in translating natural language to code
- Use MCP tools to enhance Codex's contextual understanding
- Create Codex-friendly aliases for frequent trinity operations

## Testing and Validation
- Validate MCP tool responses before relying on them for decisions
- Test tier switching with sample prompts of varying complexity
- Verify cost estimates match actual usage
- Ensure related projects (vibeOScore, theSaver-oc) are accessible when needed

## Maintenance
- Keep MCP server updated for latest vibeOS features
- Periodically review and optimize skill usage based on actual performance
- Share effective patterns with the vibeOS ecosystem community

---
*Skill designed to enhance integration between vibeOSmcp and AI assistants like Claude Code, Codex, and others*