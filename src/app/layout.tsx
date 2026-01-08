import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { VisualEditsMessenger } from "orchids-visual-edits";

const graphik = localFont({
  src: "../../public/fonts/GraphikLCG-Medium.woff2",
  variable: "--font-graphik",
  weight: "500",
});

const ppNeueMontreal = localFont({
  src: "../../public/fonts/PPNeueMontreal-Regular.woff2",
  variable: "--font-pp-neue-montreal",
  weight: "400",
});

export const metadata: Metadata = {
  title: "AI in Banking UX Design | Vide Infra",
  description: "10 AI-powered features that will revolutionize banking UX. A fresh look at finance UX through the lens of artificial intelligence and human-centric design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${graphik.variable} ${ppNeueMontreal.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
