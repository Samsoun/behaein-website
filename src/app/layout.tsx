import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter, Vazirmatn, Amiri } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
  display: "swap",
});

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazirmatn",
  display: "swap",
});

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-amiri",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Samsoun Behaein | Creative Technologist & Full Stack Engineer",
  description: "Portfolio of Samsoun Behaein, a Full Stack and Mobile Software Engineer specializing in Next.js web applications, cross platform React Native and Expo apps, scalable database architectures, and search engine optimization.",
  keywords: [
    "Samsoun Behaein", 
    "Creative Technologist", 
    "Full Stack Developer", 
    "Mobile Developer", 
    "Next.js Portfolio", 
    "React Native Expert", 
    "Premium UI/UX Design", 
    "Berlin Tech Developer"
  ],
  authors: [{ name: "Samsoun Behaein" }],
  creator: "Samsoun Behaein",
  openGraph: {
    title: "Samsoun Behaein | Creative Technologist & Full Stack Engineer",
    description: "Immersive 3D-infused digital portfolio displaying premium web architectures, custom components, and highly optimized P2P applications.",
    url: "https://github.com/samsoun",
    siteName: "Samsoun Behaein Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Samsoun Behaein | Creative Technologist & Full Stack Developer",
    description: "Bridging the gap between beautiful imagination and production-ready engineering.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${inter.variable} ${vazirmatn.variable} ${amiri.variable} h-full scroll-smooth antialiased`}
    >
      <body className="font-body min-h-full flex flex-col bg-[#09090b] text-[#F8FAFC]">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
