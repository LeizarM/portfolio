/**
 * Todo el contenido del sitio vive aquí, en español e inglés.
 * Para editar un texto, un proyecto o un enlace no hace falta tocar componentes.
 */

export type Locale = "es" | "en";
export const locales: Locale[] = ["es", "en"];

export type Localized = Record<Locale, string>;
export type LocalizedList = Record<Locale, string[]>;

export type LineId = "backend" | "mobile" | "data" | "infra";

export interface Line {
  id: LineId;
  name: Localized;
  summary: Localized;
  /** Tecnologías del área: en qué proyectos se usaron (por slug) y, si aplica, dónde más. */
  tech: { name: string; in: string[]; other?: Localized }[];
}

export interface ProjectLink {
  label: Localized;
  href: string;
}

export interface Project {
  slug: string;
  title: Localized;
  /** Nombre corto para encabezados de tabla. */
  short: Localized;
  kind: Localized;
  summary: Localized;
  lines: LineId[];
  /** Color del proyecto: una de sus áreas. */
  accent: LineId;
  /** Recorrido de un dato por el sistema, de la pantalla al almacenamiento. */
  flow: string[];
  stack: string[];
  /** Proyectos de empresa: sin nombre, sin capturas, sin repositorio. */
  confidential: boolean;
  problem: Localized;
  role: Localized;
  build: LocalizedList;
  status: Localized;
  links: ProjectLink[];
}

export interface Job {
  company: string;
  role: Localized;
  period: Localized;
  place: string;
  summary: Localized;
  points: LocalizedList;
}

export const site = {
  name: "Marcelo Javier Jaimes",
  shortName: "Marcelo Jaimes",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://leizarm.github.io/portfolio",
  location: { es: "La Paz, Bolivia", en: "La Paz, Bolivia" } satisfies Localized,
  email: "marceloeziojaimes@gmail.com",
  linkedin: "https://www.linkedin.com/in/mmarcelo-javier-jaimes/",
  github: "https://github.com/LeizarM",
  /** Ruta del CV dentro de /public (por ejemplo "/cv-marcelo-jaimes.pdf"). Vacío oculta el botón. */
  cv: "",
};

export const hero = {
  /** El titular va en dos partes: entre ambas se incrusta la cápsula con el paisaje. */
  headline: {
    es: ["Construyo el", "software que mantiene una empresa en marcha."],
    en: ["I build the", "software that keeps a company running."],
  },
  role: {
    es: "Desarrollador backend y móvil",
    en: "Backend and mobile developer",
  },
  pitch: {
    es: "El sistema que acompaña a SAP, los servicios en Java, las apps en Flutter y la red que los sostiene.",
    en: "The system alongside SAP, the Java services, the Flutter apps and the network underneath.",
  },
};

export const about = {
  paragraphs: {
    es: [
      "Soy ingeniero de sistemas. Desde 2018 respondo por el software de empresas de distribución en La Paz: lo diseño, lo programo, lo despliego y atiendo cuando algo falla un lunes a las ocho.",
      "Eso me dejó una costumbre: no entrego nada que no pueda mantener yo mismo. Prefiero una regla clara en la base de datos a una validación que alguien puede saltarse, y un despliegue aburrido a uno ingenioso.",
      "Fuera del trabajo monto servicios en mi propio servidor, automatizo lo que hago dos veces y experimento con arte generado por IA.",
    ],
    en: [
      "I'm a systems engineer. Since 2018 I've been accountable for the software of distribution companies in La Paz: I design it, write it, deploy it and pick up when something breaks at eight on a Monday.",
      "That left me with a habit: I don't ship anything I couldn't maintain myself. I'd rather have a clear rule in the database than a validation someone can skip, and a boring deploy over a clever one.",
      "Outside work I self-host my own services, automate anything I do twice and experiment with AI-generated art.",
    ],
  } satisfies LocalizedList,
};

