import React from "react";

interface AuthInputProps {
    label: string;
    placeholder: string;
    type: string;
    value: string;
    onChange: (value: string) => void;

    maxLength?: number;

    onBlur?: () => void;
    onFocus?: () => void;

    leftIcon?: React.ReactNode;

    showPasswordToggle?: boolean;
    showPassword?: boolean;
    onTogglePassword?: () => void;

    helperText?: string;
}

export default function AuthInput({label, placeholder, type, value, onChange, onBlur, onFocus, showPassword, showPasswordToggle, onTogglePassword, leftIcon, helperText, maxLength}: AuthInputProps) {
    return (
        <div className="w-full mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>

            <div className="relative">

                {leftIcon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        {leftIcon}
                    </div>
                )}

                <input 
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    maxLength={maxLength}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    className={`w-full py-4 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-300 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100
                                    ${leftIcon ? 'pl-10' : 'px-4'}
                                    ${showPasswordToggle ? 'pr-20' : 'px-4'}
                                `}
                />

                {showPasswordToggle && (
                    <button type="button" onClick={onTogglePassword} className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-blue-500 hover:text-blue-700">
                        {showPassword ? 'Hide' : 'Show'}
                    </button>
                )}
            </div>

            {helperText && (
                <p className="text-sm text-gray-500 mt-2">
                    {helperText}
                </p>
            )}
        </div>
    )
}