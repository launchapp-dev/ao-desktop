import "./App.css";
import { McpServerList } from "./components/McpServerList";

function App() {
  return (
    <main className="bootstrap-shell">
      <section className="hero">
        <p className="eyebrow">LaunchApp Dev</p>
        <h1>AO Desktop</h1>
        <p className="lede">
          This repository is intentionally in bootstrap mode. Its job right now
          is to give AO a clean Tauri workspace, a product brief, and an
          executable backlog so Codex can build the desktop app from here.
        </p>
      </section>

      <section className="panel-grid">
        <article className="panel">
          <h2>North Star</h2>
          <p>
            Wrap the existing <code>ao</code> CLI as a desktop product without
            reimplementing AO internals.
          </p>
        </article>

        <article className="panel">
          <h2>Reference Repos</h2>
          <ul>
            <li>
              <code>brain/repos/ao-dashboard</code> for the Tauri client shape
            </li>
            <li>
              <code>brain/repos/ao-fleet</code> for the control-plane boundary
            </li>
            <li>
              <code>brain/repos/agent-orchestrator</code> for the legacy desktop
              attempt
            </li>
          </ul>
        </article>

        <article className="panel">
          <h2>Use AO Next</h2>
          <ul>
            <li>
              <code>ao requirements list</code>
            </li>
            <li>
              <code>ao task list</code>
            </li>
            <li>
              <code>ao workflow run --task-id TASK-001 --workflow-ref standard-workflow</code>
            </li>
          </ul>
        </article>
      </section>

      <section className="settings-section">
        <McpServerList />
      </section>
    </main>
  );
}

export default App;
