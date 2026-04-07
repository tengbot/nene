import { afterEach, describe, expect, it, vi } from "vitest";
import { proxyFetch } from "#controller/lib/proxy-fetch.js";
import { NeneWebClient } from "#controller/services/nene-web-client.js";

vi.mock("#controller/lib/proxy-fetch.js", () => ({
  proxyFetch: vi.fn(),
}));

describe("NeneWebClient", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("gracefully reports an unconfigured client", async () => {
    const client = new NeneWebClient({
      baseUrl: null,
      desktopAppId: null,
      updateChannel: null,
    });

    await expect(
      client.registerDevice({
        deviceId: "device-1",
        deviceSecretHash: "secret-hash",
      }),
    ).resolves.toEqual({
      ok: false,
      reason: "not-configured",
      error: "Nene web integration is not configured.",
    });
  });

  it("posts device registration to the public nene-web endpoint", async () => {
    const proxyFetchMock = vi.mocked(proxyFetch);
    proxyFetchMock.mockResolvedValue(
      new Response(
        JSON.stringify({
          ok: true,
          deviceId: "device-1",
          authorizeUrl: "https://nene.im/auth/desktop/device-1",
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      ),
    );

    const client = new NeneWebClient({
      baseUrl: "https://nene.im",
      desktopAppId: "nene-desktop-open-source",
      updateChannel: "beta",
    });

    const result = await client.registerDevice({
      deviceId: "device-1",
      deviceSecretHash: "secret-hash",
    });

    expect(proxyFetchMock).toHaveBeenCalledWith(
      "https://nene.im/api/desktop/devices/register",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
          "X-Nene-Desktop-App-Id": "nene-desktop-open-source",
        }),
        body: JSON.stringify({
          deviceId: "device-1",
          deviceSecretHash: "secret-hash",
        }),
      }),
    );
    expect(result).toEqual({
      ok: true,
      data: {
        ok: true,
        deviceId: "device-1",
        authorizeUrl: "https://nene.im/auth/desktop/device-1",
      },
    });
  });
});
