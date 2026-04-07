import Anthropic from "@lobehub/icons/es/Anthropic";
import ChatGLM from "@lobehub/icons/es/ChatGLM";
import Claude from "@lobehub/icons/es/Claude";
import CommandA from "@lobehub/icons/es/CommandA";
import DeepSeek from "@lobehub/icons/es/DeepSeek";
import Gemini from "@lobehub/icons/es/Gemini";
import Gemma from "@lobehub/icons/es/Gemma";
import Grok from "@lobehub/icons/es/Grok";
import Kimi from "@lobehub/icons/es/Kimi";
import LLaVA from "@lobehub/icons/es/LLaVA";
import Minimax from "@lobehub/icons/es/Minimax";
import Mistral from "@lobehub/icons/es/Mistral";
import Ollama from "@lobehub/icons/es/Ollama";
import OpenAI from "@lobehub/icons/es/OpenAI";
import OpenRouter from "@lobehub/icons/es/OpenRouter";
import PPIO from "@lobehub/icons/es/PPIO";
import Qwen from "@lobehub/icons/es/Qwen";
import SiliconCloud from "@lobehub/icons/es/SiliconCloud";
import ZAI from "@lobehub/icons/es/ZAI";
import type { CSSProperties, ComponentType } from "react";

type LobeIconProps = {
  size?: number | string;
  style?: CSSProperties;
  className?: string;
};

type LobeIconModule = {
  default?: unknown;
  Avatar?: unknown;
  Color?: unknown;
};

const LOBE_PROVIDER_ICONS: Record<string, LobeIconModule> = {
  anthropic: Anthropic as unknown as LobeIconModule,
  glm: ChatGLM as unknown as LobeIconModule,
  google: Gemini as unknown as LobeIconModule,
  kimi: Kimi as unknown as LobeIconModule,
  minimax: Minimax as unknown as LobeIconModule,
  ollama: Ollama as unknown as LobeIconModule,
  moonshot: Kimi as unknown as LobeIconModule,
  openai: OpenAI as unknown as LobeIconModule,
  openrouter: OpenRouter as unknown as LobeIconModule,
  ppio: PPIO as unknown as LobeIconModule,
  siliconflow: SiliconCloud as unknown as LobeIconModule,
  zai: ZAI as unknown as LobeIconModule,
};

const MODEL_ICON_MATCHERS: Array<{
  matches: (value: string) => boolean;
  icon: LobeIconModule;
}> = [
  {
    matches: (value) => matchesAnyKeyword(value, ["claude"]),
    icon: Claude as unknown as LobeIconModule,
  },
  {
    matches: (value) => matchesAnyKeyword(value, ["gemini"]),
    icon: Gemini as unknown as LobeIconModule,
  },
  {
    matches: (value) =>
      matchesAnyKeyword(value, ["gpt", "chatgpt"]) ||
      matchesAnyPrefix(value, ["o1", "o3", "o4"]),
    icon: OpenAI as unknown as LobeIconModule,
  },
  {
    matches: (value) => matchesAnyKeyword(value, ["deepseek"]),
    icon: DeepSeek as unknown as LobeIconModule,
  },
  {
    matches: (value) => matchesAnyKeyword(value, ["qwen"]),
    icon: Qwen as unknown as LobeIconModule,
  },
  {
    matches: (value) => matchesAnyKeyword(value, ["glm", "chatglm", "zhipu"]),
    icon: ChatGLM as unknown as LobeIconModule,
  },
  {
    matches: (value) => matchesAnyKeyword(value, ["kimi", "moonshot"]),
    icon: Kimi as unknown as LobeIconModule,
  },
  {
    matches: (value) => matchesAnyKeyword(value, ["minimax"]),
    icon: Minimax as unknown as LobeIconModule,
  },
  {
    matches: (value) => matchesAnyKeyword(value, ["llama", "llava"]),
    icon: LLaVA as unknown as LobeIconModule,
  },
  {
    matches: (value) => matchesAnyKeyword(value, ["grok", "xai"]),
    icon: Grok as unknown as LobeIconModule,
  },
  {
    matches: (value) =>
      matchesAnyKeyword(value, ["mistral", "mixtral", "magistral"]),
    icon: Mistral as unknown as LobeIconModule,
  },
  {
    matches: (value) => matchesAnyKeyword(value, ["gemma"]),
    icon: Gemma as unknown as LobeIconModule,
  },
  {
    matches: (value) =>
      matchesAnyKeyword(value, [
        "command-a",
        "commanda",
        "command r",
        "command-r",
      ]),
    icon: CommandA as unknown as LobeIconModule,
  },
  {
    matches: (value) => matchesAnyKeyword(value, ["openrouter"]),
    icon: OpenRouter as unknown as LobeIconModule,
  },
];

function asIconComponent(value: unknown): ComponentType<LobeIconProps> | null {
  if (typeof value === "function") {
    return value as ComponentType<LobeIconProps>;
  }

  if (typeof value === "object" && value !== null) {
    return value as ComponentType<LobeIconProps>;
  }

  return null;
}

function getPreferredIcon(lobeIcon: LobeIconModule | undefined) {
  if (!lobeIcon) {
    return null;
  }

  return (
    asIconComponent(lobeIcon.Color) ??
    asIconComponent(lobeIcon.Avatar) ??
    asIconComponent(lobeIcon.default) ??
    asIconComponent(lobeIcon)
  );
}

function normalizeIconLookupValue(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ");
}

function matchesAnyKeyword(value: string, keywords: string[]) {
  return keywords.some((keyword) =>
    value.includes(normalizeIconLookupValue(keyword)),
  );
}

function matchesAnyPrefix(value: string, prefixes: string[]) {
  const tokens = value.split(" ");
  return prefixes.some((prefix) =>
    tokens.some((token) => token.startsWith(prefix)),
  );
}

export function ProviderLogo({
  provider,
  size = 16,
}: {
  provider: string;
  size?: number;
}) {
  const style = { width: size, height: size };
  const lobeIcon = LOBE_PROVIDER_ICONS[provider];

  if (lobeIcon) {
    const PreferredIcon = getPreferredIcon(lobeIcon);

    if (PreferredIcon) {
      return <PreferredIcon size={size} style={{ flex: "none" }} />;
    }
  }

  if (provider === "nexu") {
    return (
      <img
        src="/brand/logo.png"
        alt="nene"
        style={style}
        className="shrink-0 object-contain"
      />
    );
  }

  return (
    <span
      className="flex items-center justify-center rounded text-[9px] font-bold bg-surface-3 text-text-muted"
      style={style}
    >
      {(provider[0] ?? "?").toUpperCase()}
    </span>
  );
}

export function ModelLogo({
  model,
  provider,
  size = 16,
}: {
  model: string;
  provider?: string;
  size?: number;
}) {
  const normalizedModel = normalizeIconLookupValue(model);
  const matchedIcon = MODEL_ICON_MATCHERS.find(({ matches }) =>
    matches(normalizedModel),
  )?.icon;
  const PreferredIcon = getPreferredIcon(matchedIcon);

  if (PreferredIcon) {
    return <PreferredIcon size={size} style={{ flex: "none" }} />;
  }

  if (provider) {
    return <ProviderLogo provider={provider} size={size} />;
  }

  return (
    <span
      className="flex items-center justify-center rounded text-[9px] font-bold bg-surface-3 text-text-muted"
      style={{ width: size, height: size }}
    >
      {(model[0] ?? "?").toUpperCase()}
    </span>
  );
}
