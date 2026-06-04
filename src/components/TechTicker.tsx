"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

// Simple Icons SVG Paths and brand colors
const TECH_LOGOS = [
  {
    name: "HTML5",
    slug: "html5",
    color: "#E34F26",
    path: "M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z",
    descriptions: {
      en: "Standard markup language for structuring beautiful, semantic web documents.",
      de: "Standard-Markup-Sprache zur Strukturierung von schönen, semantischen Webinhalten.",
      fa: "زبان نشانه‌گذاری استاندارد برای ساختاردهی به صفحات وب به صورت معنایی و استاندارد."
    }
  },
  {
    name: "CSS3",
    slug: "css3",
    color: "#1572B6",
    path: "M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z",
    descriptions: {
      en: "Style sheet language for responsive layouts, vibrant aesthetics, and slick animations.",
      de: "Stylesheet-Sprache für responsive Layouts, lebendige Ästhetik und elegante Animationen.",
      fa: "زبان استایل‌دهی برای طراحی ظاهری واکنش‌گرا، جلوه‌های بصری پویا و انیمیشن‌های روان."
    }
  },
  {
    name: "JavaScript",
    slug: "javascript",
    color: "#F7DF1E",
    path: "M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z",
    descriptions: {
      en: "Core programming language for adding interactive client-side logic and smooth execution.",
      de: "Kernprogrammiersprache für interaktive Logik und flüssige clientseitige Ausführung.",
      fa: "زبان برنامه‌نویسی اصلی برای پیاده‌سازی منطق‌های تعاملی و پویاسازی صفحات وب."
    }
  },
  {
    name: "React",
    slug: "react",
    color: "#61DAFB",
    path: "M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z",
    descriptions: {
      en: "Component-driven frontend UI library for modular, stateful, and performant user interfaces.",
      de: "Komponentenbasierte Frontend-UI-Bibliothek für modulare und performante Benutzeroberflächen.",
      fa: "کتابخانه رابط کاربری کامپوننت‌محور و پیشرفته برای ساخت بخش کاربری پیمانه‌ای و پرسرعت."
    }
  },
  {
    name: "React Native",
    slug: "reactnative",
    color: "#61DAFB",
    path: "M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z",
    descriptions: {
      en: "Universal framework for building native Android and iOS applications with React.",
      de: "Universelles Framework zur Erstellung nativer Android- und iOS-Anwendungen mit React.",
      fa: "پلتفرم قدرتمند و چندمنظوره برای ساخت برنامه‌های بومی اندروید و iOS با استفاده از ری‌اکت."
    }
  },

  {
    name: "Tailwind CSS",
    slug: "tailwindcss",
    color: "#38BDF8",
    path: "M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z",
    descriptions: {
      en: "Utility-first CSS framework enabling lightning-fast UI creation directly in HTML classes.",
      de: "Utility-First-CSS-Framework für blitzschnelles UI-Design direkt in HTML-Klassen.",
      fa: "فریم‌ورک استایل‌دهی ابزارمحور برای ساخت رابط‌های کاربری بسیار سریع مستقیماً در کلاس‌های کد."
    }
  },
  {
    name: "Next.js",
    slug: "nextdotjs",
    color: "#FFFFFF",
    path: "M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z",
    descriptions: {
      en: "React meta-framework providing Server-Side Rendering (SSR) and seamless SEO architecture.",
      de: "React-Meta-Framework für Server-Side Rendering (SSR) und nahtlose SEO-Architektur.",
      fa: "فریم‌ورک ارشد ری‌اکت با قابلیت‌های رندر سمت سرور و معماری پیشرفته سئو."
    }
  },
  {
    name: "Node.js",
    slug: "nodedotjs",
    color: "#339933",
    path: "M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z",
    descriptions: {
      en: "High-performance asynchronous JavaScript engine for server-side business logic and APIs.",
      de: "Asynchrone JavaScript-Laufzeitumgebung für performante serverseitige Logik und APIs.",
      fa: "محیط اجرای آسنکرون جاوااسکریپت برای ساخت منطق‌های سمت سرور و ای‌پی‌آی‌های سریع."
    }
  },
  {
    name: "Git",
    slug: "git",
    color: "#F05032",
    path: "M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187",
    descriptions: {
      en: "Distributed version control system for robust, collaborative source code management.",
      de: "Verteiltes Versionskontrollsystem für robustes, gemeinsames Quellcodemanagement.",
      fa: "سیستم کنترل نسخه توزیع‌شده برای ردیابی دقیق تغییرات کد و همکاری تیمی امن."
    }
  },
  {
    name: "GitHub",
    slug: "github",
    color: "#ECF0F1",
    path: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
    descriptions: {
      en: "Developer ecosystem platform hosting codebases, PR workflows, and automated CI/CD pipelines.",
      de: "Cloud-Plattform für Quellcode-Hosting, Pull Requests und automatisierte CI/CD-Pipelines.",
      fa: "پلتفرم ابری توسعه‌دهندگان برای میزبانی مخازن کد، بررسی تغییرات و ساخت چرخه‌های CI/CD."
    }
  },
  {
    name: "Expo",
    slug: "expo",
    color: "#FFFFFF",
    path: "M0 20.084c.043.53.23 1.063.718 1.778.58.849 1.576 1.315 2.303.567.49-.505 5.794-9.776 8.35-13.29a.761.761 0 011.248 0c2.556 3.514 7.86 12.785 8.35 13.29.727.748 1.723.282 2.303-.567.57-.835.728-1.42.728-2.046 0-.426-8.26-15.798-9.092-17.078-.8-1.23-1.044-1.498-2.397-1.542h-1.032c-1.353.044-1.597.311-2.398 1.542C8.267 3.991.33 18.758 0 19.77Z",
    descriptions: {
      en: "Universal ecosystem for React Native, simplifying cross-platform mobile builds and updates.",
      de: "Universelles Ökosystem für React Native, das plattformübergreifende App-Builds vereinfacht.",
      fa: "اکوسیستم جهانی ری‌اکت نیتیو برای تسهیل فرآیند ساخت و بروزرسانی برنامه‌های موبایل."
    }
  },
  {
    name: "Firebase",
    slug: "firebase",
    color: "#FFCA28",
    path: "M3.89 15.672L6.255.461A.542.542 0 017.27.288l2.543 4.771zm16.794 3.692l-2.25-14a.54.54 0 00-.919-.295L3.316 19.365l7.856 4.427a1.621 1.621 0 001.588 0zM14.3 7.147l-1.82-3.482a.542.542 0 00-.96 0L3.53 17.984z",
    descriptions: {
      en: "Google cloud platform offering backend databases, authentication, and secure serverless hosting.",
      de: "Cloud-Plattform von Google mit Backend-Datenbanken, Authentifizierung und sicherem Serverless-Hosting.",
      fa: "پلتفرم جامع ابری گوگل شامل دیتابیس‌های ابری، سیستم احراز هویت و میزبانی بدون سرور."
    }
  },
  {
    name: "Supabase",
    slug: "supabase",
    color: "#3ECF8E",
    path: "M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C-.33 13.427.65 15.455 2.409 15.455h9.579l.113 7.51c.014.985 1.259 1.408 1.873.636l9.262-11.653c1.093-1.375.113-3.403-1.645-3.403h-9.642z",
    descriptions: {
      en: "Open-source Firebase alternative utilizing transactional Postgres tables and real-time sockets.",
      de: "Open-Source-Alternative zu Firebase mit PostgreSQL-Datenbanken und Echtzeit-Verbindungen.",
      fa: "جایگزین متن‌باز فایربیس مبتنی بر پستگرس با سیستم احراز هویت و ذخیره‌سازی ابری."
    }
  },
  {
    name: "Docker",
    slug: "docker",
    color: "#2496ED",
    path: "M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z",
    descriptions: {
      en: "Containerization platform to package, deploy, and scale applications consistently across environments.",
      de: "Containerisierungsplattform zum Packen, Bereitstellen und Skalieren von Anwendungen über verschiedene Umgebungen hinweg.",
      fa: "پلتفرم کانتینرسازی برای بسته‌بندی، استقرار و مقیاس‌پذیری یکپارچه برنامه‌ها در محیط‌های مختلف."
    }
  },
  {
    name: "Netlify",
    slug: "netlify",
    color: "#00C7B7",
    path: "M6.49 19.04h-.23L5.13 17.9v-.23l1.73-1.71h1.2l.15.15v1.2L6.5 19.04ZM5.13 6.31V6.1l1.13-1.13h.23L8.2 6.68v1.2l-.15.15h-1.2L5.13 6.31Zm9.96 9.09h-1.65l-.14-.13v-3.83c0-.68-.27-1.2-1.1-1.23-.42 0-.9 0-1.43.02l-.07.08v4.96l-.14.14H8.9l-.13-.14V8.73l.13-.14h3.7a2.6 2.6 0 0 1 2.61 2.6v4.08l-.13.14Zm-8.37-2.44H.14L0 12.82v-1.64l.14-.14h6.58l.14.14v1.64l-.14.14Zm17.14 0h-6.58l-.14-.14v-1.64l.14-.14h6.58l.14.14v1.64l-.14.14ZM11.05 6.55V1.64l.14-.14h1.65l.14.14v4.9l-.14.14h-1.65l-.14-.13Zm0 15.81v-4.9l.14-.14h1.65l.14.13v4.91l-.14.14h-1.65l-.14-.14Z",
    descriptions: {
      en: "Serverless hosting and automation platform for deploying high-performance static websites.",
      de: "Serverless-Hosting- und Automatisierungsplattform zur Bereitstellung performanter statischer Websites.",
      fa: "پلتفرم ابری میزبانی بدون سرور و خودکارسازی برای استقرار بسیار سریع وب‌سایت‌های ایستا."
    }
  },
  {
    name: "Sentry",
    slug: "sentry",
    color: "#F15A24",
    path: "M13.91 2.505c-.873-1.448-2.972-1.448-3.844 0L6.904 7.92a15.478 15.478 0 0 1 8.53 12.811h-2.221A13.301 13.301 0 0 0 5.784 9.814l-2.926 5.06a7.65 7.65 0 0 1 4.435 5.848H2.194a.365.365 0 0 1-.298-.534l1.413-2.402a5.16 5.16 0 0 0-1.614-.913L.296 19.275a2.182 2.182 0 0 0 .812 2.999 2.24 2.24 0 0 0 1.086.288h6.983a9.322 9.322 0 0 0-3.845-8.318l1.11-1.922a11.47 11.47 0 0 1 4.95 10.24h5.915a17.242 17.242 0 0 0-7.885-15.28l2.244-3.845a.37.37 0 0 1 .504-.13c.255.14 9.75 16.708 9.928 16.9a.365.365 0 0 1-.327.543h-2.287c.029.612.029 1.223 0 1.831h2.297a2.206 2.206 0 0 0 1.922-3.31z",
    descriptions: {
      en: "Self-healing monitoring platform alerting crash reports and performance anomalies in real-time.",
      de: "Monitoring-Plattform zur Echtzeit-Fehlerdiagnose und Performance-Optimierung.",
      fa: "پلتفرم پایش خطاها و کرش‌های برنامه‌ها به صورت آنی برای پایداری ۱۰۰ درصدی سیستم."
    }
  },
  {
    name: "PostHog",
    slug: "posthog",
    color: "#F1A818",
    path: "M9.854 14.5 5 9.647.854 5.5A.5.5 0 0 0 0 5.854V8.44a.5.5 0 0 0 .146.353L5 13.647l.147.146L9.854 18.5l.146.147v-.049c.065.03.134.049.207.049h2.586a.5.5 0 0 0 .353-.854L9.854 14.5zm0-5-4-4a.487.487 0 0 0-.409-.144.515.515 0 0 0-.356.21.493.493 0 0 0-.089.288V8.44a.5.5 0 0 0 .147.353l9 9a.5.5 0 0 0 .853-.354v-2.585a.5.5 0 0 0-.146-.354l-5-5zm1-4a.5.5 0 0 0-.854.354V8.44a.5.5 0 0 0 .147.353l4 4a.5.5 0 0 0 .853-.354V9.854a.5.5 0 0 0-.146-.354l-4-4zm12.647 11.515a3.863 3.863 0 0 1-2.232-1.1l-4.708-4.707a.5.5 0 0 0-.854.354v6.585a.5.5 0 0 0 .5.5H23.5a.5.5 0 0 0 .5-.5v-.6c0-.276-.225-.497-.499-.532zm-5.394.032a.8.8 0 1 1 0-1.6.8.8 0 0 1 0 1.6zM.854 15.5a.5.5 0 0 0-.854.354v2.293a.5.5 0 0 0 .5.5h2.293c.222 0 .39-.135.462-.309a.493.493 0 0 0-.109-.545L.854 15.501zM5 14.647.854 10.5a.5.5 0 0 0-.854.353v2.586a.5.5 0 0 0 .146.353L4.854 18.5l.146.147h2.793a.5.5 0 0 0 .353-.854L5 14.647z",
    descriptions: {
      en: "All-in-one product analytics tool offering session replays, feature flags, and event funnels.",
      de: "All-in-One-Produktanalyse für Session-Replays, Feature-Flags und Event-Funnel.",
      fa: "ابزار جامع تحلیل رفتار کاربران شامل بازپخش جلسات کاربری، پرچم‌های قابلیت و تحلیل رویدادها."
    }
  },
  {
    name: "Better Stack",
    slug: "betterstack",
    color: "#00A3FF",
    path: "m.7792 10.7479-.7654 6.6384a2.0957 2.0957 0 0 0 .696 1.8122l1.8965 1.672c.6494.5725 1.658.0145 1.5185-.84L2.6039 10.705c-.1723-1.056-1.7022-1.02-1.8247.0429Zm12.3733 8.714L8.63 6.431c-.5023-1.4472-2.6082-1.3845-3.0203.0898l-1.376 4.9234c-.156.559-.216.8822.0005 1.4212h.5225l1.8993 6.0694c.294.7324.9017 1.3009 1.6611 1.5538l2.8315.9435c1.2417.4137 2.4268-.7513 2.004-1.97zm10.6297-1.0332L15.7907 3.4433c-.6971-1.3072-2.5779-1.2727-3.227.0589l-1.9652 3.9555c-.2375.487-.1274.6608.07.9435.1585.2268.526.2447.6758.012.147-.2287.488-.2076.6058.0375l5.1379 10.687a2.735 2.735 0 0 0 2.1416 1.6016l2.7183.3476c1.4628.1924 2.5299-1.3539 1.8343-2.6582z",
    descriptions: {
      en: "Observability toolkit integrating high-speed log management, uptime alerts, and incident rooms.",
      de: "Observability-Toolkit mit schnellem Log-Management, Uptime-Alerts und Vorfall-Räumen.",
      fa: "جعبه‌ابزار نظارتی برای ثبت لاگ‌های پرسرعت، هشدارهای پایداری سرور و مدیریت حوادث."
    }
  }
];

