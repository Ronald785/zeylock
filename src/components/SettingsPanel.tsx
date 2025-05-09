import type { FC } from "react";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";

interface Props {
    length: number;
    useUpper: boolean;
    useLower: boolean;
    useNumbers: boolean;
    useSymbols: boolean;
    setLength: (v: number) => void;
    setUseUpper: (v: boolean) => void;
    setUseLower: (v: boolean) => void;
    setUseNumbers: (v: boolean) => void;
    setUseSymbols: (v: boolean) => void;
}

export const SettingsPanel: FC<Props> = ({
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
}) => {
    return (
        <div className="mb-6 space-y-4">
            <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                    <Label htmlFor="length">Tamanho:</Label>
                    <Input
                        id="length"
                        type="number"
                        value={length}
                        onChange={(e) => setLength(+e.target.value)}
                        min={4}
                        max={32}
                        className="w-16"
                    />
                </div>
                <div className="py-4">
                    <Slider
                        max={32}
                        min={4}
                        step={1}
                        value={[length]}
                        onValueChange={(val) => setLength(val[0])}
                        className="accent-green-400"
                        aria-label="Comprimento da senha"
                        aria-valuemin={4}
                        aria-valuemax={32}
                        aria-valuenow={length}
                    />
                </div>
            </div>

            <div className="mb-6 space-y-4">
                <div className="grid grid-cols-2 gap-2">
                    {[
                        {
                            id: "upper",
                            label: "Letras Maiúsculas",
                            checked: useUpper,
                            onChange: setUseUpper,
                        },
                        {
                            id: "lower",
                            label: "Letras Minúsculas",
                            checked: useLower,
                            onChange: setUseLower,
                        },
                        {
                            id: "numbers",
                            label: "Números",
                            checked: useNumbers,
                            onChange: setUseNumbers,
                        },
                        {
                            id: "symbols",
                            label: "Caracteres Especiais",
                            checked: useSymbols,
                            onChange: setUseSymbols,
                        },
                    ].map((opt) => (
                        <div
                            key={opt.id}
                            className="flex items-center space-x-2"
                        >
                            <Checkbox
                                id={opt.id}
                                checked={opt.checked}
                                onCheckedChange={(ch) => opt.onChange(!!ch)}
                                className="cursor-pointer"
                            />
                            <Label
                                htmlFor={opt.id}
                                className="text-foreground"
                            >
                                {opt.label}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
