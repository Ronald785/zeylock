import type { PasswordProps } from "@/utils/generatePassword";
import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "zeylock-password-settings";

export default function usePasswordSettings(
    initial: PasswordProps = {
        length: 16,
        useUpper: true,
        useLower: true,
        useNumbers: true,
        useSymbols: true,
    },
) {
    const [length, setLength] = useState<number>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (saved) {
            try {
                const opts: PasswordProps = JSON.parse(saved);
                return opts.length;
            } catch {
                /* empty */
            }
        }
        return initial.length;
    });
    const [useUpper, setUseUpper] = useState<boolean>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (saved) {
            try {
                const opts: PasswordProps = JSON.parse(saved);
                return opts.useUpper;
            } catch {
                /* empty */
            }
        }
        return initial.useUpper;
    });
    const [useLower, setUseLower] = useState<boolean>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (saved) {
            try {
                const opts: PasswordProps = JSON.parse(saved);
                return opts.useLower;
            } catch {
                /* empty */
            }
        }
        return initial.useLower;
    });
    const [useNumbers, setUseNumbers] = useState<boolean>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (saved) {
            try {
                const opts: PasswordProps = JSON.parse(saved);
                return opts.useNumbers;
            } catch {
                /* empty */
            }
        }
        return initial.useNumbers;
    });
    const [useSymbols, setUseSymbols] = useState<boolean>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (saved) {
            try {
                const opts: PasswordProps = JSON.parse(saved);
                return opts.useSymbols;
            } catch {
                /* empty */
            }
        }
        return initial.useSymbols;
    });

    useEffect(() => {
        const opts: PasswordProps = { length, useUpper, useLower, useNumbers, useSymbols };
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(opts));
        } catch {
            /* empty */
        }
    }, [length, useUpper, useLower, useNumbers, useSymbols]);

    const reset = useCallback(() => {
        setLength(initial.length);
        setUseUpper(initial.useUpper);
        setUseLower(initial.useLower);
        setUseNumbers(initial.useNumbers);
        setUseSymbols(initial.useSymbols);
    }, [initial]);

    return {
        length,
        useUpper,
        useLower,
        useNumbers,
        useSymbols,
        setLength,
        setUseUpper,
        setUseLower,
        setUseNumbers,
        setUseSymbols,
        reset,
    };
}
