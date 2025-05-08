import { HiCheck, HiClipboard } from "react-icons/hi";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import type { FC } from "react";

interface Props {
    password: string;
    copied: boolean;
    onCopy: () => void;
}

export const PasswordDisplay: FC<Props> = ({ password, copied, onCopy }) => {
    return (
        <div className="mb-4 flex">
            <div
                aria-live="polite"
                className="w-full"
            >
                <Input
                    className="flex-1 rounded-r-none border-0 placeholder-gray-500 shadow"
                    value={password}
                    readOnly
                    placeholder="Senha"
                    aria-label="Senha gerada"
                />
            </div>
            <Button
                aria-label={copied ? "Senha copiada para a área de transferência" : "Copiar senha"}
                className="bg-primary cursor-pointer rounded-l-none text-black hover:bg-green-600"
                onClick={onCopy}
            >
                {copied ? <HiCheck size={20} /> : <HiClipboard size={20} />}
            </Button>
        </div>
    );
};
