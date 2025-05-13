import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Le mot du jour",
  description: "Devinez le mot du jour",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
