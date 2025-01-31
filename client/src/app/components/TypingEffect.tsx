import { useState, useEffect } from "react";

interface TypingEffectProps {
    text: string;
    speed?: number;
}
export default function TypingEffect({ text, speed = 10 }: TypingEffectProps) {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length - 1) {
                setDisplayedText((prev) => prev + text[i]);
                i++;
            } else {
                clearInterval(interval);
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed]);

    return <p className="text-gray-700 text-base py-2">{displayedText}</p>;
}
