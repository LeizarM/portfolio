"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { education, jobs, type Locale } from "@/lib/content";
import { ui } from "@/lib/i18n";
import { Section } from "./section";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Experience({ lang }: { lang: Locale }) {
  const root = useRef<HTMLDivElement>(null);
  const t = ui[lang].experience;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".exp-progress",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top center",
            scrollTrigger: { trigger: ".exp-list", start: "top 70%", end: "bottom 60%", scrub: 0.4 },
          },
        );
        gsap.utils.toArray<HTMLElement>(".exp-job").forEach((job) => {
          gsap.from(job, {
            y: 40,
            autoAlpha: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: job, start: "top 85%", once: true },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <Section id="experiencia" title={t.title}>
      <div ref={root}>
        <div className="exp-list relative">
          <span aria-hidden className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-0.5 bg-border" />
          <span aria-hidden className="exp-progress absolute left-[7px] top-2 h-[calc(100%-1rem)] w-0.5 bg-line-backend" />
          <ol className="space-y-14">
            {jobs.map((job) => (
              <li key={job.company} className="exp-job relative grid gap-x-10 gap-y-3 pl-10 lg:grid-cols-[15rem_minmax(0,1fr)]">
                <span
                  aria-hidden
                  className="absolute left-0 top-1.5 size-4 rounded-full border-[3px] border-foreground bg-background"
                />
                <p className="type-narrow text-[1.02rem] font-semibold text-muted-foreground">
                  {job.period[lang]}
                  <br />
                  {job.place}
                </p>
                <div>
                  <h3 className="type-wide text-[clamp(1.5rem,3vw,2.4rem)] font-extrabold leading-tight tracking-tight">{job.company}</h3>
                  <p className="mt-1 font-semibold">{job.role[lang]}</p>
                  <p className="mt-3 max-w-[62ch] text-muted-foreground">{job.summary[lang]}</p>
                  {job.points[lang].length > 0 ? (
                    <ul className="mt-4 max-w-[62ch] list-disc space-y-1.5 pl-5 marker:text-muted-foreground">
                      {job.points[lang].map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </div>

        <h3 className="type-semiwide mt-20 text-[1.35rem] font-extrabold">{t.education}</h3>
        <ul className="mt-6 grid gap-6 sm:grid-cols-2">
          {education.map((item) => (
            <li key={item.school} className="border-t pt-4">
              <p className="font-bold">{item.title[lang]}</p>
              <p className="text-muted-foreground">
                {item.school}, {item.year}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
