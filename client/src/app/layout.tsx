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
        className={`antialiased min-h-screen bg-white text-slate-900  ${inter.className}`}
      >
        <div className="max-w-2xl mx-auto py-10 px-4">
          <header>
            <div className="flex items-center justify-between">
              <nav className="ml-auto text-lg font-medium space-x-6">
              </nav>
            </div>
          </header>
          <br />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
