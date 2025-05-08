import { Card, CardContent, CardTitle } from "@/components/ui/card";
import "./index.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { GenerateButton } from "./components/GenerateButton";
import { PasswordDisplay } from "./components/PasswordDisplay";
import { SettingsPanel } from "./components/SettingsPanel";
import { generatePassword, type PasswordProps } from "./utils/generatePassword";
import usePasswordSettings from "./hooks/usePasswordSettings";
import { useState } from "react";

export default function App() {
    const [password, setPassword] = useState<string>("");
    const [copied, setCopied] = useState<boolean>(false);
    const settings = usePasswordSettings();

    const handleGenerate = () => {
        const pwd = generatePassword(settings as PasswordProps);
        setPassword(pwd);
        setCopied(false);
    };

    const handleCopy = () => {
        if (!password) return;
        navigator.clipboard.writeText(password).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        });
    };

    const noneSelected = !settings.useUpper && !settings.useLower && !settings.useNumbers && !settings.useSymbols;

    return (
        <div className="bg-background text-foreground flex min-h-screen flex-col transition-colors duration-200">
            <Header />
            <main className="flex flex-1 items-center justify-center px-4">
                <Card className="bg-popover w-full max-w-md">
                    <CardContent className="p-8">
                        <CardTitle className="mb-6 text-center text-xl font-semibold">Gerador de Senhas</CardTitle>

                        <PasswordDisplay
                            password={password}
                            copied={copied}
                            onCopy={handleCopy}
                        />

                        <SettingsPanel {...settings} />

                        <GenerateButton
                            onClick={handleGenerate}
                            disabled={noneSelected}
                        />
                    </CardContent>
                </Card>
            </main>

            <Footer />
        </div>
    );
}
