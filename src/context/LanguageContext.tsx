"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useSyncExternalStore } from "react";

export type Locale = "en" | "de" | "fa";

export interface Translations {
  // Navigation & General
  navStack: string;
  navProjects: string;
  navAbout: string;
  navProcess: string;
  navContact: string;
  navLetsBuild: string;
  navTagline: string;

  // Hero Section
  heroTagline: string;
  heroHeadlinePrefix: string;
  heroHeadlineHighlight: string;
  heroHeadlineSuffix: string;
  heroSubline: string;
  heroCtaWork: string;
  heroCtaBuild: string;
  heroScrollDown: string;
  heroRouteLabel: string;
  heroRouteSub: string;
  heroEscrowLabel: string;
  heroEscrowSub: string;
  heroPinLabel: string;
  heroPinSub: string;
  heroKycLabel: string;
  heroKycSub: string;
  heroManifestLabel: string;
  heroManifestSub: string;
  heroSoloBadge: string;

  // Stack/Bento Section
  stackTagline: string;
  stackTitle: string;
  stackSubtitle: string;
  stackFrontendTitle: string;
  stackFrontendDesc: string;
  stackMobileTitle: string;
  stackMobileDesc: string;
  stackBackendTitle: string;
  stackBackendDesc: string;
  stackToolsTitle: string;
  stackToolsDesc: string;
  stackLevelExpert: string;
  stackLevelHighlySkilled: string;
  stackLevelFluidMotion: string;
  stackLevelSemanticHTML: string;
  stackSimulatorTitle: string;
  stackSimulatorDesc: string;
  stackLatencyTitle: string;
  stackLatencyDB: string;
  stackLatencyCached: string;
  stackSeoTitle: string;
  stackSeoDesc: string;

  // Portfolio/Projects Section
  portfolioTagline: string;
  portfolioTitle: string;
  portfolioSubtitle: string;
  portfolioBarandeTitle: string;
  portfolioBarandeDesc: string;
  portfolioSheenTitle: string;
  portfolioSheenDesc: string;
  portfolioEscrowTitle: string;
  portfolioEscrowDesc: string;
  portfolioPinTitle: string;
  portfolioPinDesc: string;
  portfolioKycTitle: string;
  portfolioKycDesc: string;
  portfolioManifestTitle: string;
  portfolioManifestDesc: string;
  portfolioInquireMobile: string;
  portfolioLcpTitle: string;
  portfolioLcpDesc: string;
  portfolioSeoTitle: string;
  portfolioSeoDesc: string;
  portfolioInquireWeb: string;

  // Process Section
  processTagline: string;
  processTitle: string;
  processSubtitle: string;
  processStep1Title: string;
  processStep1Desc: string;
  processStep1Bullets: string[];
  processStep2Title: string;
  processStep2Desc: string;
  processStep2Bullets: string[];
  processStep3Title: string;
  processStep3Desc: string;
  processStep3Bullets: string[];

  // Contact Section
  contactTagline: string;
  contactTitle: string;
  contactSubtitle: string;
  contactCardTitle: string;
  contactCardSubtitle: string;
  contactNameLabel: string;
  contactNamePlaceholder: string;
  contactEmailLabel: string;
  contactEmailPlaceholder: string;
  contactFocusLabel: string;
  contactFocusOption1: string;
  contactFocusOption2: string;
  contactFocusOption3: string;
  contactFocusOption4: string;
  contactMessageLabel: string;
  contactMessagePlaceholder: string;
  contactErrorText: string;
  contactSubmitEncrypting: string;
  contactSubmitButton: string;
  contactSuccessTitle: string;
  contactSuccessDesc: string;
  contactSuccessBtn: string;

  // Phone Mockup (Barande)
  mockupPhoneTag: string;
  mockupPhoneTabTravelers: string;
  mockupPhoneTabSenders: string;
  mockupPhoneCapacity: string;
  mockupPhoneReward: string;
  mockupPhoneDesc: string;
  mockupPhoneWeight: string;
  mockupPhoneEscrowActive: string;
  mockupPhoneHandshake: string;
  mockupPhoneMatched: string;
  mockupPhonePinHelp: string;
  mockupPhoneDisbursed: string;

  // Browser Mockup (Sheen Berlin)
  mockupBrowserBeautyStudio: string;
  mockupBrowserSubheading: string;
  mockupBrowserDesc: string;
  mockupBrowserCta: string;
  mockupBrowserProductLabel: string;
  mockupBrowserTabSite: string;
  mockupBrowserTabLighthouse: string;
  mockupBrowserSeoTag: string;
  mockupBrowserRankText: string;
  mockupBrowserAuditTag: string;
  mockupBrowserPerformance: string;
  mockupBrowserSeoPractices: string;
  mockupBrowserFooterNote: string;

  // Video Scroll Section
  videoScrollTagline: string;
  videoScrollTitle: string;
  videoScrollSubtitle: string;
  videoScrollPhase1Title: string;
  videoScrollPhase1Desc: string;
  videoScrollPhase1Bullets: string[];
  videoScrollPhase2Title: string;
  videoScrollPhase2Desc: string;
  videoScrollPhase2Bullets: string[];
  videoScrollPhase3Title: string;
  videoScrollPhase3Desc: string;
  videoScrollPhase3Bullets: string[];
  videoScrollPhase4Title: string;
  videoScrollPhase4Desc: string;
  videoScrollPhase4Bullets: string[];

  // About Me Section
  aboutTagline: string;
  aboutTitle: string;
  aboutParagraph1: string;
  aboutParagraph2: string;
  aboutParagraph3: string;
  aboutBadgeJourney: string;
  aboutBadgePhilosophy: string;
  aboutBadgeAchievement: string;

  // Footer & Metadata
  footerJobTitle: string;
  footerMadeWith: string;
  footerRights: string;
  metaTitle: string;
  metaDesc: string;
  footerImpressum: string;
  footerDatenschutz: string;
  mobileDesktopNotice: string;
}

