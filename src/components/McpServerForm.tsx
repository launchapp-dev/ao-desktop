import { useState } from "react";
import type { McpServerConfig, McpTransport } from "../types/mcp";
import "./McpServerForm.css";

interface McpServerFormProps {
  initial?: Partial<McpServerConfig>;
  onSave: (config: McpServerConfig) => void;
  onCancel?: () => void;
}

function generateId() {
  return `mcp-${Date.now().toString(36)}`;
}

export function McpServerForm({ initial, onSave, onCancel }: McpServerFormProps) {
  const [name, setName] = useState(initial?.name ?? "");
  const [transport, setTransport] = useState<McpTransport>(initial?.transport ?? "stdio");
  const [command, setCommand] = useState(initial?.command ?? "");
  const [url, setUrl] = useState(initial?.url ?? "");
  const [token, setToken] = useState(initial?.token ?? "");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Name is required.";
    if (transport === "stdio" && !command.trim()) {
      next.command = "Command path is required for stdio transport.";
    }
    if (transport === "http") {
      if (!url.trim()) {
        next.url = "URL is required for HTTP transport.";
      } else {
        try {
          new URL(url.trim());
        } catch {
          next.url = "Enter a valid URL (e.g. http://localhost:3000/sse).";
        }
      }
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    onSave({
      id: initial?.id ?? generateId(),
      name: name.trim(),
      transport,
      command: transport === "stdio" ? command.trim() : undefined,
      url: transport === "http" ? url.trim() : undefined,
      token: transport === "http" && token.trim() ? token.trim() : undefined,
    });
  }

  return (
    <form className="mcp-form" onSubmit={handleSubmit} noValidate>
      <h3 className="mcp-form__title">
        {initial?.id ? "Edit MCP Server" : "Add MCP Server"}
      </h3>

      {/* Name */}
      <div className="mcp-form__field">
        <label className="mcp-form__label" htmlFor="mcp-name">
          Name
        </label>
        <input
          id="mcp-name"
          className={`mcp-form__input${errors.name ? " mcp-form__input--error" : ""}`}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. filesystem"
          autoComplete="off"
        />
        {errors.name && <p className="mcp-form__error">{errors.name}</p>}
      </div>

      {/* Transport selector */}
      <div className="mcp-form__field">
        <label className="mcp-form__label">Transport</label>
        <div className="mcp-form__transport-group" role="group" aria-label="Transport type">
          {(["stdio", "http"] as McpTransport[]).map((t) => (
            <label
              key={t}
              className={`mcp-form__transport-option${transport === t ? " mcp-form__transport-option--active" : ""}`}
            >
              <input
                type="radio"
                name="transport"
                value={t}
                checked={transport === t}
                onChange={() => setTransport(t)}
                className="mcp-form__radio"
              />
              <span className="mcp-form__transport-label">
                {t === "stdio" ? "stdio (local process)" : "HTTP / SSE (remote)"}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* stdio fields */}
      {transport === "stdio" && (
        <div className="mcp-form__field">
          <label className="mcp-form__label" htmlFor="mcp-command">
            Command
          </label>
          <input
            id="mcp-command"
            className={`mcp-form__input mcp-form__input--mono${errors.command ? " mcp-form__input--error" : ""}`}
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder="e.g. npx @modelcontextprotocol/server-filesystem /path"
            autoComplete="off"
            spellCheck={false}
          />
          {errors.command && <p className="mcp-form__error">{errors.command}</p>}
        </div>
      )}

      {/* HTTP fields */}
      {transport === "http" && (
        <>
          <div className="mcp-form__field">
            <label className="mcp-form__label" htmlFor="mcp-url">
              URL
            </label>
            <input
              id="mcp-url"
              className={`mcp-form__input mcp-form__input--mono${errors.url ? " mcp-form__input--error" : ""}`}
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://my-mcp-server.example.com/sse"
              autoComplete="off"
              spellCheck={false}
            />
            {errors.url && <p className="mcp-form__error">{errors.url}</p>}
          </div>

          <div className="mcp-form__field">
            <label className="mcp-form__label" htmlFor="mcp-token">
              Bearer Token
              <span className="mcp-form__optional"> (optional)</span>
            </label>
            <input
              id="mcp-token"
              className="mcp-form__input mcp-form__input--mono"
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="sk-…"
              autoComplete="new-password"
            />
          </div>
        </>
      )}

      <div className="mcp-form__actions">
        {onCancel && (
          <button
            type="button"
            className="mcp-form__btn mcp-form__btn--ghost"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
        <button type="submit" className="mcp-form__btn mcp-form__btn--primary">
          Save Server
        </button>
      </div>
    </form>
  );
}
