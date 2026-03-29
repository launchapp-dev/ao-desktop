# AO Desktop Vision

AO Desktop should be the best native way to operate a single AO project from a founder laptop.

## Core Idea

Take the existing AO CLI and make it feel like a product:

- discoverable
- persistent
- observable
- safe to operate

without rewriting the AO runtime.

## Product Promise

Given a local repository that already uses AO, a user should be able to:

1. Open the desktop app
2. Point it at the repo
3. See whether AO is healthy
4. Start, pause, resume, and inspect the daemon
5. Run or enqueue work without living in a terminal
6. Understand what AO is doing through structured status and output views

## Design Principles

- Thin over AO: prefer CLI commands and existing MCP surfaces over duplicate logic
- Desktop-native: remember project context, feel fast, handle local process state well
- Operational clarity: show state first, actions second, logs third
- Safe by default: destructive actions should be explicit and reviewable
- Ship in layers: bootstrap, status shell, command studio, live monitoring, packaging

## First Release Scope

- macOS desktop app
- single-project focus
- AO binary path detection + override
- project root selection
- status dashboard from `ao --json` commands
- daemon controls
- command studio with presets
- persistent local settings

## Later Scope

- multi-project switching
- streaming views for daemon and workflow output
- richer workflow graphing
- packaged updates
- fleet integrations through `ao-fleet`
