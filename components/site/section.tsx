import { cn } from "@/lib/utils";
import { RevealText } from "./reveal-text";

interface SectionProps {
  id: string;
  title: string;
  intro?: string;
  className?: string;
  children: React.ReactNode;
}

export function Section({ id, title, intro, className, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-titulo`} className={cn("relative py-24 sm:py-32", className)}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <RevealText
          id={`${id}-titulo`}
          className="text-[clamp(2.2rem,5.4vw,3.9rem)] font-semibold leading-[1.02] tracking-[-0.04em]"
        >
          {title}
        </RevealText>
        {intro ? <p className="mt-5 max-w-[60ch] text-[1.1rem] text-muted-foreground">{intro}</p> : null}
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
