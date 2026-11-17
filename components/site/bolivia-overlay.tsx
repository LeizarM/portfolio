/**
 * Bolivia de oeste a este, un símbolo por departamento sobre el paisaje:
 * La Paz (teleférico; el Illimani está en el fondo), Oruro (Sajama), Potosí (salar y flamencos),
 * Cochabamba (Cristo de la Concordia), Chuquisaca (torre blanca de Sucre), Tarija (viñedos),
 * Santa Cruz (palmeras y toborochi), Beni (río y bufeo) y Pando (castaño amazónico).
 */
const CABLE = "M-60 332 L720 284";
const CONDOR = "M-120 170 C120 90 380 210 560 130 S760 110 900 150";
const MACAW = "M1700 330 C1560 250 1420 360 1280 290 S1060 300 980 250";
const LLAMA =
  "M12 112V72Q9 54 24 50H58Q63 34 61 14L59 3L65 9L69 3L71 13Q80 15 82 23Q80 29 72 28Q74 46 70 57Q73 64 71 72V112H63V80H57V112H49V78H30V112H22V80Q17 80 17 86V112Z";

const cabins = [
  { color: "#e5484d", at: 15, delay: -6 },
  { color: "#f5c400", at: 50, delay: -18 },
  { color: "#30a46c", at: 85, delay: -30 },
];

const NEAR = "var(--scene-near)";

