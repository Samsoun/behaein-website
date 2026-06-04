"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Locale = "en" | "de" | "fa";

export interface Translations {
  // Navigation & General
  navStack: string;
  navProjects: string;
  navProcess: string;
  navContact: string;
  navLetsBuild: string;

  // Hero Section
  heroTagline: string;
  heroHeadlinePrefix: string;
  heroHeadlineHighlight: string;
  heroHeadlineSuffix: string;
  heroSubline: string;
  heroCtaWork: string;
  heroCtaBuild: string;
  heroScrollDown: string;

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
    navProcess: "process",
    navContact: "contact",
    navLetsBuild: "Let's Build",

    heroTagline: "🚀 Creative Technologist Portfolio",
    heroHeadlinePrefix: "Crafting Digital Products with ",
    heroHeadlineHighlight: "Pixel Perfection",
    heroHeadlineSuffix: " & Bulletproof Code.",
    heroSubline: "I am a Full-Stack & Mobile Developer specializing in building high-end web experiences and scalable cross-platform applications. From premium UI/UX design to robust backend architectures—I bridge the gap between imagination and production-ready engineering.",
    heroCtaWork: "View My Work",
    heroCtaBuild: "Let's Build Something",
    heroScrollDown: "Scroll Down",

    stackTagline: "DESIGN SYSTEM",
    stackTitle: "Capabilities Bento Grid",
    stackSubtitle: "Clean modular blocks housing detailed expertise ranges. Hover, interact, and explore specific technology focus points.",
    stackFrontendTitle: "Frontend Core",
    stackFrontendDesc: "I architect lightning-fast client interfaces with perfect layouts. Utilizing TypeScript and Next.js, my builds maintain 100/100 performance scores and seamless reactivity.",
    stackMobileTitle: "Mobile App Dev",
    stackMobileDesc: "Cross-platform React Native engineering with Expo. Delivering ultra-smooth 60fps Native interactions, biometric safety, and background sync.",
    stackBackendTitle: "Backend & Cloud",
    stackBackendDesc: "Highly secure Postgres architectures with Supabase. Building low-latency REST/GraphQL APIs, Realtime web sockets, and optimized caching flows.",
    stackToolsTitle: "Tools & Workflow",
    stackToolsDesc: "Bridging UI design directly into pixel-perfect production code. Advanced setup using Figma for components, Cursor AI for speed, and structured SEO schema integrations that rank on Google's top spots.",
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
    portfolioSubtitle: "A selection of high-end cross-platform developments and digital translations built to standard-compliant execution plans.",
    portfolioBarandeTitle: "Barande – P2P Crowd-Shipping Marketplace",
    portfolioBarandeDesc: "Connecting international travelers and senders between Europe and Tehran. Travelers utilize their unused baggage allowance to deliver packages, earning rewards. Senders experience a transparent crowd-shipped workflow backed by secure escrow smart accounts, real-time geolocation matching, and delivery handshake safety validations.",
    portfolioSheenTitle: "Sheen Berlin – Premium Beauty Studio Platform",
    portfolioSheenDesc: "Translating a premium physical beauty salon brand into a digital masterpiece. Built on dynamic server components that preload critical resource hierarchies, securing a flawless 100/100 Google Lighthouse page score. Integrated schema structures drive dynamic organic indexing, placing the brand on Page 1 Google searches.",
    portfolioEscrowTitle: "Secure Escrow API",
    portfolioEscrowDesc: "Funds are secured in escrow vaults and released only on correct delivery validation.",
    portfolioPinTitle: "PIN Handshake",
    portfolioPinDesc: "Dual PIN synchronization verifies matching handshake delivery without central authority dependency.",
    portfolioInquireMobile: "Inquire About Mobile Architectures",
    portfolioLcpTitle: "Image Fetch Prioritization",
    portfolioLcpDesc: "Critical layout images preload natively, resolving slow largest-contentful-paint (LCP) delays.",
    portfolioSeoTitle: "Page 1 Rank SEO",
    portfolioSeoDesc: "Automatic micro-formatting schemas feed search engines contextual structures flawlessly.",
    portfolioInquireWeb: "Inquire About High-End Web UI",

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
    contactSubtitle: "Ready to construct flawless digital products? Share your specifications below and let's compile something stunning.",
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
    videoScrollSubtitle: "An ultra-high-performance canvas frame-scrubbing engine mapping scroll velocity to video playback. Scroll to deconstruct the system architecture.",
    videoScrollPhase1Title: "Phase 1: React Native Core",
    videoScrollPhase1Desc: "Constructing standard-compliant mobile codebases with Expo. Architecting ultra-smooth native transitions and 60fps gesture interfaces.",
    videoScrollPhase1Bullets: ["React Native Navigation", "Expo Development Workflow", "Custom Gesture Handlers", "Safe Hardware Integration"],
    videoScrollPhase2Title: "Phase 2: UI Deconstruction",
    videoScrollPhase2Desc: "Breaking down complex interfaces into atomic components. Converting abstract custom Figma layouts into functional native elements.",
    videoScrollPhase2Bullets: ["Atomic Design Principles", "High-fidelity Wireframes", "Adaptive Responsive Layouts", "Pixel-Perfect Layout Specs"],
    videoScrollPhase3Title: "Phase 3: Supabase & Escrow",
    videoScrollPhase3Desc: "Constructing robust cloud services backed by secure Postgres schemas. Implementing Row Level Security policies and transaction vaults.",
    videoScrollPhase3Bullets: ["PostgreSQL Schema Design", "Row Level Security (RLS)", "Transactional Escrow API", "Realtime Synced States"],
    videoScrollPhase4Title: "Phase 4: Flawless Verification",
    videoScrollPhase4Desc: "Executing thorough automated tests and Lighthouse diagnostics. Ensuring secure token handshakes and top organic search indexing.",
    videoScrollPhase4Bullets: ["PIN Handshake Verification", "Google Lighthouse Audits", "Automated Playwright Suite", "Optimized Search Indexing"],

