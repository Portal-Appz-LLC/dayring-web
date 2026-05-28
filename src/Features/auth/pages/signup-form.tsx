'use client';

import { useState } from 'react';
import Link from "next/link";
import { FaApple } from "react-icons/fa";
import { calculatePasswordStrength } from '@/Features/auth/utils/passwordStrength';
import { GoogleLogin } from '@react-oauth/google';
import AuthManager from '@/Features/auth/components/auth-loader';

import AuthInput from '@/Features/auth/components/auth-input'
import AuthHeader from '../components/auth-header';

export default function SignUpForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const passwordStrength = calculatePasswordStrength(password);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const isFormValid = email.length > 0 && password.length > 0 && password === confirmPassword;

    const requirements = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /\d/.test(password),
        special: /[!@#$%^&*()-+]/.test(password)
    };

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        try {
            setIsLoading(true);

            await new Promise((resolve) => setTimeout(resolve, 3000));
            console.log('Form submitted:', { username, email, password });
        }
        catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    }

    // Simulate Google Login success
    async function handleGoogleLoginSuccess(credentialResponse: any) {
        try {
            setIsLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 3000));
            console.log('Google Login Success:', credentialResponse);
        }
        catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    }

    // Render loading state
    if (isLoading) {
        return <AuthManager />;
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-12">
            <div className="w-full max-w-md">
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-300"
                >
                    <AuthHeader
                        heading="Create your account!"
                        subheading="Start building your streaks today!"
                    />
                    <AuthInput
                        label="Username"
                        type="text"
                        value={username}
                        placeholder="Username"
                        onChange={(value) => {
                            const cleaned = value.replace(/[^a-zA-Z0-9_-]/g, '')
                            setUsername(cleaned)
                        }}
                        maxLength={20}
                        leftIcon="@"
                        helperText="Usernames must be between 3 and 20 characters long and can only contain letters, numbers, underscores, and hyphens."
                    />

                    <AuthInput
                        label="Email"
                        type="email"
                        value={email}
                        placeholder="you@example.com"
                        onChange={setEmail}
                    />

                    <AuthInput
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        placeholder="●●●●●●●●●●●"
                        onChange={setPassword}
                        onFocus={() => setPasswordFocused(true)}
                        onBlur={() => setPasswordFocused(false)}
                        showPasswordToggle
                        showPassword={showPassword}
                        onTogglePassword={() => setShowPassword(!showPassword)}
                    />


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

                            <div className="mt-3 space-y-1 text-sm">
                                <p className={requirements.length ? "text-green-500" : "text-red-500"}>
                                    At least 8 characters
                                </p>
                                <p className={requirements.uppercase ? "text-green-500" : "text-red-500"}>
                                    One uppercase letter
                                </p>
                                <p className={requirements.lowercase ? "text-green-500" : "text-red-500"}>
                                    One lowercase letter
                                </p>
                                <p className={requirements.number ? "text-green-500" : "text-red-500"}>
                                    One number
                                </p>
                                <p className={requirements.special ? "text-green-500" : "text-red-500"}>
                                    One special character
                                </p>
                            </div>
                        </div>
                    )}


                    <AuthInput
                        label="Confirm your password"
                        type="password"
                        value={confirmPassword}
                        placeholder='●●●●●●●●●●●'
                        onChange={setConfirmPassword}
                    />

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
                        <div className="flex-1 h-px bg-gray-200" />
                    </div>

                    <div className="space-y-3 mt-6">
                         <GoogleLogin
                            onSuccess={handleGoogleLoginSuccess}
                            onError={() => {
                                console.error('Google Login Failed');
                                setIsLoading(false);
                            }}
                        />

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
                    </p>
                </form>
            </div>
        </main>
    );
}
