import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  title: string;
  intro?: string;
  className?: string;
  children: React.ReactNode;
}

export function Section({ id, title, intro, className, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-titulo`} className={cn("border-t py-20 sm:py-28", className)}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <h2
          id={`${id}-titulo`}
          className="type-semiwide text-[clamp(1.9rem,4vw,2.9rem)] font-extrabold leading-[1.05] tracking-tight"
        >
          {title}
        </h2>
        {intro ? <p className="mt-4 max-w-[62ch] text-muted-foreground">{intro}</p> : null}
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
