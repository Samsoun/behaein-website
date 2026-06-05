"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { GeometricBackground } from "@/components/GeometricBackground";
import { Logo } from "@/components/Logo";

const localTranslations = {
  de: {
    title: "Impressum",
    subtitle: "Rechtliche Angaben gemäß § 5 DDG",
    backButton: "Zurück zur Startseite",
    sections: [
      {
        title: "Angaben gemäß § 5 DDG",
        content: "Samsoun Behaein\nGrünhofer Weg 42\n13581 Berlin\nDeutschland"
      },
      {
        title: "Kontakt",
        content: "E-Mail: behaein@web.de\nTelefon: 015755664185"
      },
      {
        title: "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV",
        content: "Samsoun Behaein\nGrünhofer Weg 42\n13581 Berlin\nDeutschland"
      },
      {
        title: "Streitschlichtung",
        content: "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr.\nUnsere E-Mail-Adresse finden Sie oben im Impressum.\n\nWir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen."
      },
      {
        title: "Haftung für Inhalte",
        content: "Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen."
      },
      {
        title: "Haftung für Links",
        content: "Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen."
      },
      {
        title: "Urheberrecht",
        content: "Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen."
      }
    ]
  },
  en: {
    title: "Legal Notice",
    subtitle: "Information according to § 5 DDG",
    backButton: "Back to Home",
    sections: [
      {
        title: "Information according to § 5 DDG",
        content: "Samsoun Behaein\nGrünhofer Weg 42\n13581 Berlin\nGermany"
      },
      {
        title: "Contact",
        content: "Email: behaein@web.de\nPhone: 015755664185"
      },
      {
        title: "Responsible for content according to § 18 Section 2 MStV",
        content: "Samsoun Behaein\nGrünhofer Weg 42\n13581 Berlin\nGermany"
      },
      {
        title: "EU Dispute Resolution",
        content: "The European Commission provides a platform for online dispute resolution (ODR): https://ec.europa.eu/consumers/odr.\nOur email address can be found above in the Legal Notice.\n\nWe are not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board."
      },
      {
        title: "Liability for Content",
        content: "As a service provider, we are responsible for our own content on these pages in accordance with general laws pursuant to § 7 Paragraph 1 DDG. However, pursuant to §§ 8 to 10 DDG, we as service providers are not obliged to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity. Obligations to remove or block the use of information in accordance with general laws remain unaffected. However, liability in this regard is only possible from the time we become aware of a specific legal violation. As soon as we become aware of such violations, we will remove this content immediately."
      },
      {
        title: "Liability for Links",
        content: "Our site contains links to external websites of third parties, whose content we have no influence over. Therefore, we cannot assume any liability for this external content. The respective provider or operator of the pages is always responsible for the content of the linked pages. The linked pages were checked for possible legal violations at the time of linking. Illegal content was not recognizable at the time of linking. However, permanent monitoring of the content of the linked pages is unreasonable without concrete evidence of a violation. Upon becoming aware of any violations, we will remove such links immediately."
      },
      {
        title: "Copyright",
        content: "The content and works created by the site operators on these pages are subject to German copyright law. Duplication, processing, distribution, or any form of utilization beyond the limits of copyright law requires the written consent of the respective author or creator. Downloads and copies of this site are only permitted for private, non-commercial use. Insofar as the content on this page was not created by the operator, the copyrights of third parties are respected. In particular, third-party content is marked as such. Should you nevertheless become aware of a copyright infringement, please notify us. As soon as we become aware of any violations, we will remove such content immediately."
      }
    ]
  },
  fa: {
    title: "اطلاعات حقوقی (Impressum)",
    subtitle: "اطلاعات قانونی بر اساس بند ۵ قانون خدمات دیجیتال آلمان (DDG)",
    backButton: "بازگشت به صفحه اصلی",
    sections: [
      {
        title: "اطلاعات بر اساس بند ۵ DDG",
        content: "سامسون بهائین\nGrünhofer Weg 42\n13581 Berlin\nآلمان"
      },
      {
        title: "راه‌های ارتباطی",
        content: "پست الکترونیکی: behaein@web.de\nتلفن تماس: 015755664185"
      },
      {
        title: "مسئول محتوا بر اساس بند ۱۸ تبصره ۲ پیمان رسانه‌ای ایالت‌ها (MStV)",
        content: "سامسون بهائین\nGrünhofer Weg 42\n13581 Berlin\nآلمان"
      },
      {
        title: "حل و فصل اختلافات در اتحادیه اروپا",
        content: "کمیسیون اروپا پلتفرمی برای حل و فصل آنلاین اختلافات (ODR) ارائه می‌دهد: https://ec.europa.eu/consumers/odr.\nآدرس ایمیل ما در بالای همین صفحه درج شده است.\n\nما مایل یا موظف به شرکت در فرآیندهای حل اختلاف در هیئت داوری مصرف‌کننده نیستیم."
      },
      {
        title: "مسئولیت در قبال محتوا",
        content: "ما به عنوان ارائه دهنده خدمات، مسئول محتوای خود در این صفحات بر اساس قوانین عمومی هستیم. با این حال، ما موظف به نظارت بر اطلاعات شخص ثالث منتقل شده یا ذخیره شده یا بررسی شرایطی که نشان دهنده فعالیت غیرقانونی است، نیستیم. تعهدات مربوط به حذف یا مسدود کردن استفاده از اطلاعات طبق قوانین عمومی همچنان محفوظ است. با این حال، مسئولیت در این زمینه تنها از زمانی که ما از یک نقض قانون خاص مطلع شویم، امکان‌پذیر است. به محض اطلاع از چنین نقض‌هایی، بلافاصله این محتوا را حذف خواهیم کرد."
      },
      {
        title: "مسئولیت در قبال لینک‌ها",
        content: "سایت ما حاوی لینک‌هایی به وب‌سایت‌های خارجی شخص ثالث است که ما هیچ تاثیری روی محتوای آنها نداریم. بنابراین، ما نمی‌توانیم مسئولیتی در قبال این محتوای خارجی بپذیریم. ارائه‌دهنده یا اپراتور مربوطه همواره مسئول محتوای صفحات لینک‌شده است. صفحات لینک‌شده در زمان ایجاد لینک از نظر نقض احتمالی قانون بررسی شده‌اند و محتوای غیرقانونی در زمان لینک‌دهی شناسایی نشده است. با این حال، نظارت مستمر بر محتوای صفحات لینک‌شده بدون مدارک مشخص منطقی نیست. در صورت اطلاع از هرگونه نقض قانون، این لینک‌ها را فوراً حذف خواهیم کرد."
      },
      {
        title: "حق چاپ و تکثیر (کپی‌رایت)",
        content: "محتوا و آثار ایجاد شده توسط اپراتورهای سایت در این صفحات مشمول قانون کپی‌رایت آلمان است. تکثیر، ویرایش، توزیع یا هر نوع استفاده خارج از محدوده قانون کپی‌رایت مستلزم موافقت کتبی نویسنده یا پدیدآورنده مربوطه است. دانلود و کپی از این سایت فقط برای استفاده خصوصی و غیرتجاری مجاز است. در صورتی که محتوای این صفحه توسط اپراتور ایجاد نشده باشد، حق کپی‌رایت شخص ثالث رعایت شده و مشخص شده است. با این حال، در صورت مشاهده هرگونه نقض حق چاپ، لطفا به ما اطلاع دهید. به محض اطلاع از هرگونه تخلف، چنین محتوایی را فوراً حذف خواهیم کرد."
      }
    ]
  }
};

