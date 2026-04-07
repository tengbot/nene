import {
  type NeneDeviceRegisterRequest,
  type NeneDeviceRegisterResponse,
  type NeneEntitlementsResponse,
  type NeneHeartbeatRequest,
  type NeneHeartbeatResponse,
  type NeneLatestReleaseResponse,
  neneDeviceRegisterResponseSchema,
  neneEntitlementsResponseSchema,
  neneHeartbeatResponseSchema,
  neneLatestReleaseResponseSchema,
} from "@nexu/shared";
import type { z } from "zod";
import { proxyFetch } from "../lib/proxy-fetch.js";

type NeneWebClientConfig = {
  baseUrl: string | null;
  desktopAppId: string | null;
  updateChannel: string | null;
};

type NeneWebClientErrorReason =
  | "not-configured"
  | "request-failed"
  | "http-error"
  | "invalid-response";

type NeneWebClientSuccess<T> = {
  ok: true;
  data: T;
};

type NeneWebClientFailure = {
  ok: false;
  reason: NeneWebClientErrorReason;
  error: string;
  statusCode?: number;
};

export type NeneWebClientResult<T> =
  | NeneWebClientSuccess<T>
  | NeneWebClientFailure;

function describeError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}

export class NeneWebClient {
  constructor(private readonly config: NeneWebClientConfig) {}

  isConfigured(): boolean {
    return Boolean(this.config.baseUrl && this.config.desktopAppId);
  }

  getConfig(): NeneWebClientConfig {
    return this.config;
  }

  async registerDevice(
    input: NeneDeviceRegisterRequest,
  ): Promise<NeneWebClientResult<NeneDeviceRegisterResponse>> {
    return this.request(
      "/api/desktop/devices/register",
      neneDeviceRegisterResponseSchema,
      {
        method: "POST",
        body: JSON.stringify(input),
      },
    );
  }

  async fetchEntitlements(): Promise<
    NeneWebClientResult<NeneEntitlementsResponse>
  > {
    return this.request(
      "/api/desktop/entitlements",
      neneEntitlementsResponseSchema,
      {
        method: "GET",
      },
    );
  }

  async fetchLatestRelease(): Promise<
    NeneWebClientResult<NeneLatestReleaseResponse>
  > {
    const url = new URL(
      "/api/desktop/releases/latest",
      this.config.baseUrl ?? "https://localhost.invalid",
    );

    if (this.config.updateChannel) {
      url.searchParams.set("channel", this.config.updateChannel);
    }

    return this.request(
      url.toString(),
      neneLatestReleaseResponseSchema,
      {
        method: "GET",
      },
      true,
    );
  }

  async sendHeartbeat(
    input: NeneHeartbeatRequest,
  ): Promise<NeneWebClientResult<NeneHeartbeatResponse>> {
    return this.request("/api/desktop/heartbeat", neneHeartbeatResponseSchema, {
      method: "POST",
      body: JSON.stringify(input),
    });
  }

  private buildHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (this.config.desktopAppId) {
      headers["X-Nene-Desktop-App-Id"] = this.config.desktopAppId;
    }

    if (this.config.updateChannel) {
      headers["X-Nene-Update-Channel"] = this.config.updateChannel;
    }

    return headers;
  }

  private async request<TSchema extends z.ZodTypeAny>(
    pathOrUrl: string,
    schema: TSchema,
    init: RequestInit,
    isAbsoluteUrl = false,
  ): Promise<NeneWebClientResult<z.output<TSchema>>> {
    if (
      !this.isConfigured() ||
      !this.config.baseUrl ||
      !this.config.desktopAppId
    ) {
      return {
        ok: false,
        reason: "not-configured",
        error: "Nene web integration is not configured.",
      };
    }

    const url = isAbsoluteUrl
      ? pathOrUrl
      : new URL(pathOrUrl, this.config.baseUrl).toString();

    let response: Response;
    try {
      response = await proxyFetch(url, {
        ...init,
        headers: {
          ...this.buildHeaders(),
          ...(init.headers as Record<string, string> | undefined),
        },
        timeoutMs: 10_000,
      });
    } catch (error) {
      return {
        ok: false,
        reason: "request-failed",
        error: describeError(error),
      };
    }

    if (!response.ok) {
      return {
        ok: false,
        reason: "http-error",
        error:
          (await response.text()) || `Request failed with ${response.status}`,
        statusCode: response.status,
      };
    }

    let payload: unknown;
    try {
      payload = await response.json();
    } catch (error) {
      return {
        ok: false,
        reason: "invalid-response",
        error: describeError(error),
      };
    }

    const parsed = schema.safeParse(payload);
    if (!parsed.success) {
      return {
        ok: false,
        reason: "invalid-response",
        error: parsed.error.message,
      };
    }

    return {
      ok: true,
      data: parsed.data,
    };
  }
}
