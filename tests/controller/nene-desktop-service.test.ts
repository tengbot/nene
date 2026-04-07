import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import type { ControllerEnv } from "#controller/app/env";
import { NeneDesktopService } from "#controller/services/nene-desktop-service.js";
import { NeneWebClient } from "#controller/services/nene-web-client.js";
import { NexuConfigStore } from "#controller/store/nexu-config-store.js";

describe("NeneDesktopService", () => {
  let rootDir = "";
  let env: ControllerEnv;

  beforeEach(async () => {
    rootDir = await mkdtemp(path.join(tmpdir(), "nene-controller-"));
    env = {
      nodeEnv: "test",
      port: 3010,
      host: "127.0.0.1",
      webUrl: "http://localhost:5173",
      nexuHomeDir: path.join(rootDir, ".nexu"),
      nexuConfigPath: path.join(rootDir, ".nexu", "config.json"),
      artifactsIndexPath: path.join(
        rootDir,
        ".nexu",
        "artifacts",
        "index.json",
      ),
      compiledOpenclawSnapshotPath: path.join(
        rootDir,
        ".nexu",
        "compiled-openclaw.json",
      ),
      openclawStateDir: path.join(rootDir, ".openclaw"),
      openclawConfigPath: path.join(rootDir, ".openclaw", "openclaw.json"),
      openclawSkillsDir: path.join(rootDir, ".openclaw", "skills"),
      userSkillsDir: path.join(rootDir, ".agents", "skills"),
      openclawBuiltinExtensionsDir: null,
      openclawExtensionsDir: path.join(rootDir, ".openclaw", "extensions"),
      bundledRuntimePluginsDir: path.join(rootDir, "bundled-runtime-plugins"),
      runtimePluginTemplatesDir: path.join(rootDir, "runtime-plugins"),
      openclawRuntimeModelStatePath: path.join(
        rootDir,
        ".openclaw",
        "nexu-runtime-model.json",
      ),
      skillhubCacheDir: path.join(rootDir, ".nexu", "skillhub-cache"),
      skillDbPath: path.join(rootDir, ".nexu", "skill-ledger.json"),
      analyticsStatePath: path.join(rootDir, ".nexu", "analytics-state.json"),
      staticSkillsDir: undefined,
      platformTemplatesDir: undefined,
      openclawWorkspaceTemplatesDir: path.join(
        rootDir,
        ".openclaw",
        "workspace-templates",
      ),
      openclawOwnershipMode: "external",
      openclawBaseUrl: "http://127.0.0.1:18789",
      openclawBin: "openclaw",
      litellmBaseUrl: null,
      litellmApiKey: null,
      openclawGatewayPort: 18789,
      openclawGatewayToken: undefined,
      manageOpenclawProcess: false,
      gatewayProbeEnabled: false,
      runtimeSyncIntervalMs: 2000,
      runtimeHealthIntervalMs: 5000,
      defaultModelId: "anthropic/claude-sonnet-4",
      openclawLaunchdLabel: null,
      posthogApiKey: undefined,
      posthogHost: undefined,
      neneWebBaseUrl: "https://nene.im",
      neneDesktopAppId: "nene-desktop-open-source",
      neneUpdateChannel: "beta",
    };
  });

  afterEach(async () => {
    await rm(rootDir, { recursive: true, force: true });
  });

  it("surfaces a minimal Nene Account Mode status while preserving local storage defaults", async () => {
    const store = new NexuConfigStore(env);
    const client = new NeneWebClient({
      baseUrl: env.neneWebBaseUrl,
      desktopAppId: env.neneDesktopAppId,
      updateChannel: env.neneUpdateChannel,
    });
    const service = new NeneDesktopService(store, client);

    const status = await service.getStatus();
    const config = await store.getConfig();

    expect(status).toMatchObject({
      configured: true,
      mode: "nene-account",
      connectionStatus: "configured",
      webBaseUrl: "https://nene.im",
      desktopAppId: "nene-desktop-open-source",
      updateChannel: "beta",
      activeProfileName: "Default",
      cloudConnected: false,
      entitlements: [],
      lastError: null,
    });
    expect(
      (
        config.desktop as {
          nene?: { connectionStatus?: string; entitlements?: unknown[] };
        }
      ).nene,
    ).toMatchObject({
      connectionStatus: "disconnected",
      entitlements: [],
    });
  });
});