function Flamingo({ x, y, flip }: { x: number; y: number; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -1 : 1} 1)`} fill="#f58fb0" stroke="#f58fb0">
      <path d="M-2 0V-19M3 0V-19" strokeWidth={1.6} fill="none" />
      <ellipse cx={0} cy={-25} rx={11} ry={6.5} stroke="none" />
      <path d="M8 -27q9 -6 2 -14q-5 -6 3 -11" strokeWidth={3} fill="none" strokeLinecap="round" />
      <circle cx={14} cy={-53} r={3.4} stroke="none" />
      <path d="M17 -53l5 3" stroke="#3a2a3a" strokeWidth={2} strokeLinecap="round" />
    </g>
  );
}

function Palm({ x, y, height }: { x: number; y: number; height: number }) {
  const top = -height;
  return (
    <g transform={`translate(${x} ${y})`} stroke={NEAR} fill="none" strokeLinecap="round">
      <path d={`M0 0Q8 ${top * 0.5} -4 ${top}`} strokeWidth={8} />
      <g strokeWidth={6} transform={`translate(-4 ${top})`}>
        <path d="M0 0q-30 -24 -62 2" />
        <path d="M0 0q-24 -40 -56 -34" />
        <path d="M0 0q-6 -44 -28 -58" />
        <path d="M0 0q8 -44 30 -56" />
        <path d="M0 0q26 -38 58 -30" />
        <path d="M0 0q32 -22 64 6" />
      </g>
    </g>
  );
}

export function BoliviaOverlay() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1600 800"
      preserveAspectRatio="xMidYMax slice"
      className="pointer-events-none absolute inset-0 size-full"
    >
      {/* Oruro: nevado Sajama, un cono solitario. */}
      <path d="M150 560L288 392Q300 380 312 392L450 560Z" fill="var(--scene-far)" opacity={0.9} />
      <path d="M262 424L288 392Q300 380 312 392L338 424L322 414L306 430L294 416L278 432Z" fill="var(--scene-white)" />

      {/* La Paz: teleférico. */}
      <path d={CABLE} fill="none" stroke={NEAR} strokeWidth={2} opacity={0.6} />
      <path d="M716 284V700M704 300H728" stroke={NEAR} strokeWidth={5} opacity={0.75} />
      {cabins.map((cabin) => (
        <g
          key={cabin.color}
          style={{
            offsetPath: `path('${CABLE}')`,
            offsetRotate: "0deg",
            offsetDistance: `${cabin.at}%`,
            animation: `travel 36s linear ${cabin.delay}s infinite`,
          }}
        >
          <path d="M0 0V12" stroke={NEAR} strokeWidth={2} />
          <rect x={-12} y={12} width={24} height={22} rx={6} fill={cabin.color} />
          <rect x={-8} y={16} width={16} height={8} rx={2} fill="#ffffff" opacity={0.55} />
        </g>
      ))}

      {/* Cóndor sobre los Andes. */}
      <g
        style={{
          offsetPath: `path('${CONDOR}')`,
          offsetRotate: "0deg",
          offsetDistance: "45%",
          animation: "travel 48s linear -18s infinite",
        }}
      >
        <path
          d="M-46 0Q-26 -15 -6 -4Q0 -9 6 -4Q26 -15 46 0Q24 -6 6 3Q0 7 -6 3Q-24 -6 -46 0Z"
          fill={NEAR}
          opacity={0.9}
        />
      </g>

      {/* Cochabamba: el cerro y el Cristo de la Concordia. */}
      <path d="M610 706Q730 580 812 566Q894 580 1010 706Z" fill="var(--scene-hill)" />
      <g fill="var(--scene-white)">
        <rect x={805} y={546} width={14} height={22} />
        <path d="M806 548L808 500H816L818 548Z" />
        <path d="M782 506Q812 498 842 506L842 512Q812 506 782 512Z" />
        <circle cx={812} cy={494} r={6} />
      </g>

      {/* Suelo de punta a punta. */}
      <path d="M0 800V704Q210 684 430 700T810 694T1190 704T1600 692V800Z" fill="var(--scene-hill)" />

      {/* Potosí: salar con flamencos. */}
      <ellipse cx={330} cy={728} rx={170} ry={20} fill="var(--scene-salt)" opacity={0.92} />
      <Flamingo x={250} y={732} />
      <Flamingo x={300} y={738} flip />
      <Flamingo x={372} y={730} />

      {/* Altiplano: llamas. */}
      <g fill="var(--scene-llama)">
        <path d={LLAMA} transform="translate(498 590)" />
        <path d={LLAMA} transform="translate(596 612) scale(0.78)" />
      </g>

      {/* Chuquisaca: torre blanca de Sucre. */}
      <g>
        <rect x={978} y={648} width={52} height={50} fill="var(--scene-white)" />
        <path d="M972 650L1004 630L1036 650Z" fill="#c8553d" />
        <rect x={946} y={612} width={30} height={86} fill="var(--scene-white)" />
        <path d="M946 612Q961 590 976 612Z" fill="var(--scene-white)" />
        <path d="M961 592V578M955 584H967" stroke="var(--scene-white)" strokeWidth={3} />
        <path d="M955 640V626Q961 618 967 626V640Z" fill={NEAR} opacity={0.7} />
        <path d="M996 698V676Q1004 666 1012 676V698Z" fill={NEAR} opacity={0.7} />
      </g>

      {/* Tarija: viñedos. */}
      <g>
        {[0, 1, 2].map((row) => (
          <g key={row} transform={`translate(${1066 + row * 8} ${716 + row * 16})`}>
            <path d="M0 0H96" stroke={NEAR} strokeWidth={2} opacity={0.6} />
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <g key={i} transform={`translate(${8 + i * 16} 0)`}>
                <circle r={7} cy={-5} fill="var(--scene-leaf)" />
                <circle r={2.6} cx={2} cy={2} fill="#8a55c8" />
              </g>
            ))}
          </g>
        ))}
      </g>

      {/* Beni: río y bufeo. */}
      <path d="M1190 800Q1290 738 1420 748T1600 724V800Z" fill="var(--scene-water)" />
      <g transform="translate(1392 748)">
        <path d="M0 0Q28 -44 64 -6Q48 -18 34 -14Q37 -28 28 -32Q24 -20 15 -13Q6 -8 0 0Z" fill="#f3a6b8" />
        <path d="M-10 2h14M56 0h16" stroke="var(--scene-white)" strokeWidth={2.5} strokeLinecap="round" />
      </g>

      {/* Santa Cruz: palmeras y toborochi. */}
      <Palm x={1196} y={704} height={150} />
      <Palm x={1254} y={708} height={190} />
      <g transform="translate(1340 704)">
        <path d="M-9 0Q-27 -42 -11 -80L-7 -112H7L11 -80Q27 -42 9 0Z" fill={NEAR} />
        <g fill="var(--scene-leaf)">
          <circle cx={-26} cy={-128} r={26} />
          <circle cx={22} cy={-134} r={30} />
          <circle cx={-2} cy={-156} r={26} />
        </g>
        <g fill="#f08db2">
          <circle cx={-34} cy={-138} r={4} />
          <circle cx={-8} cy={-166} r={4} />
          <circle cx={28} cy={-150} r={4} />
          <circle cx={10} cy={-122} r={4} />
          <circle cx={-18} cy={-116} r={4} />
        </g>
      </g>

      {/* Pando: castaño amazónico, el árbol más alto. */}
      <g transform="translate(1486 700)">
        <rect x={-6} y={-236} width={12} height={236} fill={NEAR} />
        <path d="M0 -150L-28 -196M0 -170L30 -212" stroke={NEAR} strokeWidth={6} strokeLinecap="round" />
        <g fill="var(--scene-leaf)">
          <ellipse cx={0} cy={-256} rx={78} ry={34} />
          <ellipse cx={-44} cy={-226} rx={40} ry={22} />
          <ellipse cx={46} cy={-232} rx={44} ry={24} />
          <ellipse cx={4} cy={-288} rx={44} ry={22} />
        </g>
      </g>

      {/* Paraba sobre el oriente. */}
      <g
        style={{
          offsetPath: `path('${MACAW}')`,
          offsetRotate: "0deg",
          offsetDistance: "40%",
          animation: "travel 42s linear -9s infinite",
        }}
      >
        <path d="M-4 0Q-22 -18 -34 -6Q-18 -6 -6 4Z" fill="#2b6fd6" />
        <path d="M4 0Q14 -20 30 -12Q16 -6 8 4Z" fill="#2b6fd6" />
        <ellipse cx={0} cy={2} rx={11} ry={5} fill="#e23d3d" />
        <path d="M9 3L30 8L10 7Z" fill="#f5c400" />
      </g>
    </svg>
  );
}
