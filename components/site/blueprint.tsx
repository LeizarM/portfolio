/**
 * Plano del recorrido de un dato, dibujado como en una mesa de trabajo: los nodos son
 * círculos con sus líneas de construcción y las uniones son curvas con sus puntos de ancla.
 */
export function Blueprint({
  nodes,
  className,
  scrub = false,
}: {
  nodes: string[];
  className?: string;
  /** Si es verdadero, el trazo avanza con la variable --p del capítulo en vez de dibujarse al cargar. */
  scrub?: boolean;
}) {
  const draw = scrub ? "bp-scrub" : "bp-draw";
  const width = 960;
  const step = (width - 200) / Math.max(nodes.length - 1, 1);
  const points = nodes.map((label, i) => ({ label, x: 100 + i * step, y: i % 2 === 0 ? 150 : 250 }));
  const r = 52;

  return (
    <svg viewBox={`0 0 ${width} 400`} className={className} aria-hidden fill="none">
      {points.map((p) => (
        <g key={`guide-${p.label}`} stroke="currentColor" strokeOpacity="0.22" strokeWidth="1">
          <line x1={p.x} y1="20" x2={p.x} y2="380" />
          <line x1={p.x - 110} y1={p.y} x2={p.x + 110} y2={p.y} />
        </g>
      ))}
      {points.slice(0, -1).map((p, i) => {
        const q = points[i + 1];
        if (!q) return null;
        const c1x = p.x + step * 0.45;
        const c2x = q.x - step * 0.45;
        return (
          <g key={`link-${p.label}`}>
            <path
              className={draw}
              pathLength={1}
              d={`M ${p.x + r} ${p.y} C ${c1x} ${p.y}, ${c2x} ${q.y}, ${q.x - r} ${q.y}`}
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <g stroke="var(--bp-accent, #dc5000)" strokeWidth="1.25">
              <line x1={p.x + r} y1={p.y} x2={c1x} y2={p.y} />
              <line x1={q.x - r} y1={q.y} x2={c2x} y2={q.y} />
            </g>
            <g fill="var(--bp-accent, #dc5000)">
              <circle cx={c1x} cy={p.y} r="4" />
              <circle cx={c2x} cy={q.y} r="4" />
            </g>
          </g>
        );
      })}
      {points.map((p) => (
        <g key={p.label}>
          <circle className={draw} pathLength={1} cx={p.x} cy={p.y} r={r} stroke="currentColor" strokeWidth="1.5" />
          <circle cx={p.x} cy={p.y} r="9" stroke="var(--bp-accent, #dc5000)" strokeWidth="1.5" />
          <g fill="var(--bp-accent, #dc5000)">
            <rect x={p.x - r - 4} y={p.y - 4} width="8" height="8" />
            <rect x={p.x + r - 4} y={p.y - 4} width="8" height="8" />
            <rect x={p.x - 4} y={p.y - r - 4} width="8" height="8" />
            <rect x={p.x - 4} y={p.y + r - 4} width="8" height="8" />
          </g>
          <text
            x={p.x}
            y={p.y + r + 34}
            textAnchor="middle"
            fill="currentColor"
            fontSize="15"
            fontWeight="600"
            letterSpacing="0.06em"
            style={{ textTransform: "uppercase" }}
          >
            {p.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
