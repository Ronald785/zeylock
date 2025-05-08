import type { PasswordProps } from "@/utils/generatePassword";
import { useCallback, useState } from "react";

export default function usePasswordSettings(
    initial: PasswordProps = {
        length: 16,
        useUpper: true,
        useLower: true,
        useNumbers: true,
        useSymbols: true,
    },
) {
    const [length, setLength] = useState<number>(initial.length);
    const [useUpper, setUseUpper] = useState<boolean>(initial.useUpper);
    const [useLower, setUseLower] = useState<boolean>(initial.useLower);
    const [useNumbers, setUseNumbers] = useState<boolean>(initial.useNumbers);
    const [useSymbols, setUseSymbols] = useState<boolean>(initial.useSymbols);

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