const translations: Record<Locale, Translations> = {
  en: {
    navStack: "stack",
    navProjects: "projects",
    navAbout: "about",
    navProcess: "process",
    navContact: "contact",
    navLetsBuild: "Let's Build",
    navTagline: "Web and Mobile\nEngineering",

    heroTagline: "100% Solo-Engineered • P2P Crowd Shipping",
    heroHeadlinePrefix: "From concept to full ecosystem. ",
    heroHeadlineHighlight: "Solo built: Barande",
    heroHeadlineSuffix: ".",
    heroSubline: "The mobile P2P crowdshipping platform for express deliveries between Germany and Iran – 100% solo-engineered from system architecture to native app.",
    heroCtaWork: "Explore Case Study",
    heroCtaBuild: "Get in Touch",
    heroScrollDown: "Scroll Down",
    heroRouteLabel: "Route: Germany ⇄ Iran",
    heroRouteSub: "Express delivery via flight luggage in 24–48h vs. costly DHL/FedEx",
    heroEscrowLabel: "100% Escrow Vault",
    heroEscrowSub: "Funds locked in Barande vault until in-person verified delivery",
    heroPinLabel: "4-Digit PIN Handshake",
    heroPinSub: "Cryptographic code with 5x brute-force lock verified at destination",
    heroKycLabel: "AI Biometric KYC",
    heroKycSub: "OpenAI GPT-4o Vision passport & live selfie verification with blue badge",
    heroManifestLabel: "Customs Manifest",
    heroManifestSub: "Official BRD-2026-XXXXXX digital code & § 10 UStG compliant PDF invoices",
    heroSoloBadge: "100% Solo Engineered",

    stackTagline: "DESIGN SYSTEM",
    stackTitle: "Capabilities Bento Grid",
    stackSubtitle: "Clean modular blocks housing detailed expertise ranges. Hover, interact, and explore specific technology focus points.",
    stackFrontendTitle: "Frontend Core",
    stackFrontendDesc: "Development of high performance client interfaces with optimized layouts. Utilizing TypeScript and Next.js, builds achieve 100/100 performance scores and reliable reactivity.",
    stackMobileTitle: "Mobile App Dev",
    stackMobileDesc: "Cross platform React Native engineering with Expo. Delivering smooth native interactions, biometric authentication, and background synchronization.",
    stackBackendTitle: "Backend & Cloud",
    stackBackendDesc: "Highly secure Postgres architectures with Supabase. Building low-latency REST/GraphQL APIs, Realtime web sockets, and optimized caching flows.",
    stackToolsTitle: "Tools & Workflow",
    stackToolsDesc: "Translating UI design into standard production code. Structured setup using Figma for components, development accelerators, and structured SEO schema integrations for organic search presence.",
    stackLevelExpert: "Expert",
    stackLevelHighlySkilled: "Highly Skilled",
    stackLevelFluidMotion: "Fluid Motion",
    stackLevelSemanticHTML: "Semantic HTML",
    stackSimulatorTitle: "Escrow Locked",
    stackSimulatorDesc: "$140 locked in secure vault",
    stackLatencyTitle: "Query Cache API",
    stackLatencyDB: "ms (DB)",
    stackLatencyCached: "ms (Cached)",
    stackSeoTitle: "SEO Structured Data",
    stackSeoDesc: "CI/CD Agile Pipelines",

    portfolioTagline: "PORTFOLIO showcase",
    portfolioTitle: "Featured Case Studies",
    portfolioSubtitle: "A selection of web and mobile applications focused on performance, accessibility, and clean architecture.",
    portfolioBarandeTitle: "Barande – P2P Crowdshipping & Luggage Marketplace",
    portfolioBarandeDesc: "A full-scale mobile peer-to-peer crowdshipping marketplace connecting international travelers with senders between Germany and Iran. Travelers monetize unused luggage allowances per kg, while senders receive same-day/next-day express delivery for important documents and packages at a fraction of commercial courier rates. Architected with end-to-end security: AI-driven biometric KYC, a 100% escrow vault, pre-flight visual inspections, and a 4-digit PIN delivery handshake.",
    portfolioSheenTitle: "Sheen Berlin Premium Beauty Studio Platform",
    portfolioSheenDesc: "A custom web platform for a premium beauty salon. Built using Next.js Server Components to optimize image preloading and asset delivery, achieving a 100/100 performance score on Google Lighthouse. Structured schema integration provides search engines with clean metadata for organic indexing.",
    portfolioEscrowTitle: "100% Escrow Vault",
    portfolioEscrowDesc: "Zero upfront risk. Payments held in secure vaults until recipient confirms delivery.",
    portfolioPinTitle: "4-Digit PIN Handshake",
    portfolioPinDesc: "Cryptographic token with 5-attempt brute-force protection for in-person handover.",
    portfolioKycTitle: "AI Biometric KYC",
    portfolioKycDesc: "OpenAI GPT-4o Vision matches ID/passport with live selfie for verified badges.",
    portfolioManifestTitle: "Digital Customs Manifest",
    portfolioManifestDesc: "Tamper-proof BRD-2026-XXXXXX airport travel document & automated § 10 UStG PDF invoicing.",
    portfolioInquireMobile: "Inquire about Mobile engineering",
    portfolioLcpTitle: "Image Fetch Prioritization",
    portfolioLcpDesc: "Critical layout images preload natively, resolving slow largest-contentful-paint (LCP) delays.",
    portfolioSeoTitle: "Page 1 Rank SEO",
    portfolioSeoDesc: "Automatic micro-formatting schemas feed search engines contextual structures flawlessly.",
    portfolioInquireWeb: "Inquire about Web UI engineering",

    processTagline: "WORKFLOW STRUCTURE",
    processTitle: "The Engineering Process",
    processSubtitle: "A transparent, predictable, and robust development roadmap ensuring secure delivery milestones.",
    processStep1Title: "Discovery & UI/UX Design",
    processStep1Desc: "Laying solid groundworks by converting abstract ideas into interactive layouts and highly tailored wireframes. Designing the brand's aesthetic language, choosing harmonies, and building responsive structures in Figma.",
    processStep1Bullets: [
      "Interactive high-fidelity prototypes",
      "Harmonious custom color palette creation",
      "Mobile-first responsive wireframing",
      "User flow maps & accessibility checklist",
    ],
    processStep2Title: "Agile Engineering",
    processStep2Desc: "Translating pixel-perfect wireframes into clean, standard-compliant, modular React and React Native code. Developing secure APIs, escrow workflows, databases, and biometric native layers inside modern execution systems.",
    processStep2Bullets: [
      "Modular Next.js / TypeScript codebases",
      "React Native & Expo cross-platform apps",
      "Supabase schemas & secure row-level rules",
      "Fully covered type-safety structures",
    ],
    processStep3Title: "Optimization & Launch",
    processStep3Desc: "Tuning components for extreme performance, loading priorities, and semantic compliance to secure a flawless 100/100 Lighthouse audit. Deploying onto Netlify with custom domain routes, automated sitemaps, and SSL configs.",
    processStep3Bullets: [
      "100/100 Lighthouse performance audit",
      "JSON-LD structured Google Schema markup",
      "Advanced client preloading & server caching",
      "Netlify production deployments & forms",
    ],

    contactTagline: "CONNECT",
    contactTitle: "Launch Your Product",
    contactSubtitle: "Have a project in mind? Share your goals, timelines, or specifications below, and let's discuss how to build it.",
    contactCardTitle: "Let's Build Something",
    contactCardSubtitle: "Secure, spam-protected form powered by Netlify Forms",
    contactNameLabel: "Your Name",
    contactNamePlaceholder: "e.g. John Doe",
    contactEmailLabel: "Email Address",
    contactEmailPlaceholder: "e.g. john@company.com",
    contactFocusLabel: "Project Focus",
    contactFocusOption1: "Full-Stack Web App",
    contactFocusOption2: "Mobile App (iOS/Android)",
    contactFocusOption3: "High-End Brand Translation & SEO",
    contactFocusOption4: "Other / Custom Inquiry",
    contactMessageLabel: "Message",
    contactMessagePlaceholder: "Describe your goals, timelines, or specifications...",
    contactErrorText: "Connection timeout. Please double-check network and retry.",
    contactSubmitEncrypting: "Encrypting Transmission...",
    contactSubmitButton: "Submit Specification",
    contactSuccessTitle: "Transmission Received!",
    contactSuccessDesc: "Thank you for reaching out. Your project specifications have been securely parsed. I will review and reply within 24 hours.",
    contactSuccessBtn: "Send Another Message",

    mockupPhoneTag: "P2P SHIPPING",
    mockupPhoneTabTravelers: "Travelers",
    mockupPhoneTabSenders: "Senders",
    mockupPhoneCapacity: "Cap: {val} kg left",
    mockupPhoneReward: "Reward: ${val}",
    mockupPhoneDesc: "Deliver boxed laptop safely with insurance...",
    mockupPhoneWeight: "Weight: {val} kg",
    mockupPhoneEscrowActive: "Escrow Active",
    mockupPhoneHandshake: "Delivery Handshake",
    mockupPhoneMatched: "MATCHED",
    mockupPhonePinHelp: "PIN: {val}",
    mockupPhoneDisbursed: "Funds Disbursed to Traveler",

    mockupBrowserBeautyStudio: "BEAUTY STUDIO",
    mockupBrowserSubheading: "High-End Beauty Translated to Digital.",
    mockupBrowserDesc: "Capturing premium craftsmanship with standard-compliant layouts, advanced image preloading, and sleek modern typography.",
    mockupBrowserCta: "Explore Skincare line",
    mockupBrowserProductLabel: "FACE SERUM",
    mockupBrowserTabSite: "Live Site",
    mockupBrowserTabLighthouse: "Lighthouse",
    mockupBrowserSeoTag: "SEO SCHEMA INTEGRATION",
    mockupBrowserRankText: "Rank #1 Google",
    mockupBrowserAuditTag: "Lighthouse Audit",
    mockupBrowserPerformance: "Performance",
    mockupBrowserSeoPractices: "SEO Best Practices",
    mockupBrowserFooterNote: "* Next.js App Router dynamic sitemap.xml & robot.txt loaded successfully.",

    videoScrollTagline: "02 / INTERACTIVE DECONSTRUCTION",
    videoScrollTitle: "Barande – Scrollytelling Case Study",
    videoScrollSubtitle: "A scroll driven canvas engine mapping scroll velocity to video playback. Scroll to view the component by component architecture breakdown.",
    videoScrollPhase1Title: "Phase 1: React Native Core",
    videoScrollPhase1Desc: "Constructing standard-compliant mobile codebases with Expo. Architecting ultra-smooth native transitions and 60fps gesture interfaces.",
    videoScrollPhase1Bullets: ["React Native Navigation", "Expo Development Workflow", "Custom Gesture Handlers", "Safe Hardware Integration"],
    videoScrollPhase2Title: "Phase 2: UI Deconstruction",
    videoScrollPhase2Desc: "Breaking down complex interfaces into atomic components. Converting abstract custom Figma layouts into functional native elements.",
    videoScrollPhase2Bullets: ["Atomic Design Principles", "High-fidelity Wireframes", "Adaptive Responsive Layouts", "Pixel-Perfect Layout Specs"],
    videoScrollPhase3Title: "Phase 3: Supabase & Escrow",
    videoScrollPhase3Desc: "Constructing robust cloud services backed by secure Postgres schemas. Implementing Row Level Security policies and transaction vaults.",
    videoScrollPhase3Bullets: ["PostgreSQL Schema Design", "Row Level Security (RLS)", "Transactional Escrow API", "Realtime Synced States"],
    videoScrollPhase4Title: "Phase 4: Testing & Verification",
    videoScrollPhase4Desc: "Running automated end to end tests and Lighthouse diagnostics to verify security, performance, and accessibility.",
    videoScrollPhase4Bullets: ["PIN Handshake Verification", "Google Lighthouse Audits", "Automated Playwright Suite", "Optimized Search Indexing"],

    // About Me Section
    aboutTagline: "03 / HISTORY & PHILOSOPHY",
    aboutTitle: "Behind the Code",
    aboutParagraph1: "My journey with the web began back in the year 2000. Back then, I taught myself HTML and CSS and built my very first simple websites. Over the years, that early fascination turned into a deep-seated passion. As a self-taught developer, I relentlessly expanded my skillset through platforms like Udemy, mastering modern high-end technologies like TypeScript, React, and Next.js.",
    aboutParagraph2: "To me, software engineering feels like magic. There’s nothing better than staring at a completely blank screen and conjuring a living, breathing product out of a single idea. I believe everything matters: from pixel-perfect interfaces and fluid user experiences to robust backend architectures—every single detail needs to be flawless.",
    aboutParagraph3: "My proudest achievement to date is 'Barande'—a highly complex full-stack application that pushes the boundaries of my technical capabilities. I am constantly looking to connect with teams managing large-scale projects who need someone with my drive and skillset. If you are looking for someone who doesn’t just write code, but lives it—let’s build something incredible.",
    aboutBadgeJourney: "The Journey",
    aboutBadgePhilosophy: "Philosophy",
    aboutBadgeAchievement: "Masterpiece",

    footerJobTitle: "Creative Technologist & Full Stack Engineer",
    footerMadeWith: "Made with {icon} in Berlin",
    footerRights: "© {year} Samsoun Behaein. All rights compiled.",
    metaTitle: "Samsoun Behaein | Creative Technologist & Full Stack Engineer",
    metaDesc: "Portfolio of Samsoun Behaein, a Full Stack & Mobile Software Engineer specializing in Next.js web applications, cross platform React Native / Expo apps, scalable database architectures, and search engine optimization.",
    footerImpressum: "Legal Notice",
    footerDatenschutz: "Privacy Policy",
    mobileDesktopNotice: "✨ For the ultimate interactive experience (3D physics & scroll-driven video), view on a desktop screen.",
  },
  de: {
    navStack: "expertise",
    navProjects: "projekte",
    navAbout: "story",
    navProcess: "ablauf",
    navContact: "kontakt",
    navLetsBuild: "Lass uns bauen",
    navTagline: "Web und Mobile\nEntwicklung",

    heroTagline: "100% Solo-Entwickelt • P2P Crowd Shipping",
    heroHeadlinePrefix: "Von der Idee zum App-Ökosystem. ",
    heroHeadlineHighlight: "Allein gebaut: Barande",
    heroHeadlineSuffix: ".",
    heroSubline: "Die mobile P2P-Crowdshipping-Plattform für Express-Sendungen zwischen Deutschland und Iran – von der Systemarchitektur bis zur nativen App zu 100% in Eigenregie entwickelt.",
    heroCtaWork: "Case Study ansehen",
    heroCtaBuild: "Projekt anfragen",
    heroScrollDown: "Nach unten scrollen",
    heroRouteLabel: "Route: Deutschland ⇄ Iran",
    heroRouteSub: "Express per Fluggepäck in 24–48h statt teurer DHL/FedEx Kuriere",
    heroEscrowLabel: "100% Escrow-Treuhand",
    heroEscrowSub: "Gelder geschützt im Barande-Vault bis zur bestätigten Zielübergabe",
    heroPinLabel: "4-stelliger PIN-Handshake",
    heroPinSub: "Sicherheitscode mit 5x Fehlversuchs-Sperre direkt vor Ort geprüft",
    heroKycLabel: "KI-Biometrie KYC",
    heroKycSub: "OpenAI GPT-4o Vision Ausweis- & Live-Selfie-Check mit blauem Haken",
    heroManifestLabel: "Digitales Zollmanifest",
    heroManifestSub: "Offizieller BRD-2026-XXXXXX Code & steuerkonforme PDF-Rechnungen (§ 10 UStG)",
    heroSoloBadge: "100% Solo-Entwickelt",

    stackTagline: "DESIGN SYSTEM",
    stackTitle: "Fähigkeiten-Bento-Grid",
    stackSubtitle: "Saubere modulare Blöcke mit detaillierten Kompetenzbereichen. Bewegen Sie den Mauszeiger, interagieren Sie und erkunden Sie spezifische Technologie-Schwerpunkte.",
    stackFrontendTitle: "Frontend-Kern",
    stackFrontendDesc: "Entwicklung von performanten Client Schnittstellen mit strukturierten Layouts. Unter Verwendung von TypeScript und Next.js erreichen die Builds 100/100 in den Performance Scores und eine zuverlässige Reaktivität.",
    stackMobileTitle: "Mobile App-Entwicklung",
    stackMobileDesc: "Plattformübergreifendes React Native Engineering mit Expo. Bereitstellung von flüssigen Native Interaktionen, biometrischer Authentifizierung und Hintergrundsynchronisation.",
    stackBackendTitle: "Backend & Cloud",
    stackBackendDesc: "Hochsichere Postgres-Architekturen mit Supabase. Erstellung von REST/GraphQL-APIs mit geringer Latenz, Realtime Web Sockets und optimierten Caching-Flüssen.",
    stackToolsTitle: "Werkzeuge & Workflow",
    stackToolsDesc: "Übersetzung von UI Designs in standardkonformen Produktionscode. Strukturierte Integrationen mit Figma für Komponenten, Entwicklungstools sowie strukturierte SEO Schemata zur Verbesserung der organischen Websuche.",
    stackLevelExpert: "Experte",
    stackLevelHighlySkilled: "Sehr erfahren",
    stackLevelFluidMotion: "Flüssige Bewegung",
    stackLevelSemanticHTML: "Semantisches HTML",
    stackSimulatorTitle: "Treuhand gesperrt",
    stackSimulatorDesc: "140 $ in sicherem Tresor gesperrt",
    stackLatencyTitle: "Abfrage-Cache-API",
    stackLatencyDB: "ms (DB)",
    stackLatencyCached: "ms (Cache)",
    stackSeoTitle: "SEO-strukturierte Daten",
    stackSeoDesc: "Agile CI/CD-Pipelines",

    portfolioTagline: "PORTFOLIO-Showcase",
    portfolioTitle: "Ausgewählte Fallstudien",
    portfolioSubtitle: "Eine Auswahl an Webanwendungen sowie mobilen Apps mit Fokus auf Performance, Barrierefreiheit und saubere Architektur.",
    portfolioBarandeTitle: "Barande – P2P Crowdshipping & Reisegepäck-Marktplatz",
    portfolioBarandeDesc: "Internationale Peer-to-Peer Crowdshipping-Plattform, die Flugreisende mit freiem Freigepäck direkt mit Absendern zwischen Deutschland und Iran verbindet. Reisende refinanzieren ihre Flugtickets durch den Verkauf freier Kilo-Kapazitäten, während Absender Same-Day / Next-Day Expresslieferungen für Dokumente und Pakete zu einem Bruchteil gewerblicher Kurierdienste erhalten. Konzipiert mit kompromissloser Sicherheitsarchitektur: KI-Biometrie-KYC, 100% Treuhand-Vault, Pflicht-Sichtprüfung vor Abflug und 4-stelligem PIN-Handshake.",
    portfolioSheenTitle: "Sheen Berlin Premium Kosmetikstudio Plattform",
    portfolioSheenDesc: "Eine maßgeschneiderte Web Plattform für einen Premium Salon. Entwickelt mit Next.js Server Components zur Optimierung von Bild Preloading und Ressourcenzustellung, um ein 100/100 Performance Ergebnis bei Google Lighthouse zu erreichen. Die Integration strukturierter Schema Daten sorgt für saubere Metadaten zur organischen Indizierung.",
    portfolioEscrowTitle: "100% Treuhand-Schutz (Escrow)",
    portfolioEscrowDesc: "Null Vorkasse-Risiko. Gelder liegen im gesicherten Vault, bis der Empfänger am Zielort bestätigt.",
    portfolioPinTitle: "4-stelliger PIN-Handshake",
    portfolioPinDesc: "Kryptografischer Übergabecode mit 5-Versuchs-Brute-Force-Sperre für die persönliche Übergabe.",
    portfolioKycTitle: "KI-Biometrie KYC",
    portfolioKycDesc: "OpenAI GPT-4o Vision gleicht Ausweis und Live-Selfie biometrisch ab für verifizierte Profile.",
    portfolioManifestTitle: "Digitales Zollmanifest",
    portfolioManifestDesc: "Manipulationssicherer BRD-2026-Code für Flughafenkontrollen & § 10 UStG PDF-Rechnungsstellung.",
    portfolioInquireMobile: "Mobile Entwicklung anfragen",
    portfolioLcpTitle: "Bildabruf-Priorisierung",
    portfolioLcpDesc: "Wichtige Layout-Bilder werden nativ vorgeladen, was langsame Largest-Contentful-Paint-Verzögerungen (LCP) behebt.",
    portfolioSeoTitle: "Platz 1 Google SEO",
    portfolioSeoDesc: "Automatische Formatierungsschemata versorgen Suchmaschinen fehlerfrei mit kontextuellen Strukturen.",
    portfolioInquireWeb: "Web UI Entwicklung anfragen",

    processTagline: "WORKFLOW-STRUKTUR",
    processTitle: "Der Engineering-Prozess",
    processSubtitle: "Eine transparente, berechenbare und robuste Entwicklungs-Roadmap, die sichere Meilensteine garantiert.",
    processStep1Title: "Konzeption & UI/UX Design",
    processStep1Desc: "Schaffung solider Grundlagen, indem abstrakte Ideen in interaktive Layouts und maßgeschneiderte Wireframes übersetzt werden. Gestaltung der Markenästhetik, Auswahl harmonischer Paletten und Aufbau responsiver Strukturen in Figma.",
    processStep1Bullets: [
      "Interaktive High-Fidelity-Prototypen",
      "Erstellung harmonischer Farbpaletten",
      "Mobile-First responsive Wireframes",
      "User Flows & Barrierefreiheit-Checkliste",
    ],
    processStep2Title: "Agile Entwicklung",
    processStep2Desc: "Übersetzung pixelperfekter Wireframes in sauberen, standardkonformen, modularen React- und React-Native-Code. Entwicklung sicherer APIs, Treuhand-Workflows, Datenbanken und biometrischer nativer Ebenen in modernen Ausführungssystemen.",
    processStep2Bullets: [
      "Modulare Next.js / TypeScript-Codebases",
      "React Native & Expo Apps für iOS & Android",
      "Supabase-Schemata & sichere Zeilenregeln",
      "Vollständige Typsicherheitsstrukturen",
    ],
    processStep3Title: "Optimierung & Launch",
    processStep3Desc: "Tuning von Komponenten für extreme Leistung, Ladeprioritäten und semantische Konformität, um ein makelloses 100/100 Lighthouse-Audit zu sichern. Deployment auf Netlify mit benutzerdefinierten Routen, automatischen Sitemaps und SSL.",
    processStep3Bullets: [
      "100/100 Lighthouse Performance-Audit",
      "JSON-LD strukturierte Google-Schemas",
      "Fortgeschrittenes Client-Preloading & Cache",
      "Netlify Production Deployments & Formulare",
    ],

    contactTagline: "VERBINDEN",
    contactTitle: "Starten Sie Ihr Produkt",
    contactSubtitle: "Haben Sie ein Projekt vor Augen? Teilen Sie Ihre Ziele, Zeitpläne oder Spezifikationen unten mit, und lassen Sie uns über die Umsetzung sprechen.",
    contactCardTitle: "Lass uns etwas bauen",
    contactCardSubtitle: "Sicheres, spamgeschütztes Formular powered by Netlify Forms",
    contactNameLabel: "Ihr Name",
    contactNamePlaceholder: "z.B. Max Mustermann",
    contactEmailLabel: "E-Mail-Adresse",
    contactEmailPlaceholder: "z.B. max@firma.de",
    contactFocusLabel: "Projekt-Schwerpunkt",
    contactFocusOption1: "Full-Stack Web-App",
    contactFocusOption2: "Mobile App (iOS/Android)",
    contactFocusOption3: "High-End Markenauftritt & SEO",
    contactFocusOption4: "Sonstige / Individuelle Anfrage",
    contactMessageLabel: "Nachricht",
    contactMessagePlaceholder: "Beschreiben Sie Ihre Ziele, Zeitpläne oder Spezifikationen...",
    contactErrorText: "Verbindungsabbruch. Bitte überprüfen Sie Ihr Netzwerk und versuchen Sie es erneut.",
    contactSubmitEncrypting: "Verschlüssele Übertragung...",
    contactSubmitButton: "Spezifikation absenden",
    contactSuccessTitle: "Übertragung empfangen!",
    contactSuccessDesc: "Vielen Dank für Ihre Nachricht. Ihre Projektspezifikationen wurden sicher verarbeitet. Ich werde sie prüfen und Ihnen innerhalb von 24 Stunden antworten.",
    contactSuccessBtn: "Eine weitere Nachricht senden",

    mockupPhoneTag: "P2P VERSAND",
    mockupPhoneTabTravelers: "Reisende",
    mockupPhoneTabSenders: "Absender",
    mockupPhoneCapacity: "Kapazität: {val} kg frei",
    mockupPhoneReward: "Prämie: ${val}",
    mockupPhoneDesc: "Laptop im Karton sicher mit Versicherung liefern...",
    mockupPhoneWeight: "Gewicht: {val} kg",
    mockupPhoneEscrowActive: "Treuhand aktiv",
    mockupPhoneHandshake: "Liefer-Handshake",
    mockupPhoneMatched: "ÜBEREINSTIMMUNG",
    mockupPhonePinHelp: "PIN: {val}",
    mockupPhoneDisbursed: "Geld an Reisenden ausgezahlt",

    mockupBrowserBeautyStudio: "KOSMETIKSTUDIO",
    mockupBrowserSubheading: "High-End Schönheit digital übersetzt.",
    mockupBrowserDesc: "Premium-Handwerkskunst übersetzt in standardkonforme Layouts, fortschrittliches Vorladen von Bildern und elegante moderne Typografie.",
    mockupBrowserCta: "Pflegeserie entdecken",
    mockupBrowserProductLabel: "GESICHTSSERUM",
    mockupBrowserTabSite: "Live-Seite",
    mockupBrowserTabLighthouse: "Lighthouse",
    mockupBrowserSeoTag: "SEO-SCHEMA-INTEGRATION",
    mockupBrowserRankText: "Platz 1 bei Google",
    mockupBrowserAuditTag: "Lighthouse-Audit",
    mockupBrowserPerformance: "Leistung",
    mockupBrowserSeoPractices: "SEO Best Practices",
    mockupBrowserFooterNote: "* Next.js App Router dynamische sitemap.xml & robot.txt erfolgreich geladen.",

    videoScrollTagline: "02 / INTERAKTIVE DEKONSTRUKTION",
    videoScrollTitle: "Barande – Scrollytelling Case-Study",
    videoScrollSubtitle: "Eine scrollgesteuerte Canvas Engine, die die Scrollgeschwindigkeit an die Videowiedergabe koppelt. Scrollen Sie, um den schrittweisen Aufbau der Systemarchitektur zu sehen.",
    videoScrollPhase1Title: "Phase 1: React Native Core",
    videoScrollPhase1Desc: "Aufbau standardkonformer mobiler Codebases mit Expo. Entwicklung extrem flüssiger nativer Übergänge und Gestensteuerungen bei 60fps.",
    videoScrollPhase1Bullets: ["React Native Navigation", "Expo-Entwicklungs-Workflow", "Benutzerdefinierte Gesten", "Sichere Hardware-Anbindung"],
    videoScrollPhase2Title: "Phase 2: UI-Dekonstruktion",
    videoScrollPhase2Desc: "Zerlegung komplexer Schnittstellen in atomare Komponenten. Übersetzung abstrakter Figma-Entwürfe in funktionale native UI-Bausteine.",
    videoScrollPhase2Bullets: ["Atomare Design-Prinzipien", "High-Fidelity Wireframes", "Adaptive responsive Layouts", "Pixelgenaue Spezifikationen"],
    videoScrollPhase3Title: "Phase 3: Supabase & Treuhand",
    videoScrollPhase3Desc: "Entwicklung robuster Cloud-Services geschützt durch sichere Postgres-Schemata. Implementierung von Row Level Security und Transaktions-Tresoren.",
    videoScrollPhase3Bullets: ["PostgreSQL Schema-Design", "Row Level Security (RLS)", "Treuhand-Schnittstelle", "Echtzeit-Synchronisierung"],
    videoScrollPhase4Title: "Phase 4: Tests und Verifizierung",
    videoScrollPhase4Desc: "Durchführung automatisierter End to End Tests und Lighthouse Diagnosen zur Überprüfung von Sicherheit, Performance und Barrierefreiheit.",
    videoScrollPhase4Bullets: ["PIN Handshake Verifizierung", "Lighthouse Performance Audits", "Automatisierte Test Suiten", "Optimierte Suchmaschinen Indizierung"],

    // About Me Section
    aboutTagline: "03 / GESCHICHTE & PHILOSOPHIE",
    aboutTitle: "Hinter dem Code",
    aboutParagraph1: "Meine Reise mit dem Web begann im Jahr 2000. Damals habe ich mir HTML und CSS komplett selbst beigebracht und die ersten einfachen Webseiten ins Internet gestellt. Aus dieser frühen Faszination ist über die Jahre eine tiefe Leidenschaft geworden: Als Quereinsteiger habe ich mein Wissen durch Plattformen wie Udemy intensiv vertieft und beherrsche heute moderne High-End-Technologien wie TypeScript, React und Next.js blind.",
    aboutParagraph2: "Für mich ist Softwareentwicklung wie Magie – ich liebe es, vor einem komplett leeren Bildschirm zu sitzen und aus einer bloßen Idee ein lebendiges, funktionierendes Produkt zu zaubern. Dabei mache ich keine halben Sachen: Von der pixelgenauen Oberfläche über eine flüssige User Experience bis hin zur stabilen Backend-Infrastruktur muss jedes Zahnrad perfekt ineinandergreifen.",
    aboutParagraph3: "Mein bisher stolzestes Meisterstück ist die App 'Barande' – ein hochkomplexes Full-Stack-Projekt, das mein gesamtes technologisches Spektrum fordert. Ich bin immer auf der Suche nach großen Projekten und Teams, die außergewöhnliche Ideen auf die Straße bringen wollen. Wenn du nach jemandem suchst, der Code nicht nur schreibt, sondern lebt – lass uns etwas Großes bauen.",
    aboutBadgeJourney: "Der Werdegang",
    aboutBadgePhilosophy: "Philosophie",
    aboutBadgeAchievement: "Meisterwerk",

    footerJobTitle: "Creative Technologist und Full Stack Entwickler",
    footerMadeWith: "Mit {icon} in Berlin gemacht",
    footerRights: "© {year} Samsoun Behaein. Alle Rechte zusammengestellt.",
    metaTitle: "Samsoun Behaein | Creative Technologist und Full Stack Entwickler",
    metaDesc: "Portfolio von Samsoun Behaein, Full Stack und Mobile Software Engineer. Spezialisiert auf Next.js Webanwendungen, plattformübergreifende React Native und Expo Apps, skalierbare Datenbankarchitekturen und Suchmaschinenoptimierung.",
    footerImpressum: "Impressum",
    footerDatenschutz: "Datenschutzerklärung",
    mobileDesktopNotice: "✨ Für das beste interaktive Erlebnis (3D-Physik & Scroll-Videosteuerung) am besten auf einem Desktop-Bildschirm anschauen.",
  },
  fa: {
    navStack: "تخصص‌ها",
    navProjects: "پروژه‌ها",
    navAbout: "درباره من",
    navProcess: "روند کار",
    navContact: "ارتباط با من",
    navLetsBuild: "آغاز همکاری",
    navTagline: "توسعه وب و موبایل",

    heroTagline: "توسعه ۱۰۰٪ مستقل • ارسال بار همتا به همتا (P2P)",
    heroHeadlinePrefix: "از ایده تا یک اکوسیستم کامل. ",
    heroHeadlineHighlight: "توسعه مستقل: برنده",
    heroHeadlineSuffix: ".",
    heroSubline: "پلتفرم جامع کرادشیپینگ و ارسال سریع بار مسافری بین آلمان و ایران — طراحی و توسعه کامل صفر تا صد توسط یک مهندس نرم‌افزار.",
    heroCtaWork: "مشاهده کیس استادی",
    heroCtaBuild: "آغاز همکاری",
    heroScrollDown: "حرکت به پایین",
    heroRouteLabel: "مسیر: آلمان ⇄ ایران",
    heroRouteSub: "ارسال فوق سریع با پرواز در ۲۴ تا ۴۸ ساعت به جای پست پرهزینه",
    heroEscrowLabel: "حساب امانی ۱۰۰٪ امن",
    heroEscrowSub: "وجه در صندوق امن برنده تا زمان تحویل فیزیکی قفل می‌ماند",
    heroPinLabel: "تاییدیه پین‌کد ۴ رقمی",
    heroPinSub: "کد امن با قفل ضد تخلف پس از ۵ تلاش، بررسی حضوری در مقصد",
    heroKycLabel: "احراز هویت بیومتریک با هوش مصنوعی",
    heroKycSub: "تطبیق گذرنامه و سلفی زنده با OpenAI GPT-4o Vision با نشان آبی",
    heroManifestLabel: "مانیفست دیجیتال گمرک",
    heroManifestSub: "کد رسمی BRD-2026-XXXXXX و صدور فاکتورهای رسمی مالیاتی",
    heroSoloBadge: "توسعه ۱۰۰٪ مستقل",

    stackTagline: "سیستم طراحی",
    stackTitle: "تخصص‌های فنی و ابزارها",
    stackSubtitle: "ساختار ماژولار تخصص‌ها و حوزه‌های فعالیت مهندسی. جهت بررسی جزئیات روی هر بخش کلیک کنید.",
    stackFrontendTitle: "توسعه فرانت‌اند",
    stackFrontendDesc: "پیاده‌سازی رابط‌های کاربری بهینه‌شده با معماری استاندارد. استفاده از تایپ‌اسکریپت و نکست‌جی‌اس جهت دست‌یابی به بیشترین کارایی، دسترسی‌پذیری و واکنش‌گرایی آنی.",
    stackMobileTitle: "توسعه موبایل",
    stackMobileDesc: "توسعه اپلیکیشن‌های چندپلتفرمه با ری‌اکت نیتیو و اکسپو. مهندسی رابط‌های کاربری روان همراه با امنیت بیومتریک و همگام‌سازی داده‌ها در پس‌زمینه.",
    stackBackendTitle: "بک‌اند و سرویس‌های ابری",
    stackBackendDesc: "طراحی معماری پایگاه داده PostgreSQL با سوپابیس. پیاده‌سازی سرویس‌های انتقال داده کم‌تاخیر (REST و GraphQL)، کانال‌های بلادرنگ و مکانیزم‌های کش بهینه‌شده.",
    stackToolsTitle: "ابزارها و جریان کاری",
    stackToolsDesc: "تبدیل طرح‌های رابط کاربری در Figma به کدهای بهینه و استاندارد. استفاده از ابزارهای طراحی ماژولار و پیاده‌سازی داده‌های ساختاریافته سئو جهت بهبود رتبه در موتورهای جستجو.",
    stackLevelExpert: "متخصص",
    stackLevelHighlySkilled: "فوق‌العاده مسلط",
    stackLevelFluidMotion: "حرکت روان و انیمیشن پویا",
    stackLevelSemanticHTML: "HTML ساختاریافته و معنایی (Semantic)",
    stackSimulatorTitle: "تضمین امنیت پرداخت (Escrow)",
    stackSimulatorDesc: "$۱۴۰ در صندوق امن ذخیره شده است",
    stackLatencyTitle: "ای‌پی‌آی کش پرس‌وجوها (Queries)",
    stackLatencyDB: "میلی‌ثانیه (دیتابیس)",
    stackLatencyCached: "میلی‌ثانیه (کش‌شده)",
    stackSeoTitle: "داده‌های ساختاریافته سئو (Schema)",
    stackSeoDesc: "فرآیندهای خودکار استقرار (CI/CD)",

    portfolioTagline: "گزیده آثار",
    portfolioTitle: "پروژه‌های شاخص و مطالعات موردی",
    portfolioSubtitle: "مجموعه‌ای گزینش‌شده از محصولات چندپلتفرمه مدرن و پیاده‌سازی‌های دیجیتال بر پایه استانداردهای مهندسی روز دنیا.",
    portfolioBarandeTitle: "برنده – بازارچه ارسال بار همتا به همتا (P2P) و بار مسافری",
    portfolioBarandeDesc: "بازارچه بین‌المللی ارسال بار مسافری میان آلمان و ایران. مسافران با به اشتراک گذاشتن کیلویی ظرفیت خالی چمدان خود، هزینه‌های پرواز را جبران کرده و فرستندگان بسته‌ها و مدارک مهم را در همان روز یا روز بعد با هزینه‌ای بسیار کمتر از پست اکسپرس به مقصد می‌رسانند. معماری با امنیت بی‌نقص: احراز هویت با GPT-4o Vision، حساب امانی ۱۰۰٪ امن، بازرسی پیش از پرواز و پین‌کد ۴ رقمی تحویل.",
    portfolioSheenTitle: "شین برلین – پلتفرم دیجیتال سالن زیبایی لوکس",
    portfolioSheenDesc: "پلتفرم وب اختصاصی برای یک سالن زیبایی. توسعه‌یافته با کامپوننت‌های سرور نکست‌جی‌اس جهت پیش‌بارگذاری منابع کلیدی و بهبود سرعت نمایش تصاویر. استفاده از داده‌های ساختاریافته استاندارد سئو برای ایندکس بهینه در موتورهای جستجو.",
    portfolioEscrowTitle: "صندوق امانی ۱۰۰٪ امن (Escrow)",
    portfolioEscrowDesc: "ریسک پیش‌پرداخت به صفر می‌رسد. وجه تا زمان تایید نهایی گیرنده در صندوق امن محفوظ است.",
    portfolioPinTitle: "تاییدیه پین‌کد ۴ رقمی",
    portfolioPinDesc: "کد رمزنگاری‌شده با قفل ۵ تلاشه ضد بروت‌فورس جهت تحویل حضوری و بدون واسطه.",
    portfolioKycTitle: "احراز هویت بیومتریک با هوش مصنوعی",
    portfolioKycDesc: "بررسی مدارک هویتی و سلفی با GPT-4o Vision جهت اعطای نشان تایید آبی.",
    portfolioManifestTitle: "مانیفست دیجیتال گمرک",
    portfolioManifestDesc: "سند معتبر دیجیتال فرودگاهی با کد BRD-2026 و فاکتورهای رسمی خودکار.",
    portfolioInquireMobile: "درخواست مشاوره معماری موبایل",
    portfolioLcpTitle: "اولویت‌دهی به بارگذاری تصاویر (LCP)",
    portfolioLcpDesc: "پیش‌بارگذاری نیتیو تصاویر کلیدی صفحه، جهت برطرف کردن تاخیر در لود و بهبود شاخص عملکرد (LCP).",
    portfolioSeoTitle: "سئو و کسب رتبه اول گوگل",
    portfolioSeoDesc: "تولید خودکار داده‌های ساختاریافته (Schema Markup) برای درک بهینه محتوا توسط موتورهای جستجو.",
    portfolioInquireWeb: "درخواست مشاوره رابط‌های کاربری وب",

    processTagline: "ساختار روند توسعه",
    processTitle: "فرآیند مهندسی و اجرای پروژه",
    processSubtitle: "نقشه راهی کاملاً شفاف، قابل پیش‌بینی و استاندارد که کیفیت و تحویل به‌موقع پروژه‌ها را تضمین می‌کند.",
    processStep1Title: "تحقیق، کشف و طراحی UI/UX",
    processStep1Desc: "بررسی مشخصات فنی و تبدیل نیازمندی‌ها به وایرفریم‌ها و طرح‌های اولیه. تعریف استانداردهای بصری، ساخت سیستم طراحی ماژولار و رابط‌های کاربری واکنش‌گرا در فیگما.",
    processStep1Bullets: [
      "طراحی نمونه‌های اولیه (Prototypes) تعاملی و باکیفیت",
      "خلق پالت رنگی اختصاصی و متناسب با هویت برند",
      "طراحی ساختار موبایل‌محور (Mobile-First) و واکنش‌گرا",
      "ترسیم نمودار جریان کاربر (User Flows) و بررسی اصول دسترسی‌پذیری (Accessibility)",
    ],
    processStep2Title: "توسعه و مهندسی چابک (Agile)",
    processStep2Desc: "تبدیل طرح‌های مصوب به کدهای ماژولار React و React Native بر پایه استانداردهای توسعه نرم‌افزار. پیاده‌سازی APIهای تراکنشی، پایگاه‌های داده و لایه‌های ارتباطی سخت‌افزاری بومی.",
    processStep2Bullets: [
      "پیاده‌سازی کدهای تمیز و توسعه‌یافته با Next.js و TypeScript",
      "توسعه اپلیکیشن‌های چندپلتفرمه با React Native و Expo",
      "معماری پایگاه‌ داده با Supabase و قوانین امنیتی دسترسی به سطور (RLS)",
      "پوشش کامل ساختار کد با سیستم مدیریت تایپ امن (Type-safety)",
    ],
    processStep3Title: "بهینه‌سازی، تست و استقرار",
    processStep3Desc: "بهینه‌سازی کدهای برنامه، اولویت‌دهی به بارگذاری منابع و رعایت اصول سئو و استانداردهای کیفی Lighthouse. استقرار نهایی در بسترهای ابری همراه با تنظیم نقشه‌های سایت خودکار و تنظیمات دامنه و SSL.",
    processStep3Bullets: [
      "کسب امتیاز ۱۰۰/۱۰۰ در تست‌های عملکردی گوگل Lighthouse",
      "پیاده‌سازی متادیتاهای استاندارد Google Schema (JSON-LD)",
      "استفاده از روش‌های پیشرفته کشینگ و بارگذاری بهینه منابع",
      "استقرار نهایی روی سرورهای ابری پرسرعت و راه‌اندازی فرم‌های تعاملی",
    ],

    contactTagline: "تماس با من",
    contactTitle: "راه‌اندازی ایده دیجیتال شما",
    contactSubtitle: "برای پیاده‌سازی یک محصول دیجیتال بی‌نقص و استاندارد آماده‌اید؟ مشخصات پروژه خود را ارسال کنید تا با هم محصولی خیره‌کننده بسازیم.",
    contactCardTitle: "شروع پروژه جدید",
    contactCardSubtitle: "فرم ارسال پیام امن و مجهز به سیستم ضد هرزنامه (Netlify Forms)",
    contactNameLabel: "نام و نام خانوادگی",
    contactNamePlaceholder: "مثال: علی محمدی",
    contactEmailLabel: "آدرس ایمیل",
    contactEmailPlaceholder: "مثال: ali@company.com",
    contactFocusLabel: "محور اصلی پروژه",
    contactFocusOption1: "برنامه تحت وب فول‌استک",
    contactFocusOption2: "اپلیکیشن موبایل (iOS / Android)",
    contactFocusOption3: "برندسازی دیجیتال ممتاز و بهبود سئو",
    contactFocusOption4: "سایر موارد / درخواست مشاوره",
    contactMessageLabel: "توضیحات پروژه",
    contactMessagePlaceholder: "توضیحاتی درباره اهداف، محدودیت‌های زمانی یا مشخصات مدنظر خود بنویسید...",
    contactErrorText: "اختلال در اتصال به سرور. لطفاً اتصال اینترنت خود را بررسی و دوباره تلاش کنید.",
    contactSubmitEncrypting: "در حال رمزگذاری امن و ارسال داده‌ها...",
    contactSubmitButton: "ثبت و ارسال پیام",
    contactSuccessTitle: "پیام شما با موفقیت ثبت شد!",
    contactSuccessDesc: "از تماس شما صمیمانه سپاسگزارم. اطلاعات پروژه شما با امنیت کامل دریافت شد. در اسرع وقت بررسی کرده و تا حداکثر ۲۴ ساعت آینده به شما پاسخ خواهم داد.",
    contactSuccessBtn: "ارسال یک پیام جدید",

    mockupPhoneTag: "ارسال همتا به همتا (P2P)",
    mockupPhoneTabTravelers: "مسافران",
    mockupPhoneTabSenders: "فرستندگان",
    mockupPhoneCapacity: "ظرفیت باقی‌مانده: {val} کیلوگرم",
    mockupPhoneReward: "پاداش: {val} دلار",
    mockupPhoneDesc: "حمل و تحویل امن لپ‌تاپ پلمب با پوشش بیمه...",
    mockupPhoneWeight: "وزن: {val} کیلوگرم",
    mockupPhoneEscrowActive: "پرداخت امانی فعال شد",
    mockupPhoneHandshake: "تاییدیه تحویل بار (دست‌دهی)",
    mockupPhoneMatched: "همگام شد",
    mockupPhonePinHelp: "پین‌کد تایید: {val}",
    mockupPhoneDisbursed: "مبلغ آزاد شده و به حساب مسافر واریز گردید",

    mockupBrowserBeautyStudio: "کلینیک و سالن زیبایی",
    mockupBrowserSubheading: "حضور دیجیتالی متمایز برای برندی لوکس.",
    mockupBrowserDesc: "نمایش شکوه و ظرافت به وسیله کدهای استاندارد، پیش‌بارگذاری بهینه تصاویر و تایپوگرافی مدرن.",
    mockupBrowserCta: "کاوش در خط محصولات پوست",
    mockupBrowserProductLabel: "سرم جوانساز پوست",
    mockupBrowserTabSite: "نسخه وب‌سایت",
    mockupBrowserTabLighthouse: "گزارش Lighthouse",
    mockupBrowserSeoTag: "ادغام نشانه‌گذاری‌های ساختاریافته سئو (Schema)",
    mockupBrowserRankText: "رتبه نخست در نتایج گوگل",
    mockupBrowserAuditTag: "آنالیز کیفی Lighthouse",
    mockupBrowserPerformance: "کارایی و سرعت",
    mockupBrowserSeoPractices: "اصول و استانداردهای سئو",
    mockupBrowserFooterNote: "* تولید خودکار و بارگذاری موفقیت‌آمیز نقشه‌های سایت sitemap.xml و robots.txt بر پایه Next.js",

    videoScrollTagline: "۰۲ / بررسی تعاملی معماری",
    videoScrollTitle: "برنده – مستند توسعه تعاملی (Scrollytelling)",
    videoScrollSubtitle: "یک موتور رندرینگ تصاویر وب مبتنی بر شتاب‌دهنده گرافیکی که به صورت مستقیم با اسکرول کاربر، فریم‌های ویدیو را حرکت می‌دهد. با اسکرول کردن، معماری سیستم را واکاوی کنید.",
    videoScrollPhase1Title: "فاز ۱: ساختار هسته با React Native",
    videoScrollPhase1Desc: "پیاده‌سازی کدهای استاندارد موبایل به وسیله فریم‌ورک اکسپو. مهندسی انتقال‌های (Transitions) نیتیو و ژست‌های حرکتی ۶۰ فریم بر ثانیه.",
    videoScrollPhase1Bullets: ["سیستم مسیریابی React Native Navigation", "جریان کاری توسعه بهینه با Expo", "شخصی‌سازی ژست‌های حرکتی و رویدادهای لمسی", "ارتباط امن با قابلیت‌های سخت‌افزاری بومی"],
    videoScrollPhase2Title: "فاز ۲: واکاوی ساختار رابط کاربری",
    videoScrollPhase2Desc: "شکستن الگوهای طراحی پیچیده به اجزای مستقل (Atomic Components) و پیاده‌سازی بدون نقص پیش‌طرح‌های Figma به عنوان کامپوننت‌های بومی.",
    videoScrollPhase2Bullets: ["طراحی بر پایه معماری اتمیک", "وایرفریم‌های باکیفیت بالا (High-fidelity)", "چیدمان‌های کاملاً واکنش‌گرا و انعطاف‌پذیر", "تطابق صد درصدی کدهای تولیدی با پیکسل‌های طراحی"],
    videoScrollPhase3Title: "فاز ۳: پایگاه داده با Supabase و حساب امانی",
    videoScrollPhase3Desc: "راه‌اندازی سرویس‌های ابری قدرتمند با ساختاری بهینه بر پایه PostgreSQL. پیاده‌سازی قوانین امنیتی RLS و سیستم پرداخت‌های امانی.",
    videoScrollPhase3Bullets: ["طراحی دقیق ساختار و جداول PostgreSQL", "امنیت در سطح سطرها با اعمال قوانین RLS", "توسعه API امانی جهت مدیریت تراکنش‌ها", "همگام‌سازی آنی وضعیت داده‌ها (Realtime Sync)"],
    videoScrollPhase4Title: "فاز ۴: تست و اعتبارسنجی همه‌جانبه",
    videoScrollPhase4Desc: "اجرای سناریوهای تست خودکار و بررسی شاخص‌های Lighthouse. اطمینان از صحت عملکرد امنیت تراکنش و بهینه‌سازی برای موتورهای جستجو.",
    videoScrollPhase4Bullets: ["اعتبارسنجی امن تحویل با پین‌کد دوطرفه", "ارزیابی مستمر با ابزار گوگل Lighthouse", "اجرای مجموعه تست‌های خودکار با Playwright", "بهبود ساختاری سئو جهت ایندکس بهینه توسط خزنده‌ها"],

    // About Me Section
    aboutTagline: "۰۳ / تاریخچه و فلسفه کاری",
    aboutTitle: "پشت پرده‌ی کدها",
    aboutParagraph1: "مسیر من در دنیای وب از سال ۲۰۰۰ آغاز شد؛ زمانی که به صورت خودآموز HTML و CSS را یاد گرفتم و اولین صفحات ساده‌ی اینترنتی‌ام را ساختم. آن شیفتگیِ اولیه، در طول سال‌ها به یک اشتیاق عمیق تبدیل شد. به عنوان یک توسعه‌دهنده مسیر خلاق و خودآموز، دانش خود را از طریق پلتفرم‌هایی مثل Udemy به‌روز کردم و امروز تسلط کاملی بر فناوری‌های مدرن و پیشرفته‌ای چون TypeScript، React و Next.js دارم.",
    aboutParagraph2: "برای من، برنامه‌نویسی مثل خلق کردن جادوست؛ شیفته‌ی این هستم که مقابل یک صفحه‌ی کاملاً خالی بنشینم و از یک ایده‌ی خام، محصولی زنده و کاربردی خلق کنم. در این مسیر، من به تمام ابعاد اهمیت می‌دهم: از طراحی پیکسل‌به‌پیکسلِ رابط کاربری و تجربه‌ی روان کاربر گرفته تا زیرساخت‌های پایدار بک‌اند؛ همه‌چیز باید بی‌نقص در کنار هم کار کند.",
    aboutParagraph3: "افتخارآمیزترین شاهکار من تا به امروز اپلیکیشن «بارانده» (Barande) است؛ یک پروژه‌ی فوق‌العاده پیچیده و فول‌استک که تمام توان فنی مرا به چالش کشید. من همیشه مشتاق همکاری با تیم‌ها و پروژه‌های بزرگی هستم که می‌خواهند ایده‌های استثنایی را به واقعیت تبدیل کنند. اگر به دنبال کسی هستید که کدنویسی را فقط یک کار نمی‌داند، بلکه با آن زندگی می‌کند، بیایید با هم اثری ماندگار بسازیم.",
    aboutBadgeJourney: "مسیر توسعه",
    aboutBadgePhilosophy: "فلسفه کاری",
    aboutBadgeAchievement: "افتخار من",

    footerJobTitle: "مهندس فول‌استک و فناور خلاق",
    footerMadeWith: "ساخته‌شده با {icon} در برلین",
    footerRights: "© {year} سامسون بهائین. تمامی حقوق محفوظ است.",
    metaTitle: "سامسون بهائین | مهندس فول‌استک و فناور خلاق",
    metaDesc: "پورتفولیوی تخصصی در مهندسی نرم‌افزار، توسعه وب‌سایت‌های نکست‌جی‌اس، اپلیکیشن‌های موبایل ری‌اکت نیتیو و اکسپو، طراحی پایگاه‌های داده و بهینه‌سازی فنی موتورهای جستجو.",
    footerImpressum: "اطلاعات حقوقی",
    footerDatenschutz: "حریم خصوصی و قوانین",
    mobileDesktopNotice: "✨ برای تجربه کامل ویژگی‌های تعاملی (فیزیک سه‌بعدی و داستان‌سرایی ویدیویی متحرک)، توصیه می‌شود سایت را روی نمایشگر دسکتاپ مشاهده کنید.",
  },
};

