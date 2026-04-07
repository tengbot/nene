import { z } from "zod";

export const neneDesktopModeSchema = z.enum(["local", "nene-account"]);

export const neneDesktopConnectionStatusSchema = z.enum([
  "disconnected",
  "configured",
  "connected",
  "error",
]);

export const neneEntitlementSchema = z
  .object({
    id: z.string().optional(),
    key: z.string().optional(),
    name: z.string().optional(),
    status: z.string().optional(),
    expiresAt: z.string().nullable().optional(),
  })
  .passthrough();

export const neneDeviceRegisterRequestSchema = z.object({
  deviceId: z.string().min(1),
  deviceSecretHash: z.string().min(1),
});

export const neneDeviceRegisterResponseSchema = z.object({
  ok: z.boolean(),
  deviceId: z.string(),
  authorizeUrl: z.string().url(),
  pollAfterMs: z.number().int().positive().optional(),
});

export const neneEntitlementsResponseSchema = z.object({
  ok: z.boolean().default(true),
  entitlements: z.array(neneEntitlementSchema).default([]),
  syncedAt: z.string().optional(),
});

export const neneLatestReleaseResponseSchema = z.object({
  ok: z.boolean().default(true),
  version: z.string(),
  channel: z.string().optional(),
  url: z.string().url().optional(),
  notes: z.string().optional(),
  publishedAt: z.string().optional(),
});

export const neneHeartbeatRequestSchema = z.object({
  deviceId: z.string().min(1),
  activeProfileName: z.string().optional(),
  runtimeConnected: z.boolean().optional(),
});

export const neneHeartbeatResponseSchema = z.object({
  ok: z.boolean(),
  acceptedAt: z.string().optional(),
});

export const neneDesktopPersistedStateSchema = z.object({
  connectionStatus: neneDesktopConnectionStatusSchema.default("disconnected"),
  lastDeviceRegistrationAt: z.string().nullable().default(null),
  lastEntitlementSyncAt: z.string().nullable().default(null),
  lastHeartbeatAt: z.string().nullable().default(null),
  lastReleaseCheckAt: z.string().nullable().default(null),
  lastReleaseVersion: z.string().nullable().default(null),
  entitlements: z.array(neneEntitlementSchema).default([]),
  lastError: z.string().nullable().default(null),
});

export const neneDesktopStatusResponseSchema =
  neneDesktopPersistedStateSchema.extend({
    configured: z.boolean(),
    mode: neneDesktopModeSchema,
    webBaseUrl: z.string().nullable(),
    desktopAppId: z.string().nullable(),
    updateChannel: z.string().nullable(),
    activeProfileName: z.string(),
    cloudConnected: z.boolean(),
  });

export type NeneDeviceRegisterRequest = z.infer<
  typeof neneDeviceRegisterRequestSchema
>;
export type NeneDeviceRegisterResponse = z.infer<
  typeof neneDeviceRegisterResponseSchema
>;
export type NeneEntitlementsResponse = z.infer<
  typeof neneEntitlementsResponseSchema
>;
export type NeneLatestReleaseResponse = z.infer<
  typeof neneLatestReleaseResponseSchema
>;
export type NeneHeartbeatRequest = z.infer<typeof neneHeartbeatRequestSchema>;
export type NeneHeartbeatResponse = z.infer<typeof neneHeartbeatResponseSchema>;
export type NeneDesktopPersistedState = z.infer<
  typeof neneDesktopPersistedStateSchema
>;
export type NeneDesktopMode = z.infer<typeof neneDesktopModeSchema>;
export type NeneDesktopConnectionStatus = z.infer<
  typeof neneDesktopConnectionStatusSchema
>;
export type NeneDesktopStatusResponse = z.infer<
  typeof neneDesktopStatusResponseSchema
>;
