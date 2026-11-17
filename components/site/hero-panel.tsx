"use client";

import { useEffect, useState } from "react";
import { asset } from "@/lib/utils";
import { BoliviaOverlay } from "./bolivia-overlay";
import { NatureScene } from "./nature-scene";

/** Ilustración opcional del panel. Si el archivo no existe, se usa el paisaje dibujado por código. */
const ILLUSTRATION = "/media/bolivia.webp";

type Source = "checking" | "image" | "code";

export function HeroPanel({ label }: { label: string }) {
  const [source, setSource] = useState<Source>("checking");

  useEffect(() => {
    const probe = new Image();
    probe.onload = () => setSource("image");
    probe.onerror = () => setSource("code");
    probe.src = asset(ILLUSTRATION);
    return () => {
      probe.onload = null;
      probe.onerror = null;
    };
  }, []);

  return (
    <div className="hero-panel relative mt-14 aspect-[16/11] overflow-hidden rounded-[1.75rem] border bg-card-solid sm:aspect-[16/8]">
      {source === "image" ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={asset(ILLUSTRATION)} alt={label} className="absolute inset-0 size-full object-cover" />
      ) : null}
      {source === "code" ? (
        <>
          <NatureScene className="absolute inset-0" />
          <BoliviaOverlay />
        </>
      ) : null}
      <p className="label-mono absolute left-5 top-5 rounded-full bg-black/35 px-3 py-1.5 !text-white backdrop-blur-md">
        {label}
      </p>
    </div>
  );
}
