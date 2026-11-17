import type { LineId } from "./content";

/** Clases de Tailwind por línea. Tienen que ser literales para que el compilador las detecte. */
export const lineClass: Record<LineId, { stroke: string; bg: string; text: string; border: string }> = {
  backend: { stroke: "stroke-line-backend", bg: "bg-line-backend", text: "text-line-backend", border: "border-line-backend" },
  mobile: { stroke: "stroke-line-mobile", bg: "bg-line-mobile", text: "text-line-mobile", border: "border-line-mobile" },
  data: { stroke: "stroke-line-data", bg: "bg-line-data", text: "text-line-data", border: "border-line-data" },
  infra: { stroke: "stroke-line-infra", bg: "bg-line-infra", text: "text-line-infra", border: "border-line-infra" },
};

/** Bloque de color pleno de cada línea, con su texto encima. */
export const blockClass: Record<LineId, string> = {
  backend: "bg-line-backend text-on-line",
  mobile: "bg-line-mobile text-on-line",
  data: "bg-line-data text-on-line",
  infra: "bg-line-infra text-on-line",
};
