"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { hero, heroRotating, site, type Locale } from "@/lib/content";
import { ui } from "@/lib/i18n";
import { asset } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Magnetic } from "./magnetic";

gsap.registerPlugin(useGSAP, SplitText);

export function Hero({ lang }: { lang: Locale }) {
  const root = useRef<HTMLElement>(null);
  const t = ui[lang];
  const phrases = heroRotating[lang];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        let split: SplitText | undefined;
        let cancelled = false;

        document.fonts.ready.then(() => {
          if (cancelled) return;
          split = SplitText.create(".hero-name", { type: "chars", mask: "chars" });
          gsap
            .timeline({ defaults: { ease: "power4.out" } })
            .from(split.chars, { yPercent: 115, rotate: 8, duration: 1, stagger: 0.035 }, 0.15)
            .from(".hero-fade", { y: 28, autoAlpha: 0, duration: 0.8, stagger: 0.1 }, 0.75);
        });

        const steps = phrases.length;
        const rotator = gsap.timeline({ repeat: -1, delay: 2.4 });
        for (let i = 1; i <= steps; i++) {
          rotator.to(".hero-rotator", {
            yPercent: (-100 / (steps + 1)) * i,
            duration: 0.7,
            ease: "power3.inOut",
            delay: 1.5,
          });
        }
        rotator.set(".hero-rotator", { yPercent: 0 });

        gsap.to(".hero-video", {
          yPercent: 14,
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
      className="dark relative isolate flex min-h-[calc(100svh-4rem)] flex-col justify-end overflow-hidden bg-[#0d0e22] text-foreground"
    >
      <video
        className="hero-video absolute inset-0 -z-20 size-full object-cover motion-reduce:hidden"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={asset("/media/hero-poster.jpg")}
        aria-hidden
      >
        <source src={asset("/media/hero.webm")} type="video/webm" />
        <source src={asset("/media/hero.mp4")} type="video/mp4" />
      </video>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset("/media/hero-poster.jpg")}
        alt=""
        className="absolute inset-0 -z-20 hidden size-full object-cover motion-reduce:block"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-t from-[#0d0e22] via-[#0d0e22]/75 to-[#0d0e22]/10" />

      <div className="mx-auto w-full max-w-7xl px-5 pb-12 pt-40 sm:px-8 sm:pb-16">
        <p className="hero-fade type-narrow text-[1.15rem] font-semibold text-muted-foreground">
          {hero.role[lang]}, {site.location[lang]}
        </p>
        <h1
          id="hero-titulo"
          aria-label={site.name}
          className="hero-name type-wide mt-3 text-[clamp(2.9rem,9.4vw,8.6rem)] font-extrabold leading-[0.88] tracking-[-0.035em]"
        >
          <span className="block">Marcelo</span>
          <span className="block sm:flex sm:gap-[0.24em]">
            <span className="block">Javier</span>
            <span className="block">Jaimes</span>
          </span>
        </h1>

        <div className="mt-8 grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div>
            <p
              aria-hidden
              className="hero-fade type-semiwide flex flex-wrap gap-x-[0.4em] text-[clamp(1.25rem,2.7vw,2.25rem)] font-bold leading-[1.25]"
            >
              <span>{hero.lead[lang]}</span>
              <span className="block h-[1.25em] overflow-hidden text-primary">
                <span className="hero-rotator flex flex-col">
                  {[...phrases, phrases[0]].map((phrase, i) => (
                    <span key={i} className="block h-[1.25em] whitespace-nowrap">
                      {phrase}
                    </span>
                  ))}
                </span>
              </span>
            </p>
            <p className="hero-fade mt-4 max-w-[52ch] text-[1.1rem] leading-relaxed text-muted-foreground">
              {hero.pitch[lang]}
            </p>
          </div>

          <div className="hero-fade flex flex-wrap items-center gap-3">
            <Magnetic>
              <Button asChild size="lg" className="h-14 rounded-full px-8 text-[1.05rem] font-bold">
                <Link href="#proyectos">{t.hero.seeProjects}</Link>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-14 rounded-full border-foreground/40 bg-transparent px-8 text-[1.05rem] font-bold hover:bg-foreground hover:text-background dark:border-foreground/40 dark:bg-transparent dark:hover:bg-foreground"
              >
                <Link href="#contacto">{t.hero.write}</Link>
              </Button>
            </Magnetic>
            {site.cv ? (
              <Button asChild size="lg" variant="ghost" className="h-14 rounded-full px-6 text-[1.05rem] font-bold">
                <a href={asset(site.cv)} download>
                  {t.hero.cv}
                </a>
              </Button>
            ) : null}
          </div>
        </div>

        <p className="hero-fade type-narrow mt-12 hidden items-center gap-2 font-semibold text-muted-foreground sm:flex">
          <ArrowDown aria-hidden className="size-4 animate-bounce" />
          {t.hero.scroll}
        </p>
      </div>
    </section>
  );
}