export const TechTicker: React.FC = () => {
  const { locale, isRtl } = useLanguage();
  const [hoveredLogo, setHoveredLogo] = useState<typeof TECH_LOGOS[0] | null>(null);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Hook into viewport dimensions to tailor desktop hover vs mobile native tap behaviors
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Load minimized state from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem("ticker_minimized");
    if (saved === "true") {
      setIsMinimized(true);
    }
    setHasLoaded(true);
  }, []);

  const handleToggleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newState = !isMinimized;
    setIsMinimized(newState);
    localStorage.setItem("ticker_minimized", String(newState));
  };


  if (!hasLoaded) return null;

  // Clone twice for seamless marquee loop
  const marqueeItems = [...TECH_LOGOS, ...TECH_LOGOS, ...TECH_LOGOS];

  // Localized general texts
  const barTitleText = {
    en: "Active Stack",
    de: "Stack-Ticker",
    fa: "مهارت‌های من"
  }[locale] || "Active Stack";

  const expandTooltipText = {
    en: "Expand Ticker",
    de: "Ticker maximieren",
    fa: "نمایش نوار مهارت‌ها"
  }[locale] || "Expand Ticker";

  const closeTooltipText = {
    en: "Minimize Ticker",
    de: "Ticker minimieren",
    fa: "کوچک‌سازی نوار"
  }[locale] || "Minimize Ticker";

  return (
    <>
      {/* Self-contained high performance marquee CSS keyframes */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes marquee-scroll {
            0% {
              transform: translate3d(0, 0, 0);
            }
            100% {
              transform: translate3d(-33.3333%, 0, 0);
            }
          }
          @keyframes marquee-scroll-rtl {
            0% {
              transform: translate3d(0, 0, 0);
            }
            100% {
              transform: translate3d(33.3333%, 0, 0);
            }
          }
          .animate-marquee {
            display: flex;
            width: max-content;
            animation: marquee-scroll 45s linear infinite;
          }
          .animate-marquee-rtl {
            display: flex;
            width: max-content;
            animation: marquee-scroll-rtl 45s linear infinite;
          }
          .ticker-container:hover .animate-marquee,
          .ticker-container:hover .animate-marquee-rtl {
            animation-play-state: paused;
          }
          .mask-edge-fade {
            mask-image: linear-gradient(to right, transparent, white 8%, white 92%, transparent);
            -webkit-mask-image: linear-gradient(to right, transparent, white 8%, white 92%, transparent);
          }
        `
      }} />

      <AnimatePresence mode="wait">
        {!isMinimized ? (
          /* FULL FLOATING TICKER MARQUEE BAR */
          <motion.div
            key="full-ticker"
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
            dir={isRtl ? "rtl" : "ltr"}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-5xl rounded-2xl glass-panel py-3 px-4 flex items-center justify-between border border-white/5 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.5)] select-none pointer-events-auto h-14 sm:h-16"
          >
            {/* Left Title Accent */}
            <div className="flex items-center gap-2.5 flex-shrink-0 pl-1 pr-3 border-r border-white/10 dark:border-white/5 rtl:border-r-0 rtl:border-l rtl:pl-3 rtl:pr-1">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00F0FF]"></span>
              </span>
              <span className="text-[10px] sm:text-xs font-mono font-black uppercase tracking-wider text-slate-400">
                {barTitleText}
              </span>
            </div>

            {/* Middle Marquee Wrapper */}
            <div className="flex-1 overflow-hidden relative h-full mask-edge-fade mx-2 sm:mx-4 ticker-container flex items-center">
              <div className={isRtl ? "animate-marquee-rtl" : "animate-marquee"}>
                {marqueeItems.map((logo, idx) => (
                  <div
                    key={`${logo.slug}-${idx}`}
                    onMouseEnter={() => !isMobile && setHoveredLogo(logo)}
                    onMouseLeave={() => !isMobile && setHoveredLogo(null)}
                    onClick={() => isMobile && setHoveredLogo(logo)}
                    className="relative flex items-center justify-center mx-5 sm:mx-7 cursor-pointer group transition-all duration-300 py-1"
                  >
                    {/* SVG Icon */}
                    <svg
                      role="img"
                      viewBox="0 0 24 24"
                      className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 pointer-events-none filter drop-shadow-[0_0_8px_rgba(0,240,255,0)] group-hover:scale-115"
                      fill={hoveredLogo?.slug === logo.slug ? logo.color : "currentColor"}
                      style={{
                        color: "rgba(148, 163, 184, 0.75)",
                        filter: hoveredLogo?.slug === logo.slug ? `drop-shadow(0 0 8px ${logo.color}44)` : 'none'
                      }}
                    >
                      <path d={logo.path} />
                    </svg>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Minimize Trigger */}
            <button
              onClick={handleToggleMinimize}
              title={closeTooltipText}
              aria-label={closeTooltipText}
              className="flex-shrink-0 p-1.5 rounded-full bg-slate-900/30 hover:bg-[#00F0FF]/10 text-slate-400 hover:text-[#00F0FF] border border-white/5 hover:border-[#00F0FF]/20 transition-all duration-300 cursor-pointer active:scale-90"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="12" x2="6" y2="12" />
              </svg>
            </button>

            {/* Premium Center-Aligned Floating Info Popover (Desktop Unclipped) */}
            <AnimatePresence>
              {!isMobile && hoveredLogo && (
                <motion.div
                  initial={{ opacity: 0, y: 15, x: "-50%", scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
                  exit={{ opacity: 0, y: 10, x: "-50%", scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="absolute bottom-[125%] left-1/2 -translate-x-1/2 w-[90vw] sm:w-[400px] p-4 rounded-xl glass-panel bg-slate-950/95 border border-[#00F0FF]/15 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.6)] z-50 text-start pointer-events-none"
                >
                  {/* Glowing color border accent */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2.5px] rounded-t-xl"
                    style={{ backgroundColor: hoveredLogo.color }}
                  />
                  
                  <div className="flex items-center gap-2.5 mb-1.5 pt-1">
                    <svg role="img" viewBox="0 0 24 24" className="w-4.5 h-4.5" fill={hoveredLogo.color}>
                      <path d={hoveredLogo.path} />
                    </svg>
                    <h4 className="text-xs sm:text-sm font-black text-white tracking-wide uppercase">
                      {hoveredLogo.name}
                    </h4>
                  </div>

                  <p className="text-[10px] sm:text-xs text-slate-300 leading-relaxed font-normal">
                    {hoveredLogo.descriptions[locale] || hoveredLogo.descriptions.en}
                  </p>

                  {/* Micro aesthetic light indicator */}
                  <div 
                    className="absolute bottom-0 right-4 w-12 h-[1px] opacity-40" 
                    style={{ backgroundColor: hoveredLogo.color, boxShadow: `0 0 8px 1px ${hoveredLogo.color}` }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* COLLAPSED FLOATING MINI BUTTON TRIGER */
          <motion.div
            key="minimized-ticker"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            onClick={handleToggleMinimize}
            className="fixed bottom-6 right-6 z-40 p-3 rounded-full glass-panel bg-slate-950/80 backdrop-blur-md cursor-pointer border border-[#00F0FF]/20 shadow-[0_0_15px_rgba(0,240,255,0.15)] hover:shadow-[0_0_25px_rgba(0,240,255,0.35)] transition-all duration-300 group flex items-center justify-center pointer-events-auto hover:scale-105 active:scale-95"
            title={expandTooltipText}
          >
            <div className="relative flex items-center justify-center">
              {/* Stack visual icons pulsing */}
              <svg
                className="w-5 h-5 text-[#00F0FF] group-hover:rotate-12 transition-transform duration-300"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F0FF]"></span>
              </span>
            </div>
            
            {/* Slide-out text label on hover */}
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2.5 transition-all duration-500 ease-out text-[10px] font-mono font-bold tracking-widest text-[#00F0FF] uppercase whitespace-nowrap">
              Stack
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop Dim Overlay (Mobile Native Sheet) */}
      <AnimatePresence>
        {isMobile && hoveredLogo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setHoveredLogo(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 cursor-pointer"
          />
        )}
      </AnimatePresence>

      {/* Mobile-Native iOS-Style Bottom Sheet Drawer */}
      <AnimatePresence>
        {isMobile && hoveredLogo && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            dir={isRtl ? "rtl" : "ltr"}
            className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl border-t border-[#00F0FF]/15 bg-slate-950/95 p-6 pb-10 shadow-[0_-15px_40px_rgba(0,0,0,0.8)] backdrop-blur-2xl text-start select-none"
          >
            {/* Swipe handle decoration */}
            <div className="mx-auto w-12 h-1 rounded-full bg-slate-800 mb-6" />

            {/* Close Button */}
            <button
              onClick={() => setHoveredLogo(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/50 hover:bg-[#00F0FF]/10 text-slate-400 hover:text-white border border-white/5 transition-colors cursor-pointer"
              aria-label="Close sheet"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Drawer Content */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3.5 pt-1">
                {/* Logo container with radial brand glow */}
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5 relative flex items-center justify-center">
                  <svg role="img" viewBox="0 0 24 24" className="w-8 h-8 filter drop-shadow-[0_0_12px_rgba(0,240,255,0.4)]" fill={hoveredLogo.color}>
                    <path d={hoveredLogo.path} />
                  </svg>
                  <div className="absolute inset-0 rounded-2xl opacity-10 blur-md" style={{ backgroundColor: hoveredLogo.color }} />
                </div>

                <div>
                  <h4 className="text-lg font-black text-white tracking-wide uppercase">
                    {hoveredLogo.name}
                  </h4>
                  <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">
                    Technology Stack
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed font-normal mt-2">
                {hoveredLogo.descriptions[locale] || hoveredLogo.descriptions.en}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
export default TechTicker;