interface LanguageContextProps {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: keyof Translations, params?: Record<string, string | number>) => string;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

let localeListeners: Array<() => void> = [];

const subscribeLocale = (listener: () => void) => {
  localeListeners.push(listener);
  window.addEventListener("storage", listener);
  return () => {
    localeListeners = localeListeners.filter((l) => l !== listener);
    window.removeEventListener("storage", listener);
  };
};

const getLocaleSnapshot = (): Locale => {
  if (typeof window === "undefined") return "en";
  try {
    const savedLocale = localStorage.getItem("preferred_locale") as Locale;
    if (savedLocale && ["en", "de", "fa"].includes(savedLocale)) {
      return savedLocale;
    }
    const browserLang = navigator.language.split("-")[0];
    if (browserLang === "de") return "de";
    if (browserLang === "fa" || browserLang === "ar") return "fa";
  } catch {
    // fallback
  }
  return "en";
};

const getLocaleServerSnapshot = (): Locale => "en";

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const storeLocale = useSyncExternalStore(subscribeLocale, getLocaleSnapshot, getLocaleServerSnapshot);
  const [overrideLocale, setOverrideLocale] = useState<Locale | null>(null);

  const locale = overrideLocale || storeLocale;

  const setLocale = (newLocale: Locale) => {
    setOverrideLocale(newLocale);
    try {
      localStorage.setItem("preferred_locale", newLocale);
      localeListeners.forEach((l) => l());
    } catch {
      // ignore
    }
  };

  const isRtl = locale === "fa";

  useEffect(() => {
    // Dynamic styling changes on root document
    const root = document.documentElement;
    root.setAttribute("lang", locale);
    root.setAttribute("dir", isRtl ? "rtl" : "ltr");
    
    // Also toggle a RTL class on body for target styling if needed
    if (isRtl) {
      root.classList.add("rtl");
    } else {
      root.classList.remove("rtl");
    }
  }, [locale, isRtl]);

  const t = useCallback((key: keyof Translations, params?: Record<string, string | number>): string => {
    let text = translations[locale][key];
    if (Array.isArray(text)) {
      // Return first bullet or serialized string fallback (bullets handled in component rendering)
      return text[0] || "";
    }
    if (!text) {
      return translations["en"][key] as string; // fallback
    }
    if (params) {
      Object.entries(params).forEach(([pKey, pVal]) => {
        text = (text as string).replace(new RegExp(`{${pKey}}`, "g"), String(pVal));
      });
    }
    return text as string;
  }, [locale]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, isRtl }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

// Helper for components needing direct array retrieval
export const getBulletsForLocale = (
  locale: Locale,
  key: "processStep1Bullets" | "processStep2Bullets" | "processStep3Bullets" | "videoScrollPhase1Bullets" | "videoScrollPhase2Bullets" | "videoScrollPhase3Bullets" | "videoScrollPhase4Bullets"
): string[] => {
  return translations[locale][key] as string[];
};
