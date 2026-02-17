import "./globals.css";

export const metadata = {
  title: "VTrack",
  description: "Track every word you speak",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
