# AO Desktop

AO Desktop is the desktop product layer for the [AO CLI](https://github.com/launchapp-dev/ao).

This repository is intentionally set up as an AO-first build target:

- a minimal Tauri 2 + React workspace
- a clear product brief and implementation boundaries
- local `.ao` workflow config that defaults to Codex-backed agents
- seeded requirements and tasks so AO can build the product from inside this repo

## Product Position

AO Desktop should:

- wrap the existing `ao` CLI instead of reimplementing AO internals
- feel like a focused operator console for one AO project at a time
- surface project selection, daemon status, queue/task/workflow state, and command execution
- reuse the AO control surface by spawning `ao` CLI commands and consuming AO MCP when useful

AO Desktop should not:

- fork or vendor the AO runtime
- duplicate AO daemon, queue, or workflow execution logic
- absorb the fleet control-plane concerns that belong in `ao-fleet`

## Reference Repos

Use the sibling repos under `brain/repos` as the main references:

- `ao-dashboard` for Tauri desktop-client patterns around AO
- `ao-fleet` for the control-plane boundary and "orchestrate AO, do not absorb it"
- `agent-orchestrator` for the legacy desktop attempt and what not to rebuild wholesale
- `ao-starter` for AO bootstrap patterns

## Local Development

```bash
pnpm install
pnpm tauri dev
```

## AO Workflow

This repo is meant to be worked by AO itself.

Typical loop:

```bash
ao requirements list --project-root .
ao task list --project-root .
ao workflow run --project-root . --task-id TASK-001 --workflow-ref standard-workflow
```
