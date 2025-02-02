import Link from "next/link"
import { inter } from '@/app/components/fonts';

export default function Layout({
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
                                <Link href="/blog">Blog</Link>
                                <Link href="/admin/blog">Dashboard</Link>
                                <Link href="/about">About</Link>
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
