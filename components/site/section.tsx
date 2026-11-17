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
    <section id={id} aria-labelledby={`${id}-titulo`} className={cn("py-24 sm:py-32", className)}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <RevealText
          id={`${id}-titulo`}
          className="type-wide text-[clamp(2.4rem,7vw,5.5rem)] font-extrabold leading-[0.95] tracking-[-0.03em]"
        >
          {title}
        </RevealText>
        {intro ? <p className="mt-6 max-w-[62ch] text-[1.1rem] text-muted-foreground">{intro}</p> : null}
        <div className="mt-14">{children}</div>
      </div>
    </section>
  );
}
