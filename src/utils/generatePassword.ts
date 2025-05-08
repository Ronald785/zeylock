const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+[]{}|;:,.<>?";

export interface PasswordProps {
    length: number;
    useUpper: boolean;
    useLower: boolean;
    useNumbers: boolean;
    useSymbols: boolean;
}

export function generatePassword(options: PasswordProps) {
    const { length, useUpper, useLower, useNumbers, useSymbols } = options;

    let charset = "";

    if (useUpper) charset += UPPER;
    if (useLower) charset += LOWER;
    if (useNumbers) charset += NUMBERS;
    if (useSymbols) charset += SYMBOLS;
    if (!charset) return "";

    let pwd = "";
    for (let i = 0; i < length; i++) {
        const index = Math.floor(Math.random() * charset.length);
        pwd += charset[index];
    }

    return pwd;
}
