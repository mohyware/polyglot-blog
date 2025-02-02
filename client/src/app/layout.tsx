import "./globals.css";
import type { Metadata } from "next";
import { inter } from '@/app/components/fonts';

export const metadata: Metadata = {
  title: "Blog Application",
  description: "polyglot blog application",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased min-h-screen bg-white text-slate-900  ${inter.className}`}>
        <main>{children}</main>
      </body>
    </html>
  );
}