export const lines: Line[] = [
  {
    id: "backend",
    name: { es: "Backend", en: "Backend" },
    summary: {
      es: "Servicios y APIs en el ecosistema Java, con NestJS en proyectos propios.",
      en: "Services and APIs in the Java ecosystem, with NestJS on personal projects.",
    },
    tech: [
      { name: "Java", in: ["sistema-apoyo-sap", "yahveh"] },
      { name: "Spring Boot", in: ["sistema-apoyo-sap"] },
      { name: "Quarkus", in: ["yahveh"] },
      { name: "NestJS", in: ["quinielas"] },
      { name: "JWT", in: ["yahveh", "quinielas"] },
    ],
  },
  {
    id: "mobile",
    name: { es: "Móvil y frontend", en: "Mobile and frontend" },
    summary: {
      es: "Apps para iOS y Android, y las interfaces web que las acompañan.",
      en: "iOS and Android apps, and the web interfaces that go with them.",
    },
    tech: [
      { name: "Flutter", in: ["sistema-apoyo-sap", "yahveh"] },
      { name: "Riverpod", in: ["sistema-apoyo-sap"] },
      { name: "React Native + Expo", in: ["quinielas"] },
      { name: "TypeScript", in: ["quinielas"], other: { es: "Este sitio", en: "This site" } },
      { name: "Angular y Vue.js", in: [], other: { es: "Impexpap (2018–2022)", en: "Impexpap (2018–2022)" } },
    ],
  },
  {
    id: "data",
    name: { es: "ERP y datos", en: "ERP and data" },
    summary: {
      es: "SAP Business One por dentro: la base de datos, sus reglas y sus reportes.",
      en: "SAP Business One from the inside: the database, its rules and its reports.",
    },
    tech: [
      { name: "SQL Server y T-SQL", in: ["sistema-apoyo-sap", "sap-b1-integridad"] },
      { name: "SAP Business One", in: ["sistema-apoyo-sap", "sap-b1-integridad"] },
      { name: "Procedimientos y triggers", in: ["sap-b1-integridad"] },
      { name: "PostgreSQL", in: ["yahveh", "quinielas"] },
      { name: "Prisma", in: ["quinielas"] },
    ],
  },
  {
    id: "infra",
    name: { es: "Infraestructura", en: "Infrastructure" },
    summary: {
      es: "Servidores, contenedores y la red de la oficina.",
      en: "Servers, containers and the office network.",
    },
    tech: [
      { name: "Linux (Fedora)", in: ["quinielas"], other: { es: "Servidor propio", en: "Home server" } },
      { name: "Docker y Podman", in: ["quinielas"], other: { es: "Servidor propio", en: "Home server" } },
      { name: "Nginx y CrowdSec", in: ["quinielas"] },
      { name: "GitHub Actions", in: ["quinielas"], other: { es: "Este sitio", en: "This site" } },
      { name: "MikroTik", in: [], other: { es: "Red de Esppapel", en: "Esppapel network" } },
    ],
  },
];

