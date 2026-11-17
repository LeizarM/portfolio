"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

interface RevealTextProps {
  as?: "h1" | "h2" | "h3" | "p";
  id?: string;
  className?: string;
  /** "lines": cada línea sube desde una máscara. "words": las palabras se encienden con el scroll. */
  mode?: "lines" | "words";
  children: string;
}

export function RevealText({ as = "h2", id, className, mode = "lines", children }: RevealTextProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const Tag = as as "h2";

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        let split: SplitText | undefined;
        let cancelled = false;
        document.fonts.ready.then(() => {
          if (cancelled) return;
          if (mode === "lines") {
            split = SplitText.create(el, {
              type: "lines",
              mask: "lines",
              autoSplit: true,
              onSplit: (self) =>
                gsap.from(self.lines, {
                  yPercent: 110,
                  duration: 0.9,
                  ease: "power4.out",
                  stagger: 0.09,
                  scrollTrigger: { trigger: el, start: "top 90%", once: true },
                }),
            });
          } else {
            split = SplitText.create(el, {
              type: "words",
              autoSplit: true,
              onSplit: (self) =>
                gsap.from(self.words, {
                  opacity: 0.14,
                  ease: "none",
                  stagger: 0.1,
                  scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 45%", scrub: 0.4 },
                }),
            });
          }
        });
        return () => {
          cancelled = true;
          split?.revert();
        };
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [children, mode] },
  );

  return (
    <Tag ref={ref} id={id} className={className}>
      {children}
    </Tag>
  );
}
