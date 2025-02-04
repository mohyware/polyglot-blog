import { useState, useEffect } from "react";

interface TypingEffectProps {
    text: string;
    onComplete: () => void;  // Handler when typing is complete
    speed?: number;
}
export default function TypingEffect({ text, onComplete, speed = 10 }: TypingEffectProps) {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayText((prev) => prev + text[currentIndex]);
                setCurrentIndex((prev) => prev + 1);
            }, speed);

            return () => clearTimeout(timeout);
        } else {
            onComplete();
            // Stop the cursor blinking after typing is complete
            const cursorTimeout = setTimeout(() => {
                setShowCursor(false); // Hide the cursor
            }, 500); // Wait for one last blink before hiding

            return () => clearTimeout(cursorTimeout);
        }
    }, [currentIndex, text, speed, onComplete]);


    return <div className="text-gray-700 text-base py-2">
        {displayText}
        {showCursor && <span style={{ opacity: 1 }}>|</span>}
    </div>
}
