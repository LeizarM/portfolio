"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";

const subscribe = () => () => {};

export function ThemeToggle({ toLight, toDark }: { toLight: string; toDark: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const theme = mounted && resolvedTheme === "light" ? "light" : "dark";

  return (
    <AnimatedThemeToggler
      theme={theme}
      onThemeChange={setTheme}
      aria-label={theme === "dark" ? toLight : toDark}
      title={theme === "dark" ? toLight : toDark}
      className="inline-flex size-10 cursor-pointer items-center justify-center rounded-full text-foreground hover:bg-accent [&_.sr-only]:hidden [&_svg]:size-[18px]"
    />
  );
}
