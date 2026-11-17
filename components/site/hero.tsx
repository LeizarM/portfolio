"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { band, hero, site, type Locale } from "@/lib/content";
import { ui } from "@/lib/i18n";
import { asset } from "@/lib/utils";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { Marquee } from "@/components/magicui/marquee";
import { Button } from "@/components/ui/button";
import { Blob } from "./blob";
import { Magnetic } from "./magnetic";

gsap.registerPlugin(useGSAP, SplitText);

export function Hero({ lang }: { lang: Locale }) {
  const root = useRef<HTMLElement>(null);
  const t = ui[lang];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        let split: SplitText | undefined;
        let cancelled = false;
        gsap.from(".hero-blob", { scale: 0.6, autoAlpha: 0, duration: 1.6, ease: "expo.out" });
        document.fonts.ready.then(() => {
          if (cancelled) return;
          split = SplitText.create(".hero-title", { type: "words,lines", mask: "lines" });
          gsap
            .timeline({ defaults: { ease: "power4.out" } })
            .from(".hero-pill", { y: 16, autoAlpha: 0, duration: 0.7 }, 0.2)
            .from(split.words, { yPercent: 110, duration: 1, stagger: 0.045 }, 0.3)
            .from(".hero-fade", { y: 22, autoAlpha: 0, duration: 0.8, stagger: 0.1 }, 0.9);
        });
        gsap.to(".hero-blob", {
          yPercent: 22,
          scale: 0.86,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        return () => {
          cancelled = true;
          split?.revert();
        };
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [lang] },
  );

  return (
    <section
      ref={root}
      aria-labelledby="hero-titulo"
      className="relative isolate flex min-h-svh flex-col items-center justify-end overflow-hidden px-5 pb-10 pt-28 text-center sm:px-8"
    >
      <DotPattern
        width={26}
        height={26}
        cr={1}
        className="-z-30 fill-foreground/15 [mask-image:radial-gradient(60%_55%_at_50%_35%,black,transparent)]"
      />
      <div
        aria-hidden
        className="animate-aurora absolute left-1/2 top-[8%] -z-20 h-[62vh] w-[min(120vw,70rem)] -translate-x-1/2 rounded-full bg-[conic-gradient(from_120deg,var(--glow-a),var(--glow-b),var(--glow-c),var(--glow-a))] opacity-25 blur-[110px] dark:opacity-30"
      />
      <Blob className="hero-blob absolute left-1/2 top-[7%] -z-10 aspect-square h-[min(58vh,36rem)] -translate-x-1/2" />

      <div className="mx-auto flex w-full max-w-5xl flex-col items-center">
        <p className="hero-pill glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[0.9rem]">
          <span aria-hidden className="size-1.5 rounded-full bg-line-data shadow-[0_0_8px_var(--line-data)]" />
          <AnimatedShinyText className="mx-0 max-w-none">
            {site.name}
            <span className="hidden sm:inline">, {hero.role[lang].toLowerCase()}</span>
          </AnimatedShinyText>
        </p>
        <h1
          id="hero-titulo"
          className="hero-title mt-6 max-w-[17ch] text-[clamp(2.5rem,7.2vw,5.6rem)] font-semibold leading-[0.98] tracking-[-0.045em]"
        >
          {hero.headline[lang]}
        </h1>
        <p className="hero-fade mt-6 max-w-[56ch] text-[1.12rem] leading-relaxed text-muted-foreground">
          {hero.pitch[lang]}
        </p>
        <div className="hero-fade mt-8 flex flex-wrap items-center justify-center gap-3">
          <Magnetic>
            <Button asChild size="lg" className="group h-12 rounded-full px-6 text-base font-semibold">
              <Link href="#proyectos">
                {t.hero.seeProjects}
                <ArrowRight aria-hidden className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </Magnetic>
          <Magnetic>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="glass h-12 rounded-full px-6 text-base font-semibold hover:bg-accent dark:bg-card dark:hover:bg-accent"
            >
              <Link href="#contacto">{t.hero.write}</Link>
            </Button>
          </Magnetic>
          {site.cv ? (
            <Button asChild size="lg" variant="ghost" className="h-12 rounded-full px-5 text-base font-semibold">
              <a href={asset(site.cv)} download>
                {t.hero.cv}
              </a>
            </Button>
          ) : null}
        </div>

        <div
          aria-hidden
          className="hero-fade mt-14 w-full max-w-3xl [mask-image:linear-gradient(to_right,transparent,black_18%,black_82%,transparent)]"
        >
          <Marquee className="p-0 [--duration:38s] [--gap:2.75rem]">
            {band.map((item) => (
              <span key={item} className="font-mono text-[0.9rem] text-muted-foreground">
                {item}
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
