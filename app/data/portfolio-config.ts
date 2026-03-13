export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  tech: string[];
}

export interface Project {
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  image: string;
  url: string;
}

export interface SkillCategory {
  name: string;
  icon: string;
  skills: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
  label: string;
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  date: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
}

export interface PortfolioConfig {
  hero: {
    name: string;
    title: string;
    subtitle: string;
    bootSequence: string[];
  };
  about: {
    text: string;
  };
  experience: Experience[];
  projects: Project[];
  skills: SkillCategory[];
  education: Education[];
  certifications: Certification[];
  contact: {
    email: string;
    socials: SocialLink[];
  };
  easterEgg: {
    asciiArt: string;
    message: string;
  };
}

export const portfolioConfig: PortfolioConfig = {
  hero: {
    name: 'Marcelo Javier Jaimes',
    title: 'Senior Full Stack Developer | Java Ecosystem, Microservices & ERP Integrations Specialist',
    subtitle:
      'Bridging the gap between scalable microservices architecture and robust IT infrastructure.',
    bootSequence: [
      '[BOOT] Initializing system...',
      '[OK] Loading kernel modules...',
      '[OK] Mounting filesystems...',
      '[OK] Starting network services...',
      '[OK] Connecting to portfolio.db...',
      '[READY] System online. Welcome.',
    ],
  },
  about: {
    text: "Systems Engineer and Senior Full Stack Developer with over 6 years of experience in developing robust IT solutions and scalable enterprise applications. I specialize in the Java ecosystem (Spring Boot) and bring solid experience in designing microservice architectures. My technical depth extends to advanced database optimization (SQL/T-SQL) and building integrated modules for SAP Business One. When I'm not debugging or configuring a Mikrotik router, I enjoy exploring the deep lore of universes like Warhammer 40,000 and Berserk, or experimenting with AI image generation.",
  },
  experience: [
    {
      company: 'Esppapel S.R.L.',
      role: 'SysAdmin / Full Stack Developer',
      period: 'June 2022 – Present',
      location: 'La Paz, Bolivia',
      description:
        'Designed and developed a comprehensive auxiliary system integrated with SAP Business One, centralizing and automating sales and production operations.',
      highlights: [
        'Managed network infrastructure through configuration of Mikrotik and TP-Link routers, ensuring system security and high availability.',
        'Programmed strict data integrity validations using Stored Procedures and Triggers in SQL Server, preventing inaccurate data entry by end-users.',
        'Implemented a dynamic Pricing Module that drastically reduced tariff update times in response to constant US Dollar fluctuations in Bolivia, safeguarding profit margins.',
        'Developed payment management module, enabling commercial team to log deposits in real-time and accelerating flow of accounting information.',
        'Automated production batch registration, enhancing inventory traceability.',
      ],
      tech: ['Java', 'Spring Boot', 'SAP B1', 'SQL Server', 'T-SQL', 'Mikrotik', 'TP-Link'],
    },
    {
      company: 'Impexpap S.A.',
      role: 'Systems Manager',
      period: 'January 2018 – June 2022',
      location: 'La Paz, Bolivia',
      description:
        'Led the IT department in analysis, design, implementation, and deployment of enterprise software, enhancing software reliability and user satisfaction.',
      highlights: [
        'Developed scalable applications with Java and Spring Boot, streamlining internal operational processes for improved workflow.',
        'Built user-friendly interfaces using Angular and Vue.js, promoting staff adoption of new tools and improving overall user experience.',
        'Managed version control and code repositories using Git and GitHub.',
      ],
      tech: ['Java', 'Spring Boot', 'Angular', 'Vue.js', 'SQL Server', 'Git'],
    },
    {
      company: 'GEVERO LTDA',
      role: 'Intern (Technical Support and QA)',
      period: 'February 2017 – October 2017',
      location: 'La Paz, Bolivia',
      description:
        'Provided first-level technical support, promptly resolving user incidents to enhance user experience.',
      highlights: [
        'Executed comprehensive Quality Assurance (QA) testing, ensuring application stability for reliable production deployment.',
        'Assisted team with project coordination and communication across departments.',
        'Supported data collection and analysis for ongoing projects and reports.',
        'Conducted research to inform project strategies and operational improvements.',
      ],
      tech: ['QA Testing', 'Technical Support', 'Data Analysis'],
    },
  ],
  projects: [
    {
      title: 'Professional Web Portfolio',
      subtitle: 'Modern Portfolio Application',
      description:
        'Application developed with Next.js, integrating modern design principles, Framer Motion animations, and optimized performance with a terminal-inspired dark sci-fi aesthetic.',
      tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      image: 'https://cdn.abacus.ai/images/983714cb-6f1c-47a4-bcd8-0321b68e4344.jpg',
      url: '#',
    },
    {
      title: 'Polla Mundialera',
      subtitle: 'Sports Forecasting System',
      description:
        'Full-stack development of a web application for prediction management, including complex user logic, scoring algorithms, and real-time rankings for sports tournament predictions.',
      tech: ['Next.js', 'Java Spring Boot', 'SQL Server'],
      image: 'https://cdn.abacus.ai/images/65123fb9-6048-4d94-8fb2-05483b9c14b9.png',
      url: '#',
    },
    {
      title: 'E-commerce Microservices',
      subtitle: 'Distributed Backend Architecture',
      description:
        'Distributed backend architecture for a shopping cart system, implementing efficient inter-service communication and high scalability.',
      tech: ['Java', 'Spring Boot', 'Spring Cloud', 'PostgreSQL'],
      image: 'https://cdn.abacus.ai/images/830e47dd-71d8-4d26-822f-67c8cdf95895.png',
      url: '#',
    },
    {
      title: 'SAP B1 Integrations',
      subtitle: 'Data Integrity Automation',
      description:
        'Custom Stored Procedures and Triggers in SQL Server to ensure data integrity and automate business logic within SAP Business One.',
      tech: ['SQL Server', 'T-SQL', 'Stored Procedures', 'SAP Business One'],
      image: 'https://cdn.abacus.ai/images/89ad5b75-5d7a-4685-8aa8-b84d4bb5d494.png',
      url: '#',
    },
  ],
  skills: [
    {
      name: 'Backend',
      icon: 'Server',
      skills: ['Java', 'Spring Boot', 'Microservices', 'PHP'],
    },
    {
      name: 'Frontend',
      icon: 'Monitor',
      skills: ['JavaScript', 'TypeScript', 'Next.js', 'Angular', 'Vue.js', 'HTML/CSS'],
    },
    {
      name: 'Database & ERP',
      icon: 'Database',
      skills: ['SQL Server', 'T-SQL', 'Stored Procedures', 'Triggers', 'Functions', 'SAP Business One'],
    },
    {
      name: 'Infrastructure',
      icon: 'Network',
      skills: ['SysAdmin', 'Git', 'GitHub', 'Mikrotik', 'TP-Link', 'Networking'],
    },
  ],
  education: [
    {
      degree: 'Systems Engineering',
      institution: 'Universidad Loyola',
      location: 'La Paz',
      date: 'November 2019',
    },
    {
      degree: 'Senior Technician',
      institution: 'Instituto Comercial Superior De La Nación "INCOS"',
      location: 'La Paz',
      date: 'November 2014',
    },
  ],
  certifications: [
    {
      name: 'Mikrotik Configuration and Administration',
      issuer: 'Pentester77',
      date: '03/2021',
    },
    {
      name: 'Mobile Programming with Google Flutter',
      issuer: '',
      date: '02/2021',
    },
    {
      name: 'Web Programming',
      issuer: '',
      date: '03/2017 – 05/2017',
    },
  ],
  contact: {
    email: 'marceloeziojaimes@gmail.com',
    socials: [
      {
        platform: 'LinkedIn',
        url: 'https://www.linkedin.com/in/marcelo-javier-jaimes-72942630b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
        label: 'https://www.linkedin.com/in/ren-sama'
      },
      {
        platform: 'GitHub',
        url: 'https://github.com/LeizarM',
        label: 'github.com/LeizarM',
      },
    ],
  },
  easterEgg: {
    asciiArt: `
    /\\_/\\  
   ( o.o ) 
    > ^ <
   /|   |\\  
  (_|   |_)
`,
    message: 'System status: All systems nominal. Supervised by Tama (Head of QA)',
  },
};