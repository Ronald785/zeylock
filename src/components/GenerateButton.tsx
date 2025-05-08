import type { FC } from "react";
import { Button } from "./ui/button";

interface Props {
    disabled: boolean;
    onClick: () => void;
}

export const GenerateButton: FC<Props> = ({ disabled, onClick }) => {
    return (
        <Button
            disabled={disabled}
            aria-disabled={disabled}
            className="w-full cursor-pointer bg-green-400 py-3 font-semibold text-black hover:bg-green-500 dark:bg-green-600 dark:text-[#0D1117] dark:hover:bg-green-500"
            onClick={onClick}
        >
            {disabled ? "Selecione uma opção" : "Gerar Senha"}
        </Button>
    );
};
