'use client';

import { useState } from 'react';
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { calculatePasswordStrength } from '@/lib/passwordStrength';

export default function SignUpForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const passwordStrength = calculatePasswordStrength(password);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const isFormValid = email.length > 0 && password.length > 0 && password === confirmPassword;

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);
        alert('Account created (demo)');
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
            <div className="w-full max-w-md">
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-300"
                >
                    <h2 className="text-3xl text-center font-bold text-gray-500 pt-2">
                        Create account
                    </h2>
                    <p className="text-center text-gray-500 pb-4">
                        Start building your streaks today!
                    </p>

                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full px-4 py-4 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-300 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                        />
                    </div>

                    <div className="w-full py-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={() => setPasswordFocused(true)}
                            onBlur={() => setTimeout(() => setPasswordFocused(false), 200)}
                            placeholder="●●●●●●●●●●●"
                            className="w-full px-4 py-4 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-300 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="mt-2 text-sm text-blue-500 hover:text-blue-700"
                        >
                            {showPassword ? 'Hide' : 'Show'} Password
                        </button>
                    </div>

                    {passwordFocused && password.length > 0 && (
                        <div className="mt-2 transition-all duration-300 ease-out opacity-100 translate-y-0">
                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-300 ${passwordStrength.color}`}
                                    style={{ width: passwordStrength.width }}
                                />
                            </div>

                            <div className="flex justify-between items-center mt-2">
                                <p className="text-sm font-medium text-gray-700">Password Strength</p>
                                <p
                                    className={`text-sm font-semibold ${
                                        passwordStrength.label === 'Weak'
                                            ? 'text-red-500'
                                            : passwordStrength.label === 'Medium'
                                            ? 'text-yellow-500'
                                            : 'text-green-500'
                                    }`}
                                >
                                    {passwordStrength.label}
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="w-full mt-3 mb-5">
                        <label className="block text-sm font-medium text-gray-700 pt-1">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="●●●●●●●●●●●"
                            className="w-full px-4 py-4 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-300 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                        />
                    </div>

                    {confirmPassword.length > 0 && password.length > 0 && (
                        <p className = {`mt-2 pb-2 text-sm font-medium ${password === confirmPassword ? "text-green-500" : "text-red-500"}`}>
                            {password === confirmPassword ? 'Your passwords match.' : 'Your passwords do not match. Please try again.'}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={!isFormValid}
                        className={`w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white py-4 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition`}
                    >
                        Create Account
                    </button>

                    <p className="block text-sm font-medium text-gray-700 pt-4">
                        Already have an account?{' '}
                        <Link href="/login" className="text-orange-600 font-semibold hover:text-orange-700 hover:underline">
                            Log in
                        </Link>
                    </p>

                    <div className="flex items-center my-6">
                        <div className="flex-1 h-px bg-gray-200" />
                        <span className="px-4 text-sm text-gray-400">or</span>
                        <div className="flex-1 h-px bg-gray-200" />a
                    </div>

                    <div className="space-y-3 mt-6">
                        <button
                            type="button"
                            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 transition"
                        >
                            <FcGoogle size={22} />
                            <span className="font-medium text-gray-700">Continue with Google</span>
                        </button>

                        <button
                            type="button"
                            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-black hover:bg-gray-900 text-white transition"
                        >
                            <FaApple size={18} />
                            <span className="font-medium">Continue with Apple</span>
                        </button>
                    </div>

                    <p className="text-xs text-center text-gray-400 mt-6 leading-relaxed">
                        By continuing, you agree to DayRing's{' '}
                        <Link href="/terms" className="underline hover:text-gray-900">
                            Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="/privacy" className="underline hover:text-gray-900">
                            Privacy Policy
                        </Link>
                        .
                    </p>
                </form>
            </div>
        </main>
    );
}
