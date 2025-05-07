import { useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { HiClipboard, HiCheck } from "react-icons/hi";
import "./index.css";
import { Slider } from "./components/ui/slider";

export default function App() {
    const [password, setPassword] = useState("");
    const [length, setLength] = useState(16);
    const [useUpper, setUseUpper] = useState(true);
    const [useLower, setUseLower] = useState(true);
    const [useNumbers, setUseNumbers] = useState(true);
    const [useSymbols, setUseSymbols] = useState(false);
    const [copied, setCopied] = useState(false);

    const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const LOWER = "abcdefghijklmnopqrstuvwxyz";
    const NUMBERS = "0123456789";
    const SYMBOLS = "!@#$%^&*()_+[]{}|;:,.<>?";

    function generate() {
        let charset = "";
        if (useUpper) charset += UPPER;
        if (useLower) charset += LOWER;
        if (useNumbers) charset += NUMBERS;
        if (useSymbols) charset += SYMBOLS;
        if (!charset) return setPassword("");

        let pwd = "";
        for (let i = 0; i < length; i++) {
            const index = Math.floor(Math.random() * charset.length);
            pwd += charset[index];
        }
        setPassword(pwd);
        setCopied(false);
    }

    function copyPassword() {
        if (!password) return;
        navigator.clipboard.writeText(password).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        });
    }

    return (
        <div className="bg-background text-foreground flex min-h-screen flex-col transition-colors duration-200">
            <header className="px-4 py-16 text-center sm:pb-0">
                <nav
                    className="mb-8 flex justify-center"
                    aria-label="Navegação principal"
                >
                    <a
                        href="/"
                        className="flex items-center text-3xl font-semibold lg:text-4xl"
                        aria-label="Página inicial"
                    >
                        <img
                            src="/images/padlock.svg"
                            alt="Cadeado"
                            className="mx-2 w-8"
                            loading="eager"
                        />
                        <h1 className="text-primary">Zeylock</h1>
                    </a>
                </nav>
                <h2 className="mb-4 text-3xl font-bold">Gere Senhas Fortes em Segundos</h2>
                <p className="text-lg opacity-80">
                    Personalize tamanho e complexidade, copie com 1 clique e mantenha suas contas seguras.
                </p>
            </header>

            <main className="flex flex-1 items-center justify-center px-4">
                <Card className="bg-popover w-full max-w-md">
                    <CardContent className="p-8">
                        <CardTitle className="mb-6 text-center text-xl font-semibold">Gerador de Senhas</CardTitle>

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
                                onClick={copyPassword}
                            >
                                {copied ? <HiCheck size={20} /> : <HiClipboard size={20} />}
                            </Button>
                        </div>

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
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="upper"
                                            checked={useUpper}
                                            onCheckedChange={(ch) => setUseUpper(!!ch)}
                                            className="cursor-pointer"
                                        />
                                        <Label
                                            htmlFor="upper"
                                            className="text-foreground"
                                        >
                                            Letras Maiúsculas
                                        </Label>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="lower"
                                            checked={useLower}
                                            onCheckedChange={(ch) => setUseLower(!!ch)}
                                            className="cursor-pointer"
                                        />
                                        <Label
                                            htmlFor="lower"
                                            className="text-foreground"
                                        >
                                            Letras Minúsculas
                                        </Label>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="numbers"
                                            checked={useNumbers}
                                            onCheckedChange={(ch) => setUseNumbers(!!ch)}
                                            className="cursor-pointer"
                                        />
                                        <Label
                                            htmlFor="numbers"
                                            className="text-foreground"
                                        >
                                            Números
                                        </Label>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="symbols"
                                            checked={useSymbols}
                                            onCheckedChange={(ch) => setUseSymbols(!!ch)}
                                            className="cursor-pointer"
                                        />
                                        <Label
                                            htmlFor="symbols"
                                            className="text-foreground"
                                        >
                                            Caracteres Especiais
                                        </Label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Button
                            disabled={!useUpper && !useLower && !useNumbers && !useSymbols}
                            aria-disabled={!useUpper && !useLower && !useNumbers && !useSymbols}
                            className="w-full cursor-pointer bg-green-400 py-3 font-semibold text-black hover:bg-green-500 dark:bg-green-600 dark:text-[#0D1117] dark:hover:bg-green-500"
                            onClick={generate}
                        >
                            {!useUpper && !useLower && !useNumbers && !useSymbols
                                ? "Selecione uma opção"
                                : "Gerar Senha"}
                        </Button>
                    </CardContent>
                </Card>
            </main>

            <footer className="py-4 text-center text-sm opacity-60">
                © 2025 Ronald Almeida — Desenvolvedor Full Stack
            </footer>
        </div>
    );
}
