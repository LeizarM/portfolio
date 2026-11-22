"use client";

import { useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTheme } from "next-themes";
import { band, hero, heroRotating, site, type Locale } from "@/lib/content";
import { ui } from "@/lib/i18n";
import { asset } from "@/lib/utils";
import LogoLoop from "@/components/reactbits/LogoLoop";
import RotatingText from "@/components/reactbits/RotatingText";
import ShinyText from "@/components/reactbits/ShinyText";
import StarBorder from "@/components/reactbits/StarBorder";
import { Button } from "@/components/ui/button";
import { NatureScene } from "./nature-scene";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const subscribe = () => () => {};

function Words({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <span className="hero-word inline-block">{word}&nbsp;</span>
        </span>
      ))}
    </>
  );
}

/** Inicio con la composición de un estudio digital: titular enorme con un paisaje incrustado. */
export function Hero({ lang }: { lang: Locale }) {
  const root = useRef<HTMLElement>(null);
  const t = ui[lang];
  const { resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const light = mounted && resolvedTheme === "light";
  const [before = "", after = ""] = hero.headline[lang];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "power4.out" } })
          .from(".hero-word", { yPercent: 115, duration: 1.1, stagger: 0.05 }, 0.15)
          .from(".hero-capsule", { scaleX: 0, transformOrigin: "left center", duration: 1, ease: "expo.out" }, 0.45)
          .from(".hero-fade", { y: 24, autoAlpha: 0, duration: 0.8, stagger: 0.1 }, 0.9);
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [lang] },
  );

  return (
    <section ref={root} aria-label={site.name} className="relative px-5 pb-16 pt-32 sm:px-8 sm:pt-40">
      <div className="mx-auto max-w-7xl">
        <p className="hero-fade glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[0.9rem]">
          <ShinyText
            text={site.name}
            color={light ? "#5b5d6b" : "#a3a5b3"}
            shineColor={light ? "#0b0b10" : "#ffffff"}
            speed={3}
          />
          <span className="hidden text-muted-foreground sm:inline">{hero.role[lang]}</span>
        </p>

        <h1
          aria-label={`${before} ${after}`}
          className="mt-8 text-[clamp(2.6rem,8.4vw,8.25rem)] font-medium leading-[0.96] tracking-[-0.055em]"
        >
          <span aria-hidden>
            <Words text={before} />
            <span className="hero-capsule mx-[0.06em] inline-block h-[0.74em] w-[1.85em] translate-y-[0.03em] overflow-hidden rounded-full border align-baseline">
              <NatureScene seed={7} cropFrom={0.3} cropTo={0.82} className="size-full" />
            </span>{" "}
            <Words text={after} />
          </span>
        </h1>

        <div className="mt-12 grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div>
            <p className="hero-fade flex flex-wrap items-center gap-x-3 gap-y-2 text-[clamp(1.1rem,2vw,1.5rem)] font-medium">
              <span className="text-muted-foreground">{heroRotating.lead[lang]}</span>
              <RotatingText
                texts={heroRotating.phrases[lang]}
                rotationInterval={2600}
                staggerDuration={0.018}
                staggerFrom="last"
                mainClassName="overflow-hidden rounded-xl bg-linear-to-r from-glow-a to-glow-b px-3 py-1 text-white"
                splitLevelClassName="overflow-hidden"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
              />
            </p>
            <p className="hero-fade mt-5 max-w-[54ch] text-[1.1rem] leading-relaxed text-muted-foreground">
              {hero.pitch[lang]}
            </p>
          </div>

          <div className="hero-fade flex flex-wrap items-center gap-3">
            <StarBorder
              as="a"
              href="#proyectos"
              color="#3ddcff"
              trailColor="#7c5cff"
              duration={5}
              radius={999}
              theme={light ? "light" : "dark"}
              className="group h-13 px-7 text-base font-semibold"
            >
              {t.hero.seeProjects}
            </StarBorder>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="glass h-13 rounded-full px-7 text-base font-semibold hover:bg-accent dark:bg-card dark:hover:bg-accent"
            >
              <Link href="#contacto">{t.hero.write}</Link>
            </Button>
            {site.cv ? (
              <Button asChild size="lg" variant="ghost" className="h-13 rounded-full px-5 text-base font-semibold">
                <a href={asset(site.cv)} download>
                  {t.hero.cv}
                </a>
              </Button>
            ) : null}
          </div>
        </div>

        <div className="mt-12">
          <LogoLoop
            logos={band.map((item) => ({
              node: <span className="font-mono text-[0.9rem] text-muted-foreground">{item}</span>,
              title: item,
            }))}
            speed={45}
            gap={44}
            logoHeight={22}
            fadeOut
            fadeOutColor="var(--background)"
            ariaLabel="Stack"
          />
        </div>
      </div>
    </section>
  );
}
