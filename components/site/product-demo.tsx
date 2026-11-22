import type { Locale } from "@/lib/content";

const copy = {
  es: {
    label: "Ilustración del sistema de apoyo para SAP: un cobro registrado en la app móvil aparece en la lista de cobranza y pasa a SAP.",
    nav: ["Precios", "Cobranza", "Producción"],
    title: "Cobranza",
    action: "Registrar cobro",
    pending: "Pendiente",
    done: "En SAP",
  },
  en: {
    label: "Illustration of the support system for SAP: a payment recorded in the mobile app shows up in the collections list and moves into SAP.",
    nav: ["Pricing", "Collections", "Production"],
    title: "Collections",
    action: "Record payment",
    pending: "Pending",
    done: "In SAP",
  },
} satisfies Record<Locale, unknown>;

const rows = [
  [34, 22, 16],
  [26, 30, 12],
  [40, 18, 18],
  [30, 26, 14],
  [22, 32, 16],
  [36, 20, 12],
  [28, 28, 18],
];

function Bar({ w, className = "" }: { w: number; className?: string }) {
  return <span className={`demo-bar ${className}`} style={{ width: `${w}%` }} />;
}

/**
 * Pantalla de producto simplificada (el sistema real es confidencial): solo llevan texto
 * las piezas que cuentan la historia; el resto son barras. Con movimiento reducido se
 * muestra el estado final, sin animación.
 */
export function ProductDemo({ lang }: { lang: Locale }) {
  const t = copy[lang];
  return (
    <div className="demo mt-14" role="img" aria-label={t.label}>
      <div aria-hidden className="demo-stage">
        <div className="demo-window">
          <div className="demo-side">
            <span className="demo-bar demo-mark" />
            {t.nav.map((item, i) => (
              <span key={item} className={i === 1 ? "demo-nav demo-nav-on" : "demo-nav"}>
                <span className="demo-ico" />
                {item}
              </span>
            ))}
            <span className="demo-nav">
              <span className="demo-ico" />
              <Bar w={52} />
            </span>
            <span className="demo-nav">
              <span className="demo-ico" />
              <Bar w={38} />
            </span>
          </div>
          <div className="demo-main">
            <div className="demo-head">
              <span className="demo-title">{t.title}</span>
              <span className="demo-chip" />
              <span className="demo-chip" />
            </div>
            <div className="demo-list">
              <div className="demo-row demo-row-new">
                <Bar w={30} className="demo-bar-strong" />
                <Bar w={24} />
                <span className="demo-pill">
                  <span className="demo-pill-roll">
                    <span>{t.pending}</span>
                    <span className="demo-pill-done">{t.done}</span>
                  </span>
                </span>
              </div>
              <div className="demo-rest">
                {rows.map(([a, b, c], i) => (
                  <div key={i} className="demo-row">
                    <Bar w={a ?? 30} />
                    <Bar w={b ?? 20} />
                    <Bar w={c ?? 14} className="demo-bar-pill" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="demo-phone">
          <span className="demo-bar demo-phone-notch" />
          <div className="demo-phone-card">
            <Bar w={46} />
            <Bar w={70} className="demo-bar-strong demo-bar-tall" />
            <Bar w={58} />
          </div>
          <div className="demo-phone-card">
            <Bar w={38} />
            <Bar w={64} />
          </div>
          <span className="demo-button">
            {t.action}
            <span className="demo-touch" />
          </span>
          <div className="demo-phone-card">
            <Bar w={50} />
            <Bar w={72} />
            <Bar w={44} />
          </div>
        </div>
      </div>
    </div>
  );
}
