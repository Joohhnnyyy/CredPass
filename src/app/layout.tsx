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
  title: "CredPass",
  description: "CredPass - Unlock global credibility and make trust portable.",
  icons: {
    icon: "/CredPass_logo.png",
  },
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
