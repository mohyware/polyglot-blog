'use client'
import { useState, useEffect, useRef } from "react";
import { SummarizePost } from "../lib/data";

import TypingEffect from "./TypingEffect";

function extractHashtags(text: string) {
    return text.match(/#\w+/g) || [];
}

function removeAfterSummary(text: string): string {
    const pattern = /## Summary:[\s\S]*?(?=\n## Important Topics:|$)/;
    const match = text.match(pattern);
    return match ? match[0].trim() : text;
}

export default function SummarizeButton({ id, title }: { id: string; title: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [summary, setSummary] = useState("");
    const [isFetching, setIsFetching] = useState(false);
    const [hasFetched, setHasFetched] = useState(false);
    const [hashtags, setHashtags] = useState<string[]>([]);

    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);


    const handleSummarizeClick = async () => {
        setIsOpen(true);

        // Only fetch if the summary hasn't been fetched yet
        if (!hasFetched && !isFetching) {
            setIsFetching(true);
            try {
                const result = await SummarizePost(id);
                setSummary(removeAfterSummary(result));
                console.log(removeAfterSummary(result))
                setHasFetched(true);
                setHashtags(extractHashtags(result));
            } catch (error) {
                console.error("Failed to fetch summary:", error);
            } finally {
                setIsFetching(false);
            }
        }
    };

    return (
        <div className="relative inline-block">
            {/* Toggle Button */}
            <button
                onClick={handleSummarizeClick}
                disabled={isFetching}
                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            >
                {isFetching ? (
                    // Loading spinner
                    <svg
                        className="animate-spin h-5 w-5 text-gray-800"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                ) : (
                    // Button text
                    "Summarize"
                )}

            </button>

            {/* Modal Positioned Beside Button */}
            {isOpen && hasFetched && (
                <div ref={modalRef} className="absolute left-full top-0 ml-8 w-[400px] rounded overflow-hidden shadow-lg bg-white border border-gray-300">
                    <div className="px-6 py-2">
                        <div className="flex items-center justify-between p-4 md:p-5 rounded-t border-b">
                            <div className="font-bold text-xl ">{title}</div>
                            <button
                                type="button"
                                className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
                                onClick={() => setIsOpen(false)}
                            >
                                <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <TypingEffect text={summary} />
                    </div>
                    <div className="px-6 pt-4 pb-2">
                        {hashtags.map((hashtag, index) => (
                            <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{hashtag}</span>

                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
