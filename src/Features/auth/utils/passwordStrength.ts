export function calculatePasswordStrength(password: string) {
    let strength = 0;

    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;

    // Character variety
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;

    // Special characters
    if (/[^A-Za-z0-9]/.test(password)) strength += 2;

    if (strength <= 2){
        return {
            label: 'Weak',
            color: 'bg-red-500',
            'width': '25%',
        };
    }

    if (strength <= 4){
        return {
            label: 'Fair',
            color: 'bg-yellow-500',
            'width': '50%',
        };
    }

    if (strength <= 6){
        return {
            label: 'Good',
            color: 'bg-blue-500',
            'width': '75%',
        };
    }

    return {
        label: 'Strong',
        color: 'bg-green-500',
        'width': '100%',
    };
}