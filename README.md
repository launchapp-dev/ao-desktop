# Animus Den

The native desktop app for [Animus](https://animus.dev) — the VS Code of autonomous agents.

Den connects to a local (or remote) Animus daemon and surfaces everything it can do: agent conversations, workflow execution, task management, live logs, and configuration. If the daemon can do it, Den surfaces it.

> **Status: Bootstrap** — Tauri v2 + React 19 scaffold is live. MCP server config UI shipped. Core daemon views are next.

---

## Architecture

```
┌─────────────────────────────────────────┐
│  Animus Den (Tauri v2)                  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │  React 19 + TypeScript            │  │
│  │  (same design system as Cloud)    │  │
│  └──────────────┬────────────────────┘  │
│                 │ Tauri IPC             │
│  ┌──────────────▼────────────────────┐  │
│  │  Rust backend (thin glue only)    │  │
│  │  process exec · persistence · IPC │  │
│  └──────────────┬────────────────────┘  │
└─────────────────┼────────────────────────┘
                  │ HTTP + WebSocket
           ┌──────▼──────┐
           │ Animus      │
           │ daemon      │
           └─────────────┘
```

**Frontend:** React 19 + TypeScript + Vite. UI state, routing, all views.

**Backend (Rust):** Thin Tauri v2 shell — process execution, local persistence, IPC only. Does not duplicate daemon, queue, or workflow logic.

**Daemon bridge:** Connects via the daemon's local HTTP API + WebSocket for streaming. Can target remote daemons via cloud API or SSH tunnel.

---

## Features (Ship Order)

| Layer | Feature | Status |
|---|---|---|
| 1 | Tauri v2 + React 19 scaffold | Done |
| 1 | MCP server config UI (stdio + HTTP) | Done |
| 1 | Daemon connection + status (start/stop/health) | Backlog |
| 2 | Live log stream + error dashboard | Backlog |
| 3 | Task board (kanban) + requirements view | Backlog |
| 4 | Agent conversations (live chat + tool calls) | Backlog |
| 5 | Workflow DAG editor (ReactFlow) + live execution | Backlog |
| 6 | Configuration editor (YAML + validation) | Backlog |
| 7 | File browser + memory browser | Backlog |
| 8 | Remote daemon support | Backlog |
| 9 | macOS packaging + auto-update | Backlog |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Desktop shell | Tauri v2 |
| Frontend | React 19, TypeScript 5.8 |
| Bundler | Vite 7 |
| Backend | Rust (Tauri plugins only) |
| Package manager | pnpm |
| Workflow graphing | ReactFlow (planned) |

---

## Local Development

```bash
pnpm install
pnpm tauri dev
```

Build only the frontend:

```bash
pnpm build
```

---

## Product Scope

**Den does:**
- Give developers a visual interface for watching agents think and act in real time
- Surface all daemon capabilities: task board, workflow execution, agent conversations, logs
- Connect to the daemon's HTTP API + WebSocket — no duplicate runtime logic
- Work offline-first; sync when connected
- Target macOS first, then Linux and Windows

**Den does not:**
- Reimplement AO daemon, queue, or workflow execution
- Absorb fleet control-plane concerns (that belongs in Animus Pack / `ao-fleet`)
- Fork or vendor the Animus runtime

---

## Automated Development

This repo is built by Animus itself.

```bash
# Check the backlog
animus requirements list --project-root .
animus task list --project-root .

# Queue a task
animus queue enqueue --project-root . \
  --title "implement daemon status view" \
  --workflow-ref standard
```

Workflow definitions are repo-local in `.ao/workflows/`. Agents use the configured MCP stack: `context7` for library docs, `package-version` for dependency checks, `filesystem` for repo-scoped access, and `playwright` for UI verification.

---

## Part of the Animus Family

| Product | Name | What It Is |
|---|---|---|
| Core CLI | **Animus** | The CLI and daemon |
| Cloud | **Animus Cloud** | Managed execution + dashboards |
| Fleet | **Animus Pack** | Multi-repo orchestration |
| Desktop | **Animus Den** | This repo — native GUI |
| Web dashboard | **Animus Eye** | Browser-based overview |
| Scaffolder | **Animus Summon** | `animus summon` to start a project |
| Memory MCP | **Animus Recall** | Persistent agent memory |
