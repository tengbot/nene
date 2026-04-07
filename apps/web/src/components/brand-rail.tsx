import { track } from "@/lib/tracking";
import {
  ArrowRight,
  Infinity as InfinityIcon,
  Shield,
  Sparkles,
} from "lucide-react";
import type { ReactNode } from "react";
import { useGitHubStars } from "../hooks/use-github-stars";
import { useLocale } from "../hooks/use-locale";
import { BrandMark } from "./brand-mark";

const GITHUB_URL = "https://github.com/tengbot/nene";

function GitHubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      role="img"
      aria-label="GitHub"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function FadeIn({
  children,
  delay = 0,
  className = "",
}: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <div
      className={`animate-fade-in-up ${className}`}
      style={{ animationDelay: `${delay}ms`, animationFillMode: "both" }}
    >
      {children}
    </div>
  );
}

export function BrandRail({
  topRight,
  onLogoClick,
}: {
  topRight?: ReactNode;
  onLogoClick: () => void;
}) {
  const { stars } = useGitHubStars();
  const { t } = useLocale();
  const bullets = [
    { icon: Sparkles, text: t("brand.bullet.openclaw") },
    { icon: Shield, text: t("brand.bullet.feishu") },
    { icon: InfinityIcon, text: t("brand.bullet.models") },
  ];

  return (
    <div className="hidden lg:flex lg:w-[46%] lg:min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_18%_18%,rgba(255,255,255,0.08),transparent_36%),radial-gradient(80%_80%_at_82%_22%,rgba(180,150,255,0.14),transparent_36%),linear-gradient(180deg,#0d0d10_0%,#0a0a0d_100%)]" />
      <div className="absolute -right-20 bottom-0 opacity-[0.05]">
        <img
          src="/brand/logo.png"
          alt=""
          aria-hidden="true"
          className="h-[320px] w-[320px] object-contain"
        />
      </div>

      <div className="relative z-10 flex w-full flex-col justify-between px-10 pb-12 pt-8 xl:px-12 xl:py-12">
        <FadeIn delay={80} className="flex items-center justify-between">
          <button
            type="button"
            onClick={onLogoClick}
            aria-label="Go to nene home"
            className="flex items-center gap-3 cursor-pointer"
          >
            <BrandMark className="h-9 w-9 shrink-0 object-contain" />
            <span className="text-[23px] font-semibold tracking-tight text-white">
              nene
            </span>
          </button>
          {topRight ?? <div />}
        </FadeIn>

        <div>
          <FadeIn delay={220}>
            <h1
              className="max-w-[560px] text-[40px] leading-[0.96] tracking-tight text-white sm:text-[52px] lg:text-[64px]"
              style={{ fontFamily: "Georgia, Times New Roman, serif" }}
            >
              {t("brand.title.line1")}
              <br />
              {t("brand.title.line2")}
            </h1>
          </FadeIn>

          <FadeIn delay={300}>
            <p className="mt-6 max-w-[460px] text-[15px] leading-[1.8] text-white/58">
              {t("brand.body")}
            </p>
          </FadeIn>

          <div className="mt-8 space-y-3">
            {bullets.map((item, index) => (
              <FadeIn key={item.text} delay={380 + index * 80}>
                <div className="grid min-h-[72px] grid-cols-[40px_1fr] items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.025] px-5 py-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/[0.06]">
                    <item.icon size={15} className="text-white/66" />
                  </div>
                  <p className="text-[13px] leading-[1.6] text-white/58">
                    {item.text}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        <FadeIn delay={520}>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("auth_github_click")}
            className="group inline-flex items-center gap-3 rounded-[24px] border border-white/8 bg-[#1f1f23]/92 px-5 py-4 text-[14px] font-medium text-white/82 shadow-[0_10px_28px_rgba(0,0,0,0.18)] transition-all hover:border-white/12 hover:bg-[#242429] hover:text-white"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-[18px] border border-white/6 bg-white/[0.05] text-white">
              <GitHubIcon size={18} />
            </div>
            <span>{t("brand.github")}</span>
            {stars && stars > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[11px] text-white/82">
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-amber-400"
                  role="img"
                  aria-label="Star"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                {stars.toLocaleString()}
              </span>
            )}
            <ArrowRight
              size={15}
              className="opacity-65 transition-transform group-hover:translate-x-0.5"
            />
          </a>
        </FadeIn>
      </div>
    </div>
  );
}
