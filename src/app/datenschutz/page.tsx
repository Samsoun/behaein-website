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
    title: "Datenschutzerklärung",
    subtitle: "Informationen über die Verarbeitung personenbezogener Daten",
    backButton: "Zurück zur Startseite",
    sections: [
      {
        title: "1. Datenschutz auf einen Blick",
        content: "Der Schutz Ihrer persönlichen Daten ist mir ein wichtiges Anliegen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Nachfolgend informiere ich Sie darüber, wie ich mit Ihren Daten umgehe, wenn Sie diese Website besuchen."
      },
      {
        title: "2. Verantwortliche Stelle",
        content: "Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:\n\nSamsoun Behaein\nGrünhofer Weg 42\n13581 Berlin\nDeutschland\nE-Mail: behaein@web.de"
      },
      {
        title: "3. Datenerfassung beim Besuch dieser Website (Hosting & CDN)",
        content: "Diese Website wird extern bei Netlify gehostet. Der Hosting-Dienstleister ist:\nNetlify, Inc., 44 Montgomery Street, Suite 300, San Francisco, CA 94104, USA.\n\nWenn Sie meine Website besuchen, erfasst Netlify automatisch Log-Dateien (Server-Logfiles). Dazu gehören:\n- Browsertyp und Browserversion\n- Verwendetes Betriebssystem\n- Referrer URL (die zuvor besuchte Seite)\n- Hostname des zugreifenden Rechners\n- Uhrzeit der Serveranfrage\n- IP-Adresse des zugreifenden Geräts\n\nDie Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Ich habe ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und der Optimierung meiner Website – hierzu müssen die Server-Logfiles erfasst werden. Die Server von Netlify stehen teilweise in den USA; Netlify ist unter dem EU-US Data Privacy Framework zertifiziert und gewährleistet ein angemessenes Datenschutzniveau."
      },
      {
        title: "4. Kontaktformular (Netlify Forms)",
        content: "Wenn Sie mir per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten (Name, E-Mail-Adresse, Projektschwerpunkt, Nachricht) zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei mir gespeichert. Die Übermittlung und Speicherung erfolgt über die integrierte Formularfunktion von Netlify.\n\nDie Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf meinem berechtigten Interesse an der effektiven Bearbeitung der an mich gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), falls diese abgefragt wurde.\n\nDie von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei mir, bis Sie mich zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung Ihrer Anfrage). Zwingende gesetzliche Bestimmungen – insbesondere Aufbewahrungsfristen – bleiben unberührt."
      },
      {
        title: "5. Cookies und Tracking-Tools",
        content: "Diese Website verwendet keine Analyse- oder Tracking-Tools (wie Google Analytics, Facebook-Pixel, Hotjar etc.) und setzt keine einwilligungspflichtigen Cookies ein. Es werden lediglich technisch absolut notwendige Serververbindungen aufgebaut, um Ihnen die Seite sicher und schnell auszuliefern. Ihr Surfverhalten wird auf dieser Website nicht analysiert, was Ihre Privatsphäre optimal schützt und für eine extrem schnelle Ladezeit sorgt."
      },
      {
        title: "6. Ihre Rechte als betroffene Person",
        content: "Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf:\n- Kostenlose Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung (Art. 15 DSGVO)\n- Berichtigung unrichtiger oder Vervollständigung Ihrer bei mir gespeicherten Daten (Art. 16 DSGVO)\n- Löschung Ihrer bei mir gespeicherten personenbezogenen Daten, soweit dem keine gesetzlichen Aufbewahrungspflichten entgegenstehen (Art. 17 DSGVO)\n- Einschränkung der Verarbeitung Ihrer Daten (Art. 18 DSGVO)\n- Datenübertragbarkeit an Sie oder einen Dritten in einem gängigen, maschinenlesbaren Format (Art. 20 DSGVO)\n- Widerruf einer bereits erteilten Einwilligung zur Datenverarbeitung mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO)\n- Widerspruch gegen die künftige Verarbeitung Ihrer Daten (Art. 21 DSGVO)\n\nHierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit unter der im Impressum oder oben angegebenen E-Mail-Adresse an mich wenden. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Datenschutz-Aufsichtsbehörde zu (Art. 77 DSGVO)."
      }
    ]
  },
  en: {
    title: "Privacy Policy",
    subtitle: "Information on the processing of personal data",
    backButton: "Back to Home",
    sections: [
      {
        title: "1. Privacy at a Glance",
        content: "The protection of your personal data is of great importance to me. Personal data is any data by which you can be personally identified. Below I will inform you about how I handle your data when you visit this website."
      },
      {
        title: "2. Controller (Responsible Party)",
        content: "The controller responsible for data processing on this website is:\n\nSamsoun Behaein\nGrünhofer Weg 42\n13581 Berlin\nGermany\nEmail: behaein@web.de"
      },
      {
        title: "3. Data Collection when Visiting this Website (Hosting & CDN)",
        content: "This website is hosted externally with Netlify. The hosting provider is:\nNetlify, Inc., 44 Montgomery Street, Suite 300, San Francisco, CA 94104, USA.\n\nWhen you visit my website, Netlify automatically collects server log files. This includes:\n- Browser type and version\n- Operating system used\n- Referrer URL (the previously visited page)\n- Host name of the accessing computer\n- Time of the server request\n- IP address of the accessing device\n\nThe processing of this data is based on Art. 6 Paragraph 1 lit. f GDPR. I have a legitimate interest in the technically error-free presentation and optimization of my website – the server log files must be recorded for this purpose. Netlify servers are partly located in the US; Netlify is certified under the EU-US Data Privacy Framework and ensures an adequate level of data protection."
      },
      {
        title: "4. Contact Form (Netlify Forms)",
        content: "If you send me inquiries via the contact form, the details you enter, including your contact details (name, email address, project focus, message), will be stored by me for the purpose of processing the inquiry and in case of follow-up questions. The transmission and storage takes place via the integrated form functionality of Netlify.\n\nThe processing of this data is based on Art. 6 Paragraph 1 lit. b GDPR if your inquiry is related to the performance of a contract or is necessary for pre-contractual measures. In all other cases, processing is based on my legitimate interest in the effective handling of the inquiries addressed to me (Art. 6 Paragraph 1 lit. f GDPR) or on your consent (Art. 6 Paragraph 1 lit. a GDPR) if requested.\n\nThe data you enter in the contact form will remain with me until you request its deletion, withdraw your consent to storage, or the purpose for data storage no longer applies (e.g., after your inquiry has been processed). Mandatory statutory provisions – in particular statutory retention periods – remain unaffected."
      },
      {
        title: "5. Cookies and Tracking Tools",
        content: "This website does not use any analysis or tracking tools (such as Google Analytics, Facebook Pixel, Hotjar etc.) and does not set any cookies that require consent. Only technically necessary server connections are established to deliver the page securely and quickly. Your browsing behavior is not analyzed on this website, which protects your privacy and ensures extremely fast loading times."
      },
      {
        title: "6. Your Rights as a Data Subject",
        content: "Under applicable legal provisions, you have the right at any time to:\n- Free information about your stored personal data, its origin, recipient, and the purpose of data processing (Art. 15 GDPR)\n- Rectification of incorrect data or completion of your data stored by me (Art. 16 GDPR)\n- Deletion of your personal data stored by me, unless statutory retention obligations prevent this (Art. 17 GDPR)\n- Restriction of the processing of your data (Art. 18 GDPR)\n- Data portability to you or a third party in a structured, commonly used, machine-readable format (Art. 20 GDPR)\n- Withdrawal of consent previously given for data processing with future effect (Art. 7 Paragraph 3 GDPR)\n- Object to the future processing of your data (Art. 21 GDPR)\n\nFor this purpose, as well as for further questions on the subject of data protection, you can contact me at any time at the email address provided above. You also have the right to lodge a complaint with the competent data protection supervisory authority (Art. 77 GDPR)."
      }
    ]
  },
  fa: {
    title: "حریم خصوصی (Datenschutzerklärung)",
    subtitle: "اطلاعات مربوط به پردازش داده‌های شخصی بر اساس قوانین اتحادیه اروپا (DSGVO)",
    backButton: "بازگشت به صفحه اصلی",
    sections: [
      {
        title: "۱. نگاهی کوتاه به حفاظت از داده‌ها",
        content: "حفاظت از داده‌های شخصی شما برای من بسیار حائز اهمیت است. داده‌های شخصی هرگونه اطلاعاتی است که به شناسایی هویت شما کمک کند. در ادامه، نحوه پردازش داده‌های شما در هنگام بازدید از این وب‌سایت توضیح داده می‌شود."
      },
      {
        title: "۲. مسئول پردازش داده‌ها (Verantwortlicher)",
        content: "مسئول پردازش داده‌ها در این وب‌سایت:\n\nسامسون بهائین\nGrünhofer Weg 42\n13581 Berlin\nآلمان\nپست الکترونیکی: behaein@web.de"
      },
      {
        title: "۳. جمع‌آوری داده‌ها هنگام بازدید از وب‌سایت (Hosting & CDN)",
        content: "این وب‌سایت به صورت خارجی بر روی سرورهای Netlify میزبانی می‌شود. ارائه‌دهنده خدمات میزبانی:\nNetlify, Inc., 44 Montgomery Street, Suite 300, San Francisco, CA 94104, USA.\n\nهنگام بازدید از وب‌سایت، سیستم میزبانی به طور خودکار اطلاعات ورود به سیستم (Log files) را ثبت می‌کند. این اطلاعات شامل موارد زیر است:\n- نوع و نسخه مرورگر مورد استفاده\n- سیستم عامل دستگاه شما\n- آدرس سایتی که از آن وارد شده‌اید (Referrer URL)\n- نام دستگاه متصل‌شده\n- زمان دقیق ارسال درخواست به سرور\n- آدرس آی‌پی دستگاه شما\n\nپردازش این داده‌ها بر اساس بند ۶ تبصره ۱ بند f مقررات عمومی حفاظت از داده‌های اتحادیه اروپا (GDPR/DSGVO) انجام می‌شود. برای نمایش بدون نقص فنی و بهینه‌سازی وب‌سایت، ثبت این فایل‌ها ضروری است. سرورهای نتلیفای در ایالات متحده مستقر هستند؛ این شرکت دارای گواهینامه چارچوب حفاظت از داده‌های اتحادیه اروپا-آمریکا است و سطح مناسبی از امنیت را تضمین می‌کند."
      },
      {
        title: "۴. فرم تماس (Netlify Forms)",
        content: "اگر از طریق فرم تماس برای من پیامی ارسال کنید، اطلاعات وارد شده شامل نام، آدرس ایمیل، موضوع پروژه و متن پیام برای پردازش و پاسخ‌دهی ذخیره خواهند شد. ارسال و ذخیره‌سازی از طریق قابلیت فرم‌های داخلی Netlify انجام می‌شود.\n\nپردازش این داده‌ها بر اساس بند ۶ تبصره ۱ بند b مقررات GDPR انجام می‌شود، در صورتی که درخواست شما مربوط به قرارداد یا اقدامات پیش‌قراردادی باشد. در سایر موارد، پردازش بر اساس منافع مشروع من در رسیدگی موثر به پیام‌ها (بند f) یا رضایت صریح شما (بند a) است.\n\nاطلاعات شما تا زمانی که از من درخواست حذف نکنید، رضایت خود را پس نگیرید یا هدف ذخیره‌سازی برطرف نشود، نزد من باقی خواهد ماند. قوانین الزامی نگهداری داده‌ها (به ویژه دوره‌های نگهداری قانونی اسناد مالی) از این قاعده مستثنی هستند."
      },
      {
        title: "۵. کوکی‌ها و ابزارهای ردیابی",
        content: "این وب‌سایت از هیچ ابزار تحلیلی یا ردیابی (مانند گوگل آنالیتیکس، پیکسل فیس‌بوک، هاتجر و غیره) استفاده نمی‌کند و هیچ کوکی نیازمند رضایتی را روی دستگاه شما ذخیره نمی‌کند. فقط اتصالات فنی سرور برقرار می‌شود تا صفحه با امنیت بالا و سرعت عالی نمایش داده شود. فعالیت‌های شما در این وب‌سایت تحلیل نمی‌شود که این امر حریم خصوصی شما را به بهترین شکل حفظ کرده و سرعت لود فوق‌العاده‌ای ایجاد می‌کند."
      },
      {
        title: "۶. حقوق شما به عنوان صاحب داده‌ها",
        content: "شما بر اساس قوانین حفاظت از داده‌های اتحادیه اروپا (DSGVO) در هر زمان حق دارید:\n- اطلاعات رایگان درباره داده‌های شخصی ذخیره‌شده، منشا، گیرنده و هدف پردازش آنها دریافت کنید (بند ۱۵)\n- اصلاح یا تکمیل اطلاعات نادرست خود را درخواست کنید (بند ۱۶)\n- حذف داده‌های شخصی خود را خواستار شوید، در صورتی که تعهدات قانونی دیگری مانع نباشد (بند ۱۷)\n- محدود کردن پردازش داده‌های خود را درخواست کنید (بند ۱۸)\n- انتقال داده‌های خود به خود یا شخص ثالث را در قالب ساختاریافته و استاندارد ماشین‌خوان داشته باشید (بند ۲۰)\n- رضایت قبلی خود را برای پردازش داده‌ها in آینده پس بگیرید (بند ۷ تبصره ۳)\n- نسبت به پردازش داده‌های خود در آینده اعتراض کنید (بند ۲۱)\n\nبرای این منظور و همچنین برای سوالات بیشتر در مورد موضوع حفاظت از داده‌ها، می‌توانید در هر زمان از طریق آدرس ایمیل درج شده با من تماس بگیرید. همچنین حق تسلیم شکایت به مراجع نظارتی مربوطه برای شما محفوظ است (بند ۷۷)."
      }
    ]
  }
};

export default function Datenschutz() {
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