export const projects: Project[] = [
  {
    slug: "sistema-apoyo-sap",
    title: { es: "Sistema de apoyo para SAP", en: "Support system for SAP" },
    short: { es: "Apoyo SAP", en: "SAP support" },
    kind: { es: "Sistema de empresa, en producción", en: "Company system, in production" },
    summary: {
      es: "El sistema que acompaña a SAP Business One en una empresa de distribución. No reemplaza al ERP. Cubre precios, cobranza y producción, que SAP no resolvía.",
      en: "The system that sits alongside SAP Business One at a distribution company. It doesn't replace the ERP. It covers pricing, collections and production, which SAP didn't handle.",
    },
    lines: ["backend", "mobile", "data", "infra"],
    accent: "backend",
    flow: ["Flutter", "Spring Boot", "SQL Server", "SAP Business One"],
    stack: ["Java", "Spring Boot", "SQL Server", "T-SQL", "SAP Business One", "Flutter", "Riverpod"],
    confidential: true,
    problem: {
      es: "SAP Business One llevaba la contabilidad y el inventario, pero la operación diaria de ventas y producción necesitaba un sistema propio que la centralizara y la automatizara. Además, con el dólar moviéndose constantemente en Bolivia, actualizar las tarifas a mano ponía en riesgo el margen.",
      en: "SAP Business One handled accounting and inventory, but day-to-day sales and production needed a system of their own to centralize and automate them. On top of that, with the US dollar constantly moving in Bolivia, updating price lists by hand put margins at risk.",
    },
    role: {
      es: "Diseño, desarrollo y operación completos: modelo de datos, servicios, app, despliegue y soporte a los usuarios.",
      en: "End-to-end design, development and operation: data model, services, app, deployment and user support.",
    },
    build: {
      es: [
        "Servicios en Java con Spring Boot que leen y escriben sobre la misma base SQL Server de SAP Business One.",
        "Módulo de precios que recalcula las tarifas cuando cambia el tipo de cambio, en lugar de editarlas una por una.",
        "Módulo de cobranza donde el equipo comercial registra depósitos en el momento, para que contabilidad los vea sin esperar.",
        "Registro automático de lotes de producción, que deja trazabilidad en el inventario.",
        "Cliente en Flutter con Riverpod.",
      ],
      en: [
        "Java services on Spring Boot that read and write against the same SQL Server database SAP Business One uses.",
        "A pricing module that recalculates price lists when the exchange rate changes, instead of editing them one by one.",
        "A collections module where the sales team logs deposits as they happen, so accounting sees them without waiting.",
        "Automatic registration of production batches, which leaves a trace in inventory.",
        "A Flutter client with Riverpod.",
      ],
    },
    status: {
      es: "En producción desde 2022 y en uso diario. Los detalles de la empresa y las capturas se omiten por confidencialidad; puedo mostrarlo en una llamada.",
      en: "In production since 2022 and used daily. Company details and screenshots are left out for confidentiality; I can walk through it on a call.",
    },
    links: [],
  },
  {
    slug: "yahveh",
    title: { es: "Yahveh", en: "Yahveh" },
    short: { es: "Yahveh", en: "Yahveh" },
    kind: { es: "Ventas e inventario", en: "Sales and inventory" },
    summary: {
      es: "Sistema de ventas e inventario con backend en Quarkus y app en Flutter: clientes, precios, descuentos y notas de entrega.",
      en: "A sales and inventory system with a Quarkus backend and a Flutter app: customers, pricing, discounts and delivery notes.",
    },
    lines: ["backend", "mobile", "data"],
    accent: "mobile",
    flow: ["Flutter", "Quarkus", "PostgreSQL"],
    stack: ["Java 21", "Quarkus 3", "PostgreSQL", "JWT", "Flutter"],
    confidential: false,
    problem: {
      es: "Un negocio de distribución necesita saber qué tiene, a quién le vende y a qué precio. Yahveh cubre ese recorrido: catálogo de artículos por línea y familia, precios por artículo, reglas de descuento, clientes por zona, notas de entrega e inventario.",
      en: "A distribution business needs to know what it has, who it sells to and at what price. Yahveh covers that path: an item catalogue by line and family, per-item pricing, discount rules, customers by zone, delivery notes and inventory.",
    },
    role: {
      es: "Proyecto completo: API, modelo de datos y app.",
      en: "The whole project: API, data model and app.",
    },
    build: {
      es: [
        "API REST en Quarkus 3 sobre Java 21, con validación de entrada y controles de salud.",
        "Acceso a PostgreSQL por JDBC con un pool de conexiones, sin ORM, para mantener el SQL a la vista.",
        "Autenticación con JWT.",
        "Reportes servidos por la misma API.",
        "App en Flutter para Android, iOS y web.",
      ],
      en: [
        "REST API on Quarkus 3 and Java 21, with input validation and health checks.",
        "PostgreSQL access over JDBC with a connection pool, no ORM, to keep the SQL in plain sight.",
        "JWT authentication.",
        "Reports served by the same API.",
        "A Flutter app for Android, iOS and web.",
      ],
    },
    status: {
      es: "El código de la app es público; el backend está en un repositorio privado.",
      en: "The app code is public; the backend lives in a private repository.",
    },
    links: [
      {
        label: { es: "Código de la app en GitHub", en: "App code on GitHub" },
        href: "https://github.com/LeizarM/yahveh",
      },
    ],
  },
  {
    slug: "quinielas",
    title: { es: "Sistema de quinielas deportivas", en: "Sports pool system" },
    short: { es: "Quinielas", en: "Sports pool" },
    kind: { es: "App móvil y backend", en: "Mobile app and backend" },
    summary: {
      es: "App de quinielas deportivas, con su propio backend y un despliegue que monté de principio a fin en un servidor Fedora.",
      en: "A sports pool app with its own backend and a deployment I set up end to end on a Fedora server.",
    },
    lines: ["mobile", "backend", "infra"],
    accent: "infra",
    flow: ["React Native", "Nginx + CrowdSec", "NestJS", "PostgreSQL"],
    stack: ["React Native", "Expo", "NestJS", "Prisma", "PostgreSQL", "Docker", "Nginx", "CrowdSec", "GitHub Actions"],
    confidential: false,
    problem: {
      es: "Quería un proyecto donde me tocara resolver todo lo que en una empresa suele estar repartido: la app, la API, la base de datos y, sobre todo, ponerlo en internet de forma segura.",
      en: "I wanted a project where I had to solve everything that is usually split across a team: the app, the API, the database and, above all, putting it on the internet safely.",
    },
    role: {
      es: "Proyecto personal completo, de la app al servidor.",
      en: "A full personal project, from the app to the server.",
    },
    build: {
      es: [
        "App en React Native con Expo y TypeScript estricto: registro, jornadas activas, historial y panel de administración.",
        "API en NestJS con Prisma sobre PostgreSQL.",
        "La base de datos vive en una red interna de contenedores, sin exposición a internet.",
        "Nginx delante con TLS y límite de peticiones, y CrowdSec bloqueando tráfico malicioso.",
        "GitHub Actions construye la imagen, la publica en GHCR y la despliega por SSH.",
      ],
      en: [
        "A React Native app on Expo with strict TypeScript: sign-up, active match days, history and an admin panel.",
        "A NestJS API with Prisma on PostgreSQL.",
        "The database sits on an internal container network, not exposed to the internet.",
        "Nginx in front with TLS and rate limiting, and CrowdSec blocking malicious traffic.",
        "GitHub Actions builds the image, publishes it to GHCR and deploys it over SSH.",
      ],
    },
    status: {
      es: "En desarrollo. La autenticación, las jornadas y el panel funcionan; las apuestas en grupo y la billetera están pendientes.",
      en: "In development. Authentication, match days and the admin panel work; group pools and the wallet are still to come.",
    },
    links: [
      {
        label: { es: "App en GitHub", en: "App on GitHub" },
        href: "https://github.com/LeizarM/polla-frontend",
      },
      {
        label: { es: "Backend en GitHub", en: "Backend on GitHub" },
        href: "https://github.com/LeizarM/polla-backend",
      },
    ],
  },
  {
    slug: "sap-b1-integridad",
    title: { es: "Reglas de integridad en SAP Business One", en: "Integrity rules in SAP Business One" },
    short: { es: "Reglas SAP B1", en: "SAP B1 rules" },
    kind: { es: "Base de datos, en producción", en: "Database, in production" },
    summary: {
      es: "Procedimientos almacenados y triggers que impiden que un documento mal cargado llegue a la contabilidad.",
      en: "Stored procedures and triggers that stop a badly entered document from reaching the books.",
    },
    lines: ["data"],
    accent: "data",
    flow: ["SAP Business One", "Triggers y procedimientos", "SQL Server", "Crystal Reports"],
    stack: ["SQL Server", "T-SQL", "SAP Business One", "Crystal Reports"],
    confidential: true,
    problem: {
      es: "En un ERP, un dato mal ingresado no se queda quieto: se convierte en un inventario que no cuadra o en un reporte que nadie cree. Corregirlo después cuesta mucho más que impedirlo.",
      en: "In an ERP, a wrong entry doesn't stay put: it turns into inventory that doesn't add up or a report nobody trusts. Fixing it later costs far more than preventing it.",
    },
    role: {
      es: "Análisis de cada regla con el área usuaria, implementación y mantenimiento.",
      en: "Working out each rule with the business area, then implementing and maintaining it.",
    },
    build: {
      es: [
        "Validaciones en procedimientos almacenados y triggers que rechazan el documento antes de guardarlo, con un mensaje que el usuario entiende.",
        "Las reglas viven en la base de datos, así que se cumplen sin importar desde qué pantalla o sistema llegue el dato.",
        "Reportes y formatos en Crystal Reports sobre las mismas consultas.",
      ],
      en: [
        "Validations in stored procedures and triggers that reject the document before it is saved, with a message the user can understand.",
        "The rules live in the database, so they hold no matter which screen or system the data comes from.",
        "Reports and layouts in Crystal Reports on top of the same queries.",
      ],
    },
    status: {
      es: "En producción en varias sociedades. El código es propiedad de la empresa y no es público.",
      en: "In production across several company databases. The code belongs to the company and isn't public.",
    },
    links: [],
  },
];