export default function Impressum() {
  const { locale, isRtl } = useLanguage();
  const t = localTranslations[locale] || localTranslations.en;

  return (
    <>
      {/* 3D constellation canvas background */}
      <GeometricBackground />

      {/* Floating Navbar */}
      <header className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl">
        <nav className="glass-panel rounded-full px-4 sm:px-6 py-3 flex justify-between items-center shadow-lg border border-zinc-800/80 backdrop-blur-md">
          <Link href="/" className="cursor-pointer group flex items-center gap-2">
            <Logo size={24} />
          </Link>
          
          <Link
            href="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100/10 hover:bg-amber-100/20 border border-amber-100/25 text-[10px] sm:text-xs font-bold text-amber-100 uppercase tracking-wider transition-all duration-300 active:scale-95"
          >
            <ArrowLeft className={`w-3.5 h-3.5 ${isRtl ? "rotate-180" : ""}`} />
            {t.backButton}
          </Link>
        </nav>
      </header>

      <main className="relative z-10 w-full min-h-screen py-32 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Accent glow orb */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[250px] h-[250px] md:w-[450px] md:h-[450px] bg-radial-accent pointer-events-none -z-10 opacity-50" />

        <div className="w-full max-w-3xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`text-center md:text-start mb-12 ${isRtl ? "md:text-right" : ""}`}
          >
            <h1 className="text-4xl md:text-5xl font-black font-display text-white tracking-tight leading-tight">
              {t.title}
            </h1>
            <p className="text-zinc-400 text-sm md:text-base mt-2 font-mono uppercase tracking-wider">
              {t.subtitle}
            </p>
          </motion.div>
 
          {/* Legal Card Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-panel p-6 sm:p-10 rounded-2xl flex flex-col gap-8 shadow-2xl border border-zinc-800/80"
          >
            {t.sections.map((section, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col gap-3 pb-8 last:pb-0 border-b border-zinc-900/50 last:border-0 ${isRtl ? "text-right" : "text-left"}`}
              >
                <h2 className="text-lg sm:text-xl font-bold font-display text-[#E6C17A]">
                  {section.title}
                </h2>
                <div className="text-zinc-300 text-sm leading-relaxed whitespace-pre-line font-sans">
                  {section.content}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </main>
    </>
  );
}
