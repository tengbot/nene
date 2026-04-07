import type { ImgHTMLAttributes } from "react";

type BrandMarkProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt">;

export function BrandMark(props: BrandMarkProps) {
  return <img src="/brand/logo.png" {...props} alt="" aria-hidden="true" />;
}
