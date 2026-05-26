'use client';

import { useEffect, useState } from 'react';

const messages = [
    'Building your streaks...',
    'Creating your account...',
    'Setting things up...',
    'Preparing your dashboard...',
    'Almost there...',
    'Unlocking your progress...',
];

export default function AuthManager() {
    const [messageIndex, setMessageIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [charIndex, setCharIndex] = useState(0);

    const currentMessage = messages[messageIndex];

    // typing effect
    useEffect(() => {
        if (charIndex < currentMessage.length) {
            const timeout = setTimeout(() => {
                setDisplayText(currentMessage.slice(0, charIndex + 1));
                setCharIndex((prev) => prev + 1);
            }, 50); // typing speed

            return () => clearTimeout(timeout);
        }

        // pause before switching message
        const pause = setTimeout(() => {
            setMessageIndex((prev) => (prev + 1) % messages.length);
            setCharIndex(0);
            setDisplayText('');
        }, 1200);

        return () => clearTimeout(pause);
    }, [charIndex, currentMessage]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
            <div className="text-center px-6">
                <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />

                <h2 className="text-xl font-semibold text-gray-800">
                    {displayText}
                    <span className="animate-pulse">|</span>
                </h2>

                <p className="text-gray-500 mt-2">
                    Please wait a moment
                </p>
            </div>
        </div>
    );
}