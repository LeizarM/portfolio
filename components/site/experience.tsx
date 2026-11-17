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
            y: 44,
            autoAlpha: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: job, start: "top 86%", once: true },
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
          <span aria-hidden className="absolute left-[7px] top-3 h-[calc(100%-1.5rem)] w-px bg-border" />
          <span
            aria-hidden
            className="exp-progress absolute left-[6px] top-3 h-[calc(100%-1.5rem)] w-[3px] rounded-full bg-linear-to-b from-glow-a via-glow-b to-glow-c shadow-[0_0_14px_var(--glow-a)]"
          />
          <ol className="space-y-5">
            {jobs.map((job) => (
              <li key={job.company} className="exp-job relative pl-10">
                <span
                  aria-hidden
                  className="absolute left-0 top-9 size-[15px] rounded-full border-2 border-foreground bg-background"
                />
                <div className="glass grid gap-x-10 gap-y-3 rounded-3xl p-7 sm:p-9 lg:grid-cols-[13rem_minmax(0,1fr)]">
                  <p className="label-mono leading-relaxed">
                    {job.period[lang]}
                    <br />
                    {job.place}
                  </p>
                  <div>
                    <h3 className="text-[1.6rem] font-semibold leading-tight tracking-[-0.035em]">{job.company}</h3>
                    <p className="mt-1 font-medium">{job.role[lang]}</p>
                    <p className="mt-3 max-w-[62ch] text-muted-foreground">{job.summary[lang]}</p>
                    {job.points[lang].length > 0 ? (
                      <ul className="mt-4 max-w-[62ch] space-y-2">
                        {job.points[lang].map((point) => (
                          <li key={point} className="relative pl-5">
                            <span aria-hidden className="absolute left-0 top-[0.7em] size-1.5 rounded-full bg-glow-b" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <h3 className="mt-16 text-[1.5rem] font-semibold tracking-[-0.03em]">{t.education}</h3>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2">
          {education.map((item) => (
            <li key={item.school} className="glass rounded-2xl p-6">
              <p className="font-semibold">{item.title[lang]}</p>
              <p className="text-muted-foreground">{item.school}</p>
              <p className="label-mono mt-2">{item.year}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
