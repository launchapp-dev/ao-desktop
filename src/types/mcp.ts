export type McpTransport = "stdio" | "http";

export interface McpServerConfig {
  id: string;
  name: string;
  transport: McpTransport;
  /** Path to executable — only used when transport is "stdio" */
  command?: string;
  /** HTTP/SSE endpoint URL — only used when transport is "http" */
  url?: string;
  /** Optional bearer token for HTTP transport */
  token?: string;
  /** Extra environment variables passed to stdio processes */
  env?: Record<string, string>;
}
