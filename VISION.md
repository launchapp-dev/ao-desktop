# Animus Den — Desktop App Vision

> The native desktop wrapper for everything a single Animus instance exposes.
> If the daemon can do it, Den surfaces it.

## Core Concept

Den connects to a local (or remote) Animus daemon and gives users a rich GUI for every
capability — agent conversations, task management, workflow execution, live logs, and
configuration. It's the VS Code of autonomous agents.

## Product Promise

Given a local repository that already uses Animus, a user should be able to:

1. Open Den
2. Point it at the repo (or auto-detect from current directory)
3. See whether the daemon is healthy
4. Start, pause, resume, and inspect the daemon
5. Have live conversations with agents
6. Watch workflows execute visually
7. Manage tasks, requirements, and errors without a terminal

## Design Principles

- **Thin over Animus:** Prefer daemon HTTP API and WebSocket over duplicate logic
- **Desktop-native:** Remember project context, feel fast, handle local process state
- **Operational clarity:** Show state first, actions second, logs third
- **Safe by default:** Destructive actions are explicit and reviewable
- **Full coverage:** Everything the daemon exposes, Den surfaces

## Features

### 1. Agent Conversations
Live, interactive chat with any configured agent. See what the agent is thinking, what
tools it's calling, what files it's reading/writing. Users can intervene mid-execution:
approve, reject, redirect, or take over. Conversation history is persistent and searchable.
Multiple agent conversations in tabs.

### 2. Workflow Execution
Visual DAG editor (ReactFlow) for building and editing workflows. Run workflows manually
or watch scheduled/triggered ones execute. Live phase-by-phase progress with decision
outcomes, timing, and agent output. Drill into any phase to see the full agent conversation
that produced it.

### 3. Task Board
Kanban view of all tasks (backlog → in-progress → done). Create, edit, prioritize, assign
to workflows. See which agent is working on what. Link tasks to requirements. Filter by
status, priority, type, requirement.

### 4. Requirements
List and manage requirements. See which tasks fulfill each requirement. Track completion
status. Create requirements that auto-generate tasks.

### 5. Daemon Control
Start/stop/restart the daemon. View daemon status, uptime, config. See which workflows
are scheduled, what's in the queue, what's currently executing. Resource usage (memory,
CPU, model API costs).

### 6. Live Logs
Stream daemon logs in real time. Filter by category (task, workflow, phase, agent, error).
Search logs. Click any log entry to jump to the relevant task, workflow, or agent
conversation.

### 7. Configuration Editor
Edit `.ao/` workflow YAML with syntax highlighting, validation, and autocomplete. Preview
what a workflow will do before running it. Agent, phase, workflow, schedule, trigger
configuration — all in one place.

### 8. File Browser
See what files agents are reading and writing. Diff view for changes agents make. Approve
or reject file changes before they're committed.

### 9. Error Dashboard
All errors in one place. Click to see the full context (which agent, which phase, which
task). One-click retry or rework.

### 10. Memory Browser
View and manage agent memory. See what the daemon remembers across sessions. Edit, delete,
or add memory entries.

## Architecture

- **Tauri** (Rust backend + web frontend) — native performance, small binary, cross-platform
- **React 19** frontend with `@launchapp/design-system` (same as Animus Cloud)
- Connects to the Animus daemon via its local HTTP API + WebSocket for streaming
- Can connect to remote daemons (cloud or other machines) via SSH tunnel or cloud API
- Offline-first: works without internet, syncs when connected

## Why Den Matters

- The CLI is powerful but not visual — you can't see a DAG in a terminal
- The web dashboard (Eye) is for cloud/team overview — Den is for hands-on agent work
- Developers want to SEE their agents working, not just read logs
- Agent conversations are the killer feature — watching an agent think and act in real time
- Den turns Animus from a CLI tool into a full desktop application

## Ship in Layers

1. **Daemon connection + status** — connect to daemon, show health, start/stop
2. **Live logs + error dashboard** — stream logs, surface errors
3. **Task board + requirements** — kanban, CRUD, filters
4. **Agent conversations** — live chat, tool calls, file changes
5. **Workflow DAG editor** — ReactFlow visual editor, live execution view
6. **Configuration editor** — YAML editing with validation
7. **File browser + memory browser** — complete coverage
8. **Remote daemon support** — connect to cloud or other machines
9. **Packaging + auto-update** — DMG/MSI/AppImage, Tauri updater
