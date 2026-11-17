import { band } from "@/lib/content";
import { ScrollVelocityContainer, ScrollVelocityRow } from "@/components/magicui/scroll-based-velocity";

/** Banda de tecnologías que acelera y cambia de sentido con el scroll. */
export function Band() {
  const row = (
    <>
      {band.map((item) => (
        <span key={item} className="mx-[0.35em] inline-flex items-center gap-[0.7em]">
          {item}
          <span aria-hidden className="inline-block size-[0.28em] rounded-full bg-primary" />
        </span>
      ))}
    </>
  );
  return (
    <div aria-hidden className="overflow-hidden border-y py-6 sm:py-9">
      <ScrollVelocityContainer className="type-wide text-[clamp(2.4rem,7.5vw,6.5rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">
        <ScrollVelocityRow baseVelocity={3} direction={1}>
          {row}
        </ScrollVelocityRow>
        <ScrollVelocityRow baseVelocity={3} direction={-1} className="text-outline">
          {row}
        </ScrollVelocityRow>
      </ScrollVelocityContainer>
    </div>
  );
}
