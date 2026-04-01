import { useState } from "react";
import type { McpServerConfig } from "../types/mcp";
import { McpServerForm } from "./McpServerForm";
import "./McpServerList.css";

const TRANSPORT_BADGE: Record<string, string> = {
  stdio: "stdio",
  http: "HTTP",
};

export function McpServerList() {
  const [servers, setServers] = useState<McpServerConfig[]>([]);
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  function handleSave(config: McpServerConfig) {
    setServers((prev) => {
      const idx = prev.findIndex((s) => s.id === config.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = config;
        return next;
      }
      return [...prev, config];
    });
    setAdding(false);
    setEditingId(null);
  }

  function handleRemove(id: string) {
    setServers((prev) => prev.filter((s) => s.id !== id));
  }

  return (
    <section className="mcp-list" aria-label="MCP server connections">
      <header className="mcp-list__header">
        <div>
          <h2 className="mcp-list__heading">MCP Servers</h2>
          <p className="mcp-list__sub">
            Configure Model Context Protocol server connections used by AO agents.
          </p>
        </div>
        {!adding && !editingId && (
          <button
            className="mcp-list__add-btn"
            onClick={() => setAdding(true)}
            aria-label="Add MCP server"
          >
            + Add server
          </button>
        )}
      </header>

      {servers.length === 0 && !adding && (
        <div className="mcp-list__empty">
          <p>No MCP servers configured.</p>
          <button
            className="mcp-list__add-btn mcp-list__add-btn--inline"
            onClick={() => setAdding(true)}
          >
            + Add your first server
          </button>
        </div>
      )}

      {servers.length > 0 && (
        <ul className="mcp-list__items">
          {servers.map((server) =>
            editingId === server.id ? (
              <li key={server.id} className="mcp-list__item mcp-list__item--editing">
                <McpServerForm
                  initial={server}
                  onSave={handleSave}
                  onCancel={() => setEditingId(null)}
                />
              </li>
            ) : (
              <li key={server.id} className="mcp-list__item">
                <div className="mcp-list__item-info">
                  <span className="mcp-list__item-name">{server.name}</span>
                  <span className={`mcp-list__badge mcp-list__badge--${server.transport}`}>
                    {TRANSPORT_BADGE[server.transport]}
                  </span>
                </div>
                <div className="mcp-list__item-detail">
                  {server.transport === "stdio" && (
                    <code className="mcp-list__item-code">{server.command}</code>
                  )}
                  {server.transport === "http" && (
                    <code className="mcp-list__item-code">{server.url}</code>
                  )}
                </div>
                <div className="mcp-list__item-actions">
                  <button
                    className="mcp-list__action-btn"
                    onClick={() => setEditingId(server.id)}
                    aria-label={`Edit ${server.name}`}
                  >
                    Edit
                  </button>
                  <button
                    className="mcp-list__action-btn mcp-list__action-btn--danger"
                    onClick={() => handleRemove(server.id)}
                    aria-label={`Remove ${server.name}`}
                  >
                    Remove
                  </button>
                </div>
              </li>
            )
          )}
        </ul>
      )}

      {adding && (
        <div className="mcp-list__form-wrap">
          <McpServerForm onSave={handleSave} onCancel={() => setAdding(false)} />
        </div>
      )}
    </section>
  );
}
