import type { NeneDesktopStatusResponse } from "@nexu/shared";
import type { NexuConfigStore } from "../store/nexu-config-store.js";
import type { NeneWebClient } from "./nene-web-client.js";

export class NeneDesktopService {
  constructor(
    private readonly configStore: NexuConfigStore,
    private readonly webClient: NeneWebClient,
  ) {}

  async getStatus(): Promise<NeneDesktopStatusResponse> {
    const persisted = await this.configStore.getPersistedNeneDesktopState();
    const cloudStatus = await this.configStore.getDesktopCloudStatus();
    const clientConfig = this.webClient.getConfig();
    const configured = this.webClient.isConfigured();

    const connectionStatus = !configured
      ? "disconnected"
      : persisted.connectionStatus === "error"
        ? "error"
        : cloudStatus.connected
          ? "connected"
          : "configured";

    return {
      ...persisted,
      configured,
      mode: configured ? "nene-account" : "local",
      connectionStatus,
      webBaseUrl: clientConfig.baseUrl,
      desktopAppId: clientConfig.desktopAppId,
      updateChannel: clientConfig.updateChannel,
      activeProfileName: cloudStatus.activeProfileName,
      cloudConnected: cloudStatus.connected,
    };
  }
}
