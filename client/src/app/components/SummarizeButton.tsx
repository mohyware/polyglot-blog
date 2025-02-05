'use client'
import { useState, useEffect, useRef } from "react";
import { SummarizePost } from "../lib/data";
import { Bot } from "lucide-react"
import TypingEffect from "./TypingEffect";
import { toast } from 'react-hot-toast';

import { extractHashtags, removeAfterSummary, hasWord } from "../lib/utils";

export default function SummarizeButton({ id, title }: { id: string; title: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [hasFetched, setHasFetched] = useState(false);
    const [hasTypingEffect, setHasTypingEffect] = useState(false);
    const [summary, setSummary] = useState("");
    const [hashtags, setHashtags] = useState<string[]>([]);

    // Retrieve model from localStorage
    const [selectedModel, setSelectedModel] = useState("");
    useEffect(() => {
        if (typeof window !== "undefined") {
            const model = localStorage.getItem("selectedService");
            setSelectedModel(model || "gemini");
        }
    }, []);

    // Detect clicks outside of the modal and close it
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

    // Only fetch if the summary hasn't been fetched yet
    const handleSummarizeClick = async () => {
        setIsOpen(true);
        if ((!hasFetched && !isFetching)) {
            setIsFetching(true);
            try {
                let result = await SummarizePost(id, selectedModel);
                if (result.error) {
                    throw new Error(result.error)
                }
                console.log(result)
                if (!hasWord(result)) {
                    result = "Model could not generate summary Try Again or change The Model.";
                }
                setSummary(removeAfterSummary(result));
                setHasFetched(true);
                setHashtags(extractHashtags(result));
                setHasTypingEffect(true); // Enable typing effect the first time
            } catch (error) {
                console.log(error)
                toast.error("This Model is not Working Right Now Try Again or change The Model.");
            } finally {
                setIsFetching(false);
            }
        }
    };

    // fetch the summary again
    const handleTryAgain = async () => {
        setSummary("");
        setIsFetching(true);
        try {
            let result = await SummarizePost(id, selectedModel);
            if (result.error) {
                throw new Error(result.error)
            }
            if (!hasWord(result)) {
                result = "Model could not generate summary Try Again or change The Model.";
            }
            setSummary(removeAfterSummary(result));
            setHasFetched(true);
            setHashtags(extractHashtags(result));
            setHasTypingEffect(true); // Enable typing effect the first time
        } catch (error) {
            console.log(error)
            toast.error("This Model is not Working Right Now Try Again or change The Model.");
        } finally {
            setIsFetching(false);
        }
    };

    // No typing effect after the first time 
    const handleTypingComplete = () => {
        setHasTypingEffect(false);
    };

    return (
        <div className="relative inline-block">
            {/* Toggle Button */}
            <div
                className={`bg-white ${isFetching ? 'bg-gray-100 cursor-not-allowed' : 'hover:bg-gray-100'} text-gray-800 font-semibold py-2 px-2 border border-gray-400 rounded shadow flex items-center gap-1`}
            >
                {isFetching ? (
                    // Loading spinner
                    <svg
                        key="spinner"
                        className="animate-spin h-6 w-6 text-gray-800"
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
                    < Bot key="bot" className="h-6 w-6" />
                )}
                Summarize
                <button
                    onClick={handleSummarizeClick}
                    disabled={isFetching}
                    className="absolute inset-0 bg-transparent text-center"
                >
                </button>
            </div>
            {/* TODO: make it responsive */}
            {/* Modal Positioned Beside Button */}
            {isOpen && hasFetched && (
                <div ref={modalRef}
                    className="absolute left-full top-0 ml-8 w-[400px] rounded overflow-hidden shadow-lg bg-white border border-gray-300
                    "
                >
                    <div className="px-6 py-2">
                        <div className="flex items-center justify-between  py-3  rounded-t border-b">
                            {/* Title */}
                            <div className="font-bold text-xl ">{title}</div>
                            {/* Close Button */}
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
                        {/* Summary */}
                        {hasTypingEffect ? (
                            <TypingEffect text={summary} onComplete={handleTypingComplete} />
                        ) : (
                            <div className="text-gray-700 text-base py-2">{summary}</div>
                        )}
                    </div>
                    {/* Hashtags */}
                    <div className="px-6 pt-4 pb-2">
                        {hashtags.map((hashtag, index) => (
                            <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{hashtag}</span>

                        ))}
                        <div className="flex justify-center py-2">
                            {/* Try Again Button */}
                            {<button onClick={handleTryAgain}
                                className={`bg-white ${isFetching ? 'bg-gray-100 cursor-not-allowed' : 'hover:bg-gray-100'} text-gray-800 font-semibold py-2 px-2 border border-gray-400 rounded shadow flex items-center gap-1`}
                            >
                                Summarize Again?
                            </button>}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
