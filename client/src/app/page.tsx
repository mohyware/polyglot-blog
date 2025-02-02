import Link from "next/link";
export default function Preview() {
    return (
        <main >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:pt-32">
                <p className="mx-auto -mt-4 max-w-2xl text-lg tracking-tight text-slate-700 sm:mt-6">Welcome to
                    <span className="border-b border-dotted border-slate-300"></span>
                </p>

                <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
                    <span className="inline-block">Polyglot
                        <span className="relative whitespace-nowrap text-blue-600">
                            <svg aria-hidden="true" viewBox="0 0 418 42" className="absolute top-2/3 left-0 h-[0.58em] w-full fill-blue-300/70" preserveAspectRatio="none"><path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path></svg>
                            <span className="relative">Blog</span></span>
                    </span>
                    <span className="inline-block">App</span>
                </h1>

                <p className="mx-auto mt-9 max-w-2xl text-lg tracking-tight text-slate-700 sm:mt-6">
                    <span className="inline-block">Write and manage your blogs in Markdown,</span>
                    <span className="inline-block">with automatic text summarization powered by MetaCall.</span>
                </p>

                <div className="mt-12 flex flex-col justify-center gap-y-5 sm:mt-10 sm:flex-row sm:gap-y-0 sm:gap-x-6">
                    <div className="relative flex flex-1 flex-col items-stretch sm:flex-none" data-headlessui-state="">
                        <Link href="/blog" as={"/blog"} className="group inline-flex ring-1 items-center justify-center rounded-full py-2 px-4 text-sm focus:outline-none ring-slate-200 text-slate-700 hover:text-slate-900 hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-blue-600 focus-visible:ring-slate-300 animate-fade-in-right" id="headlessui-menu-button-:r4:" aria-haspopup="true" aria-expanded="false" data-headlessui-state="" type="button">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                                fill="currentColor"
                                className="h-6 w-6 flex-none"
                            >
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13h-2v6H7v2h6v6h2v-6h6v-2h-6z" />
                            </svg>
                            <span className="ml-3">Get Started</span>
                        </Link>
                    </div>
                    <Link href="https://github.com/mohyware/polyglot-blog" target="_blank" className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900 animate-fade-in-left"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            fill="currentColor"
                            className="h-6 w-6 flex-none"
                        >
                            <path d="M12 0C5.372 0 0 5.372 0 12c0 5.303 3.438 9.8 8.207 11.385.6.111.793-.261.793-.577 0-.285-.011-1.04-.016-2.04-3.338.728-4.04-1.562-4.04-1.562-.545-1.38-1.33-1.748-1.33-1.748-1.087-.743.082-.73.082-.73 1.2.085 1.833 1.25 1.833 1.25 1.065 1.833 2.79 1.302 3.467.997.107-.773.417-1.302.758-1.603-2.664-.306-5.467-1.332-5.467-5.92 0-1.307.466-2.381 1.233-3.221-.123-.306-.534-.92.117-1.89 0 0 .765-.25 2.5.92a8.49 8.49 0 0 1 2.292-.306c.772 0 1.556.1 2.292.306 1.733-1.17 2.5-.92 2.5-.92.651.97.24 1.584.117 1.89.767.84 1.233 1.914 1.233 3.221 0 4.604-2.805 5.607-5.473 5.91.431.373.806 1.105.806 2.24 0 1.616-.016 2.93-.016 3.33 0 .315.192.69.8.577 4.771-1.585 8.207-6.082 8.207-11.385C24 5.372 18.628 0 12 0z" />
                        </svg>
                        <span className="ml-3">View on GitHub</span>
                    </Link>
                </div>

            </div>
        </main>
    );
}