import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VTrack – Voice Performance Monitor",
  description:
    "Monitor your speaking pace, active time, and live transcript in real time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">{children}</body>
    </html>
  );
}
