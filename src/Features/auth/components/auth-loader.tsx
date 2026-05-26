'use client';

import {useEffect, useState} from 'react';
import shuffle from '@/lib/shuffle';

const loadingMessages = [
    'Building your streaks...',
    'Preparing your dashboard...',
    'Lighting the productivity fire...',
    'Organizing your tasks...',
    'Leveling up your habbits...',
    'Getting everything ready...',
    'Preparing your DayRing experience...'
];

type AuthLoaderProps = {
    text?: string;
};

export default function AuthLoader({text}: AuthLoaderProps) {
    const shuffledMessages = shuffle(loadingMessages);
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        if (text) return;

        const interval = setInterval(() => {
            setMessageIndex((prevIndex) => (prevIndex + 1) % shuffledMessages.length);
        }, 2500);

        return () => clearInterval(interval);

    }, [text]);
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white ">
            <div className="text-center">
                <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"/>

                <h2 className="text-xl font-semibold text-gray-800">{text || loadingMessages[messageIndex]}</h2>

                <p className="text-gray-500 mt-2">Please wait...</p>
            </div>
        </div>
    )
}