export const jobs: Job[] = [
  {
    company: "Esppapel S.R.L.",
    role: { es: "Administrador de sistemas y desarrollador full stack", en: "SysAdmin and full stack developer" },
    period: { es: "Junio de 2022 a la fecha", en: "June 2022 to present" },
    place: "La Paz",
    summary: {
      es: "Responsable del sistema de apoyo integrado con SAP Business One y de la infraestructura que lo sostiene.",
      en: "Accountable for the companion system integrated with SAP Business One and for the infrastructure under it.",
    },
    points: {
      es: [
        "Diseñé y desarrollé el sistema que centraliza ventas y producción alrededor de SAP Business One.",
        "Creé el módulo de precios que actualiza tarifas ante cada movimiento del dólar.",
        "Implementé el registro de depósitos en tiempo real para el equipo comercial.",
        "Escribí las validaciones en SQL Server que impiden el ingreso de datos incorrectos.",
        "Administro la red con equipos MikroTik y TP-Link.",
      ],
      en: [
        "Designed and built the system that centralizes sales and production around SAP Business One.",
        "Created the pricing module that updates price lists with every move of the dollar.",
        "Implemented real-time deposit logging for the sales team.",
        "Wrote the SQL Server validations that keep incorrect data out.",
        "Run the network on MikroTik and TP-Link equipment.",
      ],
    },
  },
  {
    company: "Impexpap S.A.",
    role: { es: "Encargado de sistemas", en: "Systems manager" },
    period: { es: "Enero de 2018 a junio de 2022", en: "January 2018 to June 2022" },
    place: "La Paz",
    summary: {
      es: "A cargo del área de sistemas: análisis, desarrollo y puesta en marcha del software interno.",
      en: "In charge of the IT area: analysis, development and rollout of internal software.",
    },
    points: {
      es: [
        "Desarrollé aplicaciones internas con Java y Spring Boot.",
        "Construí sus interfaces con Angular y Vue.js.",
        "Gestioné el control de versiones y los repositorios con Git y GitHub.",
      ],
      en: [
        "Built internal applications with Java and Spring Boot.",
        "Built their interfaces with Angular and Vue.js.",
        "Managed version control and repositories with Git and GitHub.",
      ],
    },
  },
  {
    company: "GEVERO LTDA",
    role: { es: "Pasante de soporte técnico y QA", en: "Technical support and QA intern" },
    period: { es: "Febrero a octubre de 2017", en: "February to October 2017" },
    place: "La Paz",
    summary: {
      es: "Soporte de primer nivel y pruebas de calidad antes de cada salida a producción.",
      en: "First-level support and quality testing ahead of each production release.",
    },
    points: { es: [], en: [] },
  },
];

