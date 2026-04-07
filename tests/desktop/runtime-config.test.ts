import { describe, expect, it } from "vitest";
import { getDesktopRuntimeConfig } from "../../apps/desktop/shared/runtime-config";

describe("desktop runtime config", () => {
  it("defaults updates to the stable channel", () => {
    const config = getDesktopRuntimeConfig({}, { useBuildConfig: false });

    expect(config.updates.channel).toBe("stable");
  });

  it("accepts nightly as a packaged update channel", () => {
    const config = getDesktopRuntimeConfig(
      {
        NEXU_DESKTOP_UPDATE_CHANNEL: "nightly",
      },
      { useBuildConfig: false },
    );

    expect(config.updates.channel).toBe("nightly");
  });

  it("accepts NENE_UPDATE_CHANNEL as a public alias", () => {
    const config = getDesktopRuntimeConfig(
      {
        NENE_UPDATE_CHANNEL: "beta",
      },
      { useBuildConfig: false },
    );

    expect(config.updates.channel).toBe("beta");
  });

  it("reads NENE_HOME when NEXU_HOME is unset", () => {
    const config = getDesktopRuntimeConfig(
      {
        NENE_HOME: "~/.nene",
      },
      { useBuildConfig: false },
    );

    expect(config.paths.nexuHome).toBe("~/.nene");
  });

  it("prefers NEXU_HOME over NENE_HOME for compatibility", () => {
    const config = getDesktopRuntimeConfig(
      {
        NEXU_HOME: "~/.nexu-custom",
        NENE_HOME: "~/.nene",
      },
      { useBuildConfig: false },
    );

    expect(config.paths.nexuHome).toBe("~/.nexu-custom");
  });

  it("reads PostHog env overrides", () => {
    const config = getDesktopRuntimeConfig(
      {
        POSTHOG_API_KEY: "phc_test_key",
        POSTHOG_HOST: "https://us.i.posthog.com",
      },
      { useBuildConfig: false },
    );

    expect(config.posthogApiKey).toBe("phc_test_key");
    expect(config.posthogHost).toBe("https://us.i.posthog.com");
  });
});
