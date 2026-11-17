"use client";

import { useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTheme } from "next-themes";
import { band, hero, heroRotating, site, type Locale } from "@/lib/content";
import { ui } from "@/lib/i18n";
import { asset } from "@/lib/utils";
import { DotPattern } from "@/components/magicui/dot-pattern";
import Aurora from "@/components/reactbits/Aurora";
import LogoLoop from "@/components/reactbits/LogoLoop";
import Magnet from "@/components/reactbits/Magnet";
import RotatingText from "@/components/reactbits/RotatingText";
import ShinyText from "@/components/reactbits/ShinyText";
import SplitText from "@/components/reactbits/SplitText";
import StarBorder from "@/components/reactbits/StarBorder";
import { Button } from "@/components/ui/button";
import { Blob } from "./blob";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const subscribe = () => () => {};

export function Hero({ lang }: { lang: Locale }) {
  const root = useRef<HTMLElement>(null);
  const t = ui[lang];
  const { resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const light = mounted && resolvedTheme === "light";

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".hero-blob", {
          scale: 0.6,
          autoAlpha: 0,
          duration: 1.6,
          ease: "expo.out",
        });
        gsap.from(".hero-fade", {
          y: 22,
          autoAlpha: 0,
          duration: 0.8,
          stagger: 0.1,
          delay: 0.7,
          ease: "power4.out",
        });
        gsap.to(".hero-blob", {
          yPercent: 22,
          scale: 0.86,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-label={site.name}
      className="relative isolate flex min-h-svh flex-col items-center justify-end overflow-hidden px-5 pb-10 pt-28 text-center sm:px-8"
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-30 h-[78%] opacity-70"
      >
        <Aurora
          colorStops={
            light
              ? ["#6a4dff", "#12a8dc", "#e63b8f"]
              : ["#7c5cff", "#3ddcff", "#ff5caa"]
          }
          lightMode={light}
          amplitude={1.1}
          blend={0.6}
          speed={0.7}
        />
      </div>
      <DotPattern
        width={26}
        height={26}
        cr={1}
        className="-z-20 fill-foreground/15 [mask-image:radial-gradient(60%_55%_at_50%_35%,black,transparent)]"
      />
      <Blob className="hero-blob absolute left-1/2 top-[7%] -z-10 aspect-square h-[min(58vh,36rem)] -translate-x-1/2" />

      <div className="mx-auto flex w-full max-w-5xl flex-col items-center">
        <p className="hero-fade glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[0.9rem]">
          <span
            aria-hidden
            className="size-1.5 rounded-full bg-line-data shadow-[0_0_8px_var(--line-data)]"
          />
          <ShinyText
            text={site.name}
            color={light ? "#5b5d6b" : "#a3a5b3"}
            shineColor={light ? "#0b0b10" : "#ffffff"}
            speed={3}
          />
        </p>

        <SplitText
          tag="h1"
          text={hero.headline[lang]}
          splitType="words"
          trigger="load"
          delay={55}
          duration={1}
          ease="power4.out"
          from={{ opacity: 0, y: 60, filter: "blur(12px)" }}
          to={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          textAlign="center"
          className="mt-6 max-w-[17ch] text-[clamp(2.5rem,7.2vw,5.6rem)] font-semibold leading-[0.98] tracking-[-0.045em]"
        />

        <p className="hero-fade mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[clamp(1.05rem,2vw,1.4rem)] font-medium">
          <span className="text-muted-foreground">
            {heroRotating.lead[lang]}
          </span>
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

        <p className="hero-fade mt-6 max-w-[56ch] text-[1.08rem] leading-relaxed text-muted-foreground">
          {hero.pitch[lang]}
        </p>

        <div className="hero-fade mt-8 flex flex-wrap items-center justify-center gap-3">
          <Magnet padding={50} magnetStrength={3}>
            <StarBorder
              as="a"
              href="#proyectos"
              color="#3ddcff"
              trailColor="#7c5cff"
              duration={5}
              radius={999}
              theme={light ? "light" : "dark"}
              className="group h-12 px-6 text-base font-semibold"
            >
              <span className="inline-flex items-center gap-2">
                {t.hero.seeProjects}
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                />
              </span>
            </StarBorder>
          </Magnet>
          <Magnet padding={50} magnetStrength={3}>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="glass h-12 rounded-full px-6 text-base font-semibold hover:bg-accent dark:bg-card dark:hover:bg-accent"
            >
              <Link href="#contacto">{t.hero.write}</Link>
            </Button>
          </Magnet>
          {site.cv ? (
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="h-12 rounded-full px-5 text-base font-semibold"
            >
              <a href={asset(site.cv)} download>
                {t.hero.cv}
              </a>
            </Button>
          ) : null}
        </div>

        <div className="hero-fade mt-14 w-full max-w-3xl">
          <LogoLoop
            logos={band.map((item) => ({
              node: (
                <span className="font-mono text-[0.9rem] text-muted-foreground">
                  {item}
                </span>
              ),
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
