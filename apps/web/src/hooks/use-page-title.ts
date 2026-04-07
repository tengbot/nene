import { useEffect } from "react";

export function usePageTitle(title: string) {
  useEffect(() => {
    const prev = document.title;
    document.title = title
      ? title.toLowerCase().includes("nene")
        ? title
        : `${title} · nene`
      : "nene";
    return () => {
      document.title = prev;
    };
  }, [title]);
}
