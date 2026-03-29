# AO Desktop

Desktop wrapper for the AO CLI.

## Mission

Build a desktop app that exposes AO as a product without rebuilding AO itself.

The repository should stay opinionated about one key boundary:

- AO Desktop is a client and operator shell over `ao`
- AO CLI remains the execution kernel
- `ao-fleet` remains the multi-project control plane

## What To Build

Target capabilities for the product:

1. Project selection and recent-project memory
2. AO binary detection and configuration
3. Status overview for daemon, tasks, workflows, and runner health
4. Command studio for common AO flows and raw command execution
5. Live output/log surfaces where the CLI already exposes structured streams
6. Packaging and distribution for macOS first, then Linux and Windows

## What Not To Build

- Do not port AO daemon logic into this repo
- Do not copy AO queue, workflow, or task internals into the Tauri backend
- Do not turn this repo into `ao-fleet`
- Do not start from the legacy `agent-orchestrator` codebase by default

## Preferred Technical Direction

- Tauri 2
- React + TypeScript frontend
- Rust backend only for desktop glue, process execution, persistence, and IPC
- Spawn `ao` commands and parse the CLI's JSON envelope when possible
- Keep the backend thin and repository-safe

## Reference Repos

Read these before making large decisions:

- `/Users/samishukri/brain/repos/ao-dashboard`
- `/Users/samishukri/brain/repos/ao-fleet`
- `/Users/samishukri/brain/repos/agent-orchestrator`
- `/Users/samishukri/brain/repos/ao-starter`

## AO Guidance

- Use Codex-backed agents by default in this repo
- Use the configured MCP stack instead of guessing:
  `context7` for current library docs, `package-version` for dependency checks,
  `filesystem` for repo-scoped file access, and `playwright` for UI verification
- Prefer requirements and task decomposition before large implementation bursts
- Keep tasks small enough to land clean PRs
- Keep workflow definitions repo-local; do not assume bundled packs exist
- Validate workflow config after any `.ao` changes