    footerJobTitle: "Creative Technologist & Full-Stack Engineer",
    footerMadeWith: "Made with {icon} in Berlin",
    footerRights: "© {year} Samsoun Behaein. All rights compiled.",
    metaTitle: "Samsoun Behaein | Creative Technologist & Full-Stack Engineer",
    metaDesc: "Elite Full-Stack and Mobile Developer specializing in premium Next.js web applications, cross-platform React Native / Expo apps, scalable Cloud backends, and flawless SEO architectures.",
    footerImpressum: "Legal Notice",
    footerDatenschutz: "Privacy Policy",
    mobileDesktopNotice: "✨ For the ultimate interactive experience (3D physics & scroll-driven video), view on a desktop screen.",
  },
  de: {
    navStack: "expertise",
    navProjects: "projekte",
    navProcess: "ablauf",
    navContact: "kontakt",
    navLetsBuild: "Lass uns bauen",

    heroTagline: "🚀 Portfolio eines Creative Technologist",
    heroHeadlinePrefix: "Digitale Produkte mit ",
    heroHeadlineHighlight: "Pixelpräzision",
    heroHeadlineSuffix: " & fehlerfreiem Code.",
    heroSubline: "Ich bin Full-Stack- und Mobile-Entwickler, spezialisiert auf die Entwicklung von High-End-Web-Erlebnissen und skalierbaren plattformübergreifenden Anwendungen. Vom Premium-UI/UX-Design bis hin zu robusten Backend-Architekturen schließe ich die Lücke zwischen Fantasie und produktionsbereiter Ingenieurskunst.",
    heroCtaWork: "Meine Arbeiten sehen",
    heroCtaBuild: "Lass uns etwas bauen",
    heroScrollDown: "Nach unten scrollen",

    stackTagline: "DESIGN SYSTEM",
    stackTitle: "Fähigkeiten-Bento-Grid",
    stackSubtitle: "Saubere modulare Blöcke mit detaillierten Kompetenzbereichen. Bewegen Sie den Mauszeiger, interagieren Sie und erkunden Sie spezifische Technologie-Schwerpunkte.",
    stackFrontendTitle: "Frontend-Kern",
    stackFrontendDesc: "Ich architektiére blitzschnelle Client-Schnittstellen mit perfekten Layouts. Unter Verwendung von TypeScript und Next.js behalten meine Builds 100/100 Performance-Scores und nahtlose Reaktivität bei.",
    stackMobileTitle: "Mobile App-Entwicklung",
    stackMobileDesc: "Plattformübergreifendes React-Native-Engineering mit Expo. Bereitstellung von ultra-flüssigen 60fps Native Interaktionen, biometrischer Sicherheit und Hintergrundsynchronisation.",
    stackBackendTitle: "Backend & Cloud",
    stackBackendDesc: "Hochsichere Postgres-Architekturen mit Supabase. Erstellung von REST/GraphQL-APIs mit geringer Latenz, Realtime Web Sockets und optimierten Caching-Flüssen.",
    stackToolsTitle: "Werkzeuge & Workflow",
    stackToolsDesc: "Übertragung von UI-Design direkt in pixelgenauen Produktionscode. Fortgeschrittenes Setup mit Figma für Komponenten, Cursor AI für Geschwindigkeit und strukturierten SEO-Schema-Integrationen auf den Top-Plätzen von Google.",
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
    portfolioSubtitle: "Eine Auswahl an High-End-Plattform-Entwicklungen und digitalen Übersetzungen, die nach standardkonformen Ausführungsplänen gebaut wurden.",
    portfolioBarandeTitle: "Barande – P2P-Crowd-Shipping-Marktplatz",
    portfolioBarandeDesc: "Verbindung zwischen internationalen Reisenden und Absendern zwischen Europa und Teheran. Reisende nutzen ihre ungenutzte Freigepäckmenge für die Paketzustellung und verdienen Belohnungen. Absender erleben einen transparenten Crowd-Shipping-Ablauf, der durch sichere Treuhandkonten, Geolocation-Matching in Echtzeit und PIN-Zustellungsprüfungen geschützt ist.",
    portfolioSheenTitle: "Sheen Berlin – Premium-Kosmetikstudio-Plattform",
    portfolioSheenDesc: "Übersetzung einer physischen Premium-Salonmarke in ein digitales Meisterwerk. Basierend auf Next.js Server Components, die kritische Ressourcen-Hierarchien nativ vorladen, um ein makelloses 100/100 Google Lighthouse-Ergebnis zu erzielen. Integrierte strukturierte Daten sorgen für Top-Platzierungen bei Google-Suchen.",
    portfolioEscrowTitle: "Sichere Treuhand-API",
    portfolioEscrowDesc: "Die Gelder werden in Treuhand-Tresoren gesichert und erst nach erfolgreicher Lieferungsbestätigung freigegeben.",
    portfolioPinTitle: "PIN-Handshake",
    portfolioPinDesc: "Die duale PIN-Synchronisierung verifiziert die übereinstimmende Handshake-Lieferung ohne Abhängigkeit von zentralen Instanzen.",
    portfolioInquireMobile: "Fragen Sie nach mobilen Architekturen",
    portfolioLcpTitle: "Bildabruf-Priorisierung",
    portfolioLcpDesc: "Wichtige Layout-Bilder werden nativ vorgeladen, was langsame Largest-Contentful-Paint-Verzögerungen (LCP) behebt.",
    portfolioSeoTitle: "Platz 1 Google SEO",
    portfolioSeoDesc: "Automatische Formatierungsschemata versorgen Suchmaschinen fehlerfrei mit kontextuellen Strukturen.",
    portfolioInquireWeb: "Fragen Sie nach High-End Web-UI",

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
    contactSubtitle: "Bereit, makellose digitale Produkte zu entwickeln? Teilen Sie mir Ihre Spezifikationen unten mit und lassen Sie uns etwas Atemberaubendes erschaffen.",
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
    videoScrollSubtitle: "Eine ultra-performante Canvas-Bildscrubbing-Engine, die die Scrollgeschwindigkeit direkt an die Videowiedergabe koppelt. Scrolle, um die Systemarchitektur zu dekonstruieren.",
    videoScrollPhase1Title: "Phase 1: React Native Core",
    videoScrollPhase1Desc: "Aufbau standardkonformer mobiler Codebases mit Expo. Entwicklung extrem flüssiger nativer Übergänge und Gestensteuerungen bei 60fps.",
    videoScrollPhase1Bullets: ["React Native Navigation", "Expo-Entwicklungs-Workflow", "Benutzerdefinierte Gesten", "Sichere Hardware-Anbindung"],
    videoScrollPhase2Title: "Phase 2: UI-Dekonstruktion",
    videoScrollPhase2Desc: "Zerlegung komplexer Schnittstellen in atomare Komponenten. Übersetzung abstrakter Figma-Entwürfe in funktionale native UI-Bausteine.",
    videoScrollPhase2Bullets: ["Atomare Design-Prinzipien", "High-Fidelity Wireframes", "Adaptive responsive Layouts", "Pixelgenaue Spezifikationen"],
    videoScrollPhase3Title: "Phase 3: Supabase & Treuhand",
    videoScrollPhase3Desc: "Entwicklung robuster Cloud-Services geschützt durch sichere Postgres-Schemata. Implementierung von Row Level Security und Transaktions-Tresoren.",
    videoScrollPhase3Bullets: ["PostgreSQL Schema-Design", "Row Level Security (RLS)", "Treuhand-Schnittstelle", "Echtzeit-Synchronisierung"],
    videoScrollPhase4Title: "Phase 4: Flawless Verifizierung",
    videoScrollPhase4Desc: "Durchführung gründlicher automatisierter Tests und Lighthouse-Audits. Absicherung der PIN-Übergabeprotokolle und Top-Suchmaschinenplatzierung.",
    videoScrollPhase4Bullets: ["PIN-Handshake-Verifizierung", "Lighthouse Performance-Audits", "Automatisierte Test-Suiten", "Optimierte Suchmaschinen-Indizierung"],

    footerJobTitle: "Creative Technologist & Full-Stack-Entwickler",
    footerMadeWith: "Mit {icon} in Berlin gemacht",
    footerRights: "© {year} Samsoun Behaein. Alle Rechte zusammengestellt.",
    metaTitle: "Samsoun Behaein | Creative Technologist & Full-Stack-Entwickler",
    metaDesc: "Erstklassiger Full-Stack- und Mobile-Entwickler, spezialisiert auf Premium-Next.js-Webanwendungen, plattformübergreifende React-Native-/Expo-Apps, skalierbare Cloud-Backends und makellose SEO-Architekturen.",
    footerImpressum: "Impressum",
    footerDatenschutz: "Datenschutzerklärung",
    mobileDesktopNotice: "✨ Für das beste interaktive Erlebnis (3D-Physik & Scroll-Videosteuerung) am besten auf einem Desktop-Bildschirm anschauen.",
  },
  fa: {
    navStack: "مهارت‌ها",
    navProjects: "پروژه‌ها",
    navProcess: "فرآیند ساخت",
    navContact: "تماس",
    navLetsBuild: "شروع همکاری",

    heroTagline: "🚀 پورتفولیوی توسعه‌دهنده خلاق و فناور",
    heroHeadlinePrefix: "خلق محصولات دیجیتال با ",
    heroHeadlineHighlight: "دقت بی‌نقص پیکسل‌ها",
    heroHeadlineSuffix: " و کدهای مستحکم و نفوذناپذیر.",
    heroSubline: "من یک توسعه‌دهنده فول‌استک و موبایل هستم که در طراحی تجربه‌های کاربری لوکس وب و اپلیکیشن‌های چندپلتفرمه مقیاس‌پذیر تخصص دارم. از طراحی رابط کاربری درجه‌یک تا معماری‌های ابری قدرتمند، من فاصله بین ایده و مهندسی آماده تولید را پر می‌کنم.",
    heroCtaWork: "مشاهده نمونه کارها",
    heroCtaBuild: "بیایید با هم بسازیم",
    heroScrollDown: "به پایین بکشید",

    stackTagline: "سیستم طراحی",
    stackTitle: "شبکه بنتوی توانمندی‌ها",
    stackSubtitle: "بلوک‌های ماژولار و منظم برای نمایش حوزه‌های تخصصی. برای جزئیات بیشتر نشانگر را نگه دارید یا تعامل کنید.",
    stackFrontendTitle: "هسته فرانت‌اند",
    stackFrontendDesc: "من رابط‌های کاربری فوق‌سریع با ساختار بی‌نقص طراحی می‌کنم. با استفاده از تایپ‌اسکریپت و نکست‌جی‌اس، پروژه‌های من عملکرد ۱۰۰/۱۰۰ و پاسخ‌دهی آنی دارند.",
    stackMobileTitle: "توسعه اپلیکیشن موبایل",
    stackMobileDesc: "مهندسی چندپلتفرمه با ری‌اکت نیتیو و اکسپو. ارائه انیمیشن‌های روان ۶۰ فریم بر ثانیه، امنیت بیومتریک و همگام‌سازی پس‌زمینه.",
    stackBackendTitle: "بک‌اند و سیستم ابری",
    stackBackendDesc: "طراحی دیتابیس‌های فوق‌امن پستگرس با سوپابیس. ساخت ای‌پی‌آی‌های کم‌تاخیر REST/GraphQL، وب‌سوکت‌های آنی و سیستم‌های حافظه پنهان بهینه‌شده.",
    stackToolsTitle: "ابزارها و روند کار",
    stackToolsDesc: "تبدیل مستقیم طرح‌های فیگما به کدهای تولیدی بی‌نقص. راه‌اندازی پیشرفته با ابزارهای نوین، سرعت بالا و ساختارهای بهینه‌شده سئو برای رتبه‌های برتر گوگل.",
    stackLevelExpert: "متخصص",
    stackLevelHighlySkilled: "ارشد",
    stackLevelFluidMotion: "پویا و روان",
    stackLevelSemanticHTML: "اچ‌تی‌ام‌ال استاندارد",
    stackSimulatorTitle: "وجه امانی مسدود شد",
    stackSimulatorDesc: "$۱۴۰ در صندوق امن ذخیره شد",
    stackLatencyTitle: "ای‌پی‌آی کش دیتابیس",
    stackLatencyDB: "میلی‌ثانیه (دیتابیس)",
    stackLatencyCached: "میلی‌ثانیه (کش شده)",
    stackSeoTitle: "ساختارهای داده سئو",
    stackSeoDesc: "خطوط لوله چابک CI/CD",

    portfolioTagline: "ویترین پورتفولیو",
    portfolioTitle: "مطالعات موردی برتر",
    portfolioSubtitle: "مجموعه‌ای از توسعه‌های چندپلتفرمه لوکس و ترجمه‌های دیجیتال که بر اساس استانداردهای مهندسی عالی بنا شده‌اند.",
    portfolioBarandeTitle: "برنده – پلتفرم ارسال کالا همتا به همتا (P2P)",
    portfolioBarandeDesc: "اتصال مسافران بین‌المللی و فرستندگان بار بین اروپا و تهران. مسافران از ظرفیت اضافی بار خود برای تحویل بسته‌ها استفاده کرده و پاداش دریافت می‌کنند. فرستندگان نیز یک فرآیند ارسال شفاف را تجربه می‌کنند که با حساب‌های امانی امن، تطبیق موقعیت جغرافیایی آنی و تاییدیه تحویل دوطرفه محافظت می‌شود.",
    portfolioSheenTitle: "شین برلین – پلتفرم لوکس سالن زیبایی",
    portfolioSheenDesc: "ترجمه و تبدیل یک برند سالن زیبایی لوکس فیزیکی به یک شاهکار دیجیتال. ساخته شده بر روی کامپوننت‌های سرور که منابع حیاتی را بارگذاری پیش‌فرض کرده و امتیاز کامل ۱۰۰/۱۰۰ را در سنجش Lighthouse گوگل تضمین می‌کنند. ساختارهای داده سئو هوشمند رتبه اول نتایج سرچ گوگل را هموار می‌سازند.",
    portfolioEscrowTitle: "ای‌پی‌آی امانی امن",
    portfolioEscrowDesc: "هزینه‌ها در صندوق امن نگهداری شده و تنها پس از تایید تحویل صحیح کالا آزاد می‌شوند.",
    portfolioPinTitle: "تاییدیه امن با پین‌کد",
    portfolioPinDesc: "همگام‌سازی دوطرفه پین‌کد برای تایید تحویل بدون نیاز به واسطه‌های متمرکز.",
    portfolioInquireMobile: "مشاوره درباره معماری‌های موبایل",
    portfolioLcpTitle: "اولویت‌دهی در بارگذاری تصاویر",
    portfolioLcpDesc: "بارگذاری پیش‌فرض تصاویر کلیدی برای از بین بردن تاخیرهای لود صفحه (LCP).",
    portfolioSeoTitle: "رتبه ۱ نتایج گوگل",
    portfolioSeoDesc: "تزریق خودکار داده‌های نشانه‌گذاری شده (Schema) برای درک کامل موتورهای جستجو.",
    portfolioInquireWeb: "مشاوره درباره رابط‌های کاربری وب",

    processTagline: "ساختار روند کار",
    processTitle: "مراحل فرآیند مهندسی",
    processSubtitle: "نقشه راهی شفاف، قابل پیش‌بینی و قدرتمند که تضمین‌کننده تحویل به‌موقع پروژه است.",
    processStep1Title: "تحقیق و طراحی UI/UX",
    processStep1Desc: "پایه‌ریزی مستحکم با تبدیل ایده‌های خام به طرح‌های تعاملی و وایرفریم‌های دقیق. خلق زبان زیبایی‌شناسی برند، پالت‌های رنگی اختصاصی و ساختارهای واکنش‌گرا در فیگما.",
    processStep1Bullets: [
      "پروتوتایپ‌های تعاملی با دقت بالا",
      "خلق پالت رنگی اختصاصی و هماهنگ",
      "وایرفریمینگ واکنش‌گرا و موبایل‌محور",
      "نقشه‌های جریان کاربر و دسترسی‌پذیری",
    ],
    processStep2Title: "مهندسی چابک (Agile)",
    processStep2Desc: "ترجمه وایرفریم‌ها به کدهای ماژولار، تمیز و استاندارد ری‌اکت و ری‌اکت نیتیو. پیاده‌سازی دیتابیس‌ها، سیستم‌های بیومتریک و خطوط مالی امن در یک ساختار مهندسی مدرن.",
    processStep2Bullets: [
      "مخازن کد تمیز نکست‌جی‌اس و تایپ‌اسکریپت",
      "اپلیکیشن‌های چندپلتفرمه اکسپو و ری‌اکت نیتیو",
      "پایگاه‌داده‌های سوپابیس با قوانین دسترسی امن",
      "پوشش کامل ساختارهای ایمنی تایپ (Type-safety)",
    ],
    processStep3Title: "بهینه‌سازی و راه‌اندازی",
    processStep3Desc: "تیونینگ کامل قطعات برای سرعت فوق‌العاده و کسب امتیاز کامل ۱۰۰/۱۰۰ در ابزار بررسی Lighthouse گوگل. استقرار روی سرورهای ابری با دامنه‌های اختصاصی، نقشه‌های سایت خودکار و پروتکل‌های امنیتی SSL.",
    processStep3Bullets: [
      "امتیاز ۱۰۰/۱۰۰ عملکرد در سنجش Lighthouse",
      "نشانه‌گذاری‌های استاندارد Google JSON-LD Schema",
      "سیستم‌های پیشرفته حافظه پنهان و بارگذاری سرور",
      "توسعه نهایی روی هاستینگ‌های تولیدی و فرم‌ها",
    ],

    contactTagline: "ارتباط با من",
    contactTitle: "راه‌اندازی محصول دیجیتال شما",
    contactSubtitle: "برای ساخت محصولات دیجیتال بی‌نقص آماده‌اید؟ مشخصات پروژه‌تان را ارسال کنید تا با هم یک اثر خیره‌کننده خلق کنیم.",
    contactCardTitle: "بیایید شروع کنیم",
    contactCardSubtitle: "فرم امن و محافظت‌شده در برابر هرزنامه توسط Netlify Forms",
    contactNameLabel: "نام شما",
    contactNamePlaceholder: "مانند: علی محمدی",
    contactEmailLabel: "آدرس ایمیل",
    contactEmailPlaceholder: "مانند: ali@company.com",
    contactFocusLabel: "تمرکز پروژه",
    contactFocusOption1: "اپلیکیشن تحت وب فول‌استک",
    contactFocusOption2: "اپلیکیشن موبایل (iOS/Android)",
    contactFocusOption3: "برندسازی دیجیتال لوکس و سئو",
    contactFocusOption4: "سایر / مشاوره اختصاصی",
    contactMessageLabel: "پیام",
    contactMessagePlaceholder: "اهداف، زمان‌بندی یا مشخصات پروژه خود را توصیف کنید...",
    contactErrorText: "خطا در برقراری ارتباط. لطفا اتصال شبکه را بررسی کرده و مجددا تلاش کنید.",
    contactSubmitEncrypting: "در حال رمزنگاری و ارسال...",
    contactSubmitButton: "ارسال مشخصات پروژه",
    contactSuccessTitle: "پیام با موفقیت دریافت شد!",
    contactSuccessDesc: "از ارتباط شما سپاسگزارم. مشخصات پروژه شما با امنیت کامل پردازش شد. من بررسی کرده و در کمتر از ۲۴ ساعت پاسخ خواهم داد.",
    contactSuccessBtn: "ارسال پیام دیگر",

    mockupPhoneTag: "ارسال همتا به همتا",
    mockupPhoneTabTravelers: "مسافران",
    mockupPhoneTabSenders: "فرستندگان",
    mockupPhoneCapacity: "ظرفیت: {val} کیلوگرم باقی‌مانده",
    mockupPhoneReward: "پاداش: ${val}",
    mockupPhoneDesc: "تحویل امن لپ‌تاپ جعبه‌دار به همراه بیمه...",
    mockupPhoneWeight: "وزن: {val} کیلوگرم",
    mockupPhoneEscrowActive: "امانی فعال شد",
    mockupPhoneHandshake: "دست‌دهی و تایید تحویل",
    mockupPhoneMatched: "تایید شد",
    mockupPhonePinHelp: "پین‌کد: {val}",
    mockupPhoneDisbursed: "وجه با موفقیت به مسافر منتقل شد",

    mockupBrowserBeautyStudio: "سالن زیبایی",
    mockupBrowserSubheading: "ترجمه زیبایی لوکس به دنیای دیجیتال.",
    mockupBrowserDesc: "تجسم هنر و ظرافت با قالب‌های استاندارد، بارگذاری پیشرفته تصاویر و تایپوگرافی مدرن و چشم‌نواز.",
    mockupBrowserCta: "مشاهده محصولات مراقبت پوست",
    mockupBrowserProductLabel: "سرم صورت",
    mockupBrowserTabSite: "سایت زنده",
    mockupBrowserTabLighthouse: "Lighthouse",
    mockupBrowserSeoTag: "نشانه‌گذاری‌های استاندارد سئو",
    mockupBrowserRankText: "رتبه ۱ در نتایج گوگل",
    mockupBrowserAuditTag: "بررسی کیفی Lighthouse",
    mockupBrowserPerformance: "سرعت و کارایی",
    mockupBrowserSeoPractices: "رعایت اصول سئو",
    mockupBrowserFooterNote: "* فایل‌های sitemap.xml و robot.txt با موفقیت روی نکست‌جی‌اس لود شدند.",

    videoScrollTagline: "۰۲ / مهندسی معکوس تعاملی",
    videoScrollTitle: "برنده – نمونه‌پژوهی تعاملی (Scrollytelling)",
    videoScrollSubtitle: "یک موتور پردازش فریم کانواس فوق‌سریع که سرعت اسکرول را مستقیماً به فریم‌های ویدیو متصل می‌کند. برای مهندسی معکوس معماری سیستم به پایین بکشید.",
    videoScrollPhase1Title: "فاز ۱: هسته ری‌اکت نیتیو",
    videoScrollPhase1Desc: "ساخت مخازن کد موبایل استاندارد با Expo. مهندسی انیمیشن‌های فوق‌ روان بومی و رابط‌های کاربری تعاملی ۶۰ فریم بر ثانیه.",
    videoScrollPhase1Bullets: ["مسیریابی ری‌اکت نیتیو", "فرآیند توسعه با Expo", "مدیریت ژست‌های حرکتی اختصاصی", "ادغام سخت‌افزاری امن"],
    videoScrollPhase2Title: "فاز ۲: مهندسی معکوس UI",
    videoScrollPhase2Desc: "تجزیه و تحلیل رابط‌های کاربری پیچیده به کامپوننت‌های اتمیک. تبدیل طرح‌های انتزاعی فیگما به اجزای کاربردی بومی.",
    videoScrollPhase2Bullets: ["اصول طراحی اتمیک", "وایرفریم‌های دقیق و باکیفیت", "قالب‌های واکنش‌گرا و سازگار", "انطباق صددرصدی با مشخصات پیکسل‌ها"],
    videoScrollPhase3Title: "فاز ۳: بک‌اند سوپابیس و حساب امانی",
    videoScrollPhase3Desc: "ساخت سرویس‌های ابری قدرتمند با جداول بهینه‌شده پستگرس. اعمال قوانین امنیت سطح سطر (RLS) و صندوق‌های تراکنش‌های مالی.",
    videoScrollPhase3Bullets: ["طراحی طرحواره‌های PostgreSQL", "امنیت سطح سطر (RLS)", "ای‌پی‌آی حساب امانی تراکنش‌ها", "همگام‌سازی آنی وضعیت‌ها"],
    videoScrollPhase4Title: "فاز ۴: تاییدیه و بهینه‌سازی",
    videoScrollPhase4Desc: "اجرای تست‌های خودکار دقیق و سنجش‌های کیفی Lighthouse. تضمین امنیت دست‌دهی دوطرفه پین‌کد و سئوی عالی برای جستجوی گوگل.",
    videoScrollPhase4Bullets: ["تاییدیه دست‌دهی با پین‌کد", "بررسی‌های کیفی Lighthouse گوگل", "تست‌های خودکار Playwright", "بهینه‌سازی نمایه‌سازی موتورهای جستجو"],

    footerJobTitle: "فناور خلاق و مهندس فول‌استک",
    footerMadeWith: "ساخته شده با {icon} در برلین",
    footerRights: "© {year} سامسون بهائین. تمامی حقوق محفوظ است.",
    metaTitle: "سامسون بهائین | فناور خلاق و مهندس فول‌استک",
    metaDesc: "توسعه‌دهنده فول‌استک و موبایل ارشد، متخصص در ساخت برنامه‌های تحت وب نکست‌جی‌اس لوکس، اپلیکیشن‌های اکسپو و ری‌اکت نیتیو، بک‌اند ابری مقیاس‌پذیر و سئو بی‌نقص.",
    footerImpressum: "اطلاعات حقوقی",
    footerDatenschutz: "حریم خصوصی",
    mobileDesktopNotice: "✨ برای بهترین تجربه تعاملی (فیزیک سه‌بعدی و داستان‌سرایی ویدیویی) لطفا در نسخه دسکتاپ مشاهده کنید.",
  },
};

interface LanguageContextProps {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: keyof Translations, params?: Record<string, string | number>) => string;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const savedLocale = localStorage.getItem("preferred_locale") as Locale;
    if (savedLocale && ["en", "de", "fa"].includes(savedLocale)) {
      setLocaleState(savedLocale);
    } else {
      // Auto-detect browser language if available and supported
      const browserLang = navigator.language.split("-")[0];
      if (browserLang === "de") {
        setLocaleState("de");
      } else if (browserLang === "fa" || browserLang === "ar") {
        setLocaleState("fa");
      }
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("preferred_locale", newLocale);
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

  const t = (key: keyof Translations, params?: Record<string, string | number>): string => {
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
  };

  // Helper function to expose raw array of translations (for bullets)
  const getBullets = (key: keyof Translations): string[] => {
    const text = translations[locale][key];
    return Array.isArray(text) ? text : [];
  };

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
