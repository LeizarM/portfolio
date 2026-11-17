"use client";

import { useEffect, useState } from "react";

const format = new Intl.DateTimeFormat("es-BO", {
  timeZone: "America/La_Paz",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

/** Hora actual en La Paz. Se calcula en el navegador para no quedar fija en el HTML estático. */
export function LocalTime() {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setNow(format.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="font-mono text-[clamp(2.4rem,5vw,3.4rem)] font-medium tabular-nums tracking-[-0.04em]">
      {now ?? "--:--:--"}
    </span>
  );
}
