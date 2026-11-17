/**
 * Detalles de Bolivia sobre el paisaje: teleférico con cabinas en rojo, amarillo y verde,
 * un cóndor planeando y llamas en la loma del primer plano.
 */
const CABLE = "M-60 318 L1660 214";
const FLIGHT = "M-120 150 C320 70 760 210 1180 120 S1560 90 1740 140";
const LLAMA =
  "M12 112V72Q9 54 24 50H58Q63 34 61 14L59 3L65 9L69 3L71 13Q80 15 82 23Q80 29 72 28Q74 46 70 57Q73 64 71 72V112H63V80H57V112H49V78H30V112H22V80Q17 80 17 86V112Z";

const cabins = [
  { color: "#e5484d", at: 12, delay: -8 },
  { color: "#f5c400", at: 46, delay: -31 },
  { color: "#30a46c", at: 80, delay: -54 },
];

export function BoliviaOverlay() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1600 800"
      preserveAspectRatio="xMidYMax slice"
      className="pointer-events-none absolute inset-0 size-full"
    >
      <path d={CABLE} fill="none" stroke="var(--scene-near)" strokeWidth={2} opacity={0.55} />
      {cabins.map((cabin) => (
        <g
          key={cabin.color}
          style={{
            offsetPath: `path('${CABLE}')`,
            offsetRotate: "0deg",
            offsetDistance: `${cabin.at}%`,
            animation: `travel 68s linear ${cabin.delay}s infinite`,
          }}
        >
          <path d="M0 0V12" stroke="var(--scene-near)" strokeWidth={2} />
          <rect x={-12} y={12} width={24} height={22} rx={6} fill={cabin.color} />
          <rect x={-8} y={16} width={16} height={8} rx={2} fill="#ffffff" opacity={0.55} />
        </g>
      ))}

      <g
        style={{
          offsetPath: `path('${FLIGHT}')`,
          offsetRotate: "0deg",
          offsetDistance: "38%",
          animation: "travel 54s linear -20s infinite",
        }}
      >
        <path
          d="M-46 0Q-26 -15 -6 -4Q0 -9 6 -4Q26 -15 46 0Q24 -6 6 3Q0 7 -6 3Q-24 -6 -46 0Z"
          fill="var(--scene-near)"
          opacity={0.9}
        />
      </g>

      <path d="M860 800V742Q1010 652 1190 676T1600 640V800Z" fill="var(--scene-hill)" />
      <g fill="var(--scene-llama)">
        <path d={LLAMA} transform="translate(1085 566)" />
        <path d={LLAMA} transform="translate(1230 588) scale(0.78)" />
        <path d={LLAMA} transform="translate(1420 574) scale(-0.9 0.9)" />
      </g>
    </svg>
  );
}