export const education: { title: Localized; school: string; year: string }[] = [
  {
    title: { es: "Ingeniería de Sistemas", en: "Systems Engineering" },
    school: "Universidad Loyola",
    year: "2019",
  },
  {
    title: { es: "Técnico Superior", en: "Higher Technical Degree" },
    school: "Instituto Comercial Superior de la Nación (INCOS)",
    year: "2014",
  },
];

export const lab: { title: Localized; body: Localized }[] = [
  {
    title: { es: "Self-hosting", en: "Self-hosting" },
    body: {
      es: "Mis servicios corren en casa, sobre Fedora y Podman. Si se cae algo, el que no duerme soy yo.",
      en: "My services run at home on Fedora and Podman. If something goes down, I'm the one losing sleep.",
    },
  },
  {
    title: { es: "Automatización", en: "Automation" },
    body: {
      es: "Si hago una tarea dos veces, la tercera la hace un script.",
      en: "If I do a task twice, a script does it the third time.",
    },
  },
  {
    title: { es: "Micro-SaaS", en: "Micro-SaaS" },
    body: {
      es: "Productos pequeños que resuelven un solo problema y se mantienen solos.",
      en: "Small products that solve one problem and look after themselves.",
    },
  },
  {
    title: { es: "Arte con IA", en: "AI art" },
    body: {
      es: "Genero imágenes con modelos locales. Es mi forma de entender cómo funcionan por dentro.",
      en: "I generate images with local models. It's how I learn what goes on inside them.",
    },
  },
];

/** Frases que rotan en el inicio. */
export const heroRotating = {
  lead: { es: "Me dedico a", en: "I work on" },
  phrases: {
    es: ["servicios en Java y Quarkus", "apps en Flutter", "módulos sobre SAP Business One", "la red que lo sostiene"],
    en: ["services in Java and Quarkus", "apps in Flutter", "modules on SAP Business One", "the network underneath"],
  },
} satisfies { lead: Localized; phrases: LocalizedList };

export const band: string[] = ["Java", "Spring Boot", "Quarkus", "Flutter", "SQL Server", "SAP Business One", "PostgreSQL", "NestJS"];

export const labTicker: string[] = [
  "Fedora",
  "Podman",
  "MikroTik",
  "Nginx",
  "CrowdSec",
  "PostgreSQL",
  "GitHub Actions",
  "Modelos locales",
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Proyectos, en el mismo orden, para usarlos como columnas. */
export function projectShort(slug: string, lang: Locale): string {
  return getProject(slug)?.short[lang] ?? slug;
}

export function getLine(id: LineId): Line {
  const line = lines.find((l) => l.id === id);
  if (!line) throw new Error(`Línea desconocida: ${id}`);
  return line;
}